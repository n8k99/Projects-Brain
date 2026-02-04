# 🚀 Puppet Show Creative Release System - Deployment Guide

Complete deployment instructions for the Creative Release Automation System.

## Quick Deploy (5 minutes)

### 1. Install and Configure

```bash
cd /Volumes/Elements/Projects/puppet-show

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit with your settings (at minimum, Discord token)
nano .env
```

### 2. Start the System

```bash
npm start
```

### 3. Verify Running

```bash
# In another terminal
curl http://localhost:3000/api/health

# Should return:
# {"status":"ok","discord":true/false}
```

**System is now running and monitoring the folder!** ✅

---

## Full Deployment Guide

### Prerequisites

**System Requirements:**
- Node.js 16+ (check: `node --version`)
- npm 8+ (check: `npm --version`)
- 2+ GB free disk space
- macOS or Linux (for image processing)

**Optional but Recommended:**
- ImageMagick (for better image resizing)
- Ollama (for AI alt-text generation)

### Install ImageMagick (Optional)

```bash
# macOS
brew install imagemagick

# Ubuntu/Debian
sudo apt-get install imagemagick

# Or system will fallback to sips (macOS) or skip processing
```

### Install Ollama (Optional, for alt-text)

```bash
# Download from https://ollama.ai
# Or via Homebrew on macOS
brew install ollama

# Pull the model
ollama pull neural-chat

# Start service (keep running in background)
ollama serve &
```

### Installation Steps

#### Step 1: Clone/Navigate to Project

```bash
cd /Volumes/Elements/Projects/puppet-show
```

#### Step 2: Install Dependencies

```bash
npm install

# You should see:
# added XXX packages in X.XXs
```

#### Step 3: Setup Environment

```bash
# Copy template
cp .env.example .env

# Edit configuration
nano .env
```

**Minimum configuration (.env):**
```env
PORT=3000
DISCORD_TOKEN=your_bot_token
DISCORD_CREATIVE_CHANNEL=channel_id_for_creative_announcements
```

**Optional - Add more integrations:**
```env
# Social Media
TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_SECRET=your_twitter_api_secret
TWITTER_ACCESS_TOKEN=your_twitter_access_token
TWITTER_ACCESS_SECRET=your_twitter_access_secret

# Website
GHOST_API_KEY=your_ghost_api_key
GHOST_URL=https://n8k99.com

# Merchandise
PRINTFUL_API_KEY=your_printful_api_key

# Community
PATREON_API_KEY=your_patreon_api_key

# AI
OLLAMA_URL=http://localhost:11434
```

#### Step 4: Verify Database

```bash
# Check database file will be created
ls -la puppet-show.db 2>/dev/null || echo "Will be created on first run"

# Ensure db folder exists
mkdir -p db/
```

#### Step 5: Start the System

```bash
# Option A: Run in foreground (for testing)
npm start

# Option B: Run in background with PM2 (recommended for production)
npm install -g pm2
pm2 start server.js --name "puppet-show"
pm2 logs puppet-show
```

#### Step 6: Verify Everything Works

```bash
# In another terminal
# Check health
curl http://localhost:3000/api/health

# Check creative releases
curl http://localhost:3000/api/creative/releases

# Check processing stats
curl http://localhost:3000/api/creative/stats
```

---

## Production Setup with PM2

For production deployment with process management:

### Install PM2

```bash
npm install -g pm2
```

### Create Startup Script

```bash
# From project directory
cd /Volumes/Elements/Projects/puppet-show

# Start with PM2
pm2 start server.js --name "puppet-show"

# Make it restart on reboot
pm2 startup
pm2 save

# View logs
pm2 logs puppet-show

# Monitor
pm2 monit
```

### Configuration File (Optional)

Create `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [
    {
      name: "puppet-show",
      script: "./server.js",
      instances: 1,
      exec_mode: "cluster",
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      },
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z"
    }
  ]
};
```

Then start with:
```bash
pm2 start ecosystem.config.js
```

---

## Docker Deployment (Optional)

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy application
COPY . .

# Create necessary directories
RUN mkdir -p /volumes/creative/assets

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t puppet-show-creative .
docker run -d \
  --name puppet-show \
  -p 3000:3000 \
  -v /Volumes/Elements/Areas/Eckenrode\ Muziekopname/Art/New\ Releases:/volumes/releases \
  -v puppet-show-db:/app \
  --env-file .env \
  puppet-show-creative
