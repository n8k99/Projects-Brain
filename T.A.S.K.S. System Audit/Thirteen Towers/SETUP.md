# Thirteen Towers - Foundry VTT System Setup Guide

This guide will help you install and use The Thirteen Towers system in Foundry VTT.

## Installation

### Step 1: Locate Your Foundry Data Folder

Find your Foundry VTT user data folder:
- **Windows**: `%localappdata%/FoundryVTT/Data`
- **macOS**: `~/Library/Application Support/FoundryVTT/Data`
- **Linux**: `~/.local/share/FoundryVTT/Data`

### Step 2: Install the System

1. Navigate to the `systems` folder inside your Foundry data folder
2. Copy the entire "Thirteen Towers" folder into the `systems` directory
3. Rename it to `thirteen-towers` (all lowercase, hyphenated)
4. Your final path should look like: `.../FoundryVTT/Data/systems/thirteen-towers/`

### Step 3: Restart Foundry VTT

1. If Foundry is running, close it completely
2. Restart Foundry VTT
3. The system should now appear in your systems list

### Step 4: Create a World

1. Click "Create World"
2. Select "The Thirteen Towers" from the Game System dropdown
3. Name your world and configure settings
4. Click "Create World"

## First Steps

### Creating Your First Character

1. Click "Actors Directory" in the sidebar
2. Click "Create Actor"
3. Name your character and select "Character" type
4. Open the character sheet

### Configuring Your Character

1. **Header Section**:
   - Click the portrait to upload an image
   - Enter character name
   - Select Culture, Background, Archetype, and Primary Domain

2. **Stats Tab**:
   - Assign stat values (use standard array: 14, 12, 12, 10, 10, 8, 8, 6)
   - Modifiers are calculated automatically
   - Click any stat to roll a check
   - Track Harm levels (checkboxes with descriptions)
   - Manage Moral Friction and Draconic Attention

3. **Combat Tab**:
   - Health, Resolve, and Defense are auto-calculated
   - Add Principles (create Principle items)
   - Track your character's core beliefs

4. **Items Tab**:
   - Add weapons, armor, and equipment
   - Click + buttons to create new items
   - Click weapon icons to attack or roll damage
   - Check "Equipped" for armor to apply defense bonus

5. **Domains Tab**:
   - Track advancement through the six domains
   - Add Tree Nodes as you unlock them
   - Mark nodes as unlocked when triggers are met

6. **Biography Tab**:
   - Write your character's background
   - Track notes and story details

### Creating Items

Click "Items Directory" to create items:

#### Weapons
1. Create Item → Select "Weapon"
2. **Details Tab**:
   - Weapon Type: Light (1d6), Medium (1d8), Heavy (1d10)
   - Damage: Auto-filled based on type, or custom
   - Attack Stat: Body or Reflex
   - Two-Handed: Adds +2 damage
   - Edge Bonus: Any situational modifiers

#### Armor
1. Create Item → Select "Armor"
2. **Details Tab**:
   - Armor Type: None, Light, Medium, Heavy
   - Armor Bonus: Defense bonus when equipped

#### Tree Nodes
1. Create Item → Select "Tree Node"
2. **Details Tab**:
   - Domain: Which domain (Martial, Covert, etc.)
   - Tree Name: e.g., "Combat Prowess"
   - Tier: Novice → Journeyman → Adept → Expert → Master → Apex
   - Trigger: What you must do to unlock this
   - Effect: What it does mechanically
   - Unlocked: Check when trigger is completed

#### Archetypes
1. Create Item → Select "Archetype"
2. **Details Tab**:
   - Archetype Type: Select from the seven archetypes
   - Core Identity: Brief description
   - Condition: When you get Edge
   - Edge Bonus: How much Edge

#### Tags
1. Create Item → Select "Tag"
2. **Details Tab**:
   - Tag Type: Character, Equipment, Location, Situation
   - Edge Bonus: Modifier value
   - Condition: When it applies
   - Active: Toggle on/off

#### Principles
1. Create Item → Select "Principle"
2. **Description Tab**: Write the principle
3. **Details Tab**:
   - Active: Is this principle currently guiding the character?
   - Severity: Current Moral Friction penalty (if violated)

### Creating NPCs

1. Create Actor → Select "NPC"
2. **Stats Tab**: Set stats (or use defaults)
3. **Combat Tab**:
   - NPC Type: Mook (HP 10, Def 12), Lieutenant (HP 25, Def 14), Boss (HP 50, Def 17), or Custom
   - Health and Defense auto-set based on type
   - Add weapons
4. **Narrative Tab**:
   - Goal: What they want
   - Method: How they pursue it
   - Secret: What they're hiding
   - Connection: How they relate to PCs
   - Knowledge Tier: 0-4 (what truths they know)

## Making Rolls

