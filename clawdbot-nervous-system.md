# Project: Clawdbot as Nervous System

## Vision

**Goal:** Transform Clawdbot from a tool into the nervous system infrastructure for NeoGTD + Orbis Worldbuilding.

**What This Means:**
- You sit in Discord/Foundry and think out loud
- System automatically cascades research across background channels
- EM Staff personas (Sylvia, Eliana, Kathryn, etc.) coordinate work in parallel
- Results synthesize and surface to you without management
- You never see the machinery — just the results

**Success Criteria:**
- One question triggers multi-channel async research
- Device continuity maintained (phone ↔ computer)
- Fallback chains work (Claude → OpenAI → Ollama)
- System self-heals (automatic recovery when Claude available)
- Token measurement enables optimization

---

## Architecture Components

### Foundation (Working ✅)
- **Vault Access:** Obsidian + obsidian-cli
  - Read, search, cross-reference files
  - Extract relevant context
  
- **Database Access:** Postgres (master_chronicle + orbis_narratives)
  - Query markers, states, provinces, burgs
  - Spatial queries (x, y coordinates)
  - Contradiction detection (vault vs. database sync issues)

- **Multi-Channel Infrastructure:** Discord + Clawdbot
  - Strategy channel (main conversation with user)
  - Background research channels (per team/function)
  - Device-agnostic context (phone/computer transparent)

- **Persona Framework:** EM Staff agents
  - Sylvia Inkweaver (Chief of Content) — research + synthesis
  - Eliana Riviera (CTO) — architecture + implementation
  - Kathryn Lyonne (COO) — orchestration + delegation
  - Others available as needed

### Needed (Missing ❌)

**1. Orchestration Layer**
- **Problem:** System doesn't auto-trigger workflows
- **Solution:** Build autonomous scaffolding
  - Listen for messages in strategy channel
  - Pattern match (detect questions/sparks)
  - Dispatch background research automatically
  - Aggregate + surface results
- **Build with:** n8n + Ollama reasoning

**2. Token Fallback Chain**
- **Problem:** Claude Pro has daily limits, fallback untested
- **Solution:** 
  - Debug OpenAI API fallback (currently broken)
  - Test Ollama can handle sustained load
  - Implement automatic recovery (revert to Claude when available)
  - Graceful degradation (system keeps working on fallback)
- **Test with:** Burn Claude tokens → verify fallback → verify recovery

**3. Token Measurement Infrastructure**
- **Problem:** Claude Pro doesn't expose usage data via API
- **Current state:** Manual checking (broken `/usage` command)
- **Solution:**
  - Build local token tracking (estimate per operation)
  - Cost attribution per workflow
  - Token burn alerts
  - Optimization targeting
- **Fallback:** Ollama metrics (free)

---

## Key Case Study: Discovery-Driven Research

**Example Workflow: Moon Dragon Investigation**

**Trigger:**
```
User asks: "Tell me about Province 5 in Zhulmar"
```

**Automatic Research Cascade (should happen):**
1. **Vault Research (Ollama)**
   - Find "5 Cequria Province.md"
   - Extract: settlements, dungeons, governance
   - Cross-reference: linked locations, NPCs

2. **Database Queries (Postgres)**
   - Look up all markers in province 5
   - Get coordinates, province assignments, metadata
   - Flag contradictions (vault says Cequria, database says Neutrals)

3. **Contradiction Investigation (Ollama)**
   - Why does Twilight Tomb appear in both?
   - Are both Moon Dragon structures?
   - How far apart are they? (~500 units)

4. **Context Synthesis (Ollama)**
   - Who was Moon Dragon?
   - Timeline constraints (pre/post Last Great Cull?)
   - Relationships to other figures (Ghesh-Balor, Vampire Knight, etc.)
   - Safe to invent or conflicts with existing lore?

5. **Synthesis Posts (Ollama + Personas)**
   - Sylvia posts research summary to #sylvia-research
   - Eliana posts architecture questions to #technical
   - Kathryn posts synthesis to #synthesis
   - Results bubble up to strategy channel

