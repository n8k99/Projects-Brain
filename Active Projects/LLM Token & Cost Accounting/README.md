# LLM Token & Cost Accounting

**Track token usage and monetary costs across all LLM services (Claude, OpenAI, etc.) with daily/weekly/quarterly reporting.**

## Vision

Understand exactly what AI infrastructure costs, broken down by:
- LLM provider (Claude, OpenAI, Gemini, local Ollama)
- Time period (daily, weekly, quarterly)
- Use case / project (T.A.S.K.S., Orbis, content generation, etc.)
- Cost per operation (cost per token, cost per inference)

Make informed decisions about model choice, token optimization, and budget allocation.

## Scope

### Data Collection
- Log token usage from all LLM APIs (Claude, OpenAI, etc.)
- Capture prompt tokens + completion tokens
- Track model version / cost tier
- Timestamp each API call

### Daily Accounting
- Aggregate tokens by provider
- Calculate daily cost (tokens × rate)
- Record to daily note section
- Total per LLM provider

### Weekly Reporting
- Roll up 7 days of usage
- Cost breakdown by provider
- Cost breakdown by use case (if trackable)
- Weekly total
- Include in weekly note

### Quarterly Reporting
- Roll up 13 weeks
- Trend analysis (is usage increasing/decreasing?)
- Cost per output unit (poem, dialog, research, etc.)
- Quarterly total
- Budget vs. actual comparison
- Include in quarterly note

## Technical Implementation

### API Logging
- Capture token counts from Claude, OpenAI, etc. responses
- Store in structured format (JSON/CSV)
- Location: `/Development/logs/llm-usage/`

### Aggregation Script
- Read daily logs
- Calculate costs using current pricing
- Generate reports (daily, weekly, quarterly)
- Update Obsidian vault sections

### Integration Points
- Daily note: `## 💰 Token Usage Today` section
- Weekly note: `## 💰 Weekly Token Accounting` section
- Quarterly note: `## 💰 Quarterly LLM Costs` section
- Dashboard: Could generate HTML report later

## Status

🔭 **CONCEPTUAL** — Design and implementation pending

## Next Steps

1. Establish token logging strategy (which APIs are capturable)
2. Set up data collection pipeline
3. Create aggregation scripts
4. Integrate with daily/weekly/quarterly notes
5. Design cost reporting dashboard (future)

## Questions to Resolve

- How do we capture Anthropic Claude token counts? (API returns usage)
- How do we attribute tokens to projects/use cases?
- Should we include local Ollama (free) or just paid services?
- Where/how to store historical logs for trend analysis?
