# Decision Log: LLM Token & Cost Accounting

## Decision 1: Separate Project vs. Part of EM Operations (2026-02-02)

**Status:** ✅ Decided

**Question:** Should token accounting be part of Eckenrode Muziekopname (em-001) or its own project?

**Alternatives:**
- A: Part of EM operations (cost is business concern)
- B: Part of T.A.S.K.S. audit (operational metrics)
- C: Standalone project (infrastructure monitoring)

**Choice:** C (Standalone)

**Reasoning:**
- Token accounting is infrastructure monitoring, not business operations
- It's not specific to T.A.S.K.S. — applies to all LLM usage (content creation, worldbuilding, etc.)
- Will have its own continuous reporting (daily/weekly/quarterly)
- Could integrate into multiple projects' reporting
- Deserves separate development cycle and decision authority

**Impact:**
- Created as llm-token-accounting-001
- Can start immediately (no blockers)
- Will feed data into various project reports
- Independent from T.A.S.K.S. audit timeline

---

## Decision 2: Temporal Hierarchy - Daily/Weekly/Quarterly (2026-02-02)

**Status:** ✅ Decided

**Question:** What time granularities should we track?

**Alternatives:**
- A: Just daily (simplest)
- B: Daily + weekly only
- C: Daily + weekly + quarterly (full hierarchy)
- D: Hourly + daily + weekly + monthly + quarterly (comprehensive)

**Choice:** C (Daily/Weekly/Quarterly)

**Reasoning:**
- Daily = operational awareness (what did we use today?)
- Weekly = trend spotting (are we trending up/down?)
- Quarterly = budgeting & planning (where are we headed?)
- Aligns with Obsidian vault note hierarchy (daily, weekly, quarterly)
- Hourly = too noisy; monthly = unnecessary between weekly/quarterly

**Impact:**
- Update daily notes with token section (heartbeat automation)
- Update weekly notes with weekly summary
- Update quarterly notes with trend analysis
- Storage schema must support all three aggregations
