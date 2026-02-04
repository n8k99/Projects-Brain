const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * Creative Release Folder Watcher
 * Monitors the New Releases folder for new image files
 * Creates database records and triggers asset generation pipeline
 */

const WATCH_FOLDER = '/Volumes/Elements/Areas/Eckenrode Muziekopname/Art/New Releases/';
const SUPPORTED_FORMATS = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
const MIN_FILE_SIZE = 100 * 1024; // 100 KB minimum
const PROCESSED_FILES = new Set(); // Track processed files to avoid duplicates

let db = null;
let postToDiscord = null;

const initializeCreativeFolderWatcher = (database, discordPostFunction) => {
  db = database;
  postToDiscord = discordPostFunction;

  console.log('🎨 Creative Folder Watcher Starting...');
  console.log(`📁 Monitoring: ${WATCH_FOLDER}`);

  // Ensure folder exists
  if (!fs.existsSync(WATCH_FOLDER)) {
    fs.mkdirSync(WATCH_FOLDER, { recursive: true });
    console.log(`✓ Created folder: ${WATCH_FOLDER}`);
  }

  // Initial scan
  scanFolder();

  // Watch folder for changes
  fs.watch(WATCH_FOLDER, (eventType, filename) => {
    if (filename && (eventType === 'change' || eventType === 'rename')) {
      const filePath = path.join(WATCH_FOLDER, filename);
      
      // Debounce: wait 2 seconds for file to finish writing
      setTimeout(() => {
        checkAndProcessFile(filePath);
      }, 2000);
    }
  });

  console.log('✓ Folder watcher active');
};

const scanFolder = () => {
  try {
    const files = fs.readdirSync(WATCH_FOLDER);
    
    files.forEach(filename => {
      const filePath = path.join(WATCH_FOLDER, filename);
      checkAndProcessFile(filePath);
    });
  } catch (err) {
    console.error('Error scanning folder:', err);
  }
};

const checkAndProcessFile = (filePath) => {
  try {
    const stats = fs.statSync(filePath);
    const filename = path.basename(filePath);
    const ext = path.extname(filename).toLowerCase();

    // Skip if not a supported format
    if (!SUPPORTED_FORMATS.includes(ext)) {
      return;
    }

    // Skip if already processed
    if (PROCESSED_FILES.has(filePath)) {
      return;
    }

    // Skip if hidden file
    if (filename.startsWith('.')) {
      return;
    }

    // Skip if file is too small
    if (stats.size < MIN_FILE_SIZE) {
      console.warn(`⚠️  File too small (${(stats.size / 1024).toFixed(2)}KB): ${filename}`);
      return;
    }

    // Skip if not a file
    if (!stats.isFile()) {
      return;
    }

    // Mark as processed
    PROCESSED_FILES.add(filePath);

    console.log(`\n📸 New Creative Release Detected!`);
    console.log(`   File: ${filename}`);
    console.log(`   Size: ${(stats.size / 1024 / 1024).toFixed(2)}MB`);

    // Create database record
    processNewCreativeRelease(filePath, filename, stats.size, ext);

  } catch (err) {
    // File might still be writing, ignore
    return;
  }
};

const processNewCreativeRelease = (filePath, filename, fileSize, fileType) => {
  // Generate title from filename
  const titleBase = path.basename(filename, path.extname(filename))
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const title = titleBase.charAt(0).toUpperCase() + titleBase.slice(1);

  // Insert into creative_releases table
  db.run(
    `INSERT INTO creative_releases (title, status, original_filename, original_path, file_size, file_type)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [title, 'DETECTED', filename, filePath, fileSize, fileType],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          // File already processed
          return;
        }
        console.error('Error inserting creative release:', err);
        return;
      }

      const releaseId = this.lastID;
      console.log(`✓ Created release record: #${releaseId}`);

      // Immediately start processing
      startAssetGeneration(releaseId, filePath, title);

      // Notify Vincent (Creative Director) on Discord if configured
      if (postToDiscord) {
        notifyCreativeDirector(releaseId, title, filename);
      }
    }
  );
};

const startAssetGeneration = (releaseId, filePath, title) => {
  // Update status to PROCESSING
  db.run(
    `UPDATE creative_releases SET status = 'PROCESSING' WHERE id = ?`,
    [releaseId],
    (err) => {
      if (err) {
        console.error('Error updating status:', err);
      }
    }
  );

  console.log(`🔄 Starting asset generation for release #${releaseId}...`);

  // Trigger asset generation pipeline
  // This will be called by the asset generation service
  // For now, emit an event that other services can listen for
  if (global.creativeReleaseQueue) {
    global.creativeReleaseQueue.push({
      releaseId,
      filePath,
      title,
      status: 'queued'
    });
  }
};

const notifyCreativeDirector = (releaseId, title, filename) => {
  const message = {
    content: `🎨 **New Creative Release Detected!**\n\n**Title:** ${title}\n**File:** ${filename}\n**Release ID:** #${releaseId}\n\nAsset generation pipeline started automatically. Vincent can annotate or enhance if needed.`,
    embeds: [{
      color: 0x9c27b0, // Purple
      title: 'Creative Release',
      description: title,
      fields: [
        { name: 'File', value: filename, inline: true },
        { name: 'Release ID', value: `#${releaseId}`, inline: true },
        { name: 'Status', value: 'PROCESSING', inline: true }
      ]
    }]
  };

  const channelId = process.env.DISCORD_CREATIVE_CHANNEL;
  if (channelId) {
    postToDiscord(channelId, message);
  }
};

const updateReleaseStatus = (releaseId, status) => {
  db.run(
    `UPDATE creative_releases SET status = ? WHERE id = ?`,
    [status, releaseId],
    (err) => {
      if (err) {
        console.error(`Error updating release #${releaseId} status:`, err);
      } else {
        console.log(`✓ Release #${releaseId} status updated to: ${status}`);
      }
    }
  );
};

const getReleaseInfo = (releaseId, callback) => {
  db.get(
    `SELECT * FROM creative_releases WHERE id = ?`,
    [releaseId],
    callback
  );
};

const getAllReleases = (status = null, callback) => {
  let query = 'SELECT * FROM creative_releases';
  const params = [];

  if (status) {
    query += ' WHERE status = ?';
    params.push(status);
  }

  query += ' ORDER BY created_at DESC';

  db.all(query, params, callback);
};

module.exports = {
  initializeCreativeFolderWatcher,
  updateReleaseStatus,
  getReleaseInfo,
  getAllReleases,
  scanFolder
};
