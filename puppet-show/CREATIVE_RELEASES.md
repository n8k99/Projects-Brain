# 🎨 Creative Release Automation System

Fully autonomous creative release system that handles everything: folder monitoring, asset generation, distribution, and engagement tracking.

## Core Concept

**Drop file → Everything happens automatically**

1. Drop artwork/music into `/Volumes/Elements/Areas/Eckenrode Muziekopname/Art/New Releases/`
2. System detects new file
3. Generates all asset variants (Twitter, Instagram, stickers, prints, etc.)
4. Creates alt-text descriptions
5. Posts to social media, Discord, website, email
6. Creates Printful products
7. Adds to Patreon
8. Tracks engagement metrics

**No approval needed. No user input. Fully autonomous.**

## Architecture

### 1. File Watcher (`watchCreativeFolder.js`)

**Status:** ✅ Implemented

Monitors the new releases folder for image files:
- PNG, JPG, JPEG, GIF, WebP supported
- 100 KB minimum size
- Automatic duplicate detection
- Creates Puppet Show project record
- Triggers asset generation pipeline

```
Watch Folder: /Volumes/Elements/Areas/Eckenrode Muziekopname/Art/New Releases/
↓
Detect new image file
↓
Create database record (status: DETECTED)
↓
Queue for asset generation
```

### 2. Asset Generation (`assetGenerator.js`)

**Status:** ✅ Implemented

Generates resized variants for all platforms:

| Platform | Dimensions | Purpose |
|----------|-----------|---------|
| Twitter | 1200×675 | Social media card |
| Instagram | 1080×1080 | Square post |
| Instagram Story | 1080×1920 | Vertical story |
| Sticker | 512×512 | Discord/web sticker |
| Print Thumbnail | 400×400 | Small thumbnail |
| Print Full | 3000×3000 | High-res print |
| Shirt Mockup | 2000×2000 | Merch preview |
| Website Featured | 1600×900 | Homepage banner |
| Website Thumbnail | 400×225 | List view |
| Discord | 1024×576 | Discord embed |

**Features:**
- Uses ImageMagick/sips for image processing
- Automatic format conversion
- Fallback to original if tool unavailable
- Generates alt-text via Ollama (or fallback generic)
- Creates 5-7 social post variants per platform

```
Original Image
↓
[Generate All Variants]
↓
Store in /creative/assets/release-{id}/
↓
Create metadata.json with alt-text
↓
Generate social post captions
```

### 3. Social Post Variants

Auto-generated for each release:

**Twitter (3 variants)**
- Brief announcement with hashtags
- Merch availability notice
- Call-to-action

**Instagram (2 variants)**
- Aesthetic post with engagement
- Product-focused with shop link

**Discord**
- Announcement with product list

**Patreon**
- Exclusive early-access message

### 4. Distribution Orchestrator (`distributionOrchestrator.js`)

**Status:** ⚠️ Partially Implemented (Config pending)

Handles automated distribution to:

1. **Twitter** - Posts with images and hashtags
2. **Discord** - Announcements in designated channel
3. **Website** (Ghost CMS) - Creates featured post
4. **Printful** - Auto-creates products:
   - T-shirts
   - Stickers
   - Prints
   - Hoodies
5. **Email** - Queues newsletter notification
6. **Patreon** - Adds to exclusive gallery

```
Assets Ready
↓
POST /api/creative/releases/{id}/distribute
↓
[Distribute to all platforms]
↓
Track engagement (likes, retweets, sales)
↓
Update status: DISTRIBUTED
```

### 5. Coordinator (`creativeReleaseCoordinator.js`)

**Status:** ✅ Implemented

Main orchestration layer:

```
DETECTED → PROCESSING → RELEASED → DISTRIBUTED → COMPLETE
   ↓          ↓            ↓          ↓
Folder    Asset Gen     Ready for   All platforms
detected  complete      distribution live
```

**Features:**
- Processes releases sequentially
- Automatic state transitions
- Queue management
- Error handling and recovery

## Database Schema

### creative_releases
```sql
CREATE TABLE creative_releases (
  id INTEGER PRIMARY KEY,
  title TEXT,
  status TEXT (DETECTED|PROCESSING|RELEASED|DISTRIBUTED|ERROR),
  original_filename TEXT,
  original_path TEXT,
  file_size INTEGER,
  file_type TEXT,
  project_id INTEGER,  -- Links to projects table
  created_at DATETIME,
  processed_at DATETIME,
  released_at DATETIME,
  distributed_at DATETIME
)
```

