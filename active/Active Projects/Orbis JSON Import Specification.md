---
title: Orbis JSON Import Specification
date: 2025-12-03
status: Ready for Implementation
version: 1.0
---
# Orbis JSON Import Specification

**Purpose:** Import complete worldbuilding data from Azgaar's Fantasy Map Generator JSON export into Obsidian vault notes with full YAML frontmatter and narrative content.

**Source Data:** `Orbis Full 2025-12-03-17-53.json` (7.4MB)

**Target Output:** 3,486 markdown notes with complete frontmatter across states, provinces, burgs, markers, rivers, and routes.

---

## Table of Contents

1. [Overview](#overview)
2. [Data Summary](#data-summary)
3. [Folder Structure](#folder-structure)
4. [YAML Schemas](#yaml-schemas)
5. [Script Architecture](#script-architecture)
6. [Wikilink Policy](#wikilink-policy)
7. [Implementation Scripts](#implementation-scripts)
8. [Execution Order](#execution-order)
9. [Helper Functions](#helper-functions)
10. [Validation & Testing](#validation--testing)

---

## Overview

### What Gets Created

**Content Type:**
- ✅ Complete YAML frontmatter (all fields populated from JSON)
- ✅ Basic markdown heading (`# {{title}}`)
- ✅ **Rivers & Routes:** Full narrative journey content with wikilinks
- ❌ **States, Provinces, Burgs, Markers:** Empty/minimal body (frontmatter only)

**Why:**
- States/Provinces/Burgs/Markers: Frontmatter serves as structured data; body content added later via Burgs Pipeline or manual writing
- Rivers/Routes: Journey narratives are auto-generated from waypoint data with full geographic context

---

## Data Summary

### Source JSON Structure

```json
{
  "info": {...},
  "settings": {
    "distanceUnit": "mi",
    "heightUnit": "ft",
    "temperatureScale": "°F",
    ...
  },
  "pack": {
    "states": [32 states],
    "provinces": [397 provinces],
    "burgs": [665 settlements],
    "markers": [1744 POIs],
    "rivers": [217 rivers],
    "routes": [431 routes],
    "cells": [7959 terrain cells],
    "cultures": [8 cultures],
    "features": [148 geographic features]
  },
  "biomesData": {
    "name": ["Marine", "Hot desert", "Cold desert", ...]
  }
}
```

### Entity Counts

| Entity Type | Count | Location | Body Content |
|-------------|-------|----------|--------------|
| States (Active) | 19 | Sovereign Realms of Orbis/ | Frontmatter only |
| States (Ancient) | 12 | Ancient Realms/ | Frontmatter only |
| Provinces | 397 | Under parent state folders | Frontmatter only |
| Burgs | 665 | Under parent province folders | Frontmatter only |
| Markers (POIs) | 1,744 | Province/Points of Interest/ | Frontmatter only |
| Rivers | 217 | Geography/Rivers/ | **Full journey narrative** |
| Routes | 431 | Geography/Routes/{group}/ | **Full journey narrative** |
| **TOTAL** | **3,486** | | |

---

## Folder Structure

### Notes Structure

```
03 Resources/Historical Lore/
├── Sovereign Realms of Orbis/
│   ├── Beylik of Frostmark/
│   │   ├── Beylik of Frostmark.md
│   │   ├── Yruryurt County/
│   │   │   ├── Yruryurt County.md
│   │   │   ├── Yararyurt/
│   │   │   │   └── Yararyurt.md
│   │   │   ├── Another Burg/
│   │   │   │   └── Another Burg.md
│   │   │   └── Points of Interest/
│   │   │       ├── Cave near Yararyurt.md
│   │   │       └── Ancient Ruins.md
│   │   └── Another Province/
│   │       └── ...
│   ├── Luminarian Empire/
│   │   └── ...
│   └── ... (17 more active states)
│
├── Ancient Realms/
│   ├── Mithvan Theocracy/
│   │   └── Mithvan Theocracy.md
│   └── ... (11 more ancient states)

03 Resources/Geography/
├── Rivers/
│   ├── Ginulb.md
│   ├── Khiz.md
│   └── ... (217 rivers)
├── Routes/
│   ├── roads/
│   │   └── ... (14 roads)
│   ├── trails/
│   │   └── ... (387 trails)
│   └── searoutes/
│       └── ... (30 sea routes)
```

### Emblems Structure (Mirrors Notes)

```
03 Resources/Emblems/
├── Beylik of Frostmark/
│   ├── Beylik of Frostmark.png
│   └── Yruryurt County/
│       ├── Yruryurt County.png
│       └── Yararyurt/
│           └── Yararyurt.png
└── Ancient Realms/
    └── Mithvan Theocracy.png
```

**Note:** Emblem PNGs are **placeholder paths only** - actual image files not created by import scripts.

---

## YAML Schemas

### 1. State Template

```yaml
---
title: "{{state_full_name}}"
type: '[[State]]'
icon: 🏰

state_name: "{{state.name}}"
state_full_name: "{{state.fullName}}"
state_type: "{{state.type}}"
state_form: "{{state.form}}"
state_form_name: "{{state.formName}}"

state_removed: {{state.removed or False}}
state_location: "{{location}}"

state_area: {{state.area}}
state_cells: {{state.cells}}
state_pole_x: {{state.pole[0]}}
state_pole_y: {{state.pole[1]}}
state_color: "{{state.color}}"

terrain_elevation_min: {{elevation_min}}
terrain_elevation_max: {{elevation_max}}
terrain_elevation_avg: {{elevation_avg}}
terrain_elevation_unit: "ft"

terrain_temperature_min: {{temp_min}}
terrain_temperature_max: {{temp_max}}
terrain_temperature_avg: {{temp_avg}}
terrain_temperature_unit: "°F"

terrain_dominant_biome_id: {{dominant_biome_id}}
terrain_dominant_biome: "{{dominant_biome_name}}"
terrain_biome_diversity: {{biome_diversity_count}}

biome_marine_pct: {{biome_pct.get(0, 0)}}
biome_hot_desert_pct: {{biome_pct.get(1, 0)}}
biome_cold_desert_pct: {{biome_pct.get(2, 0)}}
biome_savanna_pct: {{biome_pct.get(3, 0)}}
biome_grassland_pct: {{biome_pct.get(4, 0)}}
biome_tropical_forest_pct: {{biome_pct.get(5, 0)}}
biome_temperate_forest_pct: {{biome_pct.get(6, 0)}}
biome_rainforest_tropical_pct: {{biome_pct.get(7, 0)}}
biome_rainforest_temperate_pct: {{biome_pct.get(8, 0)}}
biome_taiga_pct: {{biome_pct.get(9, 0)}}
biome_tundra_pct: {{biome_pct.get(10, 0)}}
biome_glacier_pct: {{biome_pct.get(11, 0)}}
biome_wetland_pct: {{biome_pct.get(12, 0)}}

state_population_urban: {{state.urban}}
state_population_rural: {{state.rural}}
state_population_total: {{state.urban + state.rural}}
state_burgs_count: {{state.burgs}}

state_population_density: {{(state.urban + state.rural) / state.area}}
state_urban_percentage: {{(state.urban / (state.urban + state.rural)) * 100}}
state_urbanization: {{state.urban / state.area}}

state_expansionism: {{state.expansionism}}
state_alert_level: {{state.alert}}

military_infantry: {{total_units.get('infantry', 0)}}
military_archers: {{total_units.get('archers', 0)}}
military_cavalry: {{total_units.get('cavalry', 0)}}
military_artillery: {{total_units.get('artillery', 0)}}
military_fleet: {{total_units.get('fleet', 0)}}
military_total_units: {{sum(total_units.values())}}
military_regiments_count: {{len(state.military)}}
military_strength: {{calculate_military_strength(total_units)}}

campaigns_total: {{len(state.campaigns)}}
campaigns_active: {{len([c for c in state.campaigns if 'end' not in c])}}
campaigns_completed: {{len([c for c in state.campaigns if 'end' in c])}}
campaigns_active_names: [{{active_campaign_names}}]
campaigns_recent: "{{most_recent_campaign}}"

diplomacy_allies: {{diplomacy_counts.get('Ally', 0)}}
diplomacy_enemies: {{diplomacy_counts.get('Enemy', 0)}}
diplomacy_neutral: {{diplomacy_counts.get('Neutral', 0)}}
diplomacy_suspicion: {{diplomacy_counts.get('Suspicion', 0)}}
diplomacy_unknown: {{diplomacy_counts.get('Unknown', 0)}}
diplomacy_vassal: {{diplomacy_counts.get('Vassal', 0)}}
diplomacy_suzerain: {{diplomacy_counts.get('Suzerain', 0)}}

emblem_path: "Emblems/{{state_full_name}}/{{state_full_name}}.png"
coa_shield: "{{state.coa.shield}}"
coa_primary_color: "{{state.coa.t1}}"
coa_description: "{{generate_coa_description(state.coa)}}"

capital_burg: "[[{{capital_name}}]]"
primary_culture: "[[{{culture_name}}]]"
neighbor_states: [{{neighbor_wikilinks}}]
provinces: [{{province_wikilinks}}]

json_id: {{state.i}}
---
```

### 2. Province Template

```yaml
---
title: "{{province_full_name}}"
type: '[[Province]]'
icon: 🗺️

province_name: "{{province.name}}"
province_form_name: "{{province.formName}}"
province_full_name: "{{province.fullName}}"

province_area: {{province.area}}
province_pole_x: {{province.pole[0]}}
province_pole_y: {{province.pole[1]}}
province_color: "{{province.color}}"
province_center_cell: {{province.center}}

terrain_elevation_min: {{elevation_min}}
terrain_elevation_max: {{elevation_max}}
terrain_elevation_avg: {{elevation_avg}}
terrain_elevation_unit: "ft"

terrain_temperature_min: {{temp_min}}
terrain_temperature_max: {{temp_max}}
terrain_temperature_avg: {{temp_avg}}
terrain_temperature_unit: "°F"

terrain_dominant_biome_id: {{dominant_biome_id}}
terrain_dominant_biome: "{{dominant_biome_name}}"
terrain_biome_diversity: {{biome_diversity_count}}

biome_marine_pct: {{biome_pct.get(0, 0)}}
biome_hot_desert_pct: {{biome_pct.get(1, 0)}}
biome_cold_desert_pct: {{biome_pct.get(2, 0)}}
biome_savanna_pct: {{biome_pct.get(3, 0)}}
biome_grassland_pct: {{biome_pct.get(4, 0)}}
biome_tropical_forest_pct: {{biome_pct.get(5, 0)}}
biome_temperate_forest_pct: {{biome_pct.get(6, 0)}}
biome_rainforest_tropical_pct: {{biome_pct.get(7, 0)}}
biome_rainforest_temperate_pct: {{biome_pct.get(8, 0)}}
biome_taiga_pct: {{biome_pct.get(9, 0)}}
biome_tundra_pct: {{biome_pct.get(10, 0)}}
biome_glacier_pct: {{biome_pct.get(11, 0)}}
biome_wetland_pct: {{biome_pct.get(12, 0)}}

province_population_urban: {{province.urban}}
province_population_rural: {{province.rural}}
province_population_total: {{province.urban + province.rural}}

province_population_density: {{(province.urban + province.rural) / province.area}}
province_urban_percentage: {{(province.urban / (province.urban + province.rural)) * 100}}
province_burgs_count: {{len(province.burgs)}}

emblem_path: "Emblems/{{state_name}}/{{province_full_name}}/{{province_full_name}}.png"
coa_shield: "{{province.coa.shield}}"
coa_primary_color: "{{province.coa.t1}}"
coa_description: "{{generate_coa_description(province.coa)}}"

parent_state: "[[{{state_name}}]]"
capital_burg: "[[{{capital_name}}]]"
burgs: [{{burg_wikilinks}}]
nearby_features: [{{feature_wikilinks}}]
rivers: [{{river_wikilinks}}]

json_id: {{province.i}}
---
```

### 3. Burg Template

```yaml
---
title: "{{burg_name}}"
type: '[[Burg]]'
icon: 🏘️

burg_name: "{{burg.name}}"
burg_type: "{{burg.type}}"

burg_x: {{burg.x}}
burg_y: {{burg.y}}
latitude: {{burg.y}}
longitude: {{burg.x}}
burg_cell: {{burg.cell}}

terrain_elevation: {{cell_elevation}}
terrain_elevation_unit: "ft"
terrain_temperature: {{cell_temperature}}
terrain_temperature_unit: "°F"
terrain_biome_id: {{burg.biome}}
terrain_biome: "{{biome_name}}"

burg_population: {{burg.population}}
burg_capital: {{burg.capital == 1}}
burg_port: {{burg.port == 1}}

burg_citadel: {{burg.citadel == 1}}
burg_plaza: {{burg.plaza == 1}}
burg_walls: {{burg.walls == 1}}
burg_shantytown: {{burg.shanty == 1}}
burg_temple: {{burg.temple == 1}}

settlement_size_category: "{{calculate_size_category(burg.population)}}"
settlement_population_thousands: {{burg.population * 1000}}
has_defenses: {{burg.citadel == 1 or burg.walls == 1}}
religious_site: {{burg.temple == 1}}
trade_hub: {{burg.port == 1 or burg.plaza == 1}}

emblem_path: "Emblems/{{state_name}}/{{province_name}}/{{burg_name}}/{{burg_name}}.png"
coa_shield: "{{burg.coa.shield}}"
coa_primary_color: "{{burg.coa.t1}}"
coa_description: "{{generate_coa_description(burg.coa)}}"

province: "[[{{province_name}}]]"
state: "[[{{state_name}}]]"
culture: "[[{{culture_name}}]]"
feature: "[[{{feature_name}}]]"
on_river: "[[{{river_name}}]]"

json_id: {{burg.i}}
---
```

### 4. Point of Interest Template

```yaml
---
title: "{{marker_name}}"
type: '[[Point of Interest]]'
icon: "{{marker.icon}}"

marker_name: "{{marker_name}}"
marker_type: "{{marker.type}}"
marker_icon: "{{marker.icon}}"

marker_x: {{marker.x}}
marker_y: {{marker.y}}
latitude: {{marker.y}}
longitude: {{marker.x}}
marker_cell: {{marker.cell}}

terrain_elevation: {{cell_elevation}}
terrain_elevation_unit: "ft"
terrain_temperature: {{cell_temperature}}
terrain_temperature_unit: "°F"
terrain_biome_id: {{marker.biome}}
terrain_biome: "{{biome_name}}"

marker_size: {{marker.size}}
marker_locked: {{marker.lock}}

marker_category: "{{categorize_marker_type(marker.type)}}"
danger_level: "{{calculate_danger_level(marker.type)}}"
accessibility: "{{calculate_accessibility(cell_elevation, biome_name)}}"
season_accessibility: "{{calculate_season_access(cell_temperature)}}"

province: "[[{{province_name}}]]"
state: "[[{{state_name}}]]"
nearest_burg: "[[{{nearest_burg_name}}]]"
distance_to_burg: {{distance_to_nearest}}

json_id: {{marker.i}}
---
```

### 5. River Template

```yaml
---
title: "{{river_name}}"
type: '[[River]]'
icon: 🌊

river_name: "{{river.name}}"
river_type: "{{river.type}}"

river_length: {{river.length}}
river_length_unit: "mi"
river_width: {{river.width}}
river_width_unit: "mi"
river_discharge: {{river.discharge}}
river_discharge_unit: "m³/s"

source_cell: {{river.source}}
source_width: {{river.sourceWidth}}
mouth_cell: {{river.mouth}}
width_factor: {{river.widthFactor}}

basin_id: {{river.basin}}
parent_river_id: {{river.parent}}
cell_count: {{len(river.cells)}}

provinces_crossed: [{{province_wikilinks}}]
provinces_count: {{provinces_count}}
states_crossed: [{{state_wikilinks}}]
states_count: {{states_count}}

burgs_on_river: [{{burg_wikilinks}}]
burgs_count: {{burgs_count}}

parent_river: "[[{{parent_river_name}}]]"
tributary_rivers: [{{tributary_wikilinks}}]

json_id: {{river.i}}
---
```

### 6. Route Template

```yaml
---
title: "{{route_name}}"
type: '[[Route]]'
icon: 🛤️

route_name: "{{route_name}}"
route_group: "{{route.group}}"
route_type: "{{route_type_name}}"

route_length: {{route_length}}
route_length_unit: "mi"
waypoint_count: {{len(route.points)}}

feature_id: {{route.feature}}
feature_name: "{{feature_name}}"

provinces_crossed: [{{province_wikilinks}}]
provinces_count: {{provinces_count}}
states_crossed: [{{state_wikilinks}}]
states_count: {{states_count}}

burgs_connected: [{{burg_wikilinks}}]
burgs_count: {{burgs_count}}

start_point_x: {{route.points[0][0]}}
start_point_y: {{route.points[0][1]}}
end_point_x: {{route.points[-1][0]}}
end_point_y: {{route.points[-1][1]}}

json_id: {{route.i}}
---
```

---

## Script Architecture

### Location
All scripts in: `/Volumes/Elements/Nebulab/scripts/`

### Dependencies
- Python 3.x
- Standard library only (json, os, pathlib, csv, statistics, math)
- No external packages required
- Follows SOP: Single config.json, modular architecture

### Scripts Overview

| # | Script Name | Purpose | Output Count |
|---|------------|---------|--------------|
| 1 | `orbis_import_utils.py` | Shared utilities module | N/A (library) |
| 2 | `create_lookup_tables.py` | Generate CSV reference files | 6 CSV files |
| 3 | `import_states.py` | Create state notes | 31 notes |
| 4 | `import_provinces.py` | Create province structure | 397 notes |
| 5 | `import_burgs.py` | Create burg notes | 665 notes |
| 6 | `import_markers.py` | Create marker/POI notes | 1,744 notes |
| 7 | `import_rivers.py` | Create river notes with journeys | 217 notes |
| 8 | `import_routes.py` | Create route notes with journeys | 431 notes |

---

## Wikilink Policy

### CRITICAL RULE

**Every entity reference in narrative content MUST be wrapped in `[[wikilinks]]`**

This applies to:
- River journey narratives
- Route journey narratives
- Any future generated content

### Entities That Must Be Wikilinked

```python
WIKILINK_ENTITIES = {
    'biomes': True,          # [[Temperate Deciduous Forest]]
    'provinces': True,       # [[Yruryurt County]]
    'states': True,          # [[Beylik of Frostmark]]
    'burgs': True,          # [[Yararyurt]]
    'markers': True,        # [[Ancient Ruins of Kaz'thor]]
    'rivers': True,         # [[Khiz River]]
    'routes': True,         # [[Flame Road]]
    'features': True,       # [[Mount Ironpeak]]
    'cultures': True,       # [[Halfling]]
    'religions': True,      # [[Primary Religion]]
}
```

### Wikilink Function

```python
def wikilink(entity_name):
    """Wrap entity name in wikilink syntax"""
    if not entity_name or entity_name == "Unknown" or entity_name == "":
        return entity_name
    return f"[[{entity_name}]]"
```

### Example Narrative with Wikilinks

```markdown
The river flows through [[Wetland]], descending 44 feet in [[Yruryurt County]],
part of [[Beylik of Frostmark]]. Along this stretch, it passes [[Yararyurt]]
and [[Dinarg]]. Near the 15-mile mark, travelers will notice [[Cave of the Ancients]]
on the western bank, sitting at 245 feet elevation. The [[Flame Road]] crosses
the river at mile 22 via an ancient stone bridge.
```

---

## Implementation Scripts

### Script 1: orbis_import_utils.py

**Purpose:** Shared utility functions used by all import scripts

**Functions:**

```python
# Data Loading
def load_json_data(json_path)
def load_lookup_table(table_name)
def load_config()

# File Operations
def sanitize_filename(name)
def ensure_directory(path)
def write_markdown_file(path, frontmatter, body)

# Lookups
def get_biome_name(biome_id)
def get_province_name(province_id)
def get_state_name(state_id)
def get_burg_name(burg_id)
def get_culture_name(culture_id)
def get_feature_name(feature_id)

# Wikilinks
def wikilink(entity_name)
def wikilink_list(entity_names)

# Terrain Aggregation
def aggregate_cells_by_province(cells, province_id)
def aggregate_cells_by_state(cells, state_id)
def calculate_biome_percentages(cell_biomes)
def get_dominant_biome(cell_biomes)

# Distance Calculations
def calculate_distance(x1, y1, x2, y2)
def calculate_route_length(waypoints)

# CoA
def generate_coa_description(coa_json)

# Categorization
def calculate_size_category(population)
def categorize_marker_type(marker_type)
def calculate_danger_level(marker_type)
def calculate_accessibility(elevation, biome)
def calculate_season_access(temperature)

# Military
def calculate_military_strength(unit_counts)
def flatten_military_units(military_array)

# Diplomacy
def count_diplomacy_relations(diplomacy_array)
```

---

### Script 2: create_lookup_tables.py

**Purpose:** Generate CSV reference files for fast entity lookups

**Output Location:** `scripts/lookups/`

**Generated Files:**

1. **states.csv**
   ```csv
   id,name,fullName,removed,location
   0,Neutrals,Neutrals,False,SKIP
   1,Mithva,Mithvan Theocracy,True,Ancient Realms
   3,Frostmark,Beylik of Frostmark,False,Sovereign Realms of Orbis
   ```

2. **provinces.csv**
   ```csv
   id,name,fullName,state_id,state_name
   1,Yruryurt,Yruryurt County,3,Beylik of Frostmark
   ```

3. **burgs.csv**
   ```csv
   id,name,province_id,state_id
   1,Dinarg,13,7
   ```

4. **cultures.csv**
   ```csv
   id,name
   0,Dwarven
   1,Elven
   ```

5. **features.csv**
   ```csv
   id,name,type
   1,The Great Ocean,ocean
   2,River Khiz,river
   ```

6. **biomes.csv**
   ```csv
   id,name,color
   0,Marine,#466eab
   1,Hot desert,#fbe79f
   ```

**Processing:**
- Parse JSON once
- Extract all entity names and IDs
- Handle special cases (Neutrals, removed states)
- Write to CSV for fast lookups

---

### Script 3: import_states.py

**Purpose:** Create 31 state notes (skip Neutrals)

**Process:**

1. Load JSON and lookup tables
2. For each state (skip ID 0):
   - Determine location (Sovereign Realms or Ancient Realms)
   - Aggregate terrain from all cells in state
   - Calculate biome percentages
   - Flatten military units
   - Count diplomacy relations
   - Extract campaign data
   - Generate CoA description
   - Create folder structure
   - Write markdown file with frontmatter
   - Add minimal body content

**Output:**
- 19 states in `Sovereign Realms of Orbis/`
- 12 states in `Ancient Realms/`

**Body Content:** Minimal placeholder only

---

### Script 4: import_provinces.py

**Purpose:** Create 397 province notes with folder structure

**Process:**

1. Load JSON and lookup tables
2. For each province:
   - Lookup parent state
   - Aggregate terrain from province cells
   - Calculate biome percentages
   - Lookup capital burg
   - Lookup all burgs in province
   - Find nearby rivers/features
   - Create province folder under state
   - Create `Points of Interest/` subfolder
   - Create empty burg folders
   - Write province markdown file

**Output:**
- 397 province folders
- 397 province .md files
- 397 "Points of Interest/" folders
- 665 empty burg folders (ready for Script 5)

**Body Content:** Minimal placeholder only

---

### Script 5: import_burgs.py

**Purpose:** Create 665 burg notes

**Process:**

1. Load JSON and lookup tables
2. For each burg:
   - Lookup cell data for terrain
   - Lookup province, state, culture
   - Find if on river/feature
   - Calculate size category
   - Generate CoA description
   - Write markdown file in burg folder

**Output:**
- 665 burg .md files in respective province/burg folders

**Body Content:** Minimal placeholder only

---

### Script 6: import_markers.py

**Purpose:** Create 1,744 marker/POI notes

**Process:**

1. Load JSON and lookup tables
2. For each marker:
   - Generate name if missing (e.g., "Cave near [NearestBurg]")
   - Lookup cell data for terrain
   - Lookup province/state
   - Find nearest burg
   - Calculate distance to burg
   - Categorize marker type
   - Calculate danger level
   - Write markdown file in province "Points of Interest/"

**Output:**
- 1,744 marker .md files in province POI folders

**Body Content:** Minimal placeholder only

---

### Script 7: import_rivers.py

**Purpose:** Create 217 river notes with full journey narratives

**Process:**

1. Load JSON and lookup tables
2. For each river:
   - Analyze cells along path
   - Identify segments (biome changes, elevation changes, province crossings)
   - For each segment:
     - Generate narrative with full wikilinks
     - Note burgs along segment
     - Find nearby markers
     - Calculate distances
   - Build complete journey markdown
   - Write river file in Geography/Rivers/

**Output:**
- 217 river .md files with full journey narratives

**Body Content:** **FULL NARRATIVE with wikilinks**

**Example Segment:**
```markdown
### Segment 2: Wetland Descent Through Frostmark
**Distance:** 28.2 miles | **Elevation Change:** -44 feet

The river flows through [[Wetland]], descending 44 feet in [[Yruryurt County]],
part of [[Beylik of Frostmark]]. Along this stretch, it passes [[Yararyurt]]
and [[Dinarg]]. Near the 15-mile mark, travelers will notice [[Cave of the Ancients]]
on the western bank, sitting at 245 feet elevation.

**Temperature:** 1°F to 3°F
```

---

### Script 8: import_routes.py

**Purpose:** Create 431 route notes with full journey narratives

**Process:**

1. Load JSON and lookup tables
2. For each route:
   - Analyze waypoints
   - Calculate total length
   - Identify provinces/states crossed
   - Find burgs along route
   - Identify river crossings
   - For each segment:
     - Generate narrative with full wikilinks
     - Note terrain changes
     - Describe crossings/passes
   - Build complete journey markdown
   - Write route file in Geography/Routes/{group}/

**Output:**
- 14 road notes in `Geography/Routes/roads/`
- 387 trail notes in `Geography/Routes/trails/`
- 30 sea route notes in `Geography/Routes/searoutes/`

**Body Content:** **FULL NARRATIVE with wikilinks**

---

## Execution Order

### Phase 1: Setup
```bash
cd /Volumes/Elements/Nebulab/scripts

# Create lookups directory
mkdir -p lookups
```

### Phase 2: Generate Lookups
```bash
python3 create_lookup_tables.py
# Output: 6 CSV files in scripts/lookups/
```

### Phase 3: Import Entities (Order Matters)
```bash
# 1. States first (creates state folders)
python3 import_states.py

# 2. Provinces second (creates province structure)
python3 import_provinces.py

# 3. Burgs third (populates burg folders)
python3 import_burgs.py

# 4. Markers fourth (populates POI folders)
python3 import_markers.py

# 5. Rivers fifth (independent of state structure)
python3 import_rivers.py

# 6. Routes last (independent of state structure)
python3 import_routes.py
```

### Expected Runtime
- Lookup tables: ~5 seconds
- States: ~30 seconds
- Provinces: ~2 minutes
- Burgs: ~3 minutes
- Markers: ~5 minutes
- Rivers: ~10 minutes (narrative generation)
- Routes: ~15 minutes (narrative generation)

**Total: ~35 minutes**

---

## Helper Functions

### Terrain Aggregation

```python
def aggregate_cells_by_province(cells, province_id):
    """Aggregate cell data for a province"""
    province_cells = [c for c in cells if isinstance(c, dict) and c.get('province') == province_id]

    if not province_cells:
        return None

    heights = [c.get('h', 0) for c in province_cells]
    temps = [c.get('t', 0) for c in province_cells]
    biomes = [c.get('biome', 0) for c in province_cells]

    return {
        'elevation_min': min(heights),
        'elevation_max': max(heights),
        'elevation_avg': sum(heights) / len(heights),
        'temp_min': min(temps),
        'temp_max': max(temps),
        'temp_avg': sum(temps) / len(temps),
        'biomes': biomes,
        'dominant_biome_id': max(set(biomes), key=biomes.count),
        'biome_diversity': len(set(biomes))
    }
```

### Journey Segment Analysis

```python
def analyze_river_segments(river_cells, cells_data):
    """Break river into narrative segments based on significant changes"""
    segments = []
    current_segment = {
        'cells': [],
        'start_elevation': None,
        'biome': None,
        'province': None
    }

    for cell_id in river_cells:
        cell = cells_data[cell_id]

        # Check for significant changes
        elevation_change = abs(cell['h'] - current_segment['start_elevation']) > 20 if current_segment['start_elevation'] else False
        biome_change = cell['biome'] != current_segment['biome'] if current_segment['biome'] is not None else False
        province_change = cell['province'] != current_segment['province'] if current_segment['province'] is not None else False

        if elevation_change or biome_change or province_change:
            if current_segment['cells']:
                segments.append(current_segment)

            current_segment = {
                'cells': [cell],
                'start_elevation': cell['h'],
                'biome': cell['biome'],
                'province': cell['province']
            }
        else:
            current_segment['cells'].append(cell)

    if current_segment['cells']:
        segments.append(current_segment)

    return segments
```

### Narrative Generation

```python
def generate_segment_narrative(segment, lookups):
    """Generate prose narrative for a segment with full wikilinks"""
    start = segment['cells'][0]
    end = segment['cells'][-1]

    # Get wikilinked names
    biome = wikilink(get_biome_name(start['biome']))
    province = wikilink(get_province_name(start['province']))
    state = wikilink(get_state_name_from_province(start['province']))

    # Calculate elevation change
    elevation_change = end['h'] - start['h']

    # Build narrative
    narrative = f"The river flows through {biome}"

    if elevation_change > 10:
        narrative += f", ascending {abs(elevation_change)} feet"
    elif elevation_change < -10:
        narrative += f", descending {abs(elevation_change)} feet"

    narrative += f" in {province}, part of {state}."

    # Add burgs
    burgs = [wikilink(get_burg_name(c['burg'])) for c in segment['cells'] if c.get('burg')]
    if burgs:
        if len(burgs) == 1:
            narrative += f" Along this stretch, it passes {burgs[0]}."
        else:
            narrative += f" Along this stretch, it passes {', '.join(burgs[:-1])} and {burgs[-1]}."

    return narrative
```

---

## Validation & Testing

### Pre-Import Checks

```python
def validate_json():
    """Validate JSON structure before import"""
    required_keys = ['pack', 'biomesData', 'settings']
    required_pack_keys = ['states', 'provinces', 'burgs', 'markers', 'rivers', 'routes', 'cells']

    # Check all required keys exist
    # Check entity counts match expectations
    # Validate no duplicate IDs
```

### Post-Import Validation

```bash
# Count created files
find "03 Resources/Historical Lore/Sovereign Realms of Orbis" -name "*.md" | wc -l
# Expected: 19 states + 397 provinces + 665 burgs = 1081

find "03 Resources/Historical Lore/Ancient Realms" -name "*.md" | wc -l
# Expected: 12

find "03 Resources/Geography/Rivers" -name "*.md" | wc -l
# Expected: 217

find "03 Resources/Geography/Routes" -name "*.md" | wc -l
# Expected: 431

# Total: 1081 + 12 + 1744 + 217 + 431 = 3485 (Neutrals skipped)
```

### Content Validation

```python
def validate_note(file_path):
    """Validate a created note"""
    with open(file_path) as f:
        content = f.read()

    # Check YAML frontmatter exists
    assert content.startswith('---')

    # Check required fields present
    # Check all wikilinks are properly formed
    # Check no broken template variables
```

---

## Error Handling

### Common Issues

1. **Missing Province:** Province ID in burg/marker not found
   - Log warning
   - Skip entity or use "Unknown Province"

2. **Invalid Coordinates:** Cell ID out of range
   - Log warning
   - Use default values or skip

3. **Duplicate Names:** Multiple entities with same name
   - Append ID to filename: `Town (123).md`

4. **File Permission Errors:** Cannot write to vault
   - Halt script
   - Report error with path

### Logging

All scripts should log:
- Progress (every 50 entities)
- Warnings (missing data)
- Errors (fatal issues)
- Summary (total created, skipped, errors)

---

## Next Steps

1. **Review this specification**
2. **Implement Script 1:** `orbis_import_utils.py`
3. **Implement Script 2:** `create_lookup_tables.py`
4. **Test lookup generation**
5. **Implement remaining scripts in order**
6. **Run full import**
7. **Validate output**
8. **Update daily note with results**

---

**Document Version:** 1.0
**Date Created:** 2025-12-03
**Status:** Ready for Implementation
**Next Action:** Begin coding `orbis_import_utils.py`
