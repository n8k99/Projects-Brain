const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

/**
 * Asset Generation Pipeline
 * Resizes artwork for different platforms and generates variants
 * Requires ImageMagick or similar image processing tool
 */

const ASSET_DIMENSIONS = {
  twitter: {
    width: 1200,
    height: 675,
    name: 'Twitter Card'
  },
  twitter_large: {
    width: 1200,
    height: 675,
    name: 'Twitter Large'
  },
  instagram: {
    width: 1080,
    height: 1080,
    name: 'Instagram Square'
  },
  instagram_story: {
    width: 1080,
    height: 1920,
    name: 'Instagram Story'
  },
  sticker: {
    width: 512,
    height: 512,
    name: 'Sticker'
  },
  print_thumbnail: {
    width: 400,
    height: 400,
    name: 'Print Thumbnail'
  },
  print_full: {
    width: 3000,
    height: 3000,
    name: 'Print Full Resolution'
  },
  shirt_mockup: {
    width: 2000,
    height: 2000,
    name: 'Shirt Mockup'
  },
  website_featured: {
    width: 1600,
    height: 900,
    name: 'Website Featured'
  },
  website_thumbnail: {
    width: 400,
    height: 225,
    name: 'Website Thumbnail'
  },
  discord: {
    width: 1024,
    height: 576,
    name: 'Discord'
  }
};

let db = null;
const ASSETS_OUTPUT_DIR = '/Volumes/Elements/Projects/puppet-show/creative/assets';

const initializeAssetGenerator = (database) => {
  db = database;

  // Create assets directory if it doesn't exist
  if (!fs.existsSync(ASSETS_OUTPUT_DIR)) {
    fs.mkdirSync(ASSETS_OUTPUT_DIR, { recursive: true });
    console.log(`✓ Created assets directory: ${ASSETS_OUTPUT_DIR}`);
  }

  console.log('🖼️  Asset Generator Ready');
};

const generateAssets = async (releaseId, originalFilePath, title) => {
  console.log(`\n🎨 Generating Assets for Release #${releaseId}...`);

  try {
    // Create release-specific directory
    const releaseDir = path.join(ASSETS_OUTPUT_DIR, `release-${releaseId}`);
    if (!fs.existsSync(releaseDir)) {
      fs.mkdirSync(releaseDir, { recursive: true });
    }

    const generatedAssets = [];

    // Generate each variant
    for (const [assetType, dimensions] of Object.entries(ASSET_DIMENSIONS)) {
      try {
        const assetPath = await resizeImage(
          originalFilePath,
          releaseDir,
          assetType,
          dimensions
        );

        if (assetPath) {
          generatedAssets.push({
            assetType,
            assetPath,
            dimensions: `${dimensions.width}x${dimensions.height}`
          });

          console.log(`  ✓ ${dimensions.name}`);
        }
      } catch (err) {
        console.warn(`  ⚠️  Failed to generate ${assetType}:`, err.message);
      }
    }

    // Store assets in database
    for (const asset of generatedAssets) {
      db.run(
        `INSERT INTO creative_assets (release_id, asset_type, file_path, dimensions)
         VALUES (?, ?, ?, ?)`,
        [releaseId, asset.assetType, asset.assetPath, asset.dimensions],
        (err) => {
          if (err) {
            console.error(`Error storing asset ${asset.assetType}:`, err);
          }
        }
      );
    }

    console.log(`✓ Generated ${generatedAssets.length} asset variants`);

    // Generate alt-text with Ollama
    await generateAltText(releaseId, originalFilePath, title);

    // Generate social post captions
    await generateSocialPostVariants(releaseId, title);

    return generatedAssets;

  } catch (err) {
    console.error(`Error generating assets for release #${releaseId}:`, err);
    throw err;
  }
};

const resizeImage = async (sourcePath, outputDir, assetType, dimensions) => {
  const filename = `${assetType}.png`;
  const outputPath = path.join(outputDir, filename);

  // Check if we have ImageMagick
  try {
    // Try using ImageMagick convert command
    // If that fails, try using sips (macOS) or fallback

    const command = `convert "${sourcePath}" -resize ${dimensions.width}x${dimensions.height}! -background white -gravity center -extent ${dimensions.width}x${dimensions.height} "${outputPath}"`;

    await execAsync(command);
    return outputPath;

  } catch (err) {
    // If ImageMagick not available, try macOS sips
    try {
      const tmpPath = path.join(outputDir, `${assetType}_tmp.png`);
      const sipsCommand = `sips -z ${dimensions.height} ${dimensions.width} "${sourcePath}" --out "${tmpPath}" 2>/dev/null && mv "${tmpPath}" "${outputPath}"`;
      
      await execAsync(sipsCommand);
      return outputPath;

    } catch (sipsErr) {
      // Both failed, just copy and note
      console.warn(`⚠️  Image processing tool not available. Using original image for ${assetType}`);
      const ext = path.extname(sourcePath);
      const copyPath = path.join(outputDir, `${assetType}${ext}`);
      fs.copyFileSync(sourcePath, copyPath);
      return copyPath;
    }
  }
};

