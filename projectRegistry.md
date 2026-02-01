---
title: Project Registry
---

# Project Registry

**Canonical list of all active and archived projects for T.A.S.K.S.**

Last updated: 2026-01-31 21:11 EST

---

## Active Projects

### n8k99 (Web Presence)
- **ID:** n8k99-001
- **Description:** Personal website with podcast feeds (Living Room Music, Myths of Orbis, Thought Police)
- **Status:** 🟢 LIVE (2026-01-31)
- **Verification:** ✅ Live at https://n8k99.com, DNS configured, site deployed
- **Current Focus:** Ghost CMS integration for Thought Police content
- **Location:** `/Volumes/Elements/Projects/n8k99/` | `/Users/nathaneckenrode/n8k99-site/`

### Eckenrode Muziekopname (EM Operations)
- **ID:** em-001
- **Description:** Business operations, staff orchestration, creative projects
- **Status:** 🟡 IN PROGRESS
- **Current Focus:** Puppet Show workflow (EM Staff coordination via Discord)
- **Related:** Clawdbot integration, staff profiles, operational workflows
- **Location:** `/Volumes/Elements/Areas/Eckenrode Muziekopname/`

### Master Chronicle / Orbis (Worldbuilding)
- **ID:** orbis-001
- **Description:** Complete fictional world with provinces, factions, history, lore
- **Status:** 🟡 IN PROGRESS (continuous development)
- **Current Focus:** Lore consistency, temporal hierarchy enforcement, province completeness
- **Related:** temporalHierarchy.md, orbisLoreCreationWorkflow.md, Master Chronicle vault
- **Location:** `/Volumes/Elements/Master Chronicle/` | `/Volumes/Elements/Areas/` (symlinked)

### T.A.S.K.S. System Audit (Self-Assessment + Development)
- **ID:** tasks-audit-001
- **Description:** Two-week self-assessment via six integrated skills, using Thirteen Towers v1.0 completion as work vehicle
- **Status:** 🟡 IN PROGRESS (2026-02-01 to 2026-02-15)
- **Current Focus:** Thirteen Towers Foundry system (automation + compendiums), daily skill integration, performance measurement
- **Related:** agent-chronicle, reflect-learn, self-reflection, agentic-compass, proactive-agent, soulcraft
- **Subproject:** Thirteen Towers Gaming System (Foundry VTT system)
- **Location:** `/Volumes/Elements/Projects/T.A.S.K.S. System Audit/`

### Thirteen Towers Gaming System (Subproject)
- **Parent:** T.A.S.K.S. System Audit
- **ID:** thirteen-towers-001
- **Description:** Foundry VTT system for narrative investigation game set on Orbis
- **Status:** 🟡 IN PROGRESS (v0.9.0 → v1.0, 2 weeks)
- **Current Focus:** Position & Effect automation, domain compendiums, combat system, documentation
- **Location:** `/Volumes/Elements/Projects/T.A.S.K.S. System Audit/Thirteen Towers Gaming System/`

### Auditing Development (Code Repo Inventory)
- **ID:** dev-audit-001
- **Description:** Audit all modules in Development/, ensure each has GitHub repo for version control + verification
- **Status:** 🟡 IN PROGRESS
- **Current Focus:** Catalog existing modules, create GitHub repos, establish code organization standard
- **Related:** architect.md Code Organization constraint, git verification protocol, Puppet Show foundation
- **Location:** `/Volumes/Elements/Development/`
- **Next Step:** List all modules, identify which need repos, create them on GitHub

### Living Room Music (Podcast Archive)
- **ID:** lrm-001
- **Description:** Weekly electronic music podcast episodes on Captivate FM
- **Status:** 🟢 ACTIVE (ongoing weekly production)
- **Current Focus:** Episode publication, n8k99 site integration (inline players, full descriptions)
- **Location:** https://feeds.captivate.fm/living-room-music/

### The Myths of Orbis (Narrative Podcast)
- **ID:** orbis-podcast-001
- **Description:** Serialized narrative chapters published on Captivate FM
- **Status:** 🟢 ACTIVE (ongoing publication)
- **Current Focus:** Episode integration with n8k99 site, lore consistency with Master Chronicle
- **Location:** https://feeds.captivate.fm/the-myths-of-orbis/

---

## Archived Projects

(None currently archived — add when projects reach completion or indefinite pause)

---

## Project Status Indicators

- 🟢 **LIVE/ACTIVE** — Running, no major work needed, ongoing maintenance
- 🟡 **IN PROGRESS** — Active development, milestones being reached
- 🔴 **BLOCKED** — Waiting on external dependency or decision
- ⚪ **PAUSED** — Intentionally paused, will resume
- ⬜ **ARCHIVED** — Completed or permanently shelved

---

## Quick Navigation

| Project | Status | Docs | TODO |
|---------|--------|------|------|
| n8k99 | 🟢 | `/Users/nathaneckenrode/n8k99-site/` | See TODO.md n8k99 section |
| EM | 🟡 | `/Volumes/Elements/Areas/Eckenrode Muziekopname/` | See TODO.md em section |
| Orbis | 🟡 | `/Volumes/Elements/Master Chronicle/` | See TODO.md orbis section |
| T.A.S.K.S. | 🟡 | `/Volumes/Elements/clawd_memory/system/` | See TODO.md tasks section |
| Dev Audit | 🟡 | `/Volumes/Elements/Development/` | See TODO.md dev-audit section |
| LRM | 🟢 | Captivate feed | Ongoing |
| Myths | 🟢 | Captivate feed | Ongoing |

---

*Registry maintained per architect.md Project OS Layer. Update when projects start/stop/shift status.*
