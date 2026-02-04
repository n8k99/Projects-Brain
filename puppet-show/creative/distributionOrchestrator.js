const axios = require('axios');
const fs = require('fs');
const path = require('path');

/**
 * Distribution Orchestrator
 * Handles posting to Twitter, Discord, email, website, and Printful
 * Tracks engagement metrics and status
 */

let db = null;
let postToDiscord = null;
let discordClient = null;

const initializeDistributionOrchestrator = (database, discordPostFunction, discordClientInstance) => {
  db = database;
  postToDiscord = discordPostFunction;
  discordClient = discordClientInstance;

  console.log('📢 Distribution Orchestrator Ready');
};

const distributeRelease = async (releaseId, title) => {
  console.log(`\n📢 Starting distribution for release #${releaseId}: "${title}"`);

  try {
    // Get release info
    const release = await new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM creative_releases WHERE id = ?',
        [releaseId],
        (err, row) => err ? reject(err) : resolve(row)
      );
    });

    if (!release) {
      throw new Error(`Release #${releaseId} not found`);
    }

    // Get assets
    const assets = await new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM creative_assets WHERE release_id = ?',
        [releaseId],
        (err, rows) => err ? reject(err) : resolve(rows || [])
      );
    });

    // Get social posts
    const socialPosts = await new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM social_posts WHERE release_id = ?',
        [releaseId],
        (err, rows) => err ? reject(err) : resolve(rows || [])
      );
    });

    // Find key asset variants
    const twitterAsset = assets.find(a => a.asset_type === 'twitter');
    const instagramAsset = assets.find(a => a.asset_type === 'instagram');
    const websiteAsset = assets.find(a => a.asset_type === 'website_featured');
    const discordAsset = assets.find(a => a.asset_type === 'discord');

    // Update status to RELEASED
    await updateReleaseStatus(releaseId, 'RELEASED');

    // 1. Post to Twitter
    console.log('\n🐦 Posting to Twitter...');
    const twitterCaption = socialPosts.find(p => p.platform === 'twitter');
    if (twitterCaption && twitterAsset) {
      try {
        await postToTwitter(releaseId, twitterAsset.file_path, twitterCaption.caption);
      } catch (err) {
        console.error('Twitter post failed:', err.message);
      }
    }

    // 2. Post to Discord
    console.log('\n🎮 Posting to Discord...');
    const discordCaption = socialPosts.find(p => p.platform === 'discord');
    if (discordCaption && discordAsset) {
      try {
        await postToDiscordChannel(releaseId, discordAsset.file_path, discordCaption.caption, title);
      } catch (err) {
        console.error('Discord post failed:', err.message);
      }
    }

    // 3. Add to website (Ghost CMS)
    console.log('\n🌐 Adding to website...');
    const websiteCaption = socialPosts.find(p => p.platform === 'instagram') || twitterCaption;
    if (websiteCaption && websiteAsset) {
      try {
        await addToWebsite(releaseId, websiteAsset.file_path, title, websiteCaption.caption);
      } catch (err) {
        console.error('Website update failed:', err.message);
      }
    }

    // 4. Create Printful products
    console.log('\n🖨️  Creating Printful products...');
    if (twitterAsset) {
      try {
        await createPrintfulProducts(releaseId, twitterAsset.file_path, title);
      } catch (err) {
        console.error('Printful integration failed:', err.message);
      }
    }

    // 5. Queue email newsletter
    console.log('\n📧 Queuing email newsletter...');
    try {
      await queueEmailNewsletter(releaseId, title, twitterAsset?.file_path);
    } catch (err) {
      console.error('Email queue failed:', err.message);
    }

    // 6. Add to Patreon (if configured)
    console.log('\n❤️  Adding to Patreon...');
    if (twitterAsset) {
      try {
        await addToPatreon(releaseId, twitterAsset.file_path, title);
      } catch (err) {
        console.error('Patreon update failed:', err.message);
      }
    }

    // Update status to DISTRIBUTED
    await updateReleaseStatus(releaseId, 'DISTRIBUTED');
    console.log(`\n✅ Distribution complete for release #${releaseId}!`);

  } catch (err) {
    console.error(`Distribution failed for release #${releaseId}:`, err);
    await updateReleaseStatus(releaseId, 'ERROR');
  }
};

const postToTwitter = async (releaseId, imagePath, caption) => {
  const twitterApiKey = process.env.TWITTER_API_KEY;
  const twitterApiSecret = process.env.TWITTER_API_SECRET;
  const twitterAccessToken = process.env.TWITTER_ACCESS_TOKEN;
  const twitterAccessSecret = process.env.TWITTER_ACCESS_SECRET;

  if (!twitterApiKey) {
    console.warn('⚠️  Twitter API credentials not configured');
    return;
  }

  try {
    // This would require TwitterAPI library (twitter-api-v2 or similar)
    // For now, log the intent
    console.log('  📝 Tweet caption:', caption);
    console.log('  🖼️  Image:', path.basename(imagePath));

    // Record post in database as PENDING
    db.run(
      `INSERT INTO social_posts (release_id, platform, caption, status)
       VALUES (?, 'twitter', ?, 'PENDING')`,
      [releaseId, caption],
      (err) => {
        if (!err) {
          console.log('  ✓ Twitter post queued');
        }
      }
    );

  } catch (err) {
    throw new Error(`Twitter posting failed: ${err.message}`);
  }
};

