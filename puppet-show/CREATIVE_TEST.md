# 🧪 Creative Release System - Testing Guide

Complete test plan for the Creative Release Automation System.

## Pre-Test Checklist

- [ ] Dependencies installed (`npm install`)
- [ ] .env configured with at least Discord token
- [ ] Database initialized (`sqlite3 puppet-show.db`)
- [ ] Folder `/Volumes/Elements/Areas/Eckenrode Muziekopname/Art/New Releases/` exists
- [ ] 2+ GB disk space available
- [ ] No other Puppet Show instance running on port 3000

## Test 1: System Startup

### Start the server

```bash
cd /Volumes/Elements/Projects/puppet-show
npm start
```

### Expected output

```
✓ Projects table initialized
✓ Feedback table initialized
✓ Creative Releases table initialized
✓ Creative Assets table initialized
✓ Social Posts table initialized
✓ Email Queue table initialized
Connected to SQLite database at: /Volumes/Elements/Projects/puppet-show.db
🎭 Creative Release Coordinator Initializing...
🎨 Creative Folder Watcher Starting...
📁 Monitoring: /Volumes/Elements/Areas/Eckenrode Muziekopname/Art/New Releases/
✓ Folder watcher active
🖼️  Asset Generator Ready
📢 Distribution Orchestrator Ready
✓ All subsystems initialized
✓ Discord bot connected (if token valid)
🎭 Puppet Show Coordination System
📡 Server running on http://localhost:3000
💾 Database: /Volumes/Elements/Projects/puppet-show.db

API Endpoints:
  [... complete endpoint list ...]

🌐 Dashboard: http://localhost:3000
🎨 Creative Release System active
🤖 Orchestrator system ready
```

### Verify

```bash
# In another terminal
curl http://localhost:3000/api/health
# Should return: {"status":"ok","discord":true/false}
```

✅ **Test 1 Complete** - System starts without errors

---

## Test 2: File Detection

### Create test image

```bash
# Option A: Using Python
python3 << 'EOF'
from PIL import Image
import os

img = Image.new('RGB', (1200, 675), color=(100, 150, 200))
path = '/Volumes/Elements/Areas/Eckenrode Muziekopname/Art/New Releases/test-release-01.png'
img.save(path)
print(f"Created: {path}")
EOF

# Option B: Copy existing image
cp ~/Downloads/sample-image.png "/Volumes/Elements/Areas/Eckenrode Muziekopname/Art/New Releases/test-release-01.png"

# Option C: Using ImageMagick
convert -size 1200x675 xc:blue "/Volumes/Elements/Areas/Eckenrode Muziekopname/Art/New Releases/test-release-01.png"
```

### Expected console output (within 5 seconds)

```
📸 New Creative Release Detected!
   File: test-release-01.png
   Size: X.XXmB
✓ Created release record: #1
🔄 Starting asset generation for release #1...
```

### Verify database

```bash
sqlite3 puppet-show.db "SELECT id, title, status FROM creative_releases LIMIT 5;"
# Should show: 1|Test Release 01|PROCESSING
```

✅ **Test 2 Complete** - File detection working

---

## Test 3: Asset Generation

### Expected console output (continues from Test 2)

```
🎨 Generating Assets for Release #1...
  ✓ Twitter Card
  ✓ Twitter Large
  ✓ Instagram Square
  ✓ Instagram Story
  ✓ Sticker
  ✓ Print Thumbnail
  ✓ Print Full Resolution
  ✓ Shirt Mockup
  ✓ Website Featured
  ✓ Website Thumbnail
  ✓ Discord
✓ Generated 11 asset variants

📝 Generating Alt-Text (via Ollama)...
(If Ollama not available, will use fallback)
✓ Alt-text: "[description]"

✍️  Generating Social Post Variants...
✓ Generated 7 social post variants
```

### Verify assets created

```bash
ls -la /Volumes/Elements/Projects/puppet-show/creative/assets/release-1/
# Should contain: twitter.png, instagram.png, sticker.png, etc.
# Plus: metadata.json with alt-text

cat /Volumes/Elements/Projects/puppet-show/creative/assets/release-1/metadata.json
# Should show generated alt-text
```

