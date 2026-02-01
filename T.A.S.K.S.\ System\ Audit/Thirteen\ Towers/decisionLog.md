---
title: Decision Log — Thirteen Towers v1.0
project: Thirteen Towers (Subproject of T.A.S.K.S. System Audit)
---

# Decision Log — Thirteen Towers v1.0

## Decision 1: Position & Effect Automation as Week 1 Critical Path (2026-02-01 03:42 EST)

**Problem:** Thirteen Towers has conceptual Position & Effect system (Controlled/Risky/Desperate positions with Limited/Standard/Great effects) but it's currently MANUAL in Foundry. Players have to track which position/effect they're in without UI support. This breaks immersion and makes the system hard to play.

**Alternatives Considered:**
1. Leave manual for v1.0, automate in v1.1 (chosen against)
2. Build full Position & Effect automation (chosen)
3. Simplify system to remove Position/Effect (breaks game design)
4. Build a spreadsheet helper instead of Foundry integration (defeats purpose)

**Decision:** Position & Effect automation is Week 1 critical path. Must have working UI:
- Button/dropdown to select position (Controlled/Risky/Desperate)
- Button/dropdown to select effect (Limited/Standard/Great)
- Integration with check resolution (auto-calculates benefits/penalties)

**Reasoning:**
- Position & Effect is core to the game's resolution system
- Manual tracking creates friction; automation creates flow
- Players expect Foundry to handle mechanics
- This is what separates v0.9.0 (Alpha) from v1.0 (Playable)

**Impact:**
- Requires JavaScript work in scripts/
- Affects character sheet template (template.json)
- Must be tested in actual Foundry checks
- First issue to close this sprint

**Related Tasks:**
- GitHub Issue #10 (Position & Effect Automation)
- Diary entry: Design decisions on Position/Effect UX

---

## Decision 2: Foundry Code Commits from System Directory (2026-02-01 03:42 EST)

**Problem:** Thirteen Towers is a special project. Code lives in Foundry's system directory (wherever FoundryVTT/Data/systems/thirteen-towers/ is), not in the standard Development/ location. How should commits be tracked?

**Alternatives Considered:**
1. Copy code to Development/, commit, copy back (tedious, error-prone)
2. Commit directly from Foundry system directory (chosen)
3. Use git submodule linking Foundry dir to Development/
4. Store code in Projects/ and symlink to Foundry (breaks Foundry expectations)

**Decision:** Commit directly from wherever Foundry system code lives. Treat that directory as the source of truth for Thirteen Towers code.

**Reasoning:**
- Foundry needs system files in specific directory structure
- Symlinking breaks Foundry asset loading
- Direct commits preserve git history tied to actual codebase
- Simpler workflow: edit → test in Foundry → commit from same location
- Definition of Done: "Commit message Fixes #10" = code tested in Foundry + shipped

**Impact:**
- Commits happen outside Development/ (special case)
- GitHub repo location TBD (might be Nebulab, might be dedicated thirteen-towers repo)
- All commits must reference issue number (Fixes #10, etc.)

**Related Tasks:**
- Determine GitHub repo for thirteen-towers code
- Set up git repo in Foundry system directory

---

## Ongoing Questions

1. What Foundry version is being used? (v12, v13?)
2. Where is FoundryVTT/Data/ located on the system?
3. Should we create a dedicated n8k99/thirteen-towers repo or use Nebulab?
4. What's the minimum viable Position & Effect UI (buttons? dropdowns? both?)
5. Should we include Draconic Attention automation in Week 1 or defer to v1.1?