const generateAltText = async (releaseId, imagePath, title) => {
  console.log(`\n📝 Generating Alt-Text (via Ollama)...`);

  try {
    // Try to call Ollama for alt-text generation
    // This requires Ollama to be running locally

    const command = `curl -s http://localhost:11434/api/generate -d '{"model":"neural-chat","prompt":"Generate a concise, descriptive alt-text for an image titled \\\"${title.replace(/"/g, '\\"')}\\\" that would be used for music artwork/merchandise. Keep it under 125 characters. Alt-text only, no explanation:"}' | grep -o '"response":"[^"]*' | cut -d'"' -f4 | tr '\\n' ' '`;

    const { stdout } = await execAsync(command, { timeout: 30000 });
    const altText = stdout.trim();

    if (altText && altText.length > 0) {
      // Store alt-text in a metadata file
      const metadataPath = path.join(
        ASSETS_OUTPUT_DIR,
        `release-${releaseId}`,
        'metadata.json'
      );

      const metadata = {
        title,
        altText,
        generatedAt: new Date().toISOString()
      };

      fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
      console.log(`✓ Alt-text: "${altText}"`);
      
      return altText;
    }

  } catch (err) {
    // Ollama not available or error occurred
    console.warn(`⚠️  Ollama not available, using generic alt-text`);
  }

  // Fallback alt-text
  const fallbackAltText = `Artwork for ${title} - Creative release`;
  const metadataPath = path.join(
    ASSETS_OUTPUT_DIR,
    `release-${releaseId}`,
    'metadata.json'
  );

  const metadata = {
    title,
    altText: fallbackAltText,
    generatedAt: new Date().toISOString()
  };

  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
  return fallbackAltText;
};

const generateSocialPostVariants = async (releaseId, title) => {
  console.log(`\n✍️  Generating Social Post Variants...`);

  // Define social post templates (5-7 variants)
  const captions = [
    {
      platform: 'twitter',
      caption: `🎨 Fresh release: ${title} is live! Check it out now. #MusicArt #NewRelease`
    },
    {
      platform: 'twitter',
      caption: `New artwork available: ${title} 🔥 Link in bio for merch, prints, and more.`
    },
    {
      platform: 'twitter',
      caption: `${title} – out now! Limited edition prints, stickers, and apparel. Get yours while supplies last 👕`
    },
    {
      platform: 'instagram',
      caption: `✨ ${title} ✨\n\nNew artwork. New vibes. New merch.\n\nLink in bio for prints, stickers, shirts & more.\n\n#musicart #newrelease #merchandise #artwork`
    },
    {
      platform: 'instagram',
      caption: `Just dropped: ${title}\n\nOriginal artwork now available on products.\n\n🖼️ Prints\n👕 Apparel\n✨ Stickers\n\nSwipe to shop → Link in bio 🔗`
    },
    {
      platform: 'discord',
      caption: `🎨 **${title}** - Fresh artwork release!\n\nAvailable now:\n• Prints\n• Apparel\n• Stickers\n• Exclusive digital content\n\nCheck the merch channel for links!`
    },
    {
      platform: 'patreon',
      caption: `🎨 Exclusive: ${title}\n\nPatrons get first access to new artwork and limited-edition releases. Support the creative process!`
    }
  ];

  // Store captions in database
  for (const captionData of captions) {
    db.run(
      `INSERT INTO social_posts (release_id, platform, caption, status)
       VALUES (?, ?, ?, 'PENDING')`,
      [releaseId, captionData.platform, captionData.caption],
      (err) => {
        if (err) {
          console.error(`Error storing caption for ${captionData.platform}:`, err);
        }
      }
    );
  }

  console.log(`✓ Generated ${captions.length} social post variants`);
};

const getAssets = (releaseId, callback) => {
  db.all(
    `SELECT * FROM creative_assets WHERE release_id = ? ORDER BY created_at ASC`,
    [releaseId],
    callback
  );
};

const getSocialPosts = (releaseId, callback) => {
  db.all(
    `SELECT * FROM social_posts WHERE release_id = ? ORDER BY platform ASC`,
    [releaseId],
    callback
  );
};

module.exports = {
  initializeAssetGenerator,
  generateAssets,
  getAssets,
  getSocialPosts,
  ASSET_DIMENSIONS,
  ASSETS_OUTPUT_DIR
};
