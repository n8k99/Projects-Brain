const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '../puppet-show.db');

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database at:', dbPath);
  }
});

// Initialize schema
const initializeSchema = () => {
  db.serialize(() => {
    // Projects table
    db.run(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        proposer TEXT NOT NULL CHECK (proposer IN ('Sylvia', 'Vincent', 'Kathryn', 'Morgan', 'Eliana', 'Maxwell', 'Sarah')),
        status TEXT NOT NULL CHECK (status IN ('PROPOSED', 'ACTIVE', 'IN_PROGRESS', 'COMPLETE')) DEFAULT 'PROPOSED',
        description TEXT,
        proposal_json TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        approved_at DATETIME,
        feedback TEXT,
        assigned_team TEXT,
        target_completion DATE,
        UNIQUE(id)
      )
    `, (err) => {
      if (err) {
        console.error('Error creating projects table:', err);
      } else {
        console.log('✓ Projects table initialized');
      }
    });

    // Feedback history table
    db.run(`
      CREATE TABLE IF NOT EXISTS feedback (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER NOT NULL,
        feedback_text TEXT NOT NULL,
        feedback_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        status_after TEXT,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
      )
    `, (err) => {
      if (err) {
        console.error('Error creating feedback table:', err);
      } else {
        console.log('✓ Feedback table initialized');
      }
    });

    // Create index for common queries
    db.run(`CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status)`, (err) => {
      if (err) console.error('Error creating index:', err);
    });

    db.run(`CREATE INDEX IF NOT EXISTS idx_projects_proposer ON projects(proposer)`, (err) => {
      if (err) console.error('Error creating index:', err);
    });

    db.run(`CREATE INDEX IF NOT EXISTS idx_feedback_project ON feedback(project_id)`, (err) => {
      if (err) console.error('Error creating index:', err);
    });

    // Creative Releases table
    db.run(`
      CREATE TABLE IF NOT EXISTS creative_releases (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        status TEXT NOT NULL CHECK (status IN ('DETECTED', 'PROCESSING', 'RELEASED', 'DISTRIBUTED', 'ERROR')) DEFAULT 'DETECTED',
        original_filename TEXT NOT NULL,
        original_path TEXT NOT NULL,
        file_size INTEGER,
        file_type TEXT,
        project_id INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        processed_at DATETIME,
        released_at DATETIME,
        distributed_at DATETIME,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
        UNIQUE(original_path)
      )
    `, (err) => {
      if (err) {
        console.error('Error creating creative_releases table:', err);
      } else {
        console.log('✓ Creative Releases table initialized');
      }
    });

    // Creative Assets table (resized versions)
    db.run(`
      CREATE TABLE IF NOT EXISTS creative_assets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        release_id INTEGER NOT NULL,
        asset_type TEXT NOT NULL,
        file_path TEXT NOT NULL,
        dimensions TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (release_id) REFERENCES creative_releases(id) ON DELETE CASCADE
      )
    `, (err) => {
      if (err) {
        console.error('Error creating creative_assets table:', err);
      } else {
        console.log('✓ Creative Assets table initialized');
      }
    });

    // Social Posts table
    db.run(`
      CREATE TABLE IF NOT EXISTS social_posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        release_id INTEGER NOT NULL,
        platform TEXT NOT NULL,
        post_id TEXT,
        caption TEXT NOT NULL,
        status TEXT DEFAULT 'PENDING',
        posted_at DATETIME,
        likes INTEGER DEFAULT 0,
        retweets INTEGER DEFAULT 0,
        shares INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (release_id) REFERENCES creative_releases(id) ON DELETE CASCADE
      )
    `, (err) => {
      if (err) {
        console.error('Error creating social_posts table:', err);
      } else {
        console.log('✓ Social Posts table initialized');
      }
    });

    // Email Queue table
    db.run(`
      CREATE TABLE IF NOT EXISTS email_queue (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        release_id INTEGER NOT NULL,
        email_subject TEXT NOT NULL,
        email_body TEXT NOT NULL,
        status TEXT DEFAULT 'PENDING',
        sent_at DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (release_id) REFERENCES creative_releases(id) ON DELETE CASCADE
      )
    `, (err) => {
      if (err) {
        console.error('Error creating email_queue table:', err);
      } else {
        console.log('✓ Email Queue table initialized');
      }
    });

    // Create indexes for creative releases
    db.run(`CREATE INDEX IF NOT EXISTS idx_creative_releases_status ON creative_releases(status)`, (err) => {
      if (err) console.error('Error creating index:', err);
    });

    db.run(`CREATE INDEX IF NOT EXISTS idx_creative_releases_project ON creative_releases(project_id)`, (err) => {
      if (err) console.error('Error creating index:', err);
    });

    db.run(`CREATE INDEX IF NOT EXISTS idx_social_posts_release ON social_posts(release_id)`, (err) => {
      if (err) console.error('Error creating index:', err);
    });

    db.run(`CREATE INDEX IF NOT EXISTS idx_email_queue_release ON email_queue(release_id)`, (err) => {
      if (err) console.error('Error creating index:', err);
    });
  });
};

// Initialize on module load
initializeSchema();

module.exports = db;
