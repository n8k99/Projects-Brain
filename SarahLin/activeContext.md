---
title: Active Context — SarahLin
project: SarahLin
status: 🟡 Planning Phase 1
updated: 2026-02-01
---

# Active Context — SarahLin

## PROBLEM

Nathan's schedule exists in multiple places:
- Apple Calendar (personal events)
- GitHub Milestones (project deadlines)
- Daily notes (work priorities)
- n8n (automation triggers)
- Email (incoming requests)

No single person/service coordinating them. No unified view. Sarah Lin fills that gap.

**Specific need:** Calendar integration so Nathan sees project timelines (start/due dates) in one place, with automated coordination between systems.

## APPROACH

Build SarahLin as a **service layer** (not a full agent):

1. **n8n workflows** — Automate sync between GitHub, Calendar, Daily Notes
2. **Email agent** — Sort/route/flag incoming mail  
3. **Calendar manager** — Maintain Apple Calendar as source of truth
4. **Puppet Show hook** — Ensure delegated tasks have clear deadlines
5. **Timeline coordinator** — Populate daily notes with start/due dates

## BLOCKERS

1. **exec spawn EBADF** (infrastructure) — clawdbot gateway has FD leak, blocking all exec commands
   - Cause: memory subsystem leaks file descriptors from git object indexing
   - Symptom: Every exec/spawn command fails with "spawn EBADF"
   - Solution: Gateway watchdog created (monitors FD count, restarts when threshold hit)
   - Status: Watchdog script written (`gateway-fd-watchdog.py`), awaiting cron setup + restart to test
   - Impact: Can't build n8n workflows or pull Nebulab dates until exec works
   - Next: Install cron job, restart gateway, resume Nebulab date integration

## DECISIONS

**Decision 1:** SarahLin is a service layer, not a full agent
- Reason: Nathan already has T.A.S.K.S. (full agent). SarahLin is orchestration/coordination.
- Impact: Simpler to build, focused scope, integrates with existing systems

**Decision 2:** Start with GitHub/Calendar integration
- Reason: Most critical gap right now (no calendar view of project timelines)
- Impact: Phase 1 focuses on this; email/Puppet Show come later

**Decision 3:** n8n as primary automation engine
- Reason: Already in use, powerful for workflow automation
- Impact: SarahLin's workflows live in n8n; no new platform

## NEXT STEPS

1. Map all systems SarahLin needs to touch (GitHub, Calendar, Daily Notes, n8n, Puppet Show)
2. Design n8n workflow for daily notes population
3. Test GitHub → Calendar integration
4. Build email agent architecture
5. Create Puppet Show coordination protocol
