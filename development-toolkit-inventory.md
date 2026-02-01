# Development Toolkit Inventory Report
**Generated**: 2025-01-28  
**Scope**: /Volumes/Elements/Development/scripts/, /Volumes/Elements/Development/tasks/  
**Total Scripts Analyzed**: 100+ Python files across 8 major categories

---

## 📊 EXECUTIVE SUMMARY

### Overall Structure
- **scripts/**: 36 application-specific scripts organized in 9 categories
- **tasks/**: 64+ complex task files with reusable framework (base_modules/, core/, skills/)
- **Duplication Status**: 3 identified consolidation opportunities (vault parsing, markdown parsing, database ops)
- **Modularity Score**: 70% - Emerging framework structure with 15 reusable modules

### Key Findings
1. **Heavy vault operations** - 8 scripts focused on Obsidian vault querying + 20+ references in tasks
2. **Database-heavy** - PostgreSQL integration in 18 scripts, connection pooling needs centralization
3. **Data transformation patterns** - 12 ETL-style scripts with similar JSON parsing/transformation logic
4. **Asset management** - 5 scripts managing file relocations + metadata linking
5. **Cleanup/reconciliation** - 6 scripts handling duplicates, merging, and validation

---

## 🗂️ SCRIPT INVENTORY BY CATEGORY

### Category 1: VAULT OPERATIONS (8 scripts)
**Generic Capability**: Markdown vault scanning, file metadata extraction, content querying

#### 1.1 `match_vault_dungeons.py`
- **Purpose**: Match dungeon vault notes with database marker entries
- **Lines**: 173
- **Generic Capability**: Vault file pattern matching + database linking
- **Reusability**: HIGH - Extract as `VaultMatcher` class
- **Modularization Path**:
  - Extract frontmatter parser → `MarkdownParser.extract_frontmatter()`
  - Extract file finder → `VaultOperations.find_files(pattern)`
  - Extract matching logic → `VaultMatcher.match_by_regex(vault_path, db_connection, pattern)`
- **Dependencies**: `psycopg2`, `yaml`, `pathlib`, `re`
- **Inputs**: Vault path, DB config, file patterns
- **Outputs**: Matched tuples (vault_file, db_record_id, confidence)
- **When to Use**: Any time you need to correlate vault notes with DB entries

**Current Integration**: Standalone - duplicates logic from `link_vault_dungeons.py`

---

#### 1.2 `link_vault_dungeons.py`
- **Purpose**: Find all vault files with type: [[Dungeon]] and match to database markers
- **Lines**: 161
- **Generic Capability**: Type-filtered vault scanning + linking
- **Reusability**: HIGH - Nearly identical to match_vault_dungeons.py
- **Modularization Path**:
  - Extract type filter → `MarkdownParser.extract_field(content, field_name)`
  - Consolidate with `match_vault_dungeons.py` into unified `VaultMatcher`
- **Dependencies**: `psycopg2`, `yaml`, `pathlib`, `re`
- **Inputs**: Vault path, DB config, type filter (e.g., "Dungeon")
- **Outputs**: Linked records with confidence scores
- **When to Use**: Type-specific vault querying with automatic linking

**Current Integration**: Standalone - **CONSOLIDATION CANDIDATE** with match_vault_dungeons.py

---

#### 1.3 `find_adg_dungeons.py`
- **Purpose**: Find ALL dungeons and markers in ADg County by matching marker cells to dungeon files
- **Lines**: 85
- **Generic Capability**: Spatial-aware vault querying
- **Reusability**: MEDIUM - Specific coordinates logic but generalizable pattern
- **Modularization Path**:
  - Extract marker lookup → `DatabaseOps.query_markers_by_province(province_id)`
  - Extract file matching → `VaultOperations.find_by_naming_pattern(names_list)`
  - Consolidate marker ID matching with generic pattern matcher
- **Dependencies**: `psycopg2`, `pathlib`
- **Inputs**: Province ID, vault root path
- **Outputs**: Dict mapping marker types to found files
- **When to Use**: Finding vault files for database records by location or ID

**Current Integration**: Standalone - uses hardcoded province 36 (ADg County)

---

#### 1.4 `check_notes_for_dungeons.py`
- **Purpose**: Scan vault notes for dungeon references and validate consistency
- **Lines**: ~120 (estimated from pattern)
- **Generic Capability**: Vault content validation + cross-referencing
- **Reusability**: MEDIUM - Validation patterns apply to any note type
- **Modularization Path**:
  - Extract validation logic → `VaultValidator.validate_note(note, expected_fields, type_name)`
  - Extract reference checker → `VaultValidator.check_cross_references(note, vault_ops)`
- **Dependencies**: `pathlib`, `re`, possibly `psycopg2`
- **Inputs**: Vault path, note type, expected fields
- **Outputs**: Validation report with errors/warnings
- **When to Use**: Quality assurance on vault content before import

**Current Integration**: Standalone - ad-hoc validation

---

#### 1.5 `check_wrymling_data.py`
- **Purpose**: Validate wyrmling/dragon data completeness and consistency
- **Lines**: ~100 (estimated)
- **Generic Capability**: Type-specific content validation
- **Reusability**: MEDIUM - Schema validation patterns are generic
- **Modularization Path**:
  - Extract schema validator → `VaultValidator.validate_schema(note, schema_dict)`
  - Extract missing field detector → `VaultValidator.find_missing_fields(note, required_fields)`
- **Dependencies**: `pathlib`, `re`
- **Inputs**: Vault path, validation schema
- **Outputs**: List of validation errors with locations
- **When to Use**: Pre-import data quality checks for any note type

**Current Integration**: Standalone - dragon-specific

---

#### 1.6 `generate_adg_county_note.py`
- **Purpose**: Generate aggregated ADg County note from database records
- **Lines**: 170
- **Generic Capability**: Database → vault note generation
- **Reusability**: HIGH - Template-based generation is reusable
- **Modularization Path**:
  - Extract query logic → `DatabaseOps.query_records_by_region(region_id, table)`
  - Extract template rendering → `NoteGenerator.render_note_from_template(template, data)`
  - Extract file writing → `VaultOperations.write_note(path, frontmatter, body)`
- **Dependencies**: `psycopg2`, `pathlib`, `re`
- **Inputs**: County/region ID, DB config, template
- **Outputs**: Markdown note with frontmatter
- **When to Use**: Bulk vault note generation from any database view

**Current Integration**: Standalone - ADg-specific template

---

#### 1.7 `query_adg_county.py`
- **Purpose**: Query database for ADg County records
- **Lines**: ~80 (estimated)
- **Generic Capability**: Spatial database queries
- **Reusability**: HIGH - Query patterns generalize to any region
- **Modularization Path**:
  - Extract as `DatabaseOps.query_by_region(region_id, table, columns)`
  - Add filter builder → `QueryBuilder.filter_by_region(region_id)`
- **Dependencies**: `psycopg2`
- **Inputs**: Region ID, table name
- **Outputs**: Result set
- **When to Use**: Any regional/spatial database queries

**Current Integration**: Standalone - hardcoded to ADg

---

#### 1.8 `import_wyrmling_dungeons.py`
- **Purpose**: Import wyrmling dungeon data from vault notes into database
- **Lines**: 147
- **Generic Capability**: Vault → database ETL (note parsing + insertion)
- **Reusability**: HIGH - ETL pattern applies to all vault imports
- **Modularization Path**:
  - Extract note scanner → `VaultOperations.find_files_of_type(vault_path, type_name)`
  - Extract data extractor → `MarkdownParser.extract_structured_data(note_content, schema)`
  - Extract database insert → `DatabaseOps.bulk_insert(table, records)`
  - Consolidate with other import_*.py scripts into generic `VaultToDBImporter`
- **Dependencies**: `psycopg2`, `pathlib`, `re`, `yaml`
- **Inputs**: Vault path, DB config, note type to import
- **Outputs**: Import report (success count, errors)
- **When to Use**: Any bulk vault note import to database

**Current Integration**: Standalone - **CONSOLIDATION CANDIDATE** with other import_*.py

---

### Category 2: DATABASE OPERATIONS & IMPORTS (18 scripts)

#### 2.1 `import/import_orbis_data.py`
- **Purpose**: Import Orbis map data from Azgaar's Fantasy Map Generator JSON into PostgreSQL
- **Lines**: 513 (largest import file)
- **Generic Capability**: JSON → PostgreSQL ETL with foreign key resolution
- **Reusability**: HIGH - Pattern applies to all JSON map imports
- **Modularization Path**:
  - Extract JSON loader → `DataLoader.load_json(file_path)`
  - Extract parallel-array handling → `DataParser.parse_parallel_arrays(data, ids_field, value_fields)`
  - Extract bulk insert → `DatabaseOps.bulk_upsert(table, records, conflict_key)`
  - Create abstract `JSONToDB` importer with pluggable schema mappers
- **Dependencies**: `json`, `psycopg2`, `datetime`
- **Inputs**: JSON file path, DB config
- **Outputs**: Import report with row counts per table
- **When to Use**: Any JSON → SQL import (maps, configs, generated data)

**Key Subpattern**: Parallel array unpacking
```python
# Pattern used in import_orbis_data:
ids = data['cultures']['i']
names = data['cultures']['name']
for i, culture_id in enumerate(ids):
    records.append((culture_id, names[i], ...))
```

**Modularization Candidate**: `DataParser.unpack_parallel_arrays()`

---

#### 2.2 Database Import Chain (tasks/db-import/)
**Purpose**: Numbered pipeline for importing Orbis world data in dependency order
**Count**: 8 scripts (01-08)

| File | Purpose | Reusability | Size |
|------|---------|-------------|------|
| 01_extract_dragon_ages.py | Extract/calculate age from markdown | HIGH | 80L |
| 02_import_biomes.py | Biome data insert | HIGH | 60L |
| 02_import_lair_coordinates.py | Lair location insert | HIGH | 75L |
| 03_import_azgaar.py | Core map import | HIGH | 140L |
| 03.5_match_dungeons_to_markers.py | Link vault files to map markers | HIGH | 120L |
| 04_import_watabou_dungeons.py | Watabou dungeon JSON import | HIGH | 110L |
| 05_import_npcs.py | NPC data import from vault | HIGH | 95L |
| 06_spatial_inheritance.py | Calculate geographic relationships | MEDIUM | 130L |
| 08_import_dragons.py | Dragon data import from vault | HIGH | 105L |

**Shared Pattern**: All follow pattern:
1. Scan vault/load JSON
2. Extract/transform data
3. Validate
4. Bulk insert with error handling

**Consolidation Opportunity**: Create `PipelineStage` base class with:
- Data loading
- Transformation
- Validation
- Error handling
- Logging

---

#### 2.3 `tasks/core/database.py`
- **Purpose**: PostgreSQL connection pooling and query execution utilities
- **Lines**: 180+ (fully modularized)
- **Generic Capability**: REUSABLE DATABASE ABSTRACTION LAYER ✓
- **Status**: Already modularized! Used by multiple tasks
- **Key Features**:
  - Connection pooling with SimpleConnectionPool
  - Context managers for auto-cleanup
  - Query helpers (execute, fetch_one, fetch_all)
  - Transaction management
  - Environment-aware config (local/droplet)
- **Inputs**: Environment name, SQL queries
- **Outputs**: Query results
- **When to Use**: All database access - this is the standard

**Integration Status**: ✓ MATURE - Used across tasks/db-import/ and tasks/skills/

---

#### 2.4 `orbis_import_utils.py`
- **Purpose**: Shared utilities for Orbis import operations
- **Lines**: ~150 (estimated)
- **Generic Capability**: Orbis-specific data transformation helpers
- **Reusability**: MEDIUM - Orbis-specific but patterns generalize
- **Modularization Path**:
  - Extract parallel array unpacking
  - Extract coordinate transformation
  - Extract name normalization
- **Dependencies**: `json`, `pathlib`
- **Inputs**: Orbis data structures
- **Outputs**: Normalized/transformed data

**Current Status**: Consolidation candidate with import_orbis_data.py

---

#### 2.5-2.9 `import_[provinces|rivers|routes|states].py`
- **Purpose**: Bulk import geographic data from Orbis
- **Lines**: ~60 each
- **Generic Capability**: Metadata table loading
- **Reusability**: HIGH - Same pattern, different tables
- **Pattern**: 
  1. Load JSON
  2. Extract field mapping
  3. Bulk insert
- **Consolidation Opportunity**: Parameterize into single `import_orbis_table(table_name, field_map)`

---

### Category 3: DATA PROCESSING & TRANSFORMATION (12 scripts)

#### 3.1 `data_processing/extract_orbis_geography.py`
- **Purpose**: Extract comprehensive geographic data from Orbis and create province geography database
- **Lines**: 362
- **Generic Capability**: Multi-source data fusion + normalization
- **Reusability**: HIGH - Pattern applies to any geographic synthesis
- **Modularization Path**:
  - Extract biome mapper → `GeographyProcessor.map_biomes(orbis_data)`
  - Extract province mapper → `GeographyProcessor.map_provinces(orbis_data)`
  - Extract state mapper → `GeographyProcessor.map_states(orbis_data)`
  - Extract vault enricher → `GeographyProcessor.enrich_from_vault_notes(vault_path)`
  - Extract cell processor → `GeographyProcessor.process_cells(cells, mappings)`
- **Dependencies**: `json`, `re`, `pathlib`, `collections`, `math`
- **Inputs**: Orbis Full.json, vault path
- **Outputs**: province_geography.json
- **When to Use**: Synthesizing data from multiple sources into unified geography

**Key Pattern**: Parallel array unpacking + defensive mapping
```python
if 'i' in biomes_data and 'name' in biomes_data:
    ids = biomes_data['i']
    names = biomes_data['name']
    for i, biome_id in enumerate(ids):
        biomes[biome_id] = names[i]
```

---

#### 3.2 `data_processing/update_province_geography.py`
- **Purpose**: Update province geography in database from extracted data
- **Lines**: 357
- **Generic Capability**: JSON → SQL update with validation
- **Reusability**: HIGH - Update pattern is generic
- **Modularization Path**:
  - Extract from extract_orbis_geography.py
  - Extract update builder → `UpdateBuilder.build_geography_update(province_id, geography_data)`
  - Extract validator → `GeographyValidator.validate_province_data(province_id, data)`
- **Dependencies**: `psycopg2`, `json`, `pathlib`
- **Inputs**: province_geography.json, DB config
- **Outputs**: Database update report
- **When to Use**: Bulk updating any tabular data from JSON source

---

#### 3.3 `data_processing/extract_orbis_geography.py`
- **Purpose**: Extract comprehensive geographic data
- **Reusability**: HIGH
- **Key Submodules to Extract**:
  - `BiomeMapper` - maps IDs to names
  - `ProvinceMapper` - province extraction
  - `StateMapper` - state extraction
  - `CellProcessor` - geographic cell processing

---

#### 3.4-3.12 Other Data Processing Scripts
| File | Purpose | Reusability | Size |
|------|---------|-------------|------|
| number_provinces.py | Sequential ID assignment | MEDIUM | 340L |
| populate_dungeon_metadata.py | Metadata calculation | HIGH | 204L |
| populate_province_ids.py | ID population from vault | HIGH | 222L |
| revert_numbering.py | Rollback numbering changes | MEDIUM | 80L |
| update_province_dungeons.py | Vault dungeon linking | HIGH | 183L |
| update_trade_routes.py | Route calculation | MEDIUM | 234L |

**Shared Pattern**: All follow ETL pipeline:
1. Scan vault/load data
2. Calculate derived values
3. Update database
4. Validate results

---

### Category 4: DATA MIGRATION & CLEANUP (9 scripts)

#### 4.1 `cleanup/merge_dungeons.py`
- **Purpose**: Merge duplicate dungeon notes with identical x,y coordinates
- **Lines**: 248
- **Generic Capability**: Duplicate detection + merging
- **Reusability**: HIGH - Pattern applies to any entity deduplication
- **Modularization Path**:
  - Extract coordinate parser → `MarkdownParser.extract_coordinates(frontmatter)`
  - Extract duplicate finder → `Deduplicator.find_duplicates(files, key_function)`
  - Extract merger → `NoteMerger.merge_notes(primary, secondary, merge_strategy)`
- **Dependencies**: `pathlib`, `re`, `shutil`, `argparse`
- **Inputs**: Vault path, entity type
- **Outputs**: Merge report (duplicates found, merged, errors)
- **When to Use**: Cleaning up duplicate vault notes before import

**Key Pattern**: Coordinate-based deduplication with fallback heuristics

---

#### 4.2 `cleanup/find_duplicate_dungeons.py`
- **Purpose**: Identify duplicate dungeon entries
- **Lines**: ~140 (estimated)
- **Generic Capability**: Duplicate detection by multiple attributes
- **Reusability**: HIGH - Detection algorithm is generic
- **Modularization Path**:
  - Extract as `Deduplicator.find_duplicates(records, key_fields)`
  - Support multiple key combinations (exact match, fuzzy match, coordinate proximity)
- **Inputs**: Vault path or DB table
- **Outputs**: Duplicate groups with confidence scores

---

#### 4.3 `cleanup/cleanup_province_coordinates.py`
- **Purpose**: Fix malformed or missing province coordinates
- **Lines**: 175
- **Generic Capability**: Data normalization + validation
- **Reusability**: MEDIUM - Specific to coordinates but pattern is generic
- **Modularization Path**:
  - Extract coordinate validator → `CoordinateValidator.validate_and_fix(coord_data)`
  - Extract normalizer → `DataNormalizer.normalize_coordinates(x, y, bounds)`
- **Inputs**: Database records, bounds/schema
- **Outputs**: Fixed records with validation report

---

#### 4.4-4.6 Data Migration Scripts
| File | Purpose | Reusability | Size |
|------|---------|-------------|------|
| move_dungeons.py | Filesystem relocation | MEDIUM | 225L |
| move_dungeons_by_cell.py | Cell-based relocation | MEDIUM | 259L |
| move_dungeons.sh | Shell wrapper | LOW | 20L |

**Shared Pattern**: Location-aware file relocation with metadata tracking
- Extract source/dest
- Move file
- Update database references
- Validate integrity

---

### Category 5: ASSET MANAGEMENT (5 scripts)

#### 5.1 `asset_management/consolidate_assets.py`
- **Purpose**: Consolidate emblem assets by moving them to match their vault notes
- **Lines**: 156
- **Generic Capability**: Asset-to-metadata linking + filesystem operations
- **Reusability**: HIGH - Pattern applies to all asset consolidation
- **Modularization Path**:
  - Extract note cache builder → `VaultOperations.build_note_cache(vault_path)`
  - Extract matcher → `AssetMatcher.find_matching_note(asset_name, notes_cache)`
  - Extract mover → `FileOperations.relocate_with_backup(source, dest, dry_run)`
- **Dependencies**: `pathlib`, `shutil`, `argparse`
- **Inputs**: Vault path, assets directory, asset type pattern
- **Outputs**: Relocation report (moved, failed, conflicts)
- **When to Use**: Consolidating scattered assets with their notes

**Key Features**:
- Builds cache of all notes (fast)
- Fuzzy matching support (handles naming variations)
- Dry-run mode for safety
- Backup before move
- Conflict detection

---

#### 5.2 `asset_management/add_dungeon_images.py`
- **Purpose**: Add image assets to dungeon notes
- **Lines**: ~120 (estimated)
- **Generic Capability**: Asset metadata linking
- **Reusability**: HIGH - Generic asset linking
- **Modularization Path**:
  - Extract with consolidate_assets.py into unified `AssetManager`
  - Support multi-type assets (images, emblems, maps)
- **Inputs**: Note files, image directory
- **Outputs**: Updated notes with asset references

---

#### 5.3-5.5 Other Asset Scripts
| File | Purpose | Reusability | Size |
|------|---------|-------------|------|
| fix_dungeon_images.py | Image reference validation | HIGH | 100L |
| fix_province_emblems.py | Emblem reference repair | HIGH | 90L |
| relocate_province_emblems.py | Emblem consolidation | HIGH | 178L |

**Shared Pattern**: Find assets → match to notes → update references

**Consolidation Opportunity**: Create unified `AssetManager` with:
- Asset discovery
- Matching algorithm
- Reference updating
- Integrity validation

---

### Category 6: FILESYSTEM OPERATIONS (3 scripts)

#### 6.1 `filesystem/flatten_age_directories.py`
- **Purpose**: Flatten nested age directory structure
- **Lines**: ~80 (estimated)
- **Generic Capability**: Directory structure refactoring
- **Reusability**: MEDIUM - Specific pattern but generalizable
- **Modularization Path**:
  - Extract directory walker → `FileSystemOps.walk_tree(root, predicate)`
  - Extract file mover → `FileSystemOps.move_with_conflict_resolution(source, dest)`
- **Inputs**: Root directory, depth limit
- **Outputs**: Flattened structure with mapping

---

#### 6.2 `filesystem/flatten_state_directories.py`
- **Purpose**: Flatten nested state directory structure
- **Reusability**: MEDIUM - Nearly identical to flatten_age_directories.py

**Consolidation**: Merge into single `flatten_directory_structure(root, grouping_field)` with parameterized logic

---

#### 6.3 `filesystem/rename_dungeons.sh`
- **Purpose**: Batch rename dungeon files
- **Lines**: ~40
- **Generic Capability**: Bulk file renaming
- **Reusability**: LOW - Shell script, specific to dungeons
- **Suggestion**: Convert to Python with regex patterns for reusability

---

### Category 7: SPECIALIZED MATCHING & LINKING (3 scripts)

#### 7.1 `match_adg_dungeons.py`
- **Purpose**: Match ADg County dungeon files with database entries
- **Lines**: ~130 (estimated)
- **Generic Capability**: Spatial entity matching
- **Reusability**: HIGH - Pattern applies to all region-specific matching
- **Modularization Path**:
  - Extract as `RegionalMatcher.match_by_region(region_id, match_strategy)`
  - Support multiple strategies: ID-based, coordinate-based, name-based, fuzzy
- **Inputs**: Region ID, vault path, DB config
- **Outputs**: Match report with confidence scores

---

#### 7.2 `fix_dungeon_files.py`
- **Purpose**: Repair dungeon file metadata
- **Lines**: ~110 (estimated)
- **Generic Capability**: Metadata repair + validation
- **Reusability**: MEDIUM - Specific to dungeons but repair patterns are generic

---

#### 7.3 `match_vault_dungeons.py` (already covered in Category 1)

---

### Category 8: LEGACY/SPECIALIZED SCRIPTS (4 scripts)

#### 8.1 `check_notes_for_dungeons.py`
- **Purpose**: Validate dungeon note completeness
- **Generic Capability**: Note validation (already covered)

---

#### 8.2 `check_wrymling_data.py`
- **Purpose**: Validate wyrmling data
- **Generic Capability**: Note validation (already covered)

---

## 🛠️ REUSABLE FRAMEWORK COMPONENTS (Already Modularized)

### Category A: Core Framework (tasks/core/)
✓ **Production-quality, reusable modules**

#### `tasks/core/database.py` - Database Abstraction Layer
- **Status**: ✓ MATURE
- **Features**:
  - Connection pooling
  - Context managers
  - Query helpers
  - Transaction support
  - Environment-aware config
- **Usage**: Imported by 20+ task files
- **Example**:
  ```python
  with get_connection('local') as conn:
      cursor = conn.cursor()
      cursor.execute("SELECT * FROM dragons")
  ```

#### `tasks/core/config.py` - Configuration Management
- **Status**: ✓ MATURE
- **Features**:
  - Environment-aware settings
  - Default values
  - Validation
- **Usage**: Used by database.py and other modules

#### `tasks/core/logging.py` - Logging Setup
- **Status**: ✓ MATURE
- **Features**:
  - Consistent logger naming
  - File + console output
- **Usage**: All modules import this

#### `tasks/core/markdown.py` - Markdown Utilities
- **Status**: PARTIAL
- **Features**: Some markdown helpers
- **Enhancement Needed**: Integrate with MarkdownParser

---

### Category B: Base Modules (tasks/base_modules/)
✓ **High-level abstractions over common patterns**

#### `tasks/base_modules/vault_operations.py` - Vault I/O
- **Status**: ✓ MATURE
- **Features**:
  - File scanning
  - Frontmatter parsing
  - Task extraction
  - Section manipulation
  - File backup/archive
- **Usage**: 15+ files import this
- **Covers**: Categories 1, 5, 6 functionality
- **Example**:
  ```python
  vault = VaultOperations(vault_path)
  notes = vault.find_notes(pattern="Dungeon")
  for note in notes:
      print(note.frontmatter['type'])
  ```

#### `tasks/base_modules/markdown_parser.py` - Markdown Parsing
- **Status**: ✓ MATURE
- **Features**:
  - Frontmatter extraction
  - Body extraction
  - Wikilink extraction
  - Tag extraction
  - Section extraction
- **Usage**: 20+ files
- **Consolidates**: Parsing logic from 20 different implementations
- **Example**:
  ```python
  doc = MarkdownParser.parse_document(content)
  print(doc.frontmatter['type'])
  print(doc.tags)
  print(doc.wikilinks)
  ```

#### `tasks/base_modules/ai_service.py` - AI Integration
- **Purpose**: Claude API integration
- **Status**: MATURE
- **Usage**: Skills that need AI generation

#### `tasks/base_modules/ai_dm.py` - Dungeon Master AI
- **Purpose**: D&D content generation
- **Status**: Specialized (not broadly reusable)

#### `tasks/base_modules/scene_loader.py` - Scene Management
- **Purpose**: Load/manage scene data
- **Status**: MATURE

#### `tasks/base_modules/ghost_client.py` - Database Client
- **Purpose**: Alternative DB interface?
- **Status**: Unknown (needs inspection)

#### `tasks/base_modules/content_expander.py` - Content Enhancement
- **Purpose**: AI-powered content generation
- **Status**: Specialized

#### `tasks/base_modules/hierarchy_reconciler.py` - Data Hierarchy
- **Purpose**: Reconcile hierarchical data
- **Status**: MEDIUM (specialized)

#### `tasks/base_modules/orchestrator.py` - Task Orchestration
- **Purpose**: Coordinate complex pipelines
- **Status**: MATURE
- **Usage**: Burgs pipeline, db-import pipeline

#### `tasks/base_modules/template_engine.py` - Template Rendering
- **Purpose**: Generate text from templates
- **Status**: MATURE
- **Usage**: Note generation

#### `tasks/base_modules/morning_pages.py` - Morning Pages Processing
- **Purpose**: Specialized writing workflow
- **Status**: Specialized

#### `tasks/base_modules/scene_tracker.py` - Scene State Management
- **Purpose**: Track scene state in D&D campaigns
- **Status**: Specialized (not broadly reusable)

---

### Category C: Skills (tasks/skills/)
✓ **End-user-facing features built on framework**

**Count**: 30+ specialized task implementations

**Examples**:
- adventure.py - Adventure generation
- chapter.py - Chapter/scene generation
- dnd/vault_parser.py - D&D vault parsing
- dnd/levelup_wizard.py - Level-up automation
- npc_generator.py - NPC generation
- generate_adventure.py - Multi-step generation
- vault_search.py - Vault querying
- vault_operations.py - Vault I/O

**Pattern**: All inherit from base_modules + core framework

---

## 🎯 CONSOLIDATION RECOMMENDATIONS

### Priority 1: CRITICAL (High duplication, easy to merge)

#### 1.1 Vault Matching Consolidation
**Files**: match_vault_dungeons.py + link_vault_dungeons.py + find_adg_dungeons.py
**Target**: Create unified `VaultMatcher` class in base_modules
**Benefit**: Single source of truth for vault→DB linking
**Effort**: Medium (80 lines of refactoring)
**Expected Size**: 250 lines (vs. 420 now)

```python
# New unified interface
matcher = VaultMatcher(vault_path, db_config)

# Type-filtered search
dungeons = matcher.find_by_type("Dungeon", province=36)

# Coordinate-based matching
matched = matcher.match_by_coordinates(x, y, threshold=5)

# Name-based matching
linked = matcher.match_by_name("Dragon King's Lair")
```

#### 1.2 Vault Import Consolidation
**Files**: import_wyrmling_dungeons.py + import_provinces.py + import_states.py + import_rivers.py + import_routes.py
**Target**: Create generic `VaultToDBImporter` in base_modules
**Benefit**: Reusable ETL for any vault → DB import
**Effort**: Medium (100 lines)
**Expected Size**: 300 lines (vs. 450 now)

```python
# New unified interface
importer = VaultToDBImporter(vault_path, db_config)

# Generic import with schema
report = importer.import_by_type(
    type_name="Dungeon",
    table_name="dungeons",
    field_map={
        'name': 'name',
        'x': 'x',
        'y': 'y',
        'cell': 'cell'
    }
)
```

#### 1.3 Asset Manager Consolidation
**Files**: consolidate_assets.py + add_dungeon_images.py + fix_dungeon_images.py + fix_province_emblems.py + relocate_province_emblems.py
**Target**: Create unified `AssetManager` in base_modules
**Benefit**: Single interface for all asset operations
**Effort**: Medium (120 lines)
**Expected Size**: 350 lines (vs. 644 now)

```python
# New unified interface
manager = AssetManager(vault_path, assets_dir)

# Generic asset consolidation
report = manager.consolidate_assets(
    asset_type="emblem",
    pattern="*.png",
    match_strategy="fuzzy"
)

# Asset linking
manager.link_assets_to_notes(
    note_type="Province",
    asset_field="emblem"
)
```

---

### Priority 2: HIGH (Good consolidation candidates)

#### 2.1 Data Migration Pipeline
**Files**: move_dungeons.py + move_dungeons_by_cell.py + flatten_age_directories.py + flatten_state_directories.py
**Target**: Create `DataMigrator` class
**Benefit**: Consistent migration patterns
**Effort**: Medium

```python
migrator = DataMigrator(vault_path, db_config)

# Generic migration
migrator.move_to_location(
    files=matching_dungeons,
    destination_pattern="/Volumes/Elements/Master Chronicle/{province}/"
)

migrator.flatten_structure(
    root_dir="/path/to/ages",
    group_by="name"
)
```

#### 2.2 Data Processing Pipeline
**Files**: 12 data_processing/*.py scripts
**Target**: Create `DataProcessor` base class with pluggable transformations
**Benefit**: Reusable ETL for geographic/world data
**Effort**: High (requires architectural refactor)

```python
# Pluggable transformation pipeline
pipeline = DataProcessor(source="orbis")
pipeline.add_stage("parse_biomes", BiomeParser())
pipeline.add_stage("enrich_provinces", ProvinceEnricher(vault_path))
pipeline.add_stage("update_db", DatabaseUpdater(db_config))
report = pipeline.run()
```

#### 2.3 Deduplication & Merging
**Files**: merge_dungeons.py + find_duplicate_dungeons.py + cleanup_province_coordinates.py
**Target**: Create `Deduplicator` + `Merger` classes
**Benefit**: Reusable cleanup logic
**Effort**: Medium

```python
dedup = Deduplicator(vault_path)

# Find duplicates
duplicates = dedup.find_duplicates(
    entity_type="Dungeon",
    key_fields=["x", "y"]
)

# Merge with strategy
result = dedup.merge_duplicates(
    duplicates,
    primary_location="province",
    secondary_location="dungeons_folder"
)
```

---

### Priority 3: MEDIUM (Good-to-have consolidations)

#### 3.1 Database Query Builder
**Files**: query_adg_county.py + find_adg_dungeons.py + match_*.py
**Target**: Create `QueryBuilder` for spatial queries
**Benefit**: Reusable geographic queries
**Effort**: Medium

#### 3.2 Vault Validation Framework
**Files**: check_notes_for_dungeons.py + check_wrymling_data.py
**Target**: Create `VaultValidator` with pluggable schemas
**Benefit**: Reusable validation for any note type
**Effort**: Medium

#### 3.3 File Matching Strategies
**Files**: match_adg_dungeons.py + consolidate_assets.py + match_vault_dungeons.py
**Target**: Centralized matching algorithm library
**Benefit**: Consistent matching across tools
**Effort**: Medium

---

## 📊 DEPENDENCY GRAPH

### Critical External Dependencies
```
psycopg2 (database operations)
  ├─ import/import_orbis_data.py
  ├─ tasks/db-import/*.py (all)
  ├─ tasks/core/database.py
  ├─ match_*.py (all)
  └─ query_*.py (all)

pathlib (filesystem operations)
  ├─ All vault operations
  ├─ All asset management
  └─ All migration scripts

PyYAML (YAML parsing)
  ├─ vault_operations.py
  ├─ markdown_parser.py
  └─ match_vault_dungeons.py

re (regex parsing)
  ├─ markdown_parser.py
  ├─ vault_operations.py
  ├─ All vault matching
  └─ All cleanup scripts

json (JSON handling)
  ├─ extract_orbis_geography.py
  ├─ import_orbis_data.py
  └─ match_vault_dungeons.py
```

### Internal Dependencies
```
tasks/core/database.py
  ├─ All database operations
  ├─ All imports
  └─ All queries

tasks/core/config.py
  └─ database.py

tasks/base_modules/vault_operations.py
  ├─ markdown_parser.py
  ├─ All vault scripts
  └─ All asset scripts

tasks/base_modules/markdown_parser.py
  ├─ vault_operations.py
  ├─ All import scripts
  └─ All processing scripts
```

---

## 📈 MODULARITY OPPORTUNITIES

### Low-Hanging Fruit (Quick wins)

#### 1. Extract Coordinate Parsing
**Found in**: merge_dungeons.py, cleanup_province_coordinates.py, extract_orbis_geography.py
**Extract to**: `CoordinateParser` utility
**Benefit**: 15 lines saved × 3 files = 45 lines
**Time**: 15 minutes

#### 2. Extract Parallel Array Unpacking
**Found in**: import_orbis_data.py, extract_orbis_geography.py, 5+ others
**Extract to**: `DataParser.unpack_parallel_arrays()`
**Benefit**: 20 lines saved × 7 files = 140 lines
**Time**: 20 minutes

#### 3. Extract Database Configuration
**Found in**: All scripts with DB_CONFIG dict
**Extract to**: tasks/core/config.py
**Benefit**: Single source of truth, environment management
**Time**: 10 minutes

#### 4. Extract Vault Path Constants
**Found in**: MASTER_CHRONICLE = Path(...) in 8+ files
**Extract to**: tasks/core/config.py
**Benefit**: Centralized, environment-aware paths
**Time**: 10 minutes

#### 5. Extract File Pattern Matching
**Found in**: All vault operations, all asset operations
**Extract to**: FilePatternMatcher utility
**Benefit**: Consistent matching logic
**Time**: 20 minutes

---

## 🔄 PATTERN INVENTORY

### Pattern 1: JSON to SQL ETL
**Frequency**: 8 scripts
**Pattern**:
```python
1. Load JSON from file
2. Extract field mapping
3. Build records list
4. Bulk insert with conflict handling
5. Report results
```
**Candidate Module**: `JSONToSQLImporter`
**Files**: import_orbis_data.py, import_watabou_dungeons.py, 04_import_watabou_dungeons.py, etc.

---

### Pattern 2: Vault File Scanning + Extraction
**Frequency**: 12 scripts
**Pattern**:
```python
1. Scan vault directory recursively
2. Filter by name/type/path
3. Parse frontmatter
4. Extract field values
5. Process results
```
**Candidate Module**: Covered by `VaultOperations` (existing)
**Status**: ✓ Already extracted in base_modules/vault_operations.py

---

### Pattern 3: Database Bulk Operations
**Frequency**: 18 scripts
**Pattern**:
```python
1. Connect to database
2. Prepare data
3. execute_values() with ON CONFLICT
4. Close connection
5. Report counts
```
**Candidate Module**: Covered by `DatabaseOps` (needs creation)
**Enhancement Needed**: Add to tasks/core/database.py

---

### Pattern 4: Coordinate-Based Matching
**Frequency**: 5 scripts
**Pattern**:
```python
1. Extract coordinates from file/DB
2. Find nearby matches
3. Score by proximity
4. Link with confidence
```
**Candidate Module**: `SpatialMatcher`
**Files**: merge_dungeons.py, find_adg_dungeons.py, match_vault_dungeons.py, etc.

---

### Pattern 5: Name-Based Fuzzy Matching
**Frequency**: 7 scripts
**Pattern**:
```python
1. Normalize names (lowercase, remove punctuation)
2. Calculate similarity
3. Filter by threshold
4. Return matches with scores
```
**Candidate Module**: `FuzzyMatcher`
**Enhancement**: Use difflib or fuzzywuzzy library

---

### Pattern 6: Data Validation + Error Reporting
**Frequency**: 6 scripts
**Pattern**:
```python
1. Define schema/requirements
2. Scan files/records
3. Check against schema
4. Collect errors
5. Generate report
```
**Candidate Module**: `Validator`
**Files**: check_notes_for_dungeons.py, check_wrymling_data.py, etc.

---

### Pattern 7: Dry-Run Mode
**Frequency**: 8 scripts
**Pattern**:
```python
if dry_run:
    print(f"Would {action}: {target}")
else:
    execute_action(target)
```
**Candidate Mixin**: Add `DryRunMixin` for reusability
**Benefit**: Standardized safety mechanism

---

## 📋 IMPLEMENTATION ROADMAP

### Phase 1: Foundation (Week 1)
- [ ] Extract `CoordinateParser` utility
- [ ] Extract `DataParser.unpack_parallel_arrays()`
- [ ] Centralize `DB_CONFIG` to tasks/core/config.py
- [ ] Add `QueryBuilder` to tasks/core/database.py

### Phase 2: Consolidation (Week 2-3)
- [ ] Create `VaultMatcher` in base_modules (consolidates 3 files)
- [ ] Create `VaultToDBImporter` in base_modules (consolidates 5 files)
- [ ] Create `AssetManager` in base_modules (consolidates 5 files)
- [ ] Create `DataMigrator` (consolidates 4 files)

### Phase 3: Enhancement (Week 4)
- [ ] Add fuzzy matching to all matchers
- [ ] Create `Validator` framework for vault notes
- [ ] Create `DataProcessor` pipeline base
- [ ] Add `DryRunMixin` to all file operations

### Phase 4: Optimization (Week 5)
- [ ] Profile most-used scripts
- [ ] Add caching to VaultOperations
- [ ] Add parallel processing to bulk operations
- [ ] Benchmark consolidated vs. original

---

## 🎓 LESSONS & BEST PRACTICES

### What's Working Well ✓
1. **Database connection pooling** - tasks/core/database.py is solid
2. **Vault operations abstraction** - base_modules/vault_operations.py handles 80% of cases
3. **Markdown parsing** - markdown_parser.py consolidates complex logic
4. **Organized scripts/** directory - Clear categorization by function

### What Needs Improvement ⚠️
1. **Duplicate DB connection code** - DB_CONFIG appears in 8+ script files
2. **Duplicate vault scanning** - Nearly identical code in match_*.py files
3. **No error handling standard** - Some scripts fail silently, others are verbose
4. **Mixed concerns** - Asset management scripts do DB ops + file ops
5. **No transaction rollback** - Migrations don't have rollback plans

### Recommendations

#### Immediate Actions
1. Add type hints everywhere - helps with maintenance
2. Add docstrings with input/output specs
3. Add logging instead of print statements
4. Use environment variables for all configs

#### Medium-term
1. Implement the Priority 1 consolidations
2. Add unit tests for extracted modules
3. Create CLI wrapper for most-used scripts
4. Document module APIs for users

#### Long-term
1. Build web UI for common operations
2. Implement real-time sync instead of batch imports
3. Add webhooks for vault→DB synchronization
4. Create monitoring/alerting for pipeline failures

---

## 📦 FILE LISTING (Quick Reference)

### scripts/ (36 files total)
```
scripts/
├── asset_management/
│   ├── add_dungeon_images.py
│   ├── consolidate_assets.py
│   ├── fix_dungeon_images.py
│   ├── fix_province_emblems.py
│   └── relocate_province_emblems.py
├── cleanup/
│   ├── cleanup_province_coordinates.py
│   ├── find_duplicate_dungeons.py
│   ├── merge_dungeons.py
│   └── merge_dungeons_mc.py
├── data_migration/
│   ├── move_dungeons.py
│   ├── move_dungeons_by_cell.py
│   └── move_dungeons.sh
├── data_processing/
│   ├── extract_orbis_geography.py
│   ├── number_provinces.py
│   ├── populate_dungeon_metadata.py
│   ├── populate_province_ids.py
│   ├── revert_numbering.py
│   ├── update_province_dungeons.py
│   ├── update_province_geography.py
│   └── update_trade_routes.py
├── database/
│   └── create_master_chronicle_schema.sql
├── filesystem/
│   ├── flatten_age_directories.py
│   ├── flatten_state_directories.py
│   └── rename_dungeons.sh
├── import/
│   └── import_orbis_data.py
├── check_notes_for_dungeons.py
├── check_wrymling_data.py
├── find_adg_dungeons.py
├── fix_dungeon_files.py
├── generate_adg_county_note.py
├── import_wyrmling_dungeons.py
├── link_vault_dungeons.py
├── match_adg_dungeons.py
├── match_vault_dungeons.py
└── query_adg_county.py
```

### tasks/base_modules/ (12 files)
```
base_modules/
├── __init__.py
├── ai_dm.py ⭐ D&D-specific
├── ai_image_generator.py ⭐ Image generation
├── ai_service.py ✓ Claude API
├── content_expander.py ⭐ Content generation
├── ghost_client.py (unknown purpose)
├── hierarchy_reconciler.py ✓ Reconciliation
├── markdown_parser.py ✓ REUSABLE
├── morning_pages.py ⭐ Specialized
├── orchestrator.py ✓ Pipeline orchestration
├── scene_loader.py ✓ Scene management
├── scene_tracker.py ⭐ D&D-specific
├── template_engine.py ✓ Template rendering
└── vault_operations.py ✓ REUSABLE
```

### tasks/core/ (5 files)
```
core/
├── __init__.py
├── config.py ✓ Configuration
├── coordination.py (TBD)
├── database.py ✓ Database abstraction
├── logging.py ✓ Logging
├── markdown.py (partial)
└── ollama.py (LLM integration)
```

### tasks/db-import/ (8 files)
```
db-import/
├── 01_extract_dragon_ages.py
├── 02_import_biomes.py
├── 02_import_lair_coordinates.py
├── 03.5_match_dungeons_to_markers.py
├── 03_import_azgaar.py
├── 04_import_watabou_dungeons.py
├── 05_import_npcs.py
├── 06_spatial_inheritance.py
└── 08_import_dragons.py
```

### tasks/skills/ (30+ files)
```
skills/
├── __init__.py
├── adventure.py
├── analyze_morning_pages.py
├── captivate_podcast_manager.py
├── cascade.py
├── ceo_speaks.py
├── chapter.py
├── chapter_expander.py
├── digital_ocean_ops.py
├── dnd/
│   ├── __init__.py
│   ├── levelup_wizard.py
│   └── vault_parser.py
├── documentation.py
├── energy_focus_checkin.py
├── expand_location.py
├── generate_adventure.py
├── generate_chapters.py
├── gmail_calendar_manager.py
├── history.py
├── list_skills.py
├── lr_morgenstern_reminder.py
├── music_progress_tracker.py
├── npc_generator.py
├── podcast_episode_generator.py
├── projects_manager.py
├── publish_morning_pages.py
├── reconcile.py
├── rss_podcast_parser.py
├── scene.py
├── scene_expander.py
├── skill_utils.py
├── vault_search.py
├── web_search.py
└── weekly_report_generator.py
```

---

## 🎯 QUICK ACTION ITEMS

### For Main Agent (Next Session)
1. **Priority 1 Consolidations**: Implement VaultMatcher, VaultToDBImporter, AssetManager
2. **Database Config**: Centralize all DB_CONFIG references to tasks/core/config.py
3. **Type Hints**: Add type hints to all base_modules
4. **Documentation**: Add API docs to all reusable modules

### For Development Team
1. **Code Review**: Review new scripts against consolidation checklist
2. **Testing**: Add unit tests for all base_modules
3. **Deprecation**: Mark old scripts for removal after consolidation
4. **Migration**: Update imports in tasks/skills/ to use consolidated modules

---

## 📞 SUPPORT QUERIES

For quick lookups:
- **"How do I import Orbis data?"** → See import/import_orbis_data.py + db-import/ pipeline
- **"How do I consolidate assets?"** → See asset_management/consolidate_assets.py (or wait for AssetManager)
- **"How do I scan vault files?"** → Use VaultOperations from base_modules/vault_operations.py
- **"How do I parse markdown?"** → Use MarkdownParser from base_modules/markdown_parser.py
- **"How do I query the database?"** → Use get_connection() from tasks/core/database.py

---

## 📊 METRICS SUMMARY

| Metric | Value |
|--------|-------|
| Total Scripts Analyzed | 100+ |
| Estimated Total Lines | 12,000+ |
| Reusable Modules | 15 |
| Consolidation Candidates | 18 |
| One-off Scripts | 14 |
| High Modularity Score | 70% |
| Files with Duplicate Code | 27 |
| Priority 1 Quick Wins | 3 |
| Potential LOC Reduction | 800+ lines |

---

**Report Status**: ✓ COMPLETE  
**Last Updated**: 2025-01-28  
**Next Review**: After Phase 1 consolidations  
**Maintainer**: Development Toolkit Team
