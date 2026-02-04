const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const db = require('./db/init');
const { Client, ChannelType } = require('discord.js');
const { initializeOrchestrator } = require('./orchestrator/autonomousProposal');
const { initializeDiscordListener, notifyProposalCreated, notifyFeedbackGiven, notifyApproved } = require('./discord/orchestratorListener');
const { initializeCreativeReleaseCoordinator, getReleaseStatus, getAllReleases, getEngagementMetrics, getProcessingStats } = require('./creative/creativeReleaseCoordinator');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Discord client
let discordClient = null;
let discordReady = false;

// Initialize Discord bot
const initializeDiscord = () => {
  const token = process.env.DISCORD_TOKEN;
  if (!token) {
    console.warn('⚠️  DISCORD_TOKEN not configured. Discord integration will be skipped.');
    return;
  }

  discordClient = new Client({ intents: ['Guilds', 'GuildMessages', 'MessageContent', 'DirectMessages'] });

  discordClient.once('ready', () => {
    console.log('✓ Discord bot connected');
    discordReady = true;
    
    // Initialize orchestrator listener
    initializeDiscordListener(discordClient);
  });

  discordClient.on('error', err => {
    console.error('Discord client error:', err);
  });

  discordClient.login(token).catch(err => {
    console.error('Failed to login Discord:', err);
  });
};

// Helper function to post to Discord
const postToDiscord = async (channelId, message) => {
  if (!discordReady || !discordClient) return;
  
  try {
    const channel = await discordClient.channels.fetch(channelId);
    if (channel && channel.isTextBased()) {
      await channel.send(message);
    }
  } catch (err) {
    console.error('Error posting to Discord:', err);
  }
};

// API Endpoints

// GET /api/projects - List all projects with optional filters
app.get('/api/projects', (req, res) => {
  const { status, proposer, team } = req.query;

  let query = 'SELECT * FROM projects WHERE 1=1';
  const params = [];

  if (status) {
    query += ' AND status = ?';
    params.push(status);
  }
  if (proposer) {
    query += ' AND proposer = ?';
    params.push(proposer);
  }
  if (team) {
    query += ' AND assigned_team = ?';
    params.push(team);
  }

  query += ' ORDER BY created_at DESC';

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const projects = rows.map(row => ({
      ...row,
      proposal_json: row.proposal_json ? JSON.parse(row.proposal_json) : null
    }));

    res.json(projects);
  });
});

// GET /api/projects/:id - Get detailed project info with feedback history
app.get('/api/projects/:id', (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM projects WHERE id = ?', [id], (err, project) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Parse JSON if present
    if (project.proposal_json) {
      project.proposal_json = JSON.parse(project.proposal_json);
    }

    // Get feedback history
    db.all('SELECT * FROM feedback WHERE project_id = ? ORDER BY feedback_date DESC', [id], (err, feedbacks) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        ...project,
        feedbacks: feedbacks || []
      });
    });
  });
});

// POST /api/projects - Create a new project
app.post('/api/projects', (req, res) => {
  const { title, proposer, description, proposal_json, assigned_team, target_completion } = req.body;

  if (!title || !proposer) {
    return res.status(400).json({ error: 'Title and proposer are required' });
  }

  const proposal_json_str = proposal_json ? JSON.stringify(proposal_json) : null;

  db.run(
    `INSERT INTO projects (title, proposer, description, proposal_json, assigned_team, target_completion, status)
     VALUES (?, ?, ?, ?, ?, ?, 'PROPOSED')`,
    [title, proposer, description, proposal_json_str, assigned_team, target_completion],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const projectId = this.lastID;
      
      // Fetch the created project
      db.get('SELECT * FROM projects WHERE id = ?', [projectId], (err, project) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        if (project.proposal_json) {
          project.proposal_json = JSON.parse(project.proposal_json);
        }

        // Post to Discord if configured
        if (discordReady) {
          notifyProposalCreated(project, 'manual');
        }

        res.status(201).json(project);
      });
    }
  );
});

// POST /api/projects/:id/feedback - Submit feedback
app.post('/api/projects/:id/feedback', (req, res) => {
  const { id } = req.params;
  const { feedback_text } = req.body;

  if (!feedback_text) {
    return res.status(400).json({ error: 'Feedback text is required' });
  }

  // Update latest feedback on project
  db.run(
    'UPDATE projects SET feedback = ? WHERE id = ?',
    [feedback_text, id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Add to feedback history
      db.run(
        `INSERT INTO feedback (project_id, feedback_text, status_after)
         SELECT ?, ?, status FROM projects WHERE id = ?`,
        [id, feedback_text, id],
        (err) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          // Get updated project
          db.get('SELECT * FROM projects WHERE id = ?', [id], (err, project) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }

            // Post to Discord
            if (discordReady) {
              notifyFeedbackGiven(project, feedback_text);
            }

            res.json(project);
          });
        }
      );
    }
  );
});