### Stat Checks
1. Click any stat name on the character sheet
2. Dialog appears:
   - Enter Edge modifier (-5 to +5)
   - Select Difficulty: 8 (Trivial), 12 (Standard), 16 (Hard), 20+ (Extreme)
3. Click "Roll"
4. Result shows:
   - **Success**: Beat the difficulty
   - **Partial Success**: Exactly met difficulty (succeed with complication)
   - **Failure**: Below difficulty (consequences happen)

### Combat Rolls
1. **Initiative**: Foundry automatically uses 1d20 + Reflex modifier
2. **Attack**: Click fist icon on weapon
   - Rolls 1d20 + attack stat + weapon edge vs target Defense
3. **Damage**: Click burst icon on weapon
   - Rolls weapon damage dice + bonuses

### Applying Harm
When taking damage:
1. Reduce Health first
2. When consequences are severe, mark Harm levels:
   - Level 1: -1 to all rolls
   - Level 2: -2 to all rolls
   - Level 3: -3 to all rolls
   - Level 4: Incapacitated

Harm penalties automatically apply to rolls.

## Position & Effect

Before any roll, the GM should establish:

### Position (Risk Level)
- **Controlled**: Low risk, minimal consequences
- **Risky**: Moderate risk, real consequences (default)
- **Desperate**: High risk, severe consequences

### Effect (Impact Level)
- **Limited**: Partial progress
- **Standard**: Normal success (default)
- **Great**: Major success

These are narrative guidelines, not mechanical modifiers.

## Advanced Systems

### Moral Friction
When acting against a Principle:
1. Check "Active" in Moral Friction section
2. Set Severity: +2 (minor), +4 (significant), +6 (core betrayal)
3. This increases Difficulty for actions during the violation
4. Uncheck when principle is restored or resolved

### Draconic Attention
When performing attention-worthy actions:
1. GM increases Draconic Attention tracker (0-5)
2. At 5: Dragons intervene directly
3. High-risk actions:
   - Approaching Towers (+4)
   - Manipulating Monuments (+4 to +6)
   - Major political upheaval (+4)
   - Discovering Earth-Age truths (+8)

## Tips for GMs

### Setting Difficulty
- **8 (Trivial)**: Average person succeeds routinely
- **12 (Standard)**: Requires skill or effort
- **16 (Hard)**: Needs expertise or advantages
- **20+ (Extreme)**: Near-impossible, requires perfect execution

### Managing Edge
Don't stack individual bonuses. Discuss the situation and agree on ONE Edge number:
- Great advantage: +2 to +3
- Slight advantage: +1
- Neutral: 0
- Slight disadvantage: -1
- Major disadvantage: -2 to -3

### Information Gating
Use NPC Knowledge Tiers to control reveals:
- **Tier 0** (Commoners): Surface reality only
- **Tier 1** (Scholars): Ancient history, Monument basics
- **Tier 2** (Tower Scholaria): Monument theory, Tower observations
- **Tier 3** (Dragon Agents): Partial truth, functional understanding
- **Tier 4** (Dragons): Complete truth

## Common Issues

### Stats Not Calculating
- Make sure stat values are numbers
- Sheet refreshes on tab change
- Try reopening the sheet

### Dice Not Rolling
- Ensure you have permission to roll
- Check that Edge is a number (not blank)
- Difficulty must be selected or entered

### Items Not Showing
- Drag items from Items Directory to character sheet
- Or use + buttons on character sheet
- Make sure item type matches the section

### Defense Not Updating
- Equip armor by checking the "Equipped" box
- Only highest armor bonus applies
- Defense = 10 + Reflex modifier + armor bonus

## Building Your Content

### Creating Domain Trees
1. Read the source documents in `Domain Trees/` folder
2. For each node in a tree, create a Tree Node item
3. Set Domain, Tree name, Tier, Trigger, and Effect
4. Add to compendiums for reuse

### Populating Equipment
1. Create Weapon/Armor/Equipment items
2. Set appropriate stats and Edge bonuses
3. Add descriptive tags
4. Save to compendiums for quick access

### Organizing Compendiums
Create compendiums to organize:
- Martial Tree Nodes
- Covert Tree Nodes
- Economic Tree Nodes
- Spiritual Tree Nodes
- Political Tree Nodes
- Magic/Tech Tree Nodes
- Weapons & Armor
- Tags & Principles
- Example Characters
- Example NPCs

## Next Steps

1. Create your first character
2. Add some basic equipment
3. Create Tree Nodes for your primary domain
4. Run a test combat to learn the mechanics
5. Start your campaign!

## Support

For issues or questions:
- Check the README.md
- Review the source documents in the folder
- Consult The Thirteen Towers main rulebook

---

**Welcome to Orbis. The Towers stand. The Dragons watch. What will you discover?**
