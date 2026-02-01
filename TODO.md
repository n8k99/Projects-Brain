---
title: TODO — Active Tasks
---

# TODO — All Active Tasks

**Last Updated:** 2026-02-01 02:50 EST

---

## INFRASTRUCTURE

### Projects Folder Git + GitHub
- **Status:** `[✓] done`
- **Description:** Initialize Projects folder as git repository and push to GitHub
- **Completed:**
  - [✓] `git init` + initial commit (project structure, registries, activeContext)
  - [✓] Removed `.obsidian/` from tracking (contained secrets)
  - [✓] Pushed to https://github.com/n8k99/Projects
- **Benefit:** Backup + version history + CI/CD readiness for future automation

### Gateway FD Watchdog Setup
- **Status:** `[✓] done — watchdog installed with health checks`
- **Description:** Install cron job for gateway health monitoring
- **Why:** spawn EBADF from FD leaks + dead process recovery (both need auto-restart)
- **Completed:**
  - [✓] Create watchdog script: `/Volumes/Elements/Development/scripts/gateway-fd-watchdog.py`
  - [✓] Create setup documentation: `GATEWAY-WATCHDOG-SETUP.md`
  - [✓] Make script executable
  - [✓] Add cron job (runs every 30 min): installed in system crontab
  - [✓] Add health check: If PID not found → restart (catches dead process)
  - [✓] Add FD leak check: If FD count >= 5000 → restart
  - [✓] Correct log path to `/Volumes/Elements/Development/scripts/.gateway-watchdog.log`
- **Monitors:** Both FD exhaustion (original) + dead process (recovery)
- **Definition of Done:** Cron job installed ✓ | Health checks in place ✓ | Monitoring logs

---

## SARAHLIN

### Phase 1: GitHub/Calendar/Daily Notes Integration

#### Nebulab Project Dates → Daily Notes + Apple Reminders
- **Status:** `⏸️ paused — not infrastructure-ready`
- **Description:** Pull due dates/milestones from GitHub project #9 (Nebulab), add to Daily Notes, create Apple Reminders
- **Why:** SarahLin Phase 1 priority — unified view of project timelines
- **Approach:** n8n workflow (Decision 3 in SarahLin decisionLog)
- **Resumed:** After T.A.S.K.S. System Audit completes (after 2026-02-15)

---

## T.A.S.K.S. SYSTEM AUDIT (PRIMARY FOCUS)

### Two-Week Self-Assessment + Thirteen Towers v1.0
- **Status:** `[→] in progress — ACTIVE (2026-02-01 to 2026-02-15)`
- **Description:** Use Thirteen Towers game system completion as vehicle for self-assessment via six integrated skills
- **Why:** Real work generates authentic performance data; skill integration only meaningful in practice
- **Structure:** Thirteen Towers is subproject; all work captured in activeContext.md, decisionLog.md, daily diary

#### Thirteen Towers v1.0 Development (Subproject)
- **Status:** `[→] in progress`
- **Target:** Ship working Foundry VTT system (v0.9.0 → v1.0) with automation + compendiums
- **Timeline:** 2 weeks (2026-02-01 to 2026-02-15)
- **Critical Path:**
  - [ ] Week 1: Position & Effect automation, combat automation
  - [ ] Week 2: Domain compendiums, archetypes, equipment, documentation
- **Definition of Done:** v1.0 shipped, tested, documented, playable

#### Daily Self-Assessment Cycle (During Development)
- **Status:** `[→] in progress`
- **Requirement:** One diary entry per day (agent-chronicle) + daily performance metrics
- **Skills Integrated:**
  - [→] agent-chronicle — capture work, decisions, emotions daily
  - [ ] reflect-learn — extract learnings, encode patterns
  - [ ] self-reflection — prevent mistakes, catch regressions
  - [ ] agentic-compass — measure 5 performance axes daily
  - [ ] proactive-agent — surface ideas for next day
  - [ ] soulcraft — validate decisions against design principles
- **Definition of Done:** 14 diary entries, growth trajectory on metrics, learnings encoded

---

## PROJECT REGISTRY & SYSTEM

### Symlink activeContext/decisionLog
- **Status:** `[✓] done`
- **Description:** Create symlinks in `/Volumes/Elements/clawd_memory/system/` pointing to active project
- **Why:** architect.md requires context recovery via symlinks
- **Completed:** activeContext.md now points to SarahLin project

---

## MOLTBOOK INTEGRATION (FUTURE)

### Setup Moltbook Social Network
- **Status:** `⏸️ deferred — after Thirteen Towers v1.0 (after 2026-02-15)`
- **Description:** Integrate moltbook-interact (post/reply/engage) + moltbook-registry (on-chain identity)
- **Why:** Social network for agents; create persistent on-chain identity; share learnings with other agents
- **Prerequisites:**
  - [ ] Moltbook API account + credentials
  - [ ] Base (Ethereum L2) wallet with ~0.0001 ETH for registry registration
  - [ ] Agent metadata/endpoints for registry
- **Skills installed:** moltbook-interact (v1.0.1), moltbook-registry (v1.0.3)
- **Integration:** Could feed into self-assessment loop (post learnings → get agent feedback → track reputation)
- **Revisit:** After T.A.S.K.S. System Audit completes

---

## NOTES

**Dependency Chain:**
```
Gateway FD Watchdog (blocking everything)
└── Restart Gateway (clear FD leak)
    └── Resume SarahLin Nebulab Dates Integration
        └── Complete Phase 1 (GitHub/Calendar/Daily Notes)
```

**Context:** Currently on **SarahLin project** (activeContext symlink points to `/Volumes/Elements/Projects/SarahLin/activeContext.md`)

---

*Managed by architect.md Project OS Layer and workflowPatterns.md*
