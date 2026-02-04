# Active Context: Model Selection & Routing

**Last Updated:** 2026-02-02 11:26 EST

## Problem

Costs are rising because every task uses Claude or OpenAI, even simple ones that a local Ollama model could handle fine. Need strategic methodology for choosing models based on task complexity and cost tolerance.

## Approach

1. **Task Classification** — Categorize work by type, quality threshold, token requirements
2. **Capability Matrix** — Map which models handle which tasks well
3. **Cost Tiers** — Clear pricing guide (Ollama $0 → Claude → GPT-4o)
4. **Router Logic** — Decision function that picks the right model
5. **Fallback Chains** — If primary fails, try secondary, then tertiary
6. **Outcome Tracking** — Measure quality vs cost for refinement

## Key Questions

- Which tasks can Ollama handle vs need Claude?
- What quality thresholds matter? (can brainstorming degrade? can code?)
- How do we measure "good enough"?
- When do fallback chains trigger?
- How do we learn from failures?

## Blockers

None — can start immediately.

## Decisions

None yet.

## Next Steps

1. Build task taxonomy (brainstorm, code, writing, research, analysis, summary, decision)
2. Test each model on representative tasks
3. Create capability matrix based on testing
4. Define decision rules (task type → model choice)
5. Implement router function
6. Build fallback chains
7. Deploy and measure real-world performance
