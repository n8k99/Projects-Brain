# Active Context: LLM Token & Cost Accounting

**Last Updated:** 2026-02-02 11:24 EST

## Problem

No visibility into AI infrastructure costs. Need to track:
- How many tokens used daily/weekly/quarterly?
- Cost per LLM provider
- Cost trends over time
- Ability to make informed model choice decisions

Currently operating blind on costs.

## Approach

1. **API-level logging** — Capture token counts from Claude, OpenAI responses
2. **Daily aggregation** — Roll up into daily note section (💰 Token Usage)
3. **Weekly rollup** — 7-day summary in weekly note
4. **Quarterly reporting** — Trend analysis + budget comparison in quarterly note

Simple, consistent reporting across all time scales.

## Architecture

```
API Call → Log Token Count → Daily Aggregation → Daily Note
                                   ↓
                            Weekly Aggregation → Weekly Note
                                   ↓
                           Quarterly Aggregation → Quarterly Note
```

## Blockers

- None — can start immediately
- No dependency on other projects
- Can integrate with existing daily note structure

## Decisions

None yet. Still in research phase.

## Next Steps

1. List all LLM APIs currently in use (Claude, OpenAI, etc.)
2. Understand what token data each API returns
3. Design logging schema (what to capture)
4. Decide storage format (JSON, CSV, database)
5. Build aggregation scripts
6. Test with daily notes integration
