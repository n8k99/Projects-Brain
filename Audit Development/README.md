---
title: Audit Development/
project: Audit Development
status: 🔭 Planning (Phase One: Inventory, starts 2026-02-15)
created: 2026-02-01
scope: Complete audit and refactor of /Volumes/Elements/Development/
---

# Audit Development/

Complete audit and refactor of `/Volumes/Elements/Development/` — a 57-project, 58GB directory combining:
- Real codebased projects (tasks-combat-engine, em-staff-notion, website, etc.)
- Cloned third-party repos (Nodebook, mongodb, foundry-vtt-mcp, homebrewery, renpy SDK, etc.)
- Legacy code (MoonAndSun from 2014, old tutorials, abandoned projects)
- One-off scripts scattered at root (ActiveEpisodes.gs, discord-to-foundry.js, twittercli.py, etc.)
- Backups and PDFs (Journal Backups, My Diary.pdf, Personal Logs.pdf, export zips)
- Python virtual environments (myenv, mtenv — 23MB combined)

**Goal:** Understand what we have, organize it coherently, consolidate one-off scripts into modular systems, identify what's actively used vs. abandoned.

---

## Phase One: Inventory & Understanding (2026-02-15 → ~2026-02-28)

**Do not modify anything. Only investigate and document.**

### What Phase One Covers

#### 1. Directory Categorization

Sort 57 directories into categories:

**Active Codebased Projects** (actively developed, in use)
- tasks-combat-engine (206MB)
- tasks-dice-roller (201MB)
- em-staff-notion (147MB)
- em-wiki-grand (82MB)
- website (33MB)
- tasks-menubar (1.2MB)
- tasks (13MB) — main tasks CLI?
- n8k99.github.io (1.1MB)
- tasks-gas-tank (448KB)
- eliana_bot (2.0MB)
- foundry-integration (56KB)
- obsidian-discord-bridge (416KB)

**Cloned Third-Party Repos** (external projects, not owned)
- Nodebook (2.1GB)
- mongodb (722MB)
- foundry-vtt-mcp (524MB)
- homebrewery (520MB)
- renpy-8.4.1-sdk (352MB)
- AFGW-Viewer-plugin (77MB)
- Fantasy-Map-Generator (72MB)
- RSS-Planet (31MB)
- macos-chat-app (353MB)
- n8n (8KB)
- Plus ~15 others (astropy, py-api-*, oandapy, forex, etc.)

**Python Virtual Environments** (can be regenerated)
- myenv (13MB)
- mtenv (10MB)

**Legacy/Abandoned** (old, not in use)
- MoonAndSun (1.9MB, from 2014)
- Hello (6.2MB)
- WorldOfOrbisBroken (344KB)
- proj1 (336KB)
- Untitled unused (104KB)
- minecraft (13MB) — game project?
- Locked (56KB)
- 04 HELP_WANTED_Game (1.6MB)

**Uncertain/Needs Investigation**
- T.A.S.K.S. (24KB) — old scripts? duplicate of system?
- TechDevelopmentTeam (8KB)
- Laptop Development (584KB)
- t_a_s_k_s_em_rogue_ai (7.3MB, 856KB duplicate?)
- tasks (13MB) — what is this vs tasks-*?
- scripts (6.6MB) — general scripts folder?
- adf-astrocalc (1.0MB)
- abysmal (8KB)
- buoy (8KB)
- day-of-week (224KB)
- euler (728KB)
- minicart (1.4MB)
- vizicities (3.4MB)

**Other Directories**
- JOurnal Backups (601MB) — old backups, archive-worthy?
- Projects (3.4MB) — what's the relationship to /Volumes/Elements/Projects/?
- Text (104KB) — random text files
- iOS (1.2MB)
- backstage-rigger-main (72KB)
- Sun Data (48KB)

#### 2. Root-Level Files (40 files, 500MB+)

**Large Files** (probably archive-worthy)
- My Diary.pdf (61MB)
- Personal Logs.pdf (9.0MB)
- Solar & Lunar Events.pdf (5.4M)
- Data.zip (258MB)
- Written (5.4M)
- 3ab5f3c2...Export (160MB)
- 946e5c9d...Export (887KB)

