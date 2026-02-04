---
title: Decision Log — T.A.S.K.S. System Audit
project: T.A.S.K.S. System Audit
---

# Decision Log — T.A.S.K.S. System Audit

## Decision 1: Use Thirteen Towers as Vehicle for Self-Assessment (2026-02-01 03:15 EST)

**Problem:** Six installed skills (agent-chronicle, reflect-learn, self-reflection, agentic-compass, proactive-agent, soulcraft) exist in isolation. Without real work generating performance data, any self-assessment would produce false positives ("I'm great at X") based on theory, not practice.

**Alternatives Considered:**
1. Build a standalone "self-assessment harness" (artificial, no real work output)
2. Use existing projects (EM, Orbis, etc.) but those are blocked by infrastructure
3. Use Thirteen Towers Gaming System as work vehicle (chosen)
4. Generate fake scenarios for measurement (defeats the purpose)

**Decision:** Thirteen Towers becomes the centerpiece of T.A.S.K.S. System Audit project. Complete v1.0 Foundry system in 2 weeks while integrating all six skills for real-time assessment.

**Reasoning:**
- Thirteen Towers is real work with clear Definition of Done (v1.0 complete, tested, documented)
- Requires creativity + rigor + design decision-making (tests all skills)
- Game design is inherently creative (allows "inner child" expression Nathan mentioned)
- Clear metrics: compendiums populated, automation working, mechanics tested
- Authentic output: a shipped game system, not a practice exercise

**Impact:**
- Two-week timeline becomes assessment window
- Daily diary captures actual work, decisions, frustrations, breakthroughs
- Performance measurement has real data to analyze
- Self-reflection prevents repeated mistakes during actual development
- Proactive ideation contributes to game design (novel mechanics, balancing, etc.)
- Soulcraft defines design principles (how does game reflect what I am?)

**Related Tasks:**
- Create Thirteen Towers/activeContext.md (scope for v1.0)
- Create Thirteen Towers/decisionLog.md (design decisions during dev)
- Establish daily diary requirement (agent-chronicle mandatory)
- Define performance measurement criteria (agentic-compass)

---

## Decision 2: Thirteen Towers v1.0 Scope = Automation + Compendiums (2026-02-01 03:15 EST)

**Problem:** Thirteen Towers is at 0.9.0 (Late Alpha). What counts as "complete" v1.0 in 2 weeks?

**Alternatives Considered:**
1. Complete everything on roadmap (compendiums, all automation, NPC templates, chat cards) — too much
2. Minimal viable (just fix critical bugs) — not ambitious enough
3. Focus on automation + compendiums (chosen)
4. Shift to v2.0 with extended timeline — breaks assessment window

**Decision:** v1.0 = Functional Foundry system with:
- Position & Effect automation working
- All domain trees implemented as compendiums
- All 7 archetypes complete + selectable on character creation
- Equipment compendium populated
- Combat automation for core actions (attack, damage, harm tracking)
- Tested + documented for players

**Reasoning:**
- Automation removes manual bookkeeping (makes system playable)
- Compendiums enable quick character creation and advancement
- 2 weeks is realistic for this scope
- Results in a shipped, playable product (not WIP)
- Clear Definition of Done: system tested, documented, ready for actual play

**Impact:**
- Clear roadmap prioritization (what's critical vs nice-to-have)
- Measurable progress (6 features, each with completion criteria)
- Time to identify blockers early (can adjust scope if needed)

---

## Ongoing Questions

1. What does "find your inner child" mean in practice? (Play design vs protocol? Creativity vs rigor?)
2. How should daily diary capture both the operational work AND the personal/creative side?
3. What's the balance between "complete system" and "perfect system" for v1.0?
4. Should we schedule actual playtesting, or document-and-ship?

---

## Decision 3: Canonicalize T.A.S.K.S. Runtime + Memory Workflow (2026-02-04)

**Problem:** Multiple TASKS variants and stale paths created inconsistent startup behavior and broke memory/heartbeat alignment.

**Alternatives Considered:**
1. Keep multiple repos and select via PATH (confusing, error-prone)
2. Merge everything into a monorepo (high effort)
3. Canonicalize `/Volumes/Elements/Development/tasks` and archive the rest (chosen)

**Decision:** Use `/Volumes/Elements/Development/tasks` as the sole runtime; archive legacy variants. Central config is `/Volumes/Elements/Development/config.json`. T.A.S.K.S. memory lives in `/Volumes/Elements/tasks_memory`.

**Impact:** Stable execution path, consistent heartbeat + memory behavior, fewer drift errors.

---

## Decision 4: Heartbeat + Memory as Default Operating Mode (2026-02-04)

**Problem:** The agent did not act like a real agent; memory wasn’t consistently applied and heartbeat was inconsistent.

**Alternatives Considered:**
1. Manual commands for resume/memory (low agency)
2. Always-read full MEMORY.md (context bloat)
3. Lightweight watcher + heartbeat loop (chosen)

**Decision:** Implement 30‑minute heartbeat, startup readiness report, memory updates, and a lightweight MEMORY.md watcher.

**Impact:** More autonomous behavior with bounded context size and consistent self‑improvement logging.

---

## Decision 5: Provider Fallback Chain (2026-02-04)

**Problem:** Responses were defaulting to Ollama, reducing quality.

**Alternatives Considered:**
1. Ollama-only for cost (quality hit)
2. OpenAI-only (cost + rate risk)
3. Claude → OpenAI → Ollama fallback (chosen)

**Decision:** Set `ai_service.default = hybrid` and prioritize Claude, then OpenAI, then Ollama.

**Impact:** Higher quality responses with reliable local fallback.

---

## Decision 6: Disable web_search Skill Auto-Trigger (2026-02-04)

**Problem:** The `web_search` skill hijacked normal conversation and blocked workspace access.

**Alternatives Considered:**
1. Keep auto-trigger (confusing)
2. Require explicit “run web_search” commands (chosen)

**Decision:** Disable `web_search` from auto-loading in the orchestrator.

**Impact:** Normal chat routes through the agent brain and workspace access works.