6. **User Sees:**
   - Main conversation continues naturally
   - Context appears when user checks #synthesis
   - Ready to think/decide without research burden

---

## Current State (2026-01-28)

### What Works ✅
- Vault access (read, search, retrieve)
- Database queries (markers, provinces, coordinates)
- Device continuity (phone ↔ computer transparent)
- Persona availability (Sylvia, Eliana, Kathryn, etc.)
- Cost efficiency (Haiku model + Ollama = sustainable)

### What's Missing ❌
- Orchestration layer (auto-trigger, coordinate, surface)
- Token fallback chain (OpenAI untested, Ollama load test needed)
- Fallback recovery (automatic revert to Claude)
- Token measurement (estimation infrastructure)
- Vault ↔ Database sync (Moon Dragon province assignment inconsistency)

### Blocker Removed ✅
- Memory setup (MEMORY.md + memory/logs/projects/groups/system/)
- Persistence (moved to /Volumes/Elements/, backed up)
- Daily logging format established

---

## Next Steps (Priority Order)

### Phase 1: Build Discovery Workflow (Proof of Concept)
1. **Create n8n workflow template**
   - Input: Any question or entity name
   - Vault search (Ollama)
   - Database query (Postgres)
   - Summarize findings (Ollama)
   - Post to background channel
   - Time to build: ~4-8 hours

2. **Test with Moon Dragon case**
   - Question: "Research Moon Dragon and Cequria Province"
   - Expected output: Contradiction report + research summary
   - Verify coordination between vault + database layers

3. **Success criterion:** Async workflow completes, posts results, user sees synthesis without asking

### Phase 2: Test Fallback Chain
1. Burn Claude tokens until daily limit hit
2. Verify OpenAI fallback kicks in (or fix why it doesn't)
3. Verify Ollama can sustain background load
4. Test automatic recovery when Claude available again
5. Build fallback detection + routing logic

### Phase 3: Build Orchestration Layer
1. Create message listener (strategy channel)
2. Pattern matching (question detection)
3. Workflow dispatcher (which research to trigger)
4. Result aggregation (collect from background channels)
5. Auto-surface (bubble up to main conversation)

### Phase 4: Measurement + Optimization
1. Build token tracking (estimate per operation)
2. Create usage dashboard
3. Identify expensive operations
4. Move expensive work to Ollama
5. Establish sustainable allocation

---

## Success Metrics

- **Speed:** One question → background research completes → surface within 5 minutes
- **Reliability:** Fallback chain works without user intervention
- **Cost:** Token budget sustainable for 8+ hours daily usage
- **Transparency:** User unaware of coordination happening
- **Scalability:** Can handle 10+ concurrent background workflows

---

## Dependencies

- `/Volumes/Elements/CLAUDE.md` (system specification)
- `master_chronicle` database (accessible)
- `orbis_narratives` database (accessible)
- n8n workflows (local)
- Ollama (local, available)
- Discord channels (setup)
- EM Staff personas (defined in vault)

---

## Open Questions

1. **OpenAI fallback:** Why isn't it working? API key issue? Endpoint problem?
2. **Database sync:** Should we reconcile Moon Dragon province assignment?
3. **Orchestration scope:** Start with single workflow or multi-channel cascade?
4. **Measurement:** Token tracking via local estimate or wait for Claude API?
5. **Persona autonomy:** Can Ollama-based personas maintain character voice?

---

## Timeline Estimate

- **Phase 1 (Discovery Workflow):** 1-2 weeks
- **Phase 2 (Fallback Chain):** 3-5 days
- **Phase 3 (Orchestration Layer):** 2-4 weeks
- **Phase 4 (Measurement):** 1 week

**Total:** ~4-6 weeks to full nervous system

---

*Status: Foundation validated. Ready to build orchestration layer.*
*Started: 2026-01-28*
*Lead: Clawdbot (with Eliana Riviera team oversight)*
