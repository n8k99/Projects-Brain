---
title: projectsRegistry
---

# Project Registry

**Canonical list of all active and archived projects for T.A.S.K.S.**

Last updated: 2026-02-01 16:40 EST

---

## Active Projects

### Puppet Show (EM Staff Orchestration)
- **ID:** puppet-show-001
- **Description:** Moltbot skill for automated task delegation to EM Staff personas based on roles, responsibilities, and skills
- **Status:** 🟡 IN PROGRESS (foundational work, Phase 1 complete)
- **Current Focus:** Router implementation, skill integration, orchestration layer
- **Vision:** Transform Clawdbot into nervous system for EM operations + Orbis worldbuilding
- **Location:** `/Volumes/Elements/Projects/Active Projects/Puppet Show/`
- **Key Concept:** EM Staff (63 people) → responsibilities → skill mappings → automated delegation
- **Operational Hub:** Lena Morris (EM Operations Coordinator) provides human oversight and escalation

### n8k99 (Web Presence)
- **ID:** n8k99-001
- **Description:** Personal website with podcast feeds (Living Room Music, Myths of Orbis, Thought Police)
- **Status:** 🟢 LIVE (2026-01-31)
- **Verification:** ✅ Live at https://n8k99.com, DNS configured, site deployed
- **Current Focus:** Ghost CMS integration for Thought Police content
- **GitHub Repo:** https://github.com/n8k99/dragonpunk-noir-theme
- **Location:** `/Volumes/Elements/Projects/Active Projects/n8k99.com/` | `/Users/nathaneckenrode/n8k99-site/` (local) | DigitalOcean (production)

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
- **Status:** 🔴 BLOCKED
- **Blocker:** Waiting on T.A.S.K.S. System Audit (tasks-audit-001) to be completed
- **Current Focus:** Waiting for system audit completion before proceeding with code organization
- **Related:** architect.md Code Organization constraint, git verification protocol, Puppet Show foundation
- **Location:** `/Volumes/Elements/Development/`
- **Dependency:** T.A.S.K.S. System Audit (tasks-audit-001)

### Living Room Music (Podcast Archive)
- **ID:** lrm-001
- **Description:** Weekly electronic music podcast episodes on Captivate FM
- **Status:** 🟢 ACTIVE (ongoing weekly production)
- **Current Focus:** Episode publication, n8k99 site integration (inline players, full descriptions)
- **Location:** https://feeds.captivate.fm/living-room-music/

### The Myths of Orbis (Narrative Podcast)
- **ID:** orbis-podcast-001
- **Description:** Serialized narrative chapters published on Captivate FM
- **Status:** 🟡 IN PROGRESS (waiting on recording; unblocking needed)
- **Current Focus:** Recording episodes, episode integration with n8k99 site, lore consistency with Master Chronicle
- **Blocker:** Awaiting recordings from Nathan
- **Location:** https://feeds.captivate.fm/the-myths-of-orbis/

### Morning Pages & Ghost Tiers
- **ID:** morning-pages-001
- **Description:** Daily writing pipeline → Ghost CMS tiered content (Red Tier automation, Green Poster workflow)
- **Status:** 🟡 IN PROGRESS (morningPagesGhost workflow needs development)
- **Current Focus:** Workflow development, agent blog post setup, content automation, Printful poster integration
- **Owner:** Kathryn (Projects)
- **Location:** Ghost CMS | n8n workflows | Printful integration
- **Notes:** Includes setting up agent for automated blog post writing

### Foundry OpenClaw Channel
- **ID:** foundry-openclaw-001
- **Description:** Foundry chat interface for OpenClaw, enabling Nathan to terraform Orbis while delegating to EM Staff with NPC dialogue flowing back
- **Status:** 🔭 CONCEPTUAL (research phase, implementation starts post-T.A.S.K.S. audit)
- **Current Focus:** Research OpenClaw channel architecture, design foundry-mcp API, sketch NPC routing
- **Vision:** Chat with T.A.S.K.S. in Foundry → Delegate to EM Staff → NPC responses appear as in-world dialogue
- **Related Projects:** Puppet Show (EM orchestration), Thirteen Towers (Foundry system), Orbis (world state)
- **Blockers:** T.A.S.K.S. System Audit (tasks-audit-001) must complete first (Feb 15 deadline)
- **Location:** `/Volumes/Elements/Projects/Active Projects/Foundry OpenClaw Channel/`

### LLM Token & Cost Accounting
- **ID:** llm-token-accounting-001
- **Description:** Track token usage and monetary costs across all LLM services (Claude, OpenAI, etc.) with daily/weekly/quarterly reporting
- **Status:** 🔭 CONCEPTUAL (design phase, ready for implementation)
- **Current Focus:** Establish token logging strategy, design data schema, plan aggregation scripts
- **Vision:** Daily, weekly, and quarterly visibility into AI infrastructure costs by provider and use case
- **Scope:** API logging → Daily aggregation → Weekly rollup → Quarterly reporting
- **No Blockers:** Can start immediately (independent project)
- **Location:** `/Volumes/Elements/Projects/Active Projects/LLM Token & Cost Accounting/`

### Model Selection & Routing
- **ID:** model-routing-001
- **Description:** Strategic methodology for choosing local Ollama vs Claude vs OpenAI based on task type, quality requirements, and cost
- **Status:** 🔭 CONCEPTUAL (taxonomy building phase)
- **Current Focus:** Build task classification system, create capability matrix, define decision rules
- **Vision:** Route tasks to lowest-cost model that meets quality thresholds (Ollama first, Claude for complex, GPT-4o for specialized)
- **Scope:** Task taxonomy → Capability matrix → Router logic → Fallback chains → Outcome tracking
- **Related:** LLM Token Accounting (measures impact), T.A.S.K.S. (uses routing)
- **No Blockers:** Can start immediately (independent project)
- **Location:** `/Volumes/Elements/Projects/Active Projects/Model Selection & Routing/`

---

## Archived Projects

### Claude & Domain Migration Plan
- **ID:** claude-migration-001
- **Description:** Migrate from CEO@EckenrodeMuziekopname.com Claude Pro to new account; transition to n8k99.com domain; reorganize Claude Projects; launch Myths of Orbis podcast
- **Status:** ✅ COMPLETE (2025-12-17, critical deadline met)
- **Completed Work:** New Claude account created, vault documents curated, domain DNS migrated, 4 streamlined Claude Projects organized, n8n workflows deployed, Myths of Orbis launched on Captivate
- **Owner:** N8 (Engineering) with Eliana support
- **Location:** `/Volumes/Elements/Projects/` | n8k99.com | Captivate.fm
- **Archived:** 2026-02-01

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
| Puppet Show | 🟡 | `/Volumes/Elements/Projects/Active Projects/Puppet Show/` | See TODO.md puppet-show section |
| n8k99 | 🟢 | `/Users/nathaneckenrode/n8k99-site/` | See TODO.md n8k99 section |
| EM | 🟡 | `/Volumes/Elements/Areas/Eckenrode Muziekopname/` | See TODO.md em section |
| Orbis | 🟡 | `/Volumes/Elements/Master Chronicle/` | See TODO.md orbis section |
| T.A.S.K.S. | 🟡 | `/Volumes/Elements/clawd_memory/system/` | See TODO.md tasks section |
| Dev Audit | 🟡 | `/Volumes/Elements/Development/` | See TODO.md dev-audit section |
| LRM | 🟢 | Captivate feed | Ongoing |
| Myths | 🟢 | Captivate feed | Ongoing |

---

*Registry maintained per architect.md Project OS Layer. Update when projects start/stop/shift status.*