```

---

## Testing Deployment

### Test 1: Service Running

```bash
curl http://localhost:3000/api/health
# Expected: {"status":"ok","discord":true/false}
```

### Test 2: Folder Monitoring

```bash
# Create test image
python3 << 'EOF'
from PIL import Image
import os

img = Image.new('RGB', (1200, 675), color='blue')
path = '/Volumes/Elements/Areas/Eckenrode Muziekopname/Art/New Releases/deployment-test.png'
os.makedirs(os.path.dirname(path), exist_ok=True)
img.save(path)
print(f"Test image created")
EOF

# Watch console output for:
# "📸 New Creative Release Detected!"
# "✓ Created release record: #1"
```

### Test 3: API Endpoints

```bash
# List releases
curl http://localhost:3000/api/creative/releases

# Get release details
curl http://localhost:3000/api/creative/releases/1

# Check metrics
curl http://localhost:3000/api/creative/releases/1/metrics
```

### Test 4: Trigger Distribution

```bash
# Manual distribution
curl -X POST http://localhost:3000/api/creative/releases/1/distribute

# Watch console for distribution messages
```

---

## Monitoring & Maintenance

### View Logs

**Using PM2:**
```bash
pm2 logs puppet-show
pm2 logs puppet-show --lines 100
pm2 logs puppet-show --err
```

**Direct logs:**
```bash
tail -f /tmp/puppet-show.log
```

### Check Database

```bash
sqlite3 puppet-show.db

# View releases
SELECT id, title, status, created_at FROM creative_releases;

# View assets
SELECT * FROM creative_assets LIMIT 5;

# View posts
SELECT * FROM social_posts LIMIT 5;

# Exit
.exit
```

### Monitor Disk Usage

```bash
# Check total usage
du -sh /Volumes/Elements/Projects/puppet-show/

# Check assets folder
du -sh /Volumes/Elements/Projects/puppet-show/creative/assets/

# Check watch folder
du -sh "/Volumes/Elements/Areas/Eckenrode Muziekopname/Art/New Releases/"
```

### Check Performance

```bash
# API response time
time curl http://localhost:3000/api/creative/releases

# Database queries
sqlite3 puppet-show.db "SELECT COUNT(*) FROM creative_releases;"
```

---

## Backup & Recovery

### Backup Database

```bash
# Daily backup
cp puppet-show.db puppet-show-backup-$(date +%Y%m%d).db

# Compress old backups
gzip puppet-show-backup-*.db

# Check backups
ls -lah puppet-show-backup-*.db*
```

### Backup Assets

```bash
# Backup all generated assets
tar -czf creative-assets-$(date +%Y%m%d).tar.gz creative/assets/

# Move to safe location
mv creative-assets-*.tar.gz ~/backups/
```

### Restore from Backup

```bash
# Restore database
cp puppet-show-backup-YYYYMMDD.db puppet-show.db

# Restore assets
tar -xzf creative-assets-YYYYMMDD.tar.gz
```

---

## Scaling & Performance

### Performance Tuning

1. **Database Optimization:**
   ```bash
   sqlite3 puppet-show.db "VACUUM;"
   sqlite3 puppet-show.db "ANALYZE;"
   ```

2. **Enable WAL Mode (faster):**
   ```bash
   sqlite3 puppet-show.db "PRAGMA journal_mode=WAL;"
   ```

3. **Increase Cache:**
   ```bash
   # Edit server.js to adjust settings
   ```

### Handling High Volume

For many releases per day:
- Increase queue processing frequency (currently 5 seconds)
- Consider multi-process setup (PM2 clustering)
- Monitor memory usage
- Archive old assets periodically

---

## Troubleshooting Deployment

### Service Won't Start

```bash
# Check Node version
node --version  # Should be 16+

# Check port in use
lsof -i :3000

# Check npm install worked
npm list | head -20

# Check syntax
node -c server.js
```

### Folder Not Monitored

```bash
# Check folder exists
ls -la "/Volumes/Elements/Areas/Eckenrode Muziekopname/Art/New Releases/"