const postToDiscordChannel = async (releaseId, imagePath, caption, title) => {
  const channelId = process.env.DISCORD_ANNOUNCEMENTS_CHANNEL;

  if (!channelId || !discordClient) {
    console.warn('⚠️  Discord channel not configured');
    return;
  }

  try {
    const channel = await discordClient.channels.fetch(channelId);

    if (!channel || !channel.isTextBased()) {
      throw new Error('Channel not found or not text-based');
    }

    // Send message with image
    const message = {
      content: caption,
      files: [imagePath]
    };

    const sentMessage = await channel.send(message);

    // Update database
    db.run(
      `UPDATE social_posts SET status = 'POSTED', post_id = ?, posted_at = CURRENT_TIMESTAMP
       WHERE release_id = ? AND platform = 'discord'`,
      [sentMessage.id, releaseId],
      (err) => {
        if (!err) {
          console.log(`  ✓ Posted to Discord (message #${sentMessage.id})`);
        }
      }
    );

  } catch (err) {
    throw new Error(`Discord posting failed: ${err.message}`);
  }
};

const addToWebsite = async (releaseId, imagePath, title, description) => {
  const ghostApiKey = process.env.GHOST_API_KEY;
  const ghostUrl = process.env.GHOST_URL || 'https://n8k99.com';

  if (!ghostApiKey) {
    console.warn('⚠️  Ghost CMS API key not configured');
    return;
  }

  try {
    // This would use Ghost API to create/update a post
    console.log(`  📝 Title: ${title}`);
    console.log(`  📝 Description: ${description.substring(0, 100)}...`);
    console.log(`  🖼️  Featured image: ${path.basename(imagePath)}`);

    // TODO: Implement Ghost API integration
    // For now, log the intent
    console.log('  ℹ️  Ghost CMS integration pending implementation');

  } catch (err) {
    throw new Error(`Website update failed: ${err.message}`);
  }
};

const createPrintfulProducts = async (releaseId, imagePath, title) => {
  const printfulApiKey = process.env.PRINTFUL_API_KEY;

  if (!printfulApiKey) {
    console.warn('⚠️  Printful API key not configured');
    return;
  }

  try {
    // This would use Printful API to create products
    console.log(`  👕 Creating shirt product for: ${title}`);
    console.log(`  🎯 Creating sticker product for: ${title}`);
    console.log(`  🖼️  Creating print product for: ${title}`);

    // TODO: Implement Printful API integration
    // Products would be created for:
    // - T-shirts
    // - Stickers
    // - Prints
    // - Hoodies
    console.log('  ℹ️  Printful integration pending API key configuration');

  } catch (err) {
    throw new Error(`Printful product creation failed: ${err.message}`);
  }
};

const queueEmailNewsletter = async (releaseId, title, imagePath) => {
  try {
    const emailBody = `
<h1>🎨 New Creative Release: ${title}</h1>

<p>We're excited to announce the release of <strong>${title}</strong>!</p>

<p>Check out our full collection of merchandise and digital products:</p>

<ul>
  <li>🎽 Limited Edition Apparel</li>
  <li>🖼️ High-Quality Prints</li>
  <li>✨ Exclusive Stickers</li>
  <li>🛍️ Merchandise Shop</li>
</ul>

<p><a href="https://n8k99.com">Shop Now</a></p>

<p>Thanks for supporting our work!</p>
    `;

    db.run(
      `INSERT INTO email_queue (release_id, email_subject, email_body, status)
       VALUES (?, ?, ?, 'PENDING')`,
      [releaseId, `New Release: ${title}`, emailBody],
      (err) => {
        if (!err) {
          console.log('  ✓ Email queued for newsletter');
        }
      }
    );

  } catch (err) {
    throw new Error(`Email queue failed: ${err.message}`);
  }
};

const addToPatreon = async (releaseId, imagePath, title) => {
  const patreonApiKey = process.env.PATREON_API_KEY;

  if (!patreonApiKey) {
    console.warn('⚠️  Patreon API key not configured');
    return;
  }

  try {
    console.log(`  ❤️  Adding to Patreon exclusive gallery: ${title}`);
    console.log(`  🎁 Creating merch shop item for Patrons`);

    // TODO: Implement Patreon API integration
    console.log('  ℹ️  Patreon integration pending API key configuration');

  } catch (err) {
    throw new Error(`Patreon update failed: ${err.message}`);
  }
};

const updateReleaseStatus = (releaseId, status) => {
  return new Promise((resolve, reject) => {
    const timestamp = status === 'RELEASED' ? 'released_at' : status === 'DISTRIBUTED' ? 'distributed_at' : 'processed_at';

    db.run(
      `UPDATE creative_releases 
       SET status = ?, ${timestamp} = CURRENT_TIMESTAMP 
       WHERE id = ?`,
      [status, releaseId],
      (err) => {
        if (err) {
          reject(err);
        } else {
          console.log(`  ✓ Status updated to: ${status}`);
          resolve();
        }
      }
    );
  });
};

const getEngagementMetrics = (releaseId, callback) => {
  db.get(
    `SELECT 
       (SELECT SUM(likes) FROM social_posts WHERE release_id = ?) as total_likes,
       (SELECT SUM(retweets) FROM social_posts WHERE release_id = ?) as total_retweets,
       (SELECT SUM(shares) FROM social_posts WHERE release_id = ?) as total_shares,
       (SELECT COUNT(*) FROM social_posts WHERE release_id = ? AND status = 'POSTED') as posts_live
     WHERE 1`,
    [releaseId, releaseId, releaseId, releaseId],
    callback
  );
};

module.exports = {
  initializeDistributionOrchestrator,
  distributeRelease,
  getEngagementMetrics,
  updateReleaseStatus
};