**Documentation**
- README.md (7.6KB)
- MIGRATION_LOG.md (4.6KB)
- PROJECTS_INDEX.md (9.0KB)

**One-Off Scripts** (15+ scattered at root)
```
ActiveEpisodes.gs (4.0KB)
discord-to-foundry.js (2.9KB)
discord-to-foundry.py (2.5KB)
driveManger.gs (6.0KB)
driveManger.js (5.4KB)
enhanced (6.0KB)
epl-table.py (1.1KB)
icalbuddy.py (125B)
notion_test.py (1.6KB)
scheduleFutureEpisodes.gs (4.2KB)
stupid.py (1.5KB)
test-mailgun.py (625B)
twittercli.py (15KB)
foundry-discord-bridge.js (24KB)
```

**Loose Directories/Folders** (at root)
- keys (1.6KB)
- football (24KB)
- em (42B)
- poll (625B)
- untitled (multiple, 3.7KB + 3.7KB + 184B)
- n8n (1.5KB folder)
- newfile.txt (0B)
- anthropomorphic (108B)
- celtic_calendar_pseudo_code (959B)
- Keys.txt (122B)

#### 3. GitHub Integration

For each real project, determine:
- Does it have a GitHub repo? Which one?
- Is it being tracked in GitHub Projects?
- When was it last updated?
- What's its actual purpose?

#### 4. Dependency Analysis

For active projects:
- What do they depend on?
- Are there shared dependencies that could be modularized?
- Do any have duplicate functionality (e.g., multiple discord-to-foundry bridges)?

#### 5. One-Off Script Consolidation Opportunities

Identify scripts that could be consolidated:
- **Podcast/Ghost Workflow** — ActiveEpisodes.gs, scheduleFutureEpisodes.gs, tasks-related ghost scripts
- **Discord Integrations** — discord-to-foundry.js, discord-to-foundry.py, foundry-discord-bridge.js, obsidian-discord-bridge
- **Notion Integrations** — notion_test.py, em-staff-notion
- **Financial APIs** — oandapy, py-api-trading, py-position-aggregation, py-api-streaming, forex, epl-table.py
- **File Management** — driveManger.gs, driveManger.js
- **Miscellaneous** — twittercli.py, icalbuddy.py, stupid.py, test-mailgun.py

#### 6. Deliverables for Phase One

**Inventory Document** (~10-15 pages)
- Complete categorization table with columns: Name, Size, Category, Purpose, Status, GitHub Link, Last Updated, Notes
- Visual breakdown: pie charts showing space by category
- Dependency map: which projects depend on which others
- Risk assessment: what's at risk of being lost if deleted?

**Consolidation Opportunities Document**
- Identified script families (groups of related one-offs)
- Potential modular utilities to create
- Estimated effort to consolidate each family
- Impact analysis: which projects would benefit from consolidation?

**Recommendations Document**
- Which directories should be archived (legacy, cloned repos no longer used)
- Which projects need GitHub organization
- Which one-offs should become first-class modular utilities
- Organization structure recommendation for Phase Two

**Phase Two Plan**
- Detailed breakdown of refactoring work
- Timeline estimate
- Risk assessment

---

## Timeline

**Phase One (Inventory):** 2026-02-15 to ~2026-02-28 (2 weeks)
- Week 1: Deep dive through all 57 directories, script investigation, dependency analysis
- Week 2: Consolidate findings, create documentation, propose organization structure

**Phase Two (Refactor):** 2026-03-01 to ~2026-03-31 (4 weeks estimated)
- Archive old/cloned repos
- Consolidate one-off scripts into modular utilities
- Organize into proper PARA structure
- Set up GitHub Projects for each real codebase
- Update internal documentation

---

## Success Criteria

**Phase One is complete when:**
- [ ] All 57 directories categorized and documented
- [ ] Root files accounted for (large files identified for archiving, loose scripts consolidated into categories)
- [ ] Dependency map drawn (which projects use which)
- [ ] Consolidation opportunities identified with effort estimates
- [ ] Recommendations document approved by Nathan
- [ ] Phase Two plan documented and timeline agreed

---

**Next Steps:**
On 2026-02-15, create activeContext.md and begin systematic inventory.