### creative_assets
```sql
CREATE TABLE creative_assets (
  id INTEGER PRIMARY KEY,
  release_id INTEGER,
  asset_type TEXT (twitter|instagram|sticker|print_full|etc),
  file_path TEXT,
  dimensions TEXT,
  created_at DATETIME
)
```

### social_posts
```sql
CREATE TABLE social_posts (
  id INTEGER PRIMARY KEY,
  release_id INTEGER,
  platform TEXT (twitter|discord|instagram|patreon),
  post_id TEXT,  -- Platform-specific ID after posting
  caption TEXT,
  status TEXT (PENDING|POSTED|FAILED),
  posted_at DATETIME,
  likes INTEGER,
  retweets INTEGER,
  shares INTEGER
)
```

### email_queue
```sql
CREATE TABLE email_queue (
  id INTEGER PRIMARY KEY,
  release_id INTEGER,
  email_subject TEXT,
  email_body TEXT,
  status TEXT (PENDING|SENT|FAILED),
  sent_at DATETIME
)
```

## Setup

### 1. Install Dependencies

```bash
cd /Volumes/Elements/Projects/puppet-show
npm install
```

### 2. Configure Environment

Copy and fill `.env`:

```bash
cp .env.example .env
```

**Required for full automation:**

```env
# Discord (for announcements)
DISCORD_CREATIVE_CHANNEL=your_channel_id
DISCORD_ANNOUNCEMENTS_CHANNEL=your_channel_id

# Twitter (optional but recommended)
TWITTER_API_KEY=your_key
TWITTER_API_SECRET=your_secret
TWITTER_ACCESS_TOKEN=your_token
TWITTER_ACCESS_SECRET=your_secret

# Printful (for merchandise)
PRINTFUL_API_KEY=your_key

# Ghost CMS (for website)
GHOST_API_KEY=your_key
GHOST_URL=https://n8k99.com

# Patreon (optional)
PATREON_API_KEY=your_key

# Ollama (for alt-text, must be running)
OLLAMA_URL=http://localhost:11434
```

### 3. Start System

```bash
npm start
```

System will:
- Initialize database schema
- Start folder watcher
- Begin processing queue
- Listen for releases

## Usage

### Automatic Flow (Recommended)

1. **Drop file** in folder:
   ```
   /Volumes/Elements/Areas/Eckenrode Muziekopname/Art/New Releases/new-song-artwork.png
   ```

2. **System handles everything:**
   - Creates database record
   - Generates all variants
   - Posts to all platforms
   - Creates products
   - Queues email
   - Updates dashboard

3. **Vincent can optionally enhance** (future feature):
   - Add artist notes
   - Customize captions
   - Select featured platform

4. **Check status** via API or dashboard

### Manual Trigger

```bash
# Get all releases
curl http://localhost:3000/api/creative/releases

# Get release details
curl http://localhost:3000/api/creative/releases/1

# Manually trigger distribution
curl -X POST http://localhost:3000/api/creative/releases/1/distribute

# Get engagement metrics
curl http://localhost:3000/api/creative/releases/1/metrics

# Get processing stats
curl http://localhost:3000/api/creative/stats
```

## API Endpoints

### GET /api/creative/releases
List all creative releases with optional filtering.

**Query Params:**
- `status`: Filter by status (DETECTED, PROCESSING, RELEASED, DISTRIBUTED, ERROR)
- `limit`: Number of results (default: 50)

**Response:**
```json
[
  {
    "id": 1,
    "title": "New Song Artwork",
    "status": "DISTRIBUTED",
    "original_filename": "new-song.png",
    "file_size": 2500000,
    "created_at": "2024-02-02T10:30:00Z",
    "distributed_at": "2024-02-02T10:45:00Z"
  }
]
```

### GET /api/creative/releases/:id
Get detailed release information including assets and social posts.

**Response:**
```json
{
  "id": 1,
  "title": "New Song Artwork",
  "status": "DISTRIBUTED",
  "original_filename": "new-song.png",
  "assets": [
    {
      "asset_type": "twitter",
      "file_path": "/creative/assets/release-1/twitter.png",
      "dimensions": "1200x675"
    }
  ],
  "socialPosts": [
    {
      "platform": "twitter",
      "caption": "Fresh release: New Song Artwork...",
      "status": "POSTED",
      "likes": 42
    }
  ],
  "queuePosition": -1
}
```

