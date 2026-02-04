# Decision Log: Model Selection & Routing

## Decision 1: Separate Project vs. Part of Token Accounting (2026-02-02)

**Status:** ✅ Decided

**Question:** Should model routing be part of LLM Token Accounting or its own project?

**Alternatives:**
- A: Part of token accounting (cost optimization is accounting concern)
- B: Part of T.A.S.K.S. audit (affects agent decision-making)
- C: Separate project (operational infrastructure strategy)

**Choice:** C (Separate project)

**Reasoning:**
- Token accounting = measuring costs (observe)
- Model routing = reducing costs (act)
- These are different concerns with different implementation timelines
- Token accounting informs routing decisions (feedback loop)
- Routing affects multiple projects (T.A.S.K.S., content gen, research, etc.)
- Deserves its own development and decision authority

**Impact:**
- Created as model-routing-001
- Can start immediately
- Feeds data to token accounting (what models were chosen, why)
- Will reduce token costs over time

---

## Decision 2: Tier Structure - Three Tiers (Ollama/Claude/GPT) (2026-02-02)

**Status:** ✅ Decided

**Question:** How many model tiers should we maintain?

**Alternatives:**
- A: Two tiers (Ollama / Everything else)
- B: Three tiers (Ollama / Claude / GPT-4o)
- C: Four+ tiers (including Gemini, local LLaMA, etc.)

**Choice:** B (Three tiers: Ollama / Claude Sonnet / GPT-4o)

**Reasoning:**
- Ollama = free baseline (always try first)
- Claude Sonnet = best value for complex reasoning (vs cheaper models)
- GPT-4o = specialized/vision tasks that Claude doesn't handle as well
- Three is simple enough to implement, comprehensive enough to optimize
- Can add more tiers later (Gemini, Llama 2, etc.)

**Impact:**
- Capability matrix has 3 columns
- Router has 3 decision points
- Fallback chain: Ollama → Claude → GPT-4o
- Clear cost optimization path

---

## Decision 3: Quality Metric - Task-Specific vs. Objective Score (2026-02-02)

**Status:** ⏳ Pending

**Question:** How do we measure quality well enough?

**Alternatives:**
- A: Subjective human review (reliable but slow)
- B: Objective benchmarks per task type (fast but may miss nuance)
- C: Hybrid (initial objective, spot-check subjective)

**Decision Pending:** Needs design phase (coming soon)

**Notes:**
- Some tasks have clear metrics (code compiles? test passes?)
- Others are subjective (writing quality, reasoning soundness)
- Should determine this during task taxonomy building phase
