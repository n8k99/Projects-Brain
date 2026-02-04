# Active Context: Foundry OpenClaw Channel

**Last Updated:** 2026-02-02 11:19 EST

## Problem

Nathan wants to terraform Orbis in Foundry while chatting with T.A.S.K.S. as his assistant, with EM Staff NPC dialogue flowing back into the game world. Currently no way to integrate all three (Foundry, OpenClaw, Puppet Show).

## Approach

Build a two-part system:

1. **Foundry Channel Module** (OpenClaw)
   - Listens for messages in Foundry
   - Pipes them to OpenClaw session
   - Returns responses as in-world dialogue

2. **foundry-mcp**
   - Exposes Foundry/Orbis APIs to Claude
   - Enables intelligent terraforming decisions
   - Integrates with Puppet Show for NPC delegation

## Blockers

- T.A.S.K.S. System Audit (tasks-audit-001) must complete first
- Need to understand current OpenClaw channel architecture
- foundry-mcp design (what APIs to expose, how to sync state)

## Decisions

- Build as a separate project (not subsumed into Thirteen Towers or Puppet Show)
- Use foundry-mcp as the world state bridge
- Route EM Staff responses through Puppet Show → appear as NPC dialogue

## Next Steps

1. Research OpenClaw channel module structure (existing examples)
2. Design foundry-mcp interface (CRUD operations for Orbis)
3. Sketch Foundry dialogue routing (how NPC voices appear)
4. Create GitHub issues for implementation
5. Start development post-audit (Feb 15)