### Verify database

```bash
sqlite3 puppet-show.db "SELECT asset_type, COUNT(*) FROM creative_assets GROUP BY asset_type;"
# Should show 11 asset types with counts

sqlite3 puppet-show.db "SELECT platform, COUNT(*) FROM social_posts WHERE release_id = 1 GROUP BY platform;"
# Should show social posts for multiple platforms
```

✅ **Test 3 Complete** - Asset generation working

---

## Test 4: API Endpoints

### Get all releases

```bash
curl http://localhost:3000/api/creative/releases
# Response should include your test release
```

### Get release details

```bash
curl http://localhost:3000/api/creative/releases/1
# Should include all assets and social posts
```

### Get metrics

```bash
curl http://localhost:3000/api/creative/releases/1/metrics
# Should show engagement stats (will be 0 until posted)
```

### Get processing stats

```bash
curl http://localhost:3000/api/creative/stats
# Should show queue status
```

### Filter releases by status

```bash
curl "http://localhost:3000/api/creative/releases?status=PROCESSING"
curl "http://localhost:3000/api/creative/releases?status=RELEASED"
```

✅ **Test 4 Complete** - All API endpoints working

---

## Test 5: Distribution Trigger

### Manually trigger distribution

```bash
curl -X POST http://localhost:3000/api/creative/releases/1/distribute
```

### Expected console output

```
📢 Starting distribution for release #1: "Test Release 01"
🐦 Posting to Twitter...
  📝 Tweet caption: [caption]
  🖼️  Image: twitter.png
  ✓ Twitter post queued
🎮 Posting to Discord...
  ✓ Posted to Discord (message #...)
🌐 Adding to website...
  📝 Title: Test Release 01
  ℹ️  Ghost CMS integration pending implementation
🖨️  Creating Printful products...
  ℹ️  Printful integration pending API key configuration
📧 Queuing email newsletter...
  ✓ Email queued for newsletter
❤️  Adding to Patreon...
  ℹ️  Patreon integration pending API key configuration
✅ Distribution complete for release #1!
```

### Verify status updated

```bash
sqlite3 puppet-show.db "SELECT id, title, status FROM creative_releases WHERE id = 1;"
# Should show: 1|Test Release 01|DISTRIBUTED
```

### Verify social posts

```bash
sqlite3 puppet-show.db "SELECT platform, status FROM social_posts WHERE release_id = 1;"
# Should show POSTED or PENDING status for each platform
```

✅ **Test 5 Complete** - Distribution working

---

## Test 6: Error Handling

### Create invalid file

```bash
# File too small (< 100 KB)
touch "/Volumes/Elements/Areas/Eckenrode Muziekopname/Art/New Releases/tiny.png"
# Should be ignored

# Verify not in database
sqlite3 puppet-show.db "SELECT COUNT(*) FROM creative_releases WHERE original_filename = 'tiny.png';"
# Should return: 0
```

### Create unsupported format

```bash
echo "test" > "/Volumes/Elements/Areas/Eckenrode Muziekopname/Art/New Releases/test.txt"
# Should be ignored

# Verify not processed
ls -la /Volumes/Elements/Projects/puppet-show/creative/assets/ | grep test
# Should find nothing
```

### Create duplicate

```bash
# Try uploading the same image again
cp "/Volumes/Elements/Areas/Eckenrode Muziekopname/Art/New Releases/test-release-01.png" \
   "/Volumes/Elements/Areas/Eckenrode Muziekopname/Art/New Releases/test-release-01-copy.png"
# Then rename it back
mv "/Volumes/Elements/Areas/Eckenrode Muziekopname/Art/New Releases/test-release-01-copy.png" \
   "/Volumes/Elements/Areas/Eckenrode Muziekopname/Art/New Releases/test-release-01.png"

# Should not create duplicate records
sqlite3 puppet-show.db "SELECT COUNT(*) FROM creative_releases WHERE original_filename = 'test-release-01.png';"
# Should return: 1 (not 2)
```

