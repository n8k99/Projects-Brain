# The Thirteen Towers - Foundry VTT System

A narrative investigation game set on Orbis - a medieval fantasy world hiding science fiction secrets.

## About

**The Thirteen Towers** is a tabletop roleplaying game about investigation, intrigue, and the slow revelation of uncomfortable truths. You are intelligence operatives, scholars, and agents navigating a world where knowledge is power, force is politics, and ancient structures hide secrets that could reshape civilization.

This is the official Foundry Virtual Tabletop system implementation for The Thirteen Towers RPG.

## Features

### Core System
- **d20-based Resolution**: Roll 1d20 + Stat Modifier + Edge vs Difficulty
- **Eight Stats**: Body, Reflex, Charm, Sense, Spirit, Mind, Luck, Will
- **Position & Effect System**: Controlled/Risky/Desperate positions with Limited/Standard/Great effects
- **Edge System**: Single unified modifier combining all advantages/disadvantages

### Character Management
- **Seven Archetypes**: Shieldbearer, Silentknife, Songbearer, Oathbound, Patternweaver, Edgerunner, Linekeeper
- **Six Domains**: Martial, Covert, Magic/Tech, Spiritual, Economic, Political
- **Domain Trees**: Advancement through fictional triggers with unlockable nodes
- **Harm System**: Level 1-4 harm with mechanical penalties
- **Moral Friction**: Penalties for acting against character principles
- **Draconic Attention**: Track when your actions draw the notice of the Dragons

### Combat System
- **Battle Order**: Initiative based on Reflex
- **Attack & Damage**: Weapon-based attacks with various damage dice
- **Defense**: 10 + Reflex modifier + armor bonus
- **Health & Resolve**: Track physical and mental resources

### Items & Equipment
- **Weapons**: Light (1d6), Medium (1d8), Heavy (1d10) with various properties
- **Armor**: Defense bonuses with different armor types
- **Tree Nodes**: Unlockable abilities from Domain advancement
- **Tags**: Descriptors that grant Edge in specific situations
- **Principles**: Character beliefs that create Moral Friction when violated

## Installation

### Method 1: Manual Installation
1. Download the system files
2. Extract to `FoundryVTT/Data/systems/thirteen-towers`
3. Restart Foundry VTT
4. Create a new world using "The Thirteen Towers" system

### Method 2: Manifest URL (when available)
1. In Foundry VTT, go to "Install System"
2. Paste the manifest URL
3. Click Install

## Getting Started

1. **Create a Character**: Choose your culture, background, archetype, and primary domain
2. **Assign Stats**: Use the standard array (14, 12, 12, 10, 10, 8, 8, 6) or roll stats
3. **Define Principles**: List 3-5 core beliefs your character holds
4. **Select Equipment**: Add weapons, armor, and gear from the items tab
5. **Begin Play**: Roll checks by clicking stat buttons, manage advancement through Domain Trees

## Rolling Checks

1. Click on any stat name in the character sheet
2. Enter Edge modifier (advantages/disadvantages)
3. Select or enter difficulty (8/12/16/20+)
4. Roll and interpret results:
   - **Success**: Beat the difficulty
   - **Partial**: Exactly meet difficulty (succeed with complication)
   - **Failure**: Below difficulty (consequences happen)

## Combat

1. **Initiative**: Automatically calculated as 1d20 + Reflex modifier
2. **Attack**: Click weapon attack icon, rolls against target's Defense
3. **Damage**: Click weapon damage icon to roll damage
4. **Track Harm**: Mark harm levels as characters take damage

## Advancement

Characters advance through **fictional triggers** rather than experience points:

1. **Complete Triggers**: Do specific things in the story (defeat a master, study ancient texts, etc.)
2. **Unlock Nodes**: Mark Tree Nodes as unlocked when triggers are met
3. **Gain Abilities**: Unlocked nodes grant new capabilities and Edge bonuses

## Known Limitations

This is version 0.9.0 (Late Alpha). Current limitations:

- Domain Trees need to be created manually as items
- Combat automation is minimal
- No automated Draconic Attention checks
- Compendiums for trees and equipment need to be populated

## Development Roadmap

- [ ] Create compendium packs for all Domain Trees
- [ ] Add automation for Position & Effect
- [ ] Implement Draconic Attention tracking
- [ ] Add equipment compendiums
- [ ] Create NPC templates
- [ ] Add dice roll chat cards with better formatting
- [ ] Implement advancement automation

## Support

For issues, questions, or suggestions:
- Create an issue on the GitHub repository
- Contact: N8 / Eckenrode Muziekopname

## Credits

**Game Design**: N8 / Eckenrode Muziekopname
**Foundry VTT Implementation**: Claude Code (Anthropic)
**System Version**: 0.9.0
**Foundry VTT Compatibility**: v12

## License

This Foundry VTT system is released under the MIT License (see LICENSE.txt).

The Thirteen Towers game system, setting, and content are © 2025 N8 / Eckenrode Muziekopname. All rights reserved.

---

**Welcome to Orbis. The Towers stand. The Dragons watch. What will you discover?**
