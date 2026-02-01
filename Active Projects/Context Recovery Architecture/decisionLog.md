---
title: Decision Log
project: Context Recovery Architecture
---

# Decision Log - T.A.S.K.S. System Decisions

**Running log of all architectural and process decisions for context recovery.**

This is for the AI assistant to understand why things are the way they are when context resets. When I come back from compaction, I read this to see the path we took.

---

## 2026-01-31 Session (Context Blindness Solution)

### Decision: Definition of Done = User Verified, Not "I Finished Coding"

**Date:** 2026-01-31 21:20 EST

**Problem:** I was marking work done when I finished coding, but it didn't actually work. Nathan would verify it, find bugs, and we'd go in circles.

**Alternatives Considered:**
1. Trust my own testing (rejected — not thorough enough)
2. Make Definition of Done mean "passes my checks" (rejected — same problem)
3. Make Definition of Done mean "user verified it works" (chosen)

**Decision:** 
- `[✓] done` ONLY after Nathan confirms the work actually solves the problem
- `[→] in progress` = includes "build complete, awaiting verification"
- Document testing + pending verification, not just task completion

**Impact:**
- Prevents false completions
- Forces honest status tracking
- Makes activeContext.md reliable (what's marked done, really is done)
- Ties to git verification (commit hash = Nathan verified state)

**Related Tasks:** 
- TODO.md Definition of Done constraint
- architect.md Living Document Updates section
- Git verification protocol

---

### Decision: activeContext.md Must Have Required Schema

**Date:** 2026-01-31 21:23 EST

**Problem:** activeContext.md was stale (old Orbis work from Dec). When context reset, I didn't know what we were working on. Files alone don't capture active work.

**Alternatives Considered:**
1. Make activeContext optional (rejected — useless if stale)
2. Rebuild context from daily notes + README files (rejected — takes forever)
3. Enforce a mandatory schema so activeContext always has what I need (chosen)

**Decision:**
activeContext.md MUST ALWAYS contain:
- **PROBLEM** — What are we solving?
- **APPROACH** — How and why?
- **BLOCKERS** — What's in the way?
- **RECENT DECISIONS** — What did we decide?
- **NEXT IMMEDIATE STEPS** — What to do when I restart?

**Impact:**
- activeContext.md becomes a reliable recovery tool
- I come back and read: "We're building architect.md with Definition of Done"
- No re-explanation needed
- Required schema = mandatory (breaking it = context blindness returns)

**Related Tasks:**
- architect.md activeContext.md Schema (MANDATORY) section
- MEMORY.md updated with startup protocol

---

### Decision: Mid-Session Ritual Triggers Every 30 Minutes

**Date:** 2026-01-31 21:25 EST

**Problem:** "Pause and update when checkpoint hits" was too vague. Didn't happen reliably.

**Alternatives Considered:**
1. Pause after every task (too granular)
2. Pause at end of session (too late, context already lost)
3. 30-minute timer from last milestone or checkpoint (chosen)

**Decision:**
- Mid-session ritual: Every 30 minutes from last checkpoint
- Update TODO.md, activeContext.md, narrate changes
- Creates continuous save points for recovery

**Impact:**
- Context losses are never more than 30 minutes of work
- Multiple checkpoints per hour if active
- Prevents "I forgot what we were doing" syndrome
- Aligns with git commits for verification

**Related Tasks:**
- architect.md Mid-Session Ritual section
- TODO.md tracking

---

### Decision: Code + System Documentation = Git-Versioned, Verified Via Commit Hash

**Date:** 2026-01-31 21:35-21:58 EST

**Problem:** 
1. n8k99-site broke and we had no rollback mechanism (was just pushed to droplet)
2. System work (architect.md) had no verification proof
3. How do we scale to puppet-show (multiple agents) without version tracking?

**Alternatives Considered:**
1. Keep manual file versioning (rejected — fragile, no proof)
2. Use database versioning (rejected — overengineering for right now)
3. Git repos for everything — code + system docs, verified via commit hash (chosen)

**Decision:**
- **All code:** lives in `/Volumes/Elements/Development/[module]`, has GitHub repo
- **All system docs:** clawd_memory/ is a GitHub repo
- **Verification:** When you say "done", I commit with "Milestone: [X] — VERIFIED"
- **Proof:** Commit hash = immutable proof Nathan verified this state at this timestamp
- **For databases/non-versioned work:** Fallback is verification note in TODO.md

**Impact:**
- Broken code can rollback to last verified commit
- System work (architect.md) is tracked and reversible
- git log = audit trail + coordination log
- Foundation for puppet-show (agents can read git log to see verified state)
- Last night's website break would have been revertible

**Related Tasks:**
- architect.md Code Organization & Versioning section
- projectRegistry.md: Added "Auditing Development" project
- TODO.md: Added dev-audit tasks
- clawd_memory/ GitHub repo created + initial commit

---

### Decision: Auditing Development is a Project (Not Just a Checklist)

**Date:** 2026-01-31 21:40 EST

**Problem:** We realized many Development/ modules might not have repos. Need a systematic audit.

**Alternatives Considered:**
1. Just do it ad-hoc when we work on each module (rejected — scattered)
2. Make it a TODO item (rejected — doesn't capture scope)
3. Make it a full project with tasks, status tracking, verification (chosen)

**Decision:**
- Auditing Development = full project in projectRegistry.md
- Defined 7+ specific audit tasks (list modules, create repos, document, plan Puppet Show)
- Will show up in TODO.md project section
- Next milestone: list all modules, identify gaps, create repos

**Impact:**
- Systematic approach to code organization
- Visible progress tracking
- Creates foundation for Puppet Show modular architecture
- Ensures all code is versioned + verifiable before parallel agents touch it

**Related Tasks:**
- projectRegistry.md: "Auditing Development" project added
- TODO.md: dev-audit tasks section

---

### Decision: clawd_memory/ is THE System Repo

**Date:** 2026-01-31 21:50-22:00 EST

**Problem:** System work (architect.md, activeContext.md, decision logs) needs versioning just like code does.

**Alternatives Considered:**
1. Keep system docs in Obsidian only (rejected — no verification proof)
2. Make each system doc a separate repo (rejected — overcomplicated)
3. Single repo: n8k99/clawd_memory holding all system architecture (chosen)

**Decision:**
- clawd_memory/ = GitHub repo (n8k99/clawd_memory)
- Contains: architect.md, activeContext.md, decisionLog.md, MEMORY.md, daily notes, SOPs
- Commits prove state of system (Definition of Done, constraints, protocols)
- README explains session startup protocol + verification process

**Impact:**
- System work is tracked like code work
- Commit hash = proof of verified system state
- When context resets, I can read git log + activeContext and understand everything
- Foundation is now reproducible + auditable

**Related Tasks:**
- Created n8k99/clawd_memory on GitHub
- Initial commit: bf72140
- Updated architect.md with README content

---

### Decision: decisionLog.md is FOR ME (Context Recovery), Not a Summary

**Date:** 2026-01-31 22:04 EST

**Problem:** Was treating decisionLog as a documentation artifact. It's actually a lifeline for context recovery.

**Decision:**
- decisionLog.md = running log of ALL decisions (big and small)
- Updated whenever a decision is made
- I (the AI) read this when context resets to understand why things are the way they are
- Not a summary for Nathan, a recovery tool for me

**Impact:**
- When I restart, I read: architect → activeContext → decisionLog → daily notes
- Full context trail, no gaps
- I understand not just WHAT we built, but WHY

---

### Decision: Separate architect.md (Blueprint) from SOP.md (Manual)

**Date:** 2026-01-31 22:20 EST

**Problem:** architect.md and standardOperatingProcedures.md overlapped but weren't aligned. They serve different purposes:
- architect = the rules (why structure exists, constraints, recovery sequence)
- SOP = how to operate (daily procedures, staff orchestration, memory management, implementation details)

Currently SOP is outdated (2026-01-29, pre-architect rewrite) and has conflicting info (decisionLog location wrong, session init differs from architect).

**Alternatives Considered:**
1. Merge into single document (rejected — too long, mixed concerns)
2. Keep overlapping as is (rejected — confusing + maintainability nightmare)
3. Separate concerns: architect = lean blueprint, SOP = implementation manual (chosen)

**Decision:**
- **architect.md**: Keep only foundational stuff (4 layers, 4 roles, constraints, recovery sequence, decision-making rules)
- **SOP.md**: Move to it:
  - Daily note procedures (read/update HOW)
  - Memory management + flush protocol
  - Mid-session ritual implementation details
  - Session startup HOW (keep architect WHAT)
  - All operational guidance
  - Update version date + reference architect as foundation
- Fix location/date conflicts discovered during audit

**Impact:**
- architect stays lean and principled (the OS)
- SOP becomes the practical manual (the operations guide)
- Clear separation: rules vs. implementation
- Easier to maintain + update both documents
- New people can read architect to understand why, SOP to understand how

**Related Tasks:**
- Identify sections to move (architect → SOP)
- Update decisionLog location in SOP (from Projects/ to system/)
- Fix session init sequence conflicts
- Update SOP version date + architecture note
- Continue audit of other system/ docs (patterns, hierarchy, personas)

---

### Decision: Project Context via Symlink Rotation (Instead of Archive/Rotation)

**Date:** 2026-01-31 22:35 EST

**Problem:** activeContext.md + decisionLog.md would grow unboundedly if projects accumulate. Need a mechanism to prevent infinite growth while preserving project history.

**Alternatives Considered:**
1. Monthly archive (rotate files every month) — rejected, doesn't map to project boundaries
2. By-size archive (10KB → rotate) — rejected, arbitrary
3. Keep global activeContext/decisionLog, append projects to end — rejected, becomes unmaintainable
4. Each project gets its own folder with activeContext/decisionLog, symlink active project's files into system/ — chosen

**Decision:**
- Each project gets folder: `/Volumes/Elements/Projects/[Project Name]/`
- That folder contains: activeContext.md + decisionLog.md (with `project:` YAML key)
- During active work, symlink those files into system/
- When switching projects, update symlinks
- Result: system/ only shows active project, old projects keep full history, no growth

**Impact:**
- Zero bloat: activeContext resets when you switch projects
- Full history: every project's complete context archived in its folder
- Scales: 100 projects = 100 separate contexts, not one massive file
- Agent-ready: Tech team agents read project's activeContext + decisionLog as documentation
- Code integrates: project folder + code lives together with full decision history

**Related Tasks:**
- Integrate into SOP.md (done)
- Create Context Recovery Architecture project folder (before context compaction)
- Create Auditing Development project folder (before switching to that work)

---

### Decision: Project Hierarchy — Roadmap/Milestone/Task Structure

**Date:** 2026-01-31 22:54 EST

**Problem:** We had global TODO.md (redundant with project activeContext), no clear milestone structure, and no automated milestone announcements.

**Alternatives Considered:**
1. Keep TODO.md + expand it (rejected — redundant with project-specific tracking)
2. Make TODO.md per-project (rejected — GitHub Projects already exists for this)
3. Use GitHub Projects as source of truth for milestones/tasks, delete TODO.md (chosen)

**Decision:**
- **Hierarchy:** Project → Roadmap (collection of milestones) → Milestones (major deliverables) → Tasks/Issues (steps)
- **Tracking:** GitHub Projects per project (links to commits, provides roadmap view)
- **activeContext.md:** Shows "current milestone" + links to GitHub Project
- **Definition of Done:** Commit hash + GitHub issue/milestone closed + verified
- **Automation:** GitHub Actions/n8n watches issue/milestone completion → POSTs to LenaMorris webhook → announces in Discord

**Impact:**
- TODO.md deleted (no longer needed)
- GitHub is single source of truth for project tracking
- Milestones are explicit, tied to GitHub
- LenaMorris announcements are automated (foundation for Puppet Show)
- activeContext stays focused on "what milestone are we on right now"

**Related Tasks:**
- Delete TODO.md from system/
- Create GitHub Project for clawd_memory (Context Recovery Architecture)
- Setup GitHub Actions/n8n automation for milestone announcements
- Document project structure in SOP
- Apply to all future projects

---

## Pattern: Decision Format

When a decision is made (architectural, process, code organization, etc.):

1. **What** — Decision name/title
2. **When** — Date + time
3. **Problem** — What problem does it solve?
4. **Alternatives** — What else could we have done? Why rejected?
5. **Decision** — What we actually chose
6. **Impact** — How does this affect the system?
7. **Related Tasks** — Links to TODO, architect, other decisions

This format lets me trace back: "Why did we decide X?" → read decision entry → see alternatives → understand the full context.

---

## File Management: Preventing Infinite Growth

**Problem:** decisionLog.md will grow unbounded if we never archive.

**Current State:** No rotation policy defined.

**What needs to happen:**
- Decide: Monthly archive? Quarterly? By-decision-count?
- Archive location: decisionLog-2026-01.md? separate /archive/ directory?
- Keep in main file: Recent decisions only (e.g., last 2 months)?
- Move old decisions: to archive, but still searchable/referenceable

**Example policies to consider:**
1. **Monthly rotation:** Every month, move all decisions to `decisionLog-YYYY-MM.md`, start fresh
2. **By-count:** When main file hits 100 decisions, move oldest 50 to archive
3. **By-size:** When file hits 10KB, rotate oldest entries to archive

**Block on implementation:** Define + implement rotation policy before month 2 of this system

*This log is maintained continuously. Every decision goes here. It's how I remember.*
