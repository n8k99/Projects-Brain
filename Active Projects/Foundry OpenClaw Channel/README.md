# Foundry OpenClaw Channel

**Bridges Nathan's Foundry terraforming workflow with T.A.S.K.S. and EM Staff orchestration.**

## Vision

Sit inside Foundry doing Orbis terraforming while:
- Chatting with T.A.S.K.S. as your worldbuilding assistant
- Delegating tasks to EM Staff (via Puppet Show)
- Receiving NPC dialogue responses back *as in-world chat/speech*

One unified interface for creation.

## Scope

### Channel Module (OpenClaw)
- Listen to Foundry chat (inbound messages)
- Send OpenClaw responses back to Foundry (outbound)
- Route NPC dialogue to appear as character speech in-world

### foundry-mcp Integration
- Model Context Protocol server exposing Foundry APIs
- Read/write Orbis world state (terrain, provinces, NPCs, lore)
- Enable T.A.S.K.S. to terraform intelligently

### EM Staff Voice Routing
- When T.A.S.K.S. delegates (e.g., "Sylvia, document this"), their response becomes NPC dialogue
- Not a separate message — integrated into Foundry's chat as character speech

## Architecture

```
Nathan in Foundry
       ↓
   [Foundry Channel Module]
       ↓
OpenClaw Session (T.A.S.K.S.)
       ↓
   [foundry-mcp] ← reads/writes world state
   [Puppet Show] ← delegates to EM Staff
       ↓
   NPC Dialogue Response
       ↓
   [Foundry Channel Module]
       ↓
Appears in Foundry Chat/NPC Speech
```

## Related Projects

- **Puppet Show** (puppet-show-001) — EM Staff orchestration foundation
- **Thirteen Towers** (thirteen-towers-001) — Foundry VTT system
- **Orbis** (orbis-001) — World state being terraformed
- **T.A.S.K.S. System Audit** (tasks-audit-001) — Agent framework

## Status

🔭 **CONCEPTUAL** — Scoped and ready for implementation once T.A.S.K.S. audit completes.

## Next Steps

1. Complete T.A.S.K.S. System Audit (feb-15 deadline)
2. Develop Foundry channel module for OpenClaw
3. Build foundry-mcp for world state queries
4. Integrate with Puppet Show for NPC routing
5. Test workflow: terraforming + conversation + delegation
