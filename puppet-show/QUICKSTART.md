# 🎭 Puppet Show - Quick Start Guide

## System Status: ✅ READY

The Puppet Show Project Coordination System is fully operational and ready for orchestrator integration.

## What's Running

```
🌐 Web Dashboard:     http://localhost:3000
📊 API Server:         Running on port 3000
💾 Database:           SQLite at ./puppet-show.db
🤖 Orchestrator:       Ready for autonomous proposals
🔗 Discord:            Configured (optional)
```

## For Users: Access the Dashboard

1. **Open in Browser**
   ```
   http://localhost:3000
   ```

2. **Features Available**
   - 📊 **Dashboard** - Overview of project statuses
   - 📋 **Projects** - List, search, filter projects
   - 📅 **Timeline** - View projects by target completion date
   - ➕ **Create** - Propose new projects

3. **Actions**
   - Create a new project proposal
   - View project details and feedback history
   - Provide feedback on proposals
   - Approve projects (CEO action)
   - Update project status

## For Orchestrators: Create Proposals Programmatically

### Quick Example

```javascript
const { autonomousProposal, initializeOrchestrator } = require('./orchestrator/autonomousProposal');

// Create a proposal
const project = await autonomousProposal({
  title: "New Analytics Dashboard",
  proposer: "Vincent",
  description: "Build real-time analytics system",
  orchestratorId: "analytical-orchestrator",
  objectives: ["Track metrics", "Display insights"],
  budget: { total: 50000, currency: "USD" },
  target_completion: "2024-12-31",
  reasoning: { priority: "high", confidence: 0.95 }
});

console.log("✓ Proposal created with ID:", project.id);
```

### Available Proposers

Choose one of these for the `proposer` field:
- **Sylvia** - Innovation & vision
- **Vincent** - Analytics & data
- **Kathryn** - Design & UX
- **Morgan** - Strategy & growth
- **Eliana** - Operations & efficiency
- **Maxwell** - Technical architecture
- **Sarah** - Customer success

## API Quick Reference

### Create Project
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Project Name",
    "proposer": "Vincent",
    "description": "Description",
    "target_completion": "2024-12-31"
  }'
```

### Get All Projects
```bash
curl http://localhost:3000/api/projects
```

### Get Project Details
```bash
curl http://localhost:3000/api/projects/1
```

### Submit Feedback
```bash
curl -X POST http://localhost:3000/api/projects/1/feedback \
  -H "Content-Type: application/json" \
  -d '{"feedback_text": "Your feedback here"}'
```

### Approve Project
```bash
curl -X POST http://localhost:3000/api/projects/1/approve
```

### Get Dashboard Stats
```bash
curl http://localhost:3000/api/dashboard
```

## Discord Integration (Optional)

To enable Discord notifications:

1. **Create a Discord Bot**
   - Go to Discord Developer Portal
   - Create a new application
   - Add bot user
   - Copy the token

2. **Configure .env**
   ```
   DISCORD_TOKEN=your_token_here
   DISCORD_EXECUTIVE_CHANNEL=channel_id_here
   ```

3. **Discord Messages**
   - `🤖` prefix → Orchestrator directives
   - `!summary` → Daily project summary
   - `!status` → Current project status

## Project Status Workflow

```
PROPOSED ──[Approve]──> ACTIVE ──[Start]──> IN_PROGRESS ──[Complete]──> COMPLETE
```

- **PROPOSED**: New proposal awaiting CEO review
- **ACTIVE**: Approved and ready for implementation
- **IN_PROGRESS**: Currently being worked on
- **COMPLETE**: Finished and delivered

## Database

SQLite database at: `/Volumes/Elements/Projects/puppet-show.db`

**Tables:**
- `projects` - All projects with details
- `feedback` - Feedback history for each project

**Auto-created on first run with indices for performance**

## Orchestrator Features

### Create Proposals
```javascript
const proposal = await autonomousProposal({
  title: "...",
  proposer: "...",
  // ... more fields
});
```

### Check Pending Proposals
```javascript
const pending = await getPendingProposals();
pending.forEach(p => console.log(p.title, p.status));
```

### Get Proposal Status
```javascript
const project = await getProposalStatus(projectId);
console.log(project.status, project.feedback);
```

### Get Statistics
```javascript
const stats = await getOrchestratorStats();
// Shows: proposal counts by orchestrator
```

## Testing

### Test Create → Review → Approve Flow

1. **Create a test project**
   ```bash
   curl -X POST http://localhost:3000/api/projects \
     -H "Content-Type: application/json" \
     -d '{
       "title": "Test Project",
       "proposer": "Vincent",
       "description": "Testing the system",
       "target_completion": "2024-12-31"
     }'
   ```

2. **View in Dashboard**
   - Open http://localhost:3000
   - Check "Proposed" count (should be 1)
   - Click project to see details

3. **Add Feedback**
   ```bash
   curl -X POST http://localhost:3000/api/projects/1/feedback \
     -H "Content-Type: application/json" \
     -d '{"feedback_text": "Looks good!"}'
   ```

4. **Approve It**
   ```bash
   curl -X POST http://localhost:3000/api/projects/1/approve
   ```

5. **Check Dashboard**
   - "Proposed" count decreased
   - "Active" count increased
   - Status changed to ACTIVE

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm start
```

### Database Issues
```bash
# Delete database and restart (creates fresh)
rm puppet-show.db
npm start
```

### Discord Not Connecting
- Check DISCORD_TOKEN is set correctly
- Verify bot has permissions in the channel
- Check DISCORD_EXECUTIVE_CHANNEL ID is correct

## Architecture

```
puppet-show/
├── public/              # Dashboard UI
│   ├── index.html      # Main page
│   ├── styles.css      # Styling
│   └── app.js          # Frontend logic
├── db/
│   └── init.js         # Database initialization
├── orchestrator/
│   ├── autonomousProposal.js   # Core API
│   └── examples.js             # Reference implementations
├── discord/
│   └── orchestratorListener.js # Discord integration
├── server.js           # Express server
└── package.json
```

## Next Steps

1. **Access Dashboard** → http://localhost:3000
2. **Create Test Project** → Use API or Dashboard UI
3. **Wire Orchestrators** → Use autonomousProposal() in your orchestrator code
4. **Configure Discord** → Set DISCORD_TOKEN and channel ID
5. **Enable Automation** → Connect your orchestrator systems

## Support

**For issues:**
- Check console output in server terminal
- Review README.md for detailed documentation
- Check orchestrator/examples.js for implementation patterns

**Database queries:**
```bash
# Access SQLite directly
sqlite3 puppet-show.db

# List all projects
SELECT id, title, proposer, status FROM projects;

# View feedback history
SELECT * FROM feedback WHERE project_id = 1;
```

---

## ✅ System Health Check

All systems operational:
- ✅ Database: Running
- ✅ API: Responding
- ✅ Dashboard: Accessible
- ✅ Orchestrator: Ready
- ⚠️ Discord: Optional (not configured)

**Ready for use!** 🚀