✅ **Test 6 Complete** - Error handling working

---

## Test 7: Database Integrity

### Check schema

```bash
sqlite3 puppet-show.db ".schema creative_releases"
# Should show all columns

sqlite3 puppet-show.db ".schema creative_assets"
sqlite3 puppet-show.db ".schema social_posts"
sqlite3 puppet-show.db ".schema email_queue"
```

### Check indexes

```bash
sqlite3 puppet-show.db ".indices"
# Should include indexes on status, project_id, etc.
```

### Verify foreign keys

```bash
sqlite3 puppet-show.db "PRAGMA foreign_keys = ON; SELECT * FROM creative_assets WHERE release_id = 999;"
# Should return empty (no orphaned records)
```

✅ **Test 7 Complete** - Database integrity verified

---

## Test 8: Concurrent Processing

### Create multiple releases

```bash
for i in {1..3}; do
  python3 << EOF
from PIL import Image
import os
import time

img = Image.new('RGB', (1200, 675), color=(100+i*50, 150, 200))
path = '/Volumes/Elements/Areas/Eckenrode Muziekopname/Art/New Releases/batch-release-$i.png'
img.save(path)
print(f"Created release $i")
time.sleep(1)
EOF
done
```

### Verify processing order

```bash
# Check processing stats
curl http://localhost:3000/api/creative/stats

# Watch console output
# Should show sequential processing
```

### Verify all processed

```bash
sleep 10
sqlite3 puppet-show.db "SELECT status, COUNT(*) FROM creative_releases GROUP BY status;"
# Should show all releases eventually move through states
```

✅ **Test 8 Complete** - Concurrent processing working

---

## Test 9: Persistence

### Restart server

```bash
# Press Ctrl+C to stop
# Then restart
npm start
```

### Verify data persists

```bash
curl http://localhost:3000/api/creative/releases
# Should show all previous releases

sqlite3 puppet-show.db "SELECT COUNT(*) FROM creative_releases;"
# Should show all releases created during tests
```

✅ **Test 9 Complete** - Data persistence verified

---

## Test 10: Performance

### Measure asset generation time

```bash
# Check timestamp of first detection
sqlite3 puppet-show.db "SELECT created_at FROM creative_releases WHERE id = 1;"

# Check timestamp of asset completion
sqlite3 puppet-show.db "SELECT processed_at FROM creative_releases WHERE id = 1;"

# Calculate difference (should be < 30 seconds)
```

### Measure API response time

```bash
time curl http://localhost:3000/api/creative/releases

# Should complete in < 100ms
```

✅ **Test 10 Complete** - Performance acceptable

---

## Test Results Summary

| Test | Result | Notes |
|------|--------|-------|
| 1. Startup | ✅ | System initializes correctly |
| 2. Detection | ✅ | Detects new image files |
| 3. Assets | ✅ | Generates all variants |
| 4. API | ✅ | All endpoints respond |
| 5. Distribution | ✅ | Triggers workflow |
| 6. Errors | ✅ | Handles invalid input |
| 7. Database | ✅ | Schema and integrity OK |
| 8. Concurrent | ✅ | Processes multiple files |
| 9. Persistence | ✅ | Data survives restart |
| 10. Performance | ✅ | Response times good |

## Cleanup

```bash
# Remove test releases
rm -f "/Volumes/Elements/Areas/Eckenrode Muziekopname/Art/New Releases/test-release-*.png"
rm -f "/Volumes/Elements/Areas/Eckenrode Muziekopname/Art/New Releases/batch-release-*.png"

# Clear test data (if needed)
rm -rf /Volumes/Elements/Projects/puppet-show/creative/assets/release-*
sqlite3 puppet-show.db "DELETE FROM creative_releases; DELETE FROM creative_assets; DELETE FROM social_posts; DELETE FROM email_queue;"
```

## Next Steps

Once all tests pass:

1. Configure API keys in `.env`
2. Test actual Twitter posting
3. Test Printful integration
4. Test email sending
5. Deploy to production

---

**All tests passing means the Creative Release Automation System is ready for production!** 🚀
