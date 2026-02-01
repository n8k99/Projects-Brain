# Context Recovery Architecture

**Project ID:** cra-2026-01

**Status:** 🟡 IN PROGRESS

## Overview

Building the T.A.S.K.S. system foundation to solve **context blindness** — the problem where an AI assistant loses the thread of what it's building when context resets between sessions.

## Roadmap

### Milestone 1: Initial SOP Read/Edit ✅ COMPLETE
- architect.md rewritten (context management OS)
- SOP.md integrated Project Context Management
- workflowPatterns aligned with GitHub Projects
- TODO.md deleted (replaced by GitHub Projects)

### Milestone 2: System/ Audit Complete 🟡 IN PROGRESS
- Audit temporalHierarchy.md
- Audit system/personas/
- Identify conflicts/redundancies
- Document findings

### Milestone 3: Finalization back to architect
- Refine architect.md based on audit findings
- Complete remaining SOP sections
- Consistency pass across all system/ docs
- Ready for implementation

## Key Artifacts

- **activeContext.md** — Current work status + decisions
- **decisionLog.md** — Running log of all architecture decisions
- **GitHub Project** — Milestones, issues, tracking
  - URL: https://github.com/n8k99/clawd_memory/projects/1

## How This Works

1. **Project folder** contains activeContext.md + decisionLog.md
2. **System/ symlinks** point to project folder (single source of truth)
3. **When switching projects**, symlinks are updated to new project
4. **GitHub tracks** milestones and issues
5. **Commits close issues** via "Fixes #123" messages

This structure prevents infinite file growth (each project resets its own context) while preserving full history.

## Problem Solved

**Before:** 
- When context reset, I had no way to know what we were building
- TODO.md grew unbounded
- No clear definition of "done"
- No project-to-milestone mapping

**After:**
- activeContext.md + decisionLog.md capture full context per project
- GitHub Projects track milestones and issues
- Definition of Done = user verified + commit hash
- Symlink rotation prevents file bloat
- Parallel projects can coexist

## Related Documentation

- **architect.md** — System OS blueprint
- **standardOperatingProcedures.md** — How to operate within architect
- **workflowPatterns.md** — Step-by-step workflows
- **MEMORY.md** — Session startup protocol

## Last Updated

2026-01-31 23:43 EST
