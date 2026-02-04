/**
 * Autonomous Project Proposal System
 * 
 * This module allows orchestrators to autonomously create project proposals
 * based on directives from the #executive channel or programmatic calls.
 * 
 * Orchestrators integrate this into their decision-making pipeline by:
 * 1. Evaluating a directive through their functional lens
 * 2. Generating an autonomousProposal() call if appropriate
 * 3. The proposal is created in Dolt with PROPOSED status
 * 4. Discord notification is posted to #executive
 */

const path = require('path');

// Database connection (shared with main server)
let db = null;
let discordPostFunction = null;

/**
 * Initialize the orchestrator with database connection and Discord integration
 * @param {Object} database - SQLite database connection
 * @param {Function} discordPostFn - Function to post to Discord
 */
function initializeOrchestrator(database, discordPostFn) {
  db = database;
  discordPostFunction = discordPostFn;
  console.log('✓ Orchestrator initialized for autonomous proposals');
}

/**
 * Autonomous Proposal Function
 * 
 * Called by orchestrators when they identify a project that should be proposed
 * 
 * @param {Object} proposalData - The proposal data
 * @param {string} proposalData.title - Project title
 * @param {string} proposalData.proposer - Name of proposer (Sylvia, Vincent, Kathryn, Morgan, Eliana, Maxwell, Sarah)
 * @param {string} proposalData.description - Project description
 * @param {string} proposalData.orchestratorId - Which orchestrator is making this proposal
 * @param {Object} proposalData.objectives - Project objectives
 * @param {Object} proposalData.timeline - Project timeline/phases
 * @param {Object} proposalData.budget - Budget breakdown
 * @param {string} proposalData.assigned_team - Team name or members
 * @param {string} proposalData.target_completion - Target completion date (YYYY-MM-DD)
 * @param {Object} proposalData.reasoning - Why this proposal is being made (for audit trail)
 * 
 * @returns {Promise<Object>} Created project record
 * 
 * @example
 * const proposal = await autonomousProposal({
 *   title: "Implement User Analytics Dashboard",
 *   proposer: "Vincent",
 *   description: "Build comprehensive analytics dashboard for user engagement tracking",
 *   orchestratorId: "analytical-mind",
 *   objectives: ["Track user sessions", "Display engagement metrics", "Generate reports"],
 *   timeline: {
 *     phase1: "Requirements & Design (2 weeks)",
 *     phase2: "Development (4 weeks)",
 *     phase3: "Testing & Deployment (1 week)"
 *   },
 *   budget: {
 *     development: 40000,
 *     infrastructure: 5000,
 *     total: 45000,
 *     currency: "USD"
 *   },
 *   assigned_team: "Analytics Team",
 *   target_completion: "2024-06-30",
 *   reasoning: {
 *     source: "User engagement analysis",
 *     confidence: 0.95,
 *     priority: "high",
 *     dependencies: []
 *   }
 * });
 */
async function autonomousProposal(proposalData) {
  return new Promise((resolve, reject) => {
    if (!db) {
      return reject(new Error('Orchestrator not initialized. Call initializeOrchestrator() first.'));
    }

    // Validate required fields
    const requiredFields = ['title', 'proposer', 'description'];
    for (const field of requiredFields) {
      if (!proposalData[field]) {
        return reject(new Error(`Missing required field: ${field}`));
      }
    }

    // Validate proposer
    const validProposers = ['Sylvia', 'Vincent', 'Kathryn', 'Morgan', 'Eliana', 'Maxwell', 'Sarah'];
    if (!validProposers.includes(proposalData.proposer)) {
      return reject(new Error(`Invalid proposer. Must be one of: ${validProposers.join(', ')}`));
    }

    // Build proposal JSON
    const proposalJson = {
      objectives: proposalData.objectives || [],
      timeline: proposalData.timeline || {},
      budget: proposalData.budget || {},
      reasoning: proposalData.reasoning || {
        orchestratorId: proposalData.orchestratorId,
        created_at: new Date().toISOString()
      }
    };

    // Insert into database
    db.run(
      `INSERT INTO projects (title, proposer, description, proposal_json, assigned_team, target_completion, status)
       VALUES (?, ?, ?, ?, ?, ?, 'PROPOSED')`,
      [
        proposalData.title,
        proposalData.proposer,
        proposalData.description,
        JSON.stringify(proposalJson),
        proposalData.assigned_team || null,
        proposalData.target_completion || null
      ],
      function(err) {
        if (err) {
          console.error('Error creating autonomous proposal:', err);
          return reject(err);
        }

        const projectId = this.lastID;

        // Fetch the created project
        db.get('SELECT * FROM projects WHERE id = ?', [projectId], (err, project) => {
          if (err) {
            return reject(err);
          }

          if (project.proposal_json) {
            project.proposal_json = JSON.parse(project.proposal_json);
          }

          // Post to Discord
          if (discordPostFunction) {
            const summary = formatProposalSummary(project, proposalData.orchestratorId);
            discordPostFunction(summary).catch(err => {
              console.error('Warning: Failed to post proposal to Discord:', err);
              // Don't reject, proposal was created successfully
            });
          }

          console.log(`✓ Autonomous proposal created: ${proposalData.title} (ID: ${projectId})`);
          resolve(project);
        });
      }
    );
  });
}

