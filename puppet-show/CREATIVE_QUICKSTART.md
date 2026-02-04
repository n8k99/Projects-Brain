# 🎨 Creative Release System - Quick Start

Get the creative release automation system running in 5 minutes.

## Prerequisites

- Node.js 16+
- 2 GB disk space for assets
- (Optional) ImageMagick for better image processing
- (Optional) Ollama running for alt-text generation

## Installation

### 1. Install Dependencies

```bash
cd /Volumes/Elements/Projects/puppet-show
npm install
```

### 2. Configure Environment

```bash
# Copy example config
cp .env.example .env

# Edit .env with your API keys
nano .env
```

**Minimum required:**
```env
PORT=3000
DISCORD_TOKEN=your_token_here
DISCORD_CREATIVE_CHANNEL=your_channel_id
```

**Optional but recommended:**
```env
DISCORD_ANNOUNCEMENTS_CHANNEL=your_channel_id
TWITTER_API_KEY=your_key
PRINTFUL_API_KEY=your_key
GHOST_API_KEY=your_key
OLLAMA_URL=http://localhost:11434
```

### 3. Start the System

```bash
npm start
```

Watch for:
```
✓ Creative Folder Watcher Starting...
✓ Folder watcher active
✓ Asset Generator Ready
📢 Distribution Orchestrator Ready
🎨 Creative Release Automation Active
```

## First Test

### 1. Create Test Image

```bash
# Create a simple test image
python3 << 'EOF'
from PIL import Image
import os

# Create a simple test image
img = Image.new('RGB', (1200, 675), color='blue')
path = '/Volumes/Elements/Areas/Eckenrode Muziekopname/Art/New Releases/test-artwork.png'
os.makedirs(os.path.dirname(path), exist_ok=True)
img.save(path)
print(f"Test image created: {path}")
EOF
```

Or copy an existing image:
```bash
cp ~/Downloads/some-image.png "/Volumes/Elements/Areas/Eckenrode Muziekopname/Art/New Releases/test-artwork.png"
```

### 2. Watch System Process It

Monitor the console output:
```
📸 New Creative Release Detected!
   File: test-artwork.png
   Size: X.XXmB
✓ Created release record: #1
🔄 Starting asset generation...
🎨 Generating Assets for Release #1...
  ✓ Twitter Card
  ✓ Instagram Square
  ✓ Sticker
  ... (more variants)
✓ Generated 10 asset variants
✓ Release #1 ready for distribution
```

### 3. Check Status via API

```bash
# List all releases
curl http://localhost:3000/api/creative/releases

# Get release details
curl http://localhost:3000/api/creative/releases/1

# Get metrics
curl http://localhost:3000/api/creative/releases/1/metrics

# Get processing stats
curl http://localhost:3000/api/creative/creative/stats
```

## Verify Installation

Check each component:

### ✅ Database
```bash
sqlite3 puppet-show.db ".tables"
# Should show: projects feedback creative_releases creative_assets social_posts email_queue
```

### ✅ Folder Watcher
```bash
ls -la "/Volumes/Elements/Areas/Eckenrode Muziekopname/Art/New Releases/"
# Should exist and be readable
```

### ✅ Assets Generated
```bash
ls -la /Volumes/Elements/Projects/puppet-show/creative/assets/
# Should contain release-N folders
```

### ✅ API Server
```bash
curl http://localhost:3000/api/health
# Should return: {"status":"ok","discord":true/false}
```

## Common Issues

### "Cannot find module"
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### "Folder watcher not starting"
```bash
# Check folder permissions
ls -la "/Volumes/Elements/Areas/Eckenrode Muziekopname/Art/"

# Create folder if needed
mkdir -p "/Volumes/Elements/Areas/Eckenrode Muziekopname/Art/New Releases"

# Fix permissions
chmod 755 "/Volumes/Elements/Areas/Eckenrode Muziekopname/Art/New Releases"
```

### "No file detected"
- File must be PNG, JPG, JPEG, GIF, or WebP
- File must be at least 100 KB
- Filename cannot start with dot (.)
- Wait 2 seconds for file to finish writing

### "ImageMagick not found"
```bash
# Install on Mac
brew install imagemagick

# System will fallback to sips if not available
# Or just use original image
```

### Discord not posting
- Check token is valid
- Check channel ID is correct
- Verify bot has Send Messages permission
- Check rate limiting

## Next Steps

### Enable Distribution

Add to `.env`:
```env
TWITTER_API_KEY=your_key
TWITTER_API_SECRET=your_secret
TWITTER_ACCESS_TOKEN=your_token
TWITTER_ACCESS_SECRET=your_secret

DISCORD_ANNOUNCEMENTS_CHANNEL=your_channel_id

PRINTFUL_API_KEY=your_key
GHOST_API_KEY=your_key
```

### Enable Alt-Text Generation

```bash
# Install Ollama
brew install ollama

# Pull model
ollama pull neural-chat

# Start service (in another terminal)
ollama serve

# Add to .env
OLLAMA_URL=http://localhost:11434
```

### Setup Dashboard (Optional)

```bash
# Open browser
open http://localhost:3000

# You'll see project dashboard
# Creative releases added in next update
```

## File Workflow

**Drop your file here:**
```
/Volumes/Elements/Areas/Eckenrode Muziekopname/Art/New Releases/
```

**System creates assets here:**
```
/Volumes/Elements/Projects/puppet-show/creative/assets/release-{N}/
```

**Database tracks everything:**
```
./puppet-show.db
```

**API endpoints:**
```
http://localhost:3000/api/creative/
```

## Monitoring

Watch the console for real-time updates:

```bash
# Show last 50 lines continuously
tail -f /tmp/creative-releases.log

# Or just watch console output from 'npm start'
```

Check database directly:

```bash
# Enter SQLite shell
sqlite3 puppet-show.db

# View releases
SELECT id, title, status, created_at FROM creative_releases;

# View assets
SELECT * FROM creative_assets WHERE release_id = 1;

# View social posts
SELECT * FROM social_posts WHERE release_id = 1;

# Exit
.exit
```

## Testing Distribution

Once configured, manually trigger distribution:

```bash
# Trigger distribution for release #1
curl -X POST http://localhost:3000/api/creative/releases/1/distribute
```

Watch console for:
```
📢 Starting distribution for release #1
🐦 Posting to Twitter...
🎮 Posting to Discord...
🌐 Adding to website...
🖨️  Creating Printful products...
📧 Queuing email newsletter...
❤️  Adding to Patreon...
✅ Distribution complete!
```

## Troubleshooting Checklist

- [ ] Node.js installed (node --version)
- [ ] Dependencies installed (npm install)
- [ ] .env file created with API keys
- [ ] Folder /Art/New Releases exists
- [ ] Test image > 100 KB
- [ ] Server starts without errors
- [ ] Folder watcher shows "active"
- [ ] Assets generated in ./creative/assets/
- [ ] Database shows release record
- [ ] API returns 200 on /api/health

## Production Setup

For production deployment:

```bash
# Use PM2 for process management
npm install -g pm2

# Start with PM2
pm2 start server.js --name "puppet-show"

# Save startup script
pm2 startup
pm2 save

# Monitor
pm2 logs puppet-show
```

## Support

If something doesn't work:

1. Check console output for errors
2. Verify all .env variables set
3. Check folder permissions
4. Try the test image
5. Review CREATIVE_RELEASES.md for details

---

**Ready to automate!** 🚀 Drop an image and watch the magic happen.