# Check permissions
chmod 755 "/Volumes/Elements/Areas/Eckenrode Muziekopname/Art/New Releases"

# Check console for watcher initialization
# Should show: "✓ Folder watcher active"
```

### Assets Not Generating

```bash
# Check disk space
df -h

# Check ImageMagick
which convert  # Optional, system falls back

# Check file size
ls -lh "/Volumes/Elements/Areas/Eckenrode Muziekopname/Art/New Releases/"
# Files must be > 100 KB

# Check permissions
chmod 644 "/Volumes/Elements/Areas/Eckenrode Muziekopname/Art/New Releases"/*.png
```

### Database Locked

```bash
# Check for multiple instances
ps aux | grep node

# Kill zombie processes if needed
pkill -f "node server.js"

# Restart
npm start
```

### Memory Issues

```bash
# Check memory usage
top -p $(pgrep -f "node server.js")

# If using PM2, limit memory
pm2 start server.js --max-memory-restart 1G

# Or restart periodically
pm2 restart puppet-show --cron "0 */6 * * *"
```

---

## Security

### Secure Environment Variables

```bash
# Don't commit .env to git
echo ".env" >> .gitignore

# Use strong API keys
# Rotate keys regularly
# Use environment-specific configs for production
```

### Secure Folder Permissions

```bash
# Restrict watch folder
chmod 750 "/Volumes/Elements/Areas/Eckenrode Muziekopname/Art/New Releases"

# Restrict assets folder
chmod 750 creative/assets/

# Restrict database
chmod 600 puppet-show.db
```

### Database Security

```bash
# Backup regularly
# Keep backups in secure location
# Test restore procedures
```

---

## Upgrade & Updates

### Update Dependencies

```bash
# Check for updates
npm outdated

# Update all packages
npm update

# Update specific package
npm install package@latest

# Restart service
pm2 restart puppet-show
```

### Update Application

```bash
# Pull latest changes (if using git)
git pull

# Reinstall dependencies
npm install

# Run tests
npm test

# Restart
pm2 restart puppet-show
```

---

## Configuration Reference

### Environment Variables

| Variable | Required | Default | Purpose |
|----------|----------|---------|---------|
| PORT | No | 3000 | Server port |
| DISCORD_TOKEN | Yes | - | Discord bot token |
| DISCORD_CREATIVE_CHANNEL | No | - | Creative announcements channel |
| DISCORD_ANNOUNCEMENTS_CHANNEL | No | - | General announcements channel |
| TWITTER_API_KEY | No | - | Twitter API key |
| GHOST_API_KEY | No | - | Ghost CMS API key |
| PRINTFUL_API_KEY | No | - | Printful API key |
| PATREON_API_KEY | No | - | Patreon API key |
| OLLAMA_URL | No | http://localhost:11434 | Ollama service URL |

---

## Support & Documentation

- **Full Documentation:** `CREATIVE_RELEASES.md`
- **Quick Start:** `CREATIVE_QUICKSTART.md`
- **Testing Guide:** `CREATIVE_TEST.md`
- **Implementation Status:** `CREATIVE_IMPLEMENTATION.md`
- **This Guide:** `DEPLOYMENT.md`

---

## Verification Checklist

Before going live:

- [ ] `npm install` completed successfully
- [ ] `.env` file created with required variables
- [ ] Server starts: `npm start`
- [ ] Health check passes: `curl http://localhost:3000/api/health`
- [ ] Folder exists: `/Volumes/Elements/Areas/Eckenrode Muziekopname/Art/New Releases/`
- [ ] Watcher active: Check console output
- [ ] Database initialized: `puppet-show.db` exists
- [ ] Test image detected: Verify console output
- [ ] Assets generated: Check `creative/assets/release-1/`
- [ ] API endpoints respond: `curl http://localhost:3000/api/creative/releases`
- [ ] PM2 configured (if production)
- [ ] Backups configured
- [ ] Logs monitored

---

## Success Criteria

✅ System is running and accepting connections
✅ Folder watcher actively monitoring
✅ Assets generated for test image
✅ API endpoints responding correctly
✅ Database records created and queryable
✅ No errors in console output
✅ Discord notifications working (if configured)
✅ Ready for live releases

---

**Status: DEPLOYMENT READY** ✅

Follow this guide and your Creative Release Automation System will be up and running!