// POST /api/projects/:id/approve - Approve project (CEO action)
app.post('/api/projects/:id/approve', (req, res) => {
  const { id } = req.params;

  db.run(
    `UPDATE projects SET status = 'ACTIVE', approved_at = CURRENT_TIMESTAMP WHERE id = ?`,
    [id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Get updated project
      db.get('SELECT * FROM projects WHERE id = ?', [id], (err, project) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        // Post to Discord
        if (discordReady) {
          notifyApproved(project);
        }

        res.json(project);
      });
    }
  );
});

// POST /api/projects/:id/status - Update project status
app.post('/api/projects/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['PROPOSED', 'ACTIVE', 'IN_PROGRESS', 'COMPLETE'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  db.run(
    `UPDATE projects SET status = ? WHERE id = ?`,
    [status, id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      db.get('SELECT * FROM projects WHERE id = ?', [id], (err, project) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        res.json(project);
      });
    }
  );
});

// GET /api/dashboard - Dashboard stats
app.get('/api/dashboard', (req, res) => {
  db.all(
    `SELECT status, COUNT(*) as count FROM projects GROUP BY status`,
    [],
    (err, stats) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const counts = {
        PROPOSED: 0,
        ACTIVE: 0,
        IN_PROGRESS: 0,
        COMPLETE: 0
      };

      stats.forEach(stat => {
        counts[stat.status] = stat.count;
      });

      // Get timeline view
      db.all(
        `SELECT id, title, proposer, status, target_completion FROM projects 
         WHERE target_completion IS NOT NULL 
         ORDER BY target_completion ASC LIMIT 10`,
        [],
        (err, timeline) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          res.json({
            counts,
            timeline: timeline || [],
            total: counts.PROPOSED + counts.ACTIVE + counts.IN_PROGRESS + counts.COMPLETE
          });
        }
      );
    }
  );
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', discord: discordReady });
});

// ============================================================
// CREATIVE RELEASE ENDPOINTS
// ============================================================

// GET /api/creative/releases - List all creative releases
app.get('/api/creative/releases', (req, res) => {
  const { status, limit } = req.query;
  
  getAllReleases(status || null, parseInt(limit) || 50, (err, releases) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(releases || []);
  });
});

// GET /api/creative/releases/:id - Get creative release details
app.get('/api/creative/releases/:id', (req, res) => {
  const { id } = req.params;

  getReleaseStatus(id, (err, release) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!release) {
      return res.status(404).json({ error: 'Release not found' });
    }
    res.json(release);
  });
});

// GET /api/creative/releases/:id/metrics - Get engagement metrics
app.get('/api/creative/releases/:id/metrics', (req, res) => {
  const { id } = req.params;

  getEngagementMetrics(id, (err, metrics) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(metrics || {});
  });
});

// GET /api/creative/stats - Get processing stats
app.get('/api/creative/stats', (req, res) => {
  if (!creativeCoordinator) {
    return res.status(503).json({ error: 'Creative system not initialized' });
  }

  res.json(getProcessingStats());
});

// POST /api/creative/releases/:id/distribute - Manually trigger distribution
app.post('/api/creative/releases/:id/distribute', (req, res) => {
  const { id } = req.params;

  if (!creativeCoordinator) {
    return res.status(503).json({ error: 'Creative system not initialized' });
  }

  // Queue the release for distribution
  creativeCoordinator.queueRelease(parseInt(id));

  getReleaseStatus(id, (err, release) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Distribution queued', release });
  });
});

// Creative Release Coordinator
let creativeCoordinator = null;

// Initialize Discord and Orchestrator, then start server
initializeDiscord();

// Initialize orchestrator system (waits for db to be ready)
setTimeout(() => {
  initializeOrchestrator(db, postToDiscord);
  
  // Initialize creative release system
  creativeCoordinator = initializeCreativeReleaseCoordinator(db, postToDiscord, discordClient);
}, 500);

app.listen(PORT, () => {
  console.log(`\n🎭 Puppet Show Coordination System`);
  console.log(`📡 Server running on http://localhost:${PORT}`);
  console.log(`💾 Database: /Volumes/Elements/Projects/puppet-show.db`);
  console.log(`\nProject Management API:`);
  console.log(`  GET    /api/projects           - List all projects`);
  console.log(`  GET    /api/projects/:id       - Get project details`);
  console.log(`  POST   /api/projects           - Create new project`);
  console.log(`  POST   /api/projects/:id/feedback  - Submit feedback`);
  console.log(`  POST   /api/projects/:id/approve   - Approve project`);
  console.log(`  POST   /api/projects/:id/status    - Update status`);
  console.log(`  GET    /api/dashboard         - Dashboard stats`);
  console.log(`\nCreative Release API:`);
  console.log(`  GET    /api/creative/releases         - List all creative releases`);
  console.log(`  GET    /api/creative/releases/:id     - Get release details`);
  console.log(`  GET    /api/creative/releases/:id/metrics - Get engagement metrics`);
  console.log(`  POST   /api/creative/releases/:id/distribute - Trigger distribution`);
  console.log(`  GET    /api/creative/stats    - Get processing stats`);
  console.log(`\nOther:`);
  console.log(`  GET    /api/health            - Health check`);
  console.log(`\n🌐 Dashboard: http://localhost:${PORT}`);
  console.log(`\n🎨 Creative Release System active`);
  console.log(`🤖 Orchestrator system ready for autonomous proposals`);
});
