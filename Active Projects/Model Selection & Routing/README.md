# Model Selection & Routing

**Strategic methodology for choosing local Ollama vs Claude vs OpenAI based on task type, quality requirements, and cost.**

## Vision

Not all tasks need Claude 4 ($0.15/1K tokens). Some need GPT-4o, some just need a local model.

Build a routing strategy:
- **Local Ollama** (free) for: summaries, reformatting, simple extraction, brainstorming
- **Claude 3.5 Sonnet** for: complex reasoning, code generation, creative writing, decision-making
- **GPT-4o** for: specialized domains, vision tasks, consistency-critical work
- **Fallback chains** for reliability (Claude → GPT-4o → Ollama)

## Scope

### Task Classification
- Categorize common tasks (research, coding, writing, analysis, etc.)
- Identify quality thresholds (what tasks can degrade gracefully?)
- Estimate token requirements per task

### Model Capability Matrix
```
Task Type    | Ollama      | Claude Sonnet | GPT-4o    | Decision Rule
-------------|-------------|---------------|-----------|---------------------
Summarization| ✅ Good     | ✓ Great       | ✓ Great   | Use Ollama if source is clear
Code Gen     | ⚠️ OK       | ✓ Excellent   | ✓ Good    | Use Claude for complex, GPT-4o fallback
Writing      | ⚠️ Decent   | ✓ Excellent   | ✓ Great   | Use Claude for quality
Research     | ✅ Good     | ✓ Excellent   | ✓ Great   | Use Ollama for initial filtering
Analysis     | ✅ Good     | ✓ Excellent   | ✓ Good    | Use Claude for nuance
Brainstorm   | ✅ Excellent| ✓ Great       | ✓ Good    | Use Ollama (fast, diverse)
Decision     | ⚠️ Risky    | ✓ Excellent   | ✓ Good    | Use Claude (reasoning)
```

### Cost Optimization
- Tier 1 (Ollama): $0 per 1K tokens → Use first
- Tier 2 (Claude): $0.003-0.015 per 1K tokens → Use for complex work
- Tier 3 (GPT-4o): $0.005-0.025 per 1K tokens → Use for specialized tasks

### Implementation
- Router function: task type + requirements → model selection
- Fallback chain: primary model fails → try secondary → try tertiary
- Performance tracking: measure quality vs cost per model/task combo

## Status

🔭 **CONCEPTUAL** — Ready for taxonomy building and router design

## Next Steps

1. Build comprehensive task classification system
2. Create capability matrix for available models
3. Define quality/performance benchmarks per task type
4. Design router decision logic
5. Implement fallback chains
6. Track cost vs quality outcomes
7. Refine based on real usage patterns