/**
 * Format proposal summary for Discord posting
 * @private
 */
function formatProposalSummary(project, orchestratorId) {
  const proposal = project.proposal_json || {};
  
  let summary = `🤖 **Autonomous Proposal Generated**\n`;
  summary += `**Project:** ${project.title}\n`;
  summary += `**Proposer:** ${project.proposer}\n`;
  summary += `**Orchestrator:** ${orchestratorId}\n`;
  summary += `**Status:** ${project.status}\n`;
  summary += `**Description:** ${project.description}\n`;
  
  if (proposal.budget && proposal.budget.total) {
    summary += `**Budget:** ${proposal.budget.currency || 'USD'} ${proposal.budget.total}\n`;
  }
  
  if (project.target_completion) {
    summary += `**Target Completion:** ${project.target_completion}\n`;
  }
  
  if (proposal.reasoning && proposal.reasoning.priority) {
    summary += `**Priority:** ${proposal.reasoning.priority}\n`;
  }

  summary += `\n**View Details:** <http://localhost:3000/#projects>`; // Will need dynamic URL
  
  return summary;
}

/**
 * Get proposal status and details
 * @param {number} projectId - Project ID
 * @returns {Promise<Object>} Project details
 */
async function getProposalStatus(projectId) {
  return new Promise((resolve, reject) => {
    if (!db) {
      return reject(new Error('Orchestrator not initialized'));
    }

    db.get('SELECT * FROM projects WHERE id = ?', [projectId], (err, project) => {
      if (err) {
        return reject(err);
      }
      if (!project) {
        return reject(new Error(`Project ${projectId} not found`));
      }

      if (project.proposal_json) {
        project.proposal_json = JSON.parse(project.proposal_json);
      }

      resolve(project);
    });
  });
}

/**
 * Get all pending proposals waiting for CEO feedback
 * @returns {Promise<Array>} Array of pending proposals
 */
async function getPendingProposals() {
  return new Promise((resolve, reject) => {
    if (!db) {
      return reject(new Error('Orchestrator not initialized'));
    }

    db.all(
      `SELECT * FROM projects WHERE status = 'PROPOSED' ORDER BY created_at DESC`,
      [],
      (err, projects) => {
        if (err) {
          return reject(err);
        }

        const parsed = projects.map(p => {
          if (p.proposal_json) {
            p.proposal_json = JSON.parse(p.proposal_json);
          }
          return p;
        });

        resolve(parsed);
      }
    );
  });
}

/**
 * React to CEO feedback on a proposal
 * Orchestrators can implement logic to adjust their future proposals
 * based on feedback patterns
 * 
 * @param {number} projectId - Project ID
 * @param {Function} feedbackHandler - Function to handle the feedback
 */
async function onFeedbackReceived(projectId, feedbackHandler) {
  try {
    const project = await getProposalStatus(projectId);
    const feedbacks = project.feedbacks || [];
    
    if (feedbacks.length > 0) {
      const latestFeedback = feedbacks[0];
      await feedbackHandler(latestFeedback, project);
    }
  } catch (err) {
    console.error('Error in feedback handler:', err);
  }
}

/**
 * Get orchestrator statistics
 * Shows how many proposals each orchestrator has made
 * @returns {Promise<Object>} Statistics
 */
async function getOrchestratorStats() {
  return new Promise((resolve, reject) => {
    if (!db) {
      return reject(new Error('Orchestrator not initialized'));
    }

    db.all(
      `SELECT 
        JSON_EXTRACT(proposal_json, '$.reasoning.orchestratorId') as orchestrator,
        COUNT(*) as total_proposals,
        SUM(CASE WHEN status = 'PROPOSED' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'ACTIVE' THEN 1 ELSE 0 END) as active,
        SUM(CASE WHEN status = 'COMPLETE' THEN 1 ELSE 0 END) as completed
       FROM projects
       WHERE JSON_EXTRACT(proposal_json, '$.reasoning.orchestratorId') IS NOT NULL
       GROUP BY orchestrator`,
      [],
      (err, stats) => {
        if (err) {
          return reject(err);
        }

        resolve(stats || []);
      }
    );
  });
}

module.exports = {
  initializeOrchestrator,
  autonomousProposal,
  getProposalStatus,
  getPendingProposals,
  onFeedbackReceived,
  getOrchestratorStats
};
