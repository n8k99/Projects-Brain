const { initializeCreativeFolderWatcher, getReleaseInfo } = require('./watchCreativeFolder');
const { initializeAssetGenerator, generateAssets } = require('./assetGenerator');
const { initializeDistributionOrchestrator, distributeRelease } = require('./distributionOrchestrator');

/**
 * Creative Release Coordinator
 * Main orchestration layer that coordinates the entire workflow
 * DETECTED → PROCESSING → RELEASED → DISTRIBUTED
 */

let db = null;
let postToDiscord = null;
let discordClient = null;

const RELEASE_QUEUE = [];
let isProcessing = false;

const initializeCreativeReleaseCoordinator = (database, discordPostFunction, discordClientInstance) => {
  db = database;
  postToDiscord = discordPostFunction;
  discordClient = discordClientInstance;

  console.log('\n🎭 Creative Release Coordinator Initializing...');

  // Initialize all sub-systems
  initializeCreativeFolderWatcher(db, postToDiscord);
  initializeAssetGenerator(db);
  initializeDistributionOrchestrator(db, postToDiscord, discordClient);

  console.log('✓ All subsystems initialized');

  // Start processing queue
  setInterval(processReleaseQueue, 5000);

  return {
    queueRelease,
    getReleaseStatus,
    getAllReleases,
    getEngagementMetrics
  };
};

const queueRelease = (releaseId) => {
  // Check if already queued
  if (!RELEASE_QUEUE.find(r => r.id === releaseId)) {
    RELEASE_QUEUE.push({
      id: releaseId,
      status: 'queued',
      queuedAt: new Date()
    });

    console.log(`📋 Release #${releaseId} queued for processing`);
  }
};

const processReleaseQueue = async () => {
  if (isProcessing || RELEASE_QUEUE.length === 0) {
    return;
  }

  isProcessing = true;

  try {
    // Process first item in queue
    const nextRelease = RELEASE_QUEUE[0];

    // Get release info
    const release = await new Promise((resolve, reject) => {
      getReleaseInfo(nextRelease.id, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (!release) {
      RELEASE_QUEUE.shift();
      isProcessing = false;
      return;
    }

    // Check current status
    if (release.status === 'DETECTED') {
      // Start asset generation
      await processAssetGeneration(nextRelease.id, release.original_path, release.title);
    } else if (release.status === 'PROCESSING') {
      // Move to distribution
      await startDistribution(nextRelease.id, release.title);
    } else if (release.status === 'RELEASED') {
      // Already released, move to distributed
      RELEASE_QUEUE.shift();
    }

  } catch (err) {
    console.error('Error processing queue:', err);
  }

  isProcessing = false;
};

const processAssetGeneration = async (releaseId, originalPath, title) => {
  console.log(`\n🎨 Processing Assets for Release #${releaseId}`);

  try {
    const assets = await generateAssets(releaseId, originalPath, title);

    if (assets && assets.length > 0) {
      // Mark as ready for distribution
      db.run(
        `UPDATE creative_releases SET status = 'RELEASED', processed_at = CURRENT_TIMESTAMP WHERE id = ?`,
        [releaseId],
        (err) => {
          if (!err) {
            console.log(`✓ Release #${releaseId} ready for distribution`);
            // Move to next phase
            RELEASE_QUEUE[0].status = 'ready_to_distribute';
          }
        }
      );
    }

  } catch (err) {
    console.error(`Asset generation failed for #${releaseId}:`, err);
    db.run(
      `UPDATE creative_releases SET status = 'ERROR' WHERE id = ?`,
      [releaseId]
    );
    RELEASE_QUEUE.shift();
  }
};

const startDistribution = async (releaseId, title) => {
  console.log(`\n📢 Starting Distribution for Release #${releaseId}`);

  try {
    await distributeRelease(releaseId, title);

    // Distribution complete
    db.run(
      `UPDATE creative_releases SET status = 'DISTRIBUTED', distributed_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [releaseId],
      (err) => {
        if (!err) {
          console.log(`✓ Release #${releaseId} distribution complete`);
          RELEASE_QUEUE.shift();
        }
      }
    );

  } catch (err) {
    console.error(`Distribution failed for #${releaseId}:`, err);
    db.run(
      `UPDATE creative_releases SET status = 'ERROR' WHERE id = ?`,
      [releaseId]
    );
    RELEASE_QUEUE.shift();
  }
};

const getReleaseStatus = (releaseId, callback) => {
  db.get(
    `SELECT * FROM creative_releases WHERE id = ?`,
    [releaseId],
    (err, release) => {
      if (err) {
        callback(err);
        return;
      }

      if (!release) {
        callback(null, null);
        return;
      }

      // Get associated assets and social posts
      db.all(
        `SELECT * FROM creative_assets WHERE release_id = ?`,
        [releaseId],
        (err, assets) => {
          db.all(
            `SELECT * FROM social_posts WHERE release_id = ?`,
            [releaseId],
            (err, posts) => {
              callback(null, {
                ...release,
                assets: assets || [],
                socialPosts: posts || [],
                queuePosition: RELEASE_QUEUE.findIndex(r => r.id === releaseId)
              });
            }
          );
        }
      );
    }
  );
};

const getAllReleases = (status = null, limit = 50, callback) => {
  let query = 'SELECT * FROM creative_releases';
  const params = [];

  if (status) {
    query += ' WHERE status = ?';
    params.push(status);
  }

  query += ' ORDER BY created_at DESC LIMIT ?';
  params.push(limit);

  db.all(query, params, callback);
};

const getEngagementMetrics = (releaseId, callback) => {
  db.get(
    `SELECT 
       (SELECT COUNT(*) FROM social_posts WHERE release_id = ?) as total_posts,
       (SELECT SUM(COALESCE(likes, 0)) FROM social_posts WHERE release_id = ?) as total_likes,
       (SELECT SUM(COALESCE(retweets, 0)) FROM social_posts WHERE release_id = ?) as total_retweets,
       (SELECT SUM(COALESCE(shares, 0)) FROM social_posts WHERE release_id = ?) as total_shares
     WHERE 1`,
    [releaseId, releaseId, releaseId, releaseId],
    callback
  );
};

const getProcessingStats = () => {
  return {
    queueLength: RELEASE_QUEUE.length,
    isProcessing,
    queue: RELEASE_QUEUE
  };
};

module.exports = {
  initializeCreativeReleaseCoordinator,
  queueRelease,
  getReleaseStatus,
  getAllReleases,
  getEngagementMetrics,
  getProcessingStats
};
