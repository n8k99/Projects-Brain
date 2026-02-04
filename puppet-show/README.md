# 🎭 Puppet Show - Project Coordination System

Executive project management and orchestrator coordination platform with Discord integration.

## Features

✅ **Project Management Dashboard**
- Status overview (Proposed, Active, In Progress, Complete)
- Project list with filtering and search
- Timeline view with target completion dates
- Detailed project views with full specifications

✅ **Executive Controls**
- Create new project proposals
- Provide feedback on proposals
- Approve projects to move to ACTIVE status
- Update project status and timelines

✅ **Orchestrator Integration**
- Autonomous proposal generation system
- Discord-based directives and feedback
- Proposal tracking and history
- Statistics on orchestrator activity

✅ **Discord Integration**
- Post notifications for new proposals
- Feedback confirmations
- Approval announcements
- Daily project summaries
- Real-time status updates

## Quick Start

### 1. Setup

```bash
cd /Volumes/Elements/Projects/puppet-show
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and fill in your Discord credentials:

```bash
cp .env.example .env
```

Edit `.env`:
```
PORT=3000
DISCORD_TOKEN=your_bot_token
DISCORD_EXECUTIVE_CHANNEL=your_channel_id
```

### 3. Run the Server

```bash
npm start
```

The system will:
- Initialize SQLite database at `./puppet-show.db`
- Create Projects and Feedback tables
- Connect to Discord (if configured)
- Start the Express server on port 3000

### 4. Access the Dashboard

Open http://localhost:3000 in your browser

## API Endpoints

### Projects

**GET /api/projects** - List all projects
- Query params: `status`, `proposer`, `team`
- Returns: Array of projects

**GET /api/projects/:id** - Get project details
- Returns: Project with feedback history

**POST /api/projects** - Create new project
```json
{
  "title": "Project Name",
  "proposer": "Sylvia|Vincent|Kathryn|Morgan|Eliana|Maxwell|Sarah",
  "description": "Description",
  "assigned_team": "Team Name",
  "target_completion": "2024-12-31",
  "proposal_json": {
    "objectives": ["obj1", "obj2"],
    "timeline": {...},
    "budget": {...}
  }
}
```

**POST /api/projects/:id/feedback** - Submit feedback
```json
{
  "feedback_text": "Feedback text..."
}
```

**POST /api/projects/:id/approve** - Approve project
- Sets status to ACTIVE

**POST /api/projects/:id/status** - Update status
```json
{
  "status": "PROPOSED|ACTIVE|IN_PROGRESS|COMPLETE"
}
```

### Dashboard

**GET /api/dashboard** - Get dashboard statistics
- Returns: Status counts and timeline view

**GET /api/health** - Health check
- Returns: Server status and Discord connection state

## Orchestrator System

The orchestrator system allows autonomous project proposals to be generated programmatically.

### Basic Usage

```javascript
const { autonomousProposal, initializeOrchestrator } = require('./orchestrator/autonomousProposal');

// Initialize (done automatically on server startup)
initializeOrchestrator(db, discordPostFunction);

