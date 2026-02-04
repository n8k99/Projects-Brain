# Decision Log: Foundry OpenClaw Channel

## Decision 1: Separate Project vs. Subproject (2026-02-02)

**Status:** ✅ Decided

**Question:** Should this be a subproject of Thirteen Towers, Puppet Show, or its own project?

**Alternatives:**
- A: Subproject of Thirteen Towers (it's Foundry-specific)
- B: Subproject of Puppet Show (it's about EM Staff integration)
- C: New standalone project that bridges both

**Choice:** C (Standalone project)

**Reasoning:**
- It's the connective tissue between two major systems
- Deserves its own development cycle and documentation
- Will eventually be a reusable OpenClaw channel (others could use it)
- Clearer project structure with activeContext + decisionLog

**Impact:**
- Added to projectRegistry.md as foundry-openclaw-001
- Tracked in Nebulab Projects Brain GitHub project
- Can be developed independently while respecting T.A.S.K.S. audit timeline

---

## Decision 2: Implementation Timeline (2026-02-02)

**Status:** ✅ Decided

**Question:** When should development start?

**Alternatives:**
- A: Start immediately (parallel with T.A.S.K.S. audit)
- B: Wait for T.A.S.K.S. audit to complete (Feb 15)
- C: Research phase now, implementation after audit

**Choice:** C (Research now, implement after audit)

**Reasoning:**
- Prevents context thrashing during audit deadline
- Research phase can inform T.A.S.K.S. design (feedback loop)
- OpenClaw architecture might stabilize better by Feb 15
- Nathan has immediate priorities (Myths recording, Ghost sync)

**Impact:**
- Project status: 🔭 CONCEPTUAL until Feb 15
- Research tasks: OpenClaw channels, foundry-mcp design
- Active development starts post-audit