### GET /api/creative/releases/:id/metrics
Get engagement metrics for a release.

**Response:**
```json
{
  "total_posts": 7,
  "total_likes": 245,
  "total_retweets": 58,
  "total_shares": 12
}
```

### POST /api/creative/releases/:id/distribute
Manually trigger distribution for a release.

**Response:**
```json
{
  "message": "Distribution queued",
  "release": { ... }
}
```

### GET /api/creative/stats
Get current processing statistics.

**Response:**
```json
{
  "queueLength": 2,
  "isProcessing": true,
  "queue": [
    {
      "id": 3,
      "status": "processing",
      "queuedAt": "2024-02-02T10:50:00Z"
    }
  ]
}
```

## Status Flow

```
DETECTED
  ↓
  [Folder watcher detects new image]
  
PROCESSING
  ↓
  [Asset generator creates all variants]
  [Generates captions & alt-text]
  
RELEASED
  ↓
  [Ready for distribution]
  [Can be manually triggered or automatic]
  
DISTRIBUTED
  ↓
  [Posted to all platforms]
  [Products created]
  [Email queued]
  [Tracking engagement]
  
COMPLETE (future)
  [All metrics collected]
```

## Error Handling

If any step fails:

```
Error in asset generation
↓
Status: ERROR
↓
Logged in database
↓
Not retried automatically (manual review)
↓
Can retry via API or re-upload file
```

## Dashboard Integration

The creative releases show in the dashboard with:

- **Separate "Creative Releases" section** (different color coding)
- **Status visualization** (progress bars)
- **Engagement metrics** (live metrics from platforms)
- **Platform distribution** (which platforms live)
- **Timeline view** (recent releases)

Future dashboard features:
- Vincent's annotation view
- Engagement trends
- Sales metrics from Printful
- Email open rates

## Configuration Details

### Image Processing

Requires one of:
1. **ImageMagick** - Best option, most features
   ```bash
   brew install imagemagick
   ```

2. **sips** - macOS built-in (fallback)

3. **Fallback** - Uses original image if both unavailable

### Ollama (Alt-Text Generation)

Optional but recommended:

```bash
# Install Ollama
brew install ollama

# Download model
ollama pull neural-chat

# Start service
ollama serve
```

System will automatically generate alt-text if Ollama available, otherwise use generic template.

### Social Media APIs

To enable full distribution, configure:

**Twitter:**
- Create app at https://developer.twitter.com
- Get API keys from app settings
- Set environment variables

**Discord:**
- Create webhook in channel settings
- Add to environment variables

**Printful:**
- Create account at https://printful.com
- Get API key from account settings
- Test product creation

## Future Enhancements

- [ ] Vincent's creative director approval flow
- [ ] Custom caption editing before posting
- [ ] Scheduled posting (release at specific time)
- [ ] A/B testing different captions
- [ ] Automatic hashtag generation
- [ ] Trending topic integration
- [ ] Sales dashboard from Printful
- [ ] Email analytics
- [ ] TikTok/YouTube automation
- [ ] Merchandise bundle creation
- [ ] Pre-order management

## Troubleshooting

### Release not detected
- Check folder path exists
- Ensure file is PNG/JPG
- File must be > 100 KB
- Check file is not hidden

### Assets not generating
- Check ImageMagick installed
- Review error logs
- Ensure sufficient disk space
- Check file permissions

### Distribution failed
- Check API keys in .env
- Verify platform APIs accessible
- Check Discord bot permissions
- Review rate limits

### Ollama alt-text not working
- Ensure Ollama running on localhost:11434
- Download neural-chat model
- Check network connectivity

## Files

- `watchCreativeFolder.js` - Folder monitoring
- `assetGenerator.js` - Image processing & caption generation
- `distributionOrchestrator.js` - Social posting & distribution
- `creativeReleaseCoordinator.js` - Main orchestration
- `db/init.js` - Database schema extensions
- `server.js` - API endpoints
- `CREATIVE_RELEASES.md` - This file

---

**Status:** Core system complete ✅ Distribution integrations in progress ⚠️
