---
title: FMG-Vault Geographic Graph Integration
tags:
- engineering
- worldbuilding
- visualization
- fmg
- vault-integration
date_proposed: 2025-10-20
dependencies: null
estimated_effort: Large (4-6 weeks)
priority: Quality of Life
project_status: Backlog
---
[[projectsRegistry#Worldbuilding Automation & Integration System|View Project in Registry]]

# FMG-Vault Geographic Graph Integration

## Overview

Transform Fantasy Map Generator (FMG) from a static worldbuilding tool into a dynamic **geographic graph visualization layer** for the Obsidian vault. This would provide a map-based interface to explore vault notes, their relationships, and metadata - combining physical geography with the knowledge graph.

## Problem Statement

**Current State:**
- FMG maintains separate copy of location data (burgs, dungeons, markers)
- Vault has extensively developed location notes with coordinates (`x:`, `y:`)
- Data has diverged: vault names updated (e.g., dungeons → dragon lairs), FMG still shows old names
- No way to visualize vault relationships geographically
- Obsidian graph view shows relationships but lacks geographic context

**Pain Points:**
- Duplicate data maintenance between FMG and vault
- FMG shows outdated information
- Cannot navigate vault via geographic interface
- Missing geographic context for relationship networks

## Proposed Solution

### Vision
FMG becomes the **geographic visualization layer** for the vault, displaying:
- Physical geography (terrain, biomes, rivers)
- Vault notes positioned by coordinates
- Relationship connections (backlinks) as geographic lines
- Metadata overlays (heatmaps, filters, timeline mode)

### Three Implementation Phases

#### Phase 1: Sync FMG Names with Vault (Immediate Fix)
**Scope:** Update FMG .map file to match current vault state
- Parse .map file to extract markers/burgs with coordinates
- Match FMG coordinates to vault `x:`/`y:` values
- Update FMG marker names to match vault `title:` field
- Preserve One-Page Dungeon content in vault notes
- Generate updated .map file

**Deliverable:** Script `sync_fmg_to_vault.py`
**Effort:** 1-2 days
**Impact:** FMG displays correct current names

#### Phase 2: Live Vault Note Display (Medium-term)
**Scope:** FMG fetches notes from T.A.S.K.S. API
- Click marker in FMG → API call to T.A.S.K.S.
- T.A.S.K.S. finds note by coordinates
- Return markdown content
- FMG displays vault note in modal

**New API Endpoints:**
```python
GET /geo/note-at-coords?x={x}&y={y}
GET /geo/notes-in-bounds?minX={}&maxX={}&minY={}&maxY={}
GET /geo/search?tags={}&type={}&radius={}
```

**Deliverable:** Modified FMG + T.A.S.K.S. geo API
**Effort:** 1-2 weeks
**Impact:** Click map → see live vault content

#### Phase 3: Full Geographic Graph Visualization (Long-term)
**Scope:** FMG becomes interactive vault visualization layer

**Features:**
1. **Location Layer**
   - Every note with coordinates appears as marker
   - Marker styling based on note type/tags
   - Click to view, edit, or navigate

2. **Relationship Layer (Geographic Graph)**
   - Backlinks rendered as lines between locations
   - Tag-based connections (all `#dragon` notes connected)
   - Distance queries ("within 50 miles of X")
   - Relationship types with color coding:
     - Red: Enemies/conflicts
     - Green: Allies/trade routes
     - Blue: Family/organizational
     - Purple: Quest chains

3. **Metadata Overlays**
   - Heatmaps (population, danger level, wealth)
   - Tag filters (show only dragons, cities, etc.)
   - Timeline mode (locations active in time period)

4. **Interactive Editing**
   - Drag notes to update coordinates
   - Create notes by clicking map
   - Edit content in FMG modal
   - Changes write back to vault

5. **AI-Powered Insights**
   - Find unconnected locations
   - Suggest travel routes
   - Generate connections from content
   - "What's within a day's travel?"

**Deliverable:** Full FMG-vault integration
**Effort:** 4-6 weeks
**Impact:** Revolutionary worldbuilding workflow

## Technical Architecture

### Data Flow
```
Obsidian Vault (Source of Truth)
    ↓
T.A.S.K.S. Geographic API
    ↓
FMG Frontend (Modified JavaScript)
    ↓
Interactive SVG Map with Relationship Overlay
```

### Key Components

**Backend (T.A.S.K.S. Server):**
- `geo_service.py` - Geographic query engine
- Vault indexer with spatial queries
- Relationship graph builder

**API Layer:**
```python
/geo/notes-in-bounds     # Get notes in viewport
/geo/note-at-coords      # Single note lookup
/geo/connections         # Backlinks/relationships
/geo/filter              # Tag/metadata filtering
/geo/update-coords       # Coordinate updates
/geo/heatmap             # Metadata aggregation
```

**Frontend (Modified FMG):**
- Note marker rendering system
- Relationship line renderer (SVG paths)
- Filter/overlay UI
- Note edit modal
- Coordinate drag-to-update

### Data Structure

**Vault Notes (Required Frontmatter):**
```yaml
---
x: 154.83           # FMG x coordinate
y: 507.96           # FMG y coordinate
title: DrakKriorth FlameheartLair
type: [[Dragon Lair]]
tags: [dragon, lair, adult-dragon]
---
```

**API Response Example:**
```json
{
  "note": {
    "id": "13118115181169",
    "title": "DrakKriorth FlameheartLair",
    "x": 154.83,
    "y": 507.96,
    "type": "Dragon Lair",
    "tags": ["dragon", "lair"],
    "content": "...",
    "connections": [
      {"target": "NearbyTown", "type": "threatens", "x": 160, "y": 500},
      {"target": "AllyDragon", "type": "allied", "x": 200, "y": 520}
    ]
  }
}
```

## Example Use Cases

### Dragon Territory Visualization
1. Click dragon lair on map
2. See radiating lines to:
   - Red: Enemy territories
   - Green: Allied locations
   - Blue: Hoard item locations
   - Purple: Related quest markers
3. Distance ring shows lair's threat radius

### Quest Chain Mapping
1. Filter map by `#quest-chain-goblin-king`
2. All quest locations highlight
3. Lines show progression path
4. Click each to see quest notes

### Faction Influence
1. Select "Crimson Syndicate" faction
2. Heatmap shows areas of control
3. Lines connect faction holdings
4. Identify expansion opportunities

### NPC Network
1. Click NPC home location
2. Lines to places visited
3. Show family/friend connections
4. Display known travel routes

## Benefits

### For Worldbuilding
- Visualize geographic relationships
- Identify isolated/unconnected regions
- Plan travel routes with real distances
- See faction territories at a glance

### For Campaign Management
- Navigate world geographically
- Quick access to location notes
- Visual quest progression
- Track party location on map

### For Content Creation
- Find gaps in worldbuilding
- Generate connections based on proximity
- Plan logically consistent geography
- Visualize narrative threads

## Technical Challenges

1. **Performance**: 2,124 notes with coordinates - need efficient spatial indexing
2. **Relationship Rendering**: Complex graph with many connections could clutter map
3. **Coordinate System**: Ensure FMG and vault coordinates stay synchronized
4. **Edit Conflicts**: Handle simultaneous edits in vault and FMG
5. **FMG Modification**: FMG is third-party code - need sustainable fork/plugin approach

## Dependencies

### Prerequisites
- ✅ T.A.S.K.S. REST API infrastructure
- ✅ Vault notes with x/y coordinates (2,124 currently)
- ✅ FMG installed and working
- ⏳ Spatial indexing for vault queries
- ⏳ Backlink analysis system

### Integration Points
- T.A.S.K.S. core server (API endpoints)
- FMG codebase (JavaScript modifications)
- Obsidian vault (data source)
- Worldbuilding tools system (future integration)

## Success Metrics

**Phase 1:**
- ✅ FMG shows correct vault names for all 2,124 locations
- ✅ No One-Page Dungeon data lost

**Phase 2:**
- ✅ Click any map marker → see current vault note
- ✅ API response time < 200ms for note lookup
- ✅ Notes update in FMG when vault changes

**Phase 3:**
- ✅ All backlinks rendered as geographic connections
- ✅ Filters work smoothly with 2,000+ notes
- ✅ Drag-to-update coordinates working
- ✅ User can complete entire worldbuilding workflow in FMG

## Future Enhancements

- **3D Visualization**: Terrain elevation, underground lairs
- **Time-based Animation**: Show historical changes over campaign timeline
- **Collaborative Mode**: Multiple users editing map simultaneously
- **Mobile App**: Touch-based geographic navigation
- **VR Integration**: Walk through world in virtual reality

## Project Status

**Current Status:** Backlog (Quality of Life)
**Priority:** Low (other critical systems need focus first)
**Next Review:** Q1 2026

**Blocking Projects:**
- Ghost Tier System completion (revenue critical)
- Worldbuilding tools testing and expansion
- D&D integration refinement
- Content production automation

**When to Revisit:**
- After revenue systems are stable
- When worldbuilding content volume increases significantly
- If geographic navigation becomes user-requested feature

## Notes

This project was proposed during D&D integration development (2025-10-20). While technically exciting, it's categorized as quality-of-life rather than critical infrastructure. The vision is sound, but execution should wait until higher-priority revenue and content systems are mature.

The three-phase approach allows for incremental value:
- Phase 1 can be done quickly for immediate name sync
- Phase 2 provides substantial UX improvement
- Phase 3 is the "dream state" requiring significant investment

**Key Insight:** Don't let perfect (Phase 3) be enemy of good (Phase 1). Even basic name synchronization would provide value without major time investment.