// Create a proposal
const proposal = await autonomousProposal({
  title: "Analytics Dashboard Implementation",
  proposer: "Vincent",
  description: "Build comprehensive analytics dashboard",
  orchestratorId: "analytical-orchestrator",
  objectives: [
    "Track user engagement metrics",
    "Display real-time analytics",
    "Generate monthly reports"
  ],
  timeline: {
    phase1: "Requirements & Design (2 weeks)",
    phase2: "Development (4 weeks)",
    phase3: "Testing (1 week)"
  },
  budget: {
    development: 50000,
    infrastructure: 10000,
    total: 60000,
    currency: "USD"
  },
  assigned_team: "Data Analytics Team",
  target_completion: "2024-12-15",
  reasoning: {
    source: "User engagement analysis",
    confidence: 0.95,
    priority: "high"
  }
});
```

### Available Proposers

- Sylvia
- Vincent
- Kathryn
- Morgan
- Eliana
- Maxwell
- Sarah

## Database Schema

### Projects Table

| Column | Type | Notes |
|--------|------|-------|
| id | INTEGER | Primary key, auto-increment |
| title | TEXT | Project title (required) |
| proposer | TEXT | One of the 7 proposers |
| status | TEXT | PROPOSED, ACTIVE, IN_PROGRESS, COMPLETE |
| description | TEXT | Project description |
| proposal_json | TEXT | JSON with objectives, timeline, budget |
| created_at | DATETIME | Auto-set to current timestamp |
| approved_at | DATETIME | Set when approved by CEO |
| feedback | TEXT | Latest feedback text |
| assigned_team | TEXT | Team responsible |
| target_completion | DATE | Target completion date |

### Feedback Table

| Column | Type | Notes |
|--------|------|-------|
| id | INTEGER | Primary key, auto-increment |
| project_id | INTEGER | FK to projects table |
| feedback_text | TEXT | Feedback content |
| feedback_date | DATETIME | Auto-set to current timestamp |
| status_after | TEXT | Project status when feedback given |

## Discord Integration

### Message Prefixes

**🤖 Orchestrator Directives**
- Prefix: `🤖`
- Example: `🤖 We need a user feedback collection system`
- Triggers orchestrator evaluation and proposal generation

**Commands**
- `!summary` - Get daily project summary
- `!status` - Get current project status

### Notifications

The system automatically posts to Discord when:
- New proposal is created
- Feedback is given on a proposal
- Project is approved and moved to ACTIVE
- Status updates occur

## Project Structure

```
puppet-show/
├── db/
│   └── init.js              # Database initialization
├── orchestrator/
│   └── autonomousProposal.js # Orchestrator API
├── discord/
│   └── orchestratorListener.js # Discord integration
├── public/
│   ├── index.html           # Dashboard UI
│   ├── styles.css           # Styling
│   └── app.js               # Frontend logic
├── server.js                # Express server
├── package.json
├── .env.example
└── README.md
```

## Configuration

### Environment Variables

```
PORT=3000                          # Server port
DISCORD_TOKEN=<bot_token>         # Discord bot token
DISCORD_EXECUTIVE_CHANNEL=<id>    # Channel ID for notifications
```

### Database

- SQLite database at `./puppet-show.db`
- Auto-created with schema on first run
- Indexed for performance on status, proposer, and project_id

## Status Workflow

```
PROPOSED ──[Approve]--> ACTIVE ──[Start Work]--> IN_PROGRESS ──[Complete]--> COMPLETE
```

## Example Workflow

1. **Orchestrator proposes** → Creates PROPOSED project via autonomousProposal()
2. **Discord notifies** → Post to #executive with proposal summary
3. **CEO reviews** → Checks dashboard or Discord notification
4. **CEO provides feedback** → Adds feedback via dashboard or API
5. **Discord confirms** → Notification posted to #executive
6. **CEO approves** → Sets status to ACTIVE
7. **Team implements** → Status updated to IN_PROGRESS
8. **Team completes** → Status updated to COMPLETE

## Development

### Running in Development

```bash
npm start
```

### Debugging

The server logs:
- Database initialization
- Discord connection status
- API requests
- Orchestrator proposals
- Discord notifications

Check console output for detailed information.

## Notes

- Database is SQLite (embedded, no external service needed)
- Discord integration is optional - system works without it
- All times are stored in UTC
- Dates should be in YYYY-MM-DD format
- JSON fields accept any valid JSON object

## Future Enhancements

- [ ] Email notifications
- [ ] Automated status transitions based on milestones
- [ ] Team collaboration features
- [ ] Resource allocation tracking
- [ ] Budget tracking and alerts
- [ ] Gantt chart visualization
- [ ] Slack integration
- [ ] Calendar sync
- [ ] Recurring projects
- [ ] Template proposals

---

**System Status:** Ready for orchestrator proposals 🚀
