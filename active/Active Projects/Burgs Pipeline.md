---
id:
title: Burgs Pipeline
department: "[[TechnicalDevelopmentOffice]]"
Department Head: "[[Historical Lore/Master Chronicle/01 Age of Arrival (-10,000 to -9,900 AY)/EM Staff/ElianaRiviera]]"
---
[[projectsRegistry#Burgs Pipeline|View Project in Registry]]

# 🏘️Burgs Pipeline Architecture

## System Overview

The Burgs Pipeline is a comprehensive automation system for worldbuilding fantasy cities (burgs) within the Orbis setting. It follows a hierarchical content generation approach: **Burg → Districts → POIs → NPCs**, with YAML metadata inheritance at each level.

**New Implementation Location**: `/scripts/burgs-pipeline/` - All pipeline components have been reorganized into a dedicated directory structure.

## Architecture Components

### 1. Core Pipeline Engine (`BurgsPipeline`)
- **Responsibility**: Orchestrates the entire workflow
- **Dependencies**: Configuration, AI services, file management
- **Key Features**: Idempotent execution, progress tracking, error recovery

### 2. Configuration Management (`PipelineConfig`)
- **Responsibility**: Manages all pipeline settings and paths
- **Features**: Environment-specific configs, validation, defaults
- **Integration**: Works with existing Nebulab script patterns

### 3. Content Generators (`ContentEngine`)
- **District Generator**: Extracts/creates district information
- **POI Generator**: Creates points of interest for each district
- **NPC Generator**: Integrates with 6-phase NPC creation system (see below)
- **Lore Generator**: Creates atmospheric descriptions and histories

### 4. Phased NPC Generation System
For a detailed breakdown of the NPC generation process, see the [[Phased NPC procedure]] documentation.

- **Phase 1**: Create NPC files (`phase1_create_npc_files.py`)
- **Phase 2**: Populate NPC data (`phase2_populate_npc_data.py`)
- **Phase 3a**: Enhance statblocks (`phase3a_enhance_statblocks.py`)
- **Phase 3b**: Enhance backgrounds (`phase3b_enhance_backgrounds.py`)
- **Phase 4**: Generate spellbooks (`phase4_generate_spellbooks.py`)
- **Phase 5**: Generate inventories (`phase5_generate_inventories.py`)
- **Phase 6**: Fix currency (`phase6_fix_currency.py`)

### 5. File Management System (`VaultManager`)
- **Directory Structure**: Maintains `/Burgs/<Name>/Districts/`, `/POIs/`, `/NPCs/`
- **YAML Inheritance**: Propagates metadata down the hierarchy
- **Link Management**: Creates and maintains Obsidian cross-references
- **Template System**: Standardized note formats

### 6. AI Integration Layer (`AIService`)
- **Vision/OCR**: District name extraction from maps
- **Text Generation**: Ollama integration for content creation
- **Local Processing**: Emphasizes privacy and control
- **Multi-model Support**: Flexible AI backend configuration

### 7. Progress & Reporting (`ProgressTracker`)
- **Logging**: Comprehensive activity tracking
- **Discord Integration**: Team notifications and progress updates
- **Error Recovery**: Robust failure handling and resumption
- **Performance Metrics**: Execution time and success rate tracking

## Data Flow Architecture

```
Burg Input → Validation → District Extraction → POI Generation → NPC Creation
     ↓             ↓              ↓                ↓               ↓
Configuration → File Creation → Content Gen → YAML Inherit → Link Building
     ↓             ↓              ↓                ↓               ↓
 Logging ←→ Progress Track ←→ Discord Report ←→ Error Handle ←→ Recovery
```

## Implementation Requirements

### Prerequisites
- **Burg directory and files must be created before running the pipeline**
- **District name extraction requires local OCR/vision or manual input**
- **Local AI models must be available for text generation**
- **Vault structure must match expected Obsidian organization**

### Directory Structure
```
/Orbis/States/Burgs/<BurgName>/
├── <BurgName>.md           # Main burg note
├── <BurgName>.png          # Map image
├── Districts/              # Generated district notes
│   ├── <DistrictName>.md
│   └── ...
├── POIs/                   # Points of interest
│   ├── <POIName>.md
│   └── ...
└── NPCs/                   # Non-player characters
    ├── <NPCName>.md
    └── ...
```

### YAML Inheritance Chain
- **Burg** → **District**: Inherits location, region, epoch, culture
- **District** → **POI**: Inherits district context, atmosphere, themes  
- **POI** → **NPC**: Inherits location context, social dynamics, conflicts

## Implementation Status

### ✅ Completed Components
- **BurgsPipeline**: Main orchestrator with complete workflow management
- **PipelineConfig**: JSON-based configuration with intelligent defaults
- **VaultManager**: Full file operations and YAML frontmatter handling
- **ContentEngine**: Ollama integration for AI-powered content generation
- **ProgressTracker**: Comprehensive logging and Discord webhook support

### 🤖 Ollama Integration
- **District Generation**: AI-powered district names based on burg context
- **Location Descriptions**: Rich, atmospheric content for districts and POIs
- **NPC Creation**: Detailed characters with D&D 5e statblocks
- **Smart Prompting**: Context-aware prompts using YAML inheritance
- **Model Flexibility**: Configurable models for different content types

### 🔧 Ready for Integration
- **Vision/OCR**: District name extraction from map images
- **OpenAI Integration**: Advanced content generation using GPT models
- **Local AI Models**: Ollama or other self-hosted AI services
- **Discord Webhooks**: Real-time progress reporting

### 📁 File Structure Created
```
/scripts/burgs-pipeline/
├── burgs_pipeline.py              # Main implementation
├── burgs_pipeline_config.json     # Configuration template
├── README.md                      # Setup and usage guide
├── npc_phases/                    # Phased NPC generation
│   ├── phase1_create_npc_files.py
│   ├── phase2_populate_npc_data.py
│   ├── phase3a_enhance_statblocks.py
│   ├── phase3b_enhance_backgrounds.py
│   ├── phase4_generate_spellbooks.py
│   ├── phase5_generate_inventories.py
│   └── phase6_fix_currency.py
└── supporting_files/              # Supporting data
    ├── create_NPC_note.py
    ├── generated_faction_data.py
    └── archetypes.py
```

## Usage Examples

### Direct Pipeline Execution
```bash
# Navigate to the pipeline directory
cd /Volumes/Elements/Nebulab/scripts/burgs-pipeline

# Run the complete pipeline
python3 burgs_pipeline.py "Waterdeep"

# Check environment and configuration
python3 burgs_pipeline.py --check-env

# Test Ollama connection
python3 burgs_pipeline.py --test-ollama
```

### Machine Environment Setup
```bash
# Make scripts executable
chmod +x scripts/burgs-pipeline/burgs_pipeline.py

# Install dependencies (see [[Burgs Pipeline Requirements]])
pip install PyYAML requests

# Set environment variables (optional)
export NEBULAB_ROOT="/Volumes/Elements/Nebulab"
export OLLAMA_HOST="http://localhost:11434"

# Test standalone execution
cd /any/directory
/Volumes/Elements/Nebulab/scripts/burgs-pipeline/burgs_pipeline.py "TestBurg" --check-env
```

### Programmatic Usage
```python
from scripts.burgs_pipeline.burgs_pipeline import burg_pipeline, PipelineConfig

# Use default configuration
success = burg_pipeline("Sungmiremi")

# Use custom configuration
config = PipelineConfig.from_config_file("custom_config.json")
pipeline = BurgsPipeline(config)
success = pipeline.run("Sungmiremi")
```

### Integration with Obsidian
1. **Command Palette Integration**: Add pipeline to Obsidian commands
2. **Templates**: Use generated content as starting points
3. **Graph View**: Visualize hierarchical relationships
4. **Dataview**: Query generated content across burgs

## Next Steps for Production

### Phase 1: Core AI Integration
- Implement OpenAI content generation with rich prompts
-  Add vision model integration for district extraction
-  Create content quality validation and refinement

### Phase 2: Enhanced Features
-  Discord webhook implementation for team notifications
-  Advanced YAML inheritance with conditional logic
-  Template system for different burg types and cultures

### Phase 3: User Experience
-  Obsidian plugin for seamless integration
-  Interactive configuration interface
-  Batch processing for multiple burgs
-  Content export and sharing capabilities

## Stage 1: Validation & Setup
- Create a subdirectory for the burg in `/Orbis/States/Burgs/<BurgName>/`.
- Place `<BurgName>.md` (main note) and `<BurgName>.png` (map image) in this directory.

### 2. Set Up the Leaflet Map
- Use the Burg Map script to set up the Leaflet map embed in `<BurgName>.md`.
- This requires the map image and the script to be run interactively to set scale and bounds.

### 3. Extract District Names from the Map
- **Preferred:** Use a local AI vision/OCR model to extract district names from `<BurgName>.png`.
- **Fallback:** If no local vision model is available, extract district names manually and provide them as a list.

### 4. Create District Notes and Link Them
- For each district, create a note in `/Districts` with inherited YAML from the burg.
- Update `<BurgName>.md` to include a `## Districts and Their Points of Interest` section with links to each district note.

### 5. Generate POIs for Each District
- For each district, generate 3 POIs (points of interest).
- Create a note for each POI in `/POIs`, with inherited YAML from the district.
- Replace the POI section in the district note with a transclusion link to the POI note.

### 6. Generate NPCs for Each POI
- For each POI, generate 3 NPCs using the **6-Phase NPC Generation System**:
  - **Phase 1**: Create NPC files with basic structure
  - **Phase 2**: Populate NPC data with core information
  - **Phase 3a**: Enhance statblocks with D&D 5e mechanics
  - **Phase 3b**: Enhance backgrounds with rich storytelling
  - **Phase 4**: Generate spellbooks for caster NPCs
  - **Phase 5**: Generate inventories and equipment
  - **Phase 6**: Fix currency and economic details
- Create a note for each NPC in `/NPCs`, with inherited YAML from the POI.
- Append a pretty Obsidian link to the NPC in the POI note, and an `### NPCs` section listing all NPC links.

### 7. Discord Reporting (Optional)
- If Discord integration is enabled, send progress updates at key steps.

### 8. Team Member Assignments for Discord Reporting

**Pipeline Initialization & Setup**
- **[[Historical Lore/Master Chronicle/01 Age of Arrival (-10,000 to -9,900 AY)/EM Staff/ElianaRiviera]]** - Technical Development Office lead and engineering coordination
- **[[Historical Lore/Master Chronicle/01 Age of Arrival (-10,000 to -9,900 AY)/EM Staff/SanjayPatel]]** - Data validation and system analytics

**Map Processing & District Extraction**  
- **[[Historical Lore/Master Chronicle/01 Age of Arrival (-10,000 to -9,900 AY)/EM Staff/IsaacMiller]]** - Interaction design and visual processing interfaces
- **[[Historical Lore/Master Chronicle/01 Age of Arrival (-10,000 to -9,900 AY)/EM Staff/SofiaLake]]** - Creative direction for district conceptualization
- **[[Historical Lore/Master Chronicle/01 Age of Arrival (-10,000 to -9,900 AY)/EM Staff/LeoMartin]]** - Artistic oversight and visual validation

**Content Generation & AI Integration**
- **[[Historical Lore/Master Chronicle/01 Age of Arrival (-10,000 to -9,900 AY)/EM Staff/SylviaInkweaver]]** - Content and Brand Office lead, announces new content phases

**NPC Generation Phase Announcements** (by [[Historical Lore/Master Chronicle/01 Age of Arrival (-10,000 to -9,900 AY)/EM Staff/SylviaInkweaver]]):
- **Phase 1-2**: Character creation phase beginning
- **Phase 3a**: Statblock enhancement phase beginning  
- **Phase 3b**: Background enhancement phase beginning
- **Phase 4**: Spellbook generation phase beginning
- **Phase 5**: Inventory generation phase beginning
- **Phase 6**: Currency validation phase beginning

**NPC Generation Phase Completion Reports**:
- **Phase 1-2**: **[[Historical Lore/Master Chronicle/01 Age of Arrival (-10,000 to -9,900 AY)/EM Staff/DevinPark]]** - Character data structure and file creation completion
- **Phase 3a**: **[[Historical Lore/Master Chronicle/01 Age of Arrival (-10,000 to -9,900 AY)/EM Staff/SanjayPatel]]** - D&D mechanics validation completion
- **Phase 3b**: **[[Historical Lore/Master Chronicle/01 Age of Arrival (-10,000 to -9,900 AY)/EM Staff/JulianWeber]]** - Background lore development completion
- **Phase 4**: **[[Historical Lore/Master Chronicle/01 Age of Arrival (-10,000 to -9,900 AY)/EM Staff/HarperLiu]]** - Spellcaster content completion
- **Phase 5**: **[[Historical Lore/Master Chronicle/01 Age of Arrival (-10,000 to -9,900 AY)/EM Staff/OscarDiaz]]** - Equipment and inventory completion
- **Phase 6**: **[[Historical Lore/Master Chronicle/01 Age of Arrival (-10,000 to -9,900 AY)/EM Staff/SanjayPatel]]** - Economic systems validation completion

**Quality Assurance & Technical Support**
- **[[Historical Lore/Master Chronicle/01 Age of Arrival (-10,000 to -9,900 AY)/EM Staff/MorganFields]]** - Technical troubleshooting and system monitoring
- **[[Historical Lore/Master Chronicle/01 Age of Arrival (-10,000 to -9,900 AY)/EM Staff/CaseyHan]]** - Development support and error handling

### 9. Special Cases
- For small burgs with no districts, use a different header (`## Points of Interest`) and process POIs and NPCs as above.

### 10. Idempotency
- The pipeline should skip any step for which the corresponding note already exists, to allow safe re-runs.
- Each NPC phase can be run independently and will skip already-processed NPCs.

---

## Directory Structure

The pipeline has been reorganized into `/scripts/burgs-pipeline/` with the following structure:

```
/scripts/burgs-pipeline/
├── burgs_pipeline.py              # Main pipeline orchestrator
├── burgs_pipeline_config.json     # Configuration file
├── README.md                      # Setup and usage documentation
├── npc_phases/                    # 6-phase NPC generation system
│   ├── phase1_create_npc_files.py # Create basic NPC structure
│   ├── phase2_populate_npc_data.py # Add core NPC data
│   ├── phase3a_enhance_statblocks.py # D&D 5e statblock enhancement
│   ├── phase3b_enhance_backgrounds.py # Backstory enhancement
│   ├── phase4_generate_spellbooks.py # Spellcaster content
│   ├── phase5_generate_inventories.py # Equipment and inventory
│   └── phase6_fix_currency.py     # Economic details
└── supporting_files/              # Shared utilities
    ├── create_NPC_note.py         # NPC file creation utilities
    ├── generated_faction_data.py  # Faction and archetype data
    └── archetypes.py              # Character archetype definitions
```

## Key Requirements
- **Burg directory and files must be created before running the pipeline.**
- **District name extraction requires local OCR/vision or manual input.**
- **Local AI models must be available for text generation (lore, summaries, NPCs, statblocks, backstories).**
- **Vault structure must match what the scripts expect.**

---

## Usage
Run this script with the burg name as an argument, or enter it when prompted:
`python burgs_pipeline.py Sungmiremi`

### Call as an Argument
#### **Option 1: Import and Call the Function**
```python
# In another Python script in the same project:
from scripts.burgs_pipeline.burgs_pipeline import burg_pipeline
burg_pipeline("Sungmiremi")
```
- Make sure the path in the import matches your folder structure.
- If your script is not in the Python path, you may need to adjust `sys.path` or use relative imports.

#### **Option 2: Use Subprocess to Run as a CLI**
```python
import subprocess
subprocess.run([
	"python",
	"/Volumes/Elements/Nebulab/scripts/burgs-pipeline/burgs_pipeline.py",
	"Sungmiremi"
])
```

#### Option 3: Integration with Custom Application
The pipeline can be called from custom applications and interfaces being developed in parallel to this system.

---

## Key Features:

- YAML inheritance from burg → district → POI → NPC, filtering out unwanted fields.
- Emoji extraction for clean filenames and attractive headers. NOTE: The Emoji for the POI should be stored in the yaml field icon.
- Pretty Obsidian links for NPCs.
- **6-Phase NPC Generation System** for comprehensive character creation:
  - File creation → Data population → Statblock enhancement → Background enhancement → Spellbooks → Inventories → Currency fixing
- Automated lore and summary generation using Ollama AI.
- Discord notifications for workflow transparency (optional).
- Idempotent execution: If any of the steps of the pipeline already exist, these are passed over for the next step.
- SPECIAL CASE: There are some small burgs which do not have districts in them. These will need to have different header, and the remainder of the pipeline is applicable:
   \## Points of Interest

---

# **Summary**
- **Direct import and function call** is best if you want to integrate tightly and pass Python objects.
- **Subprocess** is best if you want to treat it as a standalone CLI tool.
- **Phased NPC Generation** provides detailed, professional-quality character creation through a proven 6-phase system.

## Dependencies:

- Python 3.7+
- Ollama or OpenAI API access for AI content generation
- PyYAML and requests Python packages
- Obsidian-compatible markdown vault structure

---

## Recent Updates (September 2025)

### Directory Reorganization
- **New Location**: All pipeline components moved to `/scripts/burgs-pipeline/`
- **Modular Structure**: Separated NPC generation into dedicated phase scripts
- **Clean Organization**: Supporting files organized in dedicated subdirectories

### NPC Generation Enhancement
- **6-Phase System Integration**: Leverages proven NPC creation workflow from Minor Arcana faction development
- **Phase Independence**: Each phase can be run separately for fine-grained control
- **Professional Quality**: Enhanced statblocks, backgrounds, spellbooks, and inventories

### AI Integration Updates
- **Ollama Primary**: Switched from OpenAI to Ollama for local AI processing
- **OpenAI Support**: Maintained as fallback option in configuration
- **Improved Prompting**: Context-aware content generation using YAML inheritance

### Simplified Integration
- **Removed Alfred Powerpack**: Focus on direct pipeline execution and custom application integration
- **Streamlined Usage**: Clear documentation for both programmatic and CLI usage
- **Better Documentation**: Comprehensive README and updated engineering docs

### Team Assignment Updates
- **Discord Reporting**: Team members assigned based on actual PeopleDirectory roles
- **Content and Brand Office**: [[Historical Lore/Master Chronicle/01 Age of Arrival (-10,000 to -9,900 AY)/EM Staff/SylviaInkweaver]] announces phases, team members report completions
- **Technical Development**: [[Historical Lore/Master Chronicle/01 Age of Arrival (-10,000 to -9,900 AY)/EM Staff/ElianaRiviera]] leads technical coordination
- **Quality Assurance**: Distributed across appropriate technical team members

---

## Latest Updates (September 2025) - PARA Structure & Style Integration

### ✅ PARA Structure Compatibility (COMPLETED)

**Path Updates for New Organization System:**
- **Configuration Updated**: `burgs_base_path` changed from old `/Orbis/States/Burgs` to PARA structure `/03 Resources/04 Sovereign Realms of Orbis/[Realm]/Burgs`
- **Python Defaults Updated**: Fixed hardcoded vault root from `/Volumes/Elements/Orbis/Nebulab` to `/Volumes/Elements/Nebulab`
- **Dynamic Realm Support**: Pipeline now works with hierarchical realm structure (e.g., `16 Neutrals/Burgs/`, `18 ProtectorateoftheCelanthadri/Burgs/`)

**Verified Compatibility:**
- ✅ Works with existing burg structure (tested with Sungmiremi in ProtectorateoftheCelanthadri)
- ✅ Works with new test locations (tested with Mockscow in Neutrals)
- ✅ Maintains all directory structures: `Districts/`, `POIs/`, `NPCs/`

### ✅ User Style Preferences Integration (COMPLETED)

**Overview Section - Alaran's Voice in Admonitions:**
- **Format**: Now generates `ad-readaloud` admonitions with `title: Alaran's Travel Notes`
- **Content Integration**: Pulls from YAML frontmatter (elevation, biome, province, known_for, culture, government)
- **Style**: Eloquent bardic travel guide voice with practical travel advice
- **Context-Aware**: Uses burg-specific details to create authentic, themed content
- **Length**: Optimized to 2-3 paragraphs for readability

**Districts Section - Clean Navigation Format:**
- **Replaced**: Messy `![[District]]` embedding approach
- **New Format**: Brief descriptions with direct POI links
- **Structure**:
  ```markdown
  ### [[District Name]]
  Brief description extracted from district Overview section.

  **Points of Interest:** [[POI1]] • [[POI2]] • [[POI3]]
  ```
- **Benefits**: More scannable, faster loading, cleaner navigation

### 🎯 Implementation Details

**Configuration Changes:**
```json
{
  "burgs_base_path": "/Volumes/Elements/Nebulab/03 Resources/04 Sovereign Realms of Orbis/[Realm]/Burgs"
}
```

**Code Enhancements:**
- `_update_burg_overview_with_alaran()`: Complete rewrite for admonition format and YAML integration
- `_update_burg_with_districts()`: Complete rewrite for clean navigation format
- YAML extraction enhanced to support richer metadata usage
- Overview generation now context-aware using burg characteristics

**Style Guidelines Implemented:**
- **Admonitions**: `ad-readaloud` format for immersive content
- **Navigation**: Direct links over transcluded content for cleaner organization
- **Content Quality**: Atmospheric descriptions that match burg themes and cultures
- **Metadata Driven**: YAML frontmatter drives content generation for consistency

### 🧪 Testing Results (Mockscow Test Burg)

**Successful Generation:**
- ✅ 5 Districts: Market Square, Mistwood Noble Enclave, Riverwatch Dockyards, Coppersmith's Guildhall, Hallowed Oak Commons
- ✅ 12 POIs: Mix of markets, guild halls, and taverns with rich atmospheric descriptions
- ✅ Overview: Perfect Alaran's voice with Nordic winter themes, bell foundries, and travel advice
- ✅ Districts: Clean format with brief descriptions and linked POIs
- ✅ Theme Consistency: Nordic culture, winter climate, and craftsmanship themes throughout

**Quality Metrics:**
- **Content Cohesion**: Generated content matches established burg themes (bells, winter, trade)
- **Cultural Authenticity**: Nordic influence carried through all generated content
- **Navigation Efficiency**: New district format significantly more usable than embedding approach
- **Readability**: Alaran's admonitions provide engaging, digestible content

### 📋 Ready for Production Use

**Current Status**: Pipeline fully updated and tested with user style preferences
**Supported Realms**: Any realm in PARA structure with `Burgs/` subdirectory
**Content Quality**: Production-ready with consistent theming and professional formatting

**Next Steps for Enhanced Functionality:**
1. **NPC Generation Completion**: Optimize 6-phase system for faster execution
2. **POI Linking Enhancement**: Better matching algorithm for POI-to-district relationships
3. **Content Variation**: Expand style templates for different cultures/biomes
4. **Batch Processing**: Support for multiple burg generation in single run

---

### Current Implementation Status

**✅ COMPLETED & PRODUCTION READY:**
- PARA structure compatibility
- User style preferences (Alaran's voice, clean navigation)
- District and POI generation with rich content
- YAML-driven content generation
- Atmospheric theming and cultural consistency

**🔧 OPTIMIZATION OPPORTUNITIES:**
- NPC generation performance improvements
- Enhanced POI categorization and linking
- Additional style templates for different burg types
- Advanced error handling and recovery systems
