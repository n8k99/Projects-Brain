---
T.A.S.K.S.: '**Overview:**

  Provides project context and structural information for an interactive onboarding
  training game built using Ren''Py.


  **Description:**...'
---
# HELP WANTED - T.A.S.K.S. Integration Training Game

An interactive corporate onboarding narrative built in Ren'Py, serving as the primary game interface for the HELP WANTED project.

## Project Location

This project is located at: `/Volumes/Elements/Nebulab/HELP_WANTED_Game/`

The project is now at the top level of the Nebulab repository for easy access and organization.

## Project Structure

```
HELP_WANTED_Game/
├── game/
│   ├── script.rpy              # Main game script with slide content
│   ├── characters.rpy          # Character definitions and variables
│   ├── options.rpy             # Game configuration and settings
│   ├── gui.rpy                 # GUI styling for corporate theme
│   ├── slide_mutations.rpy     # Department-specific slide mutations
│   ├── images/                 # Visual assets for slides and UI
│   │   ├── corporate_bg.png    # Corporate slide background
│   │   ├── em_logo.png         # Eckenrode Muziekopname logo
│   │   └── tasks_interface.png # T.A.S.K.S. interface graphics
│   └── audio/                  # Sound effects and music
└── README.md                   # This file
```

## Running the Game

### Option 1: Using Ren'Py Launcher (Recommended)
1. Navigate to `/Volumes/Elements/Nebulab/scripts/renpy-8.4.1-sdk/`
2. Run the Ren'Py launcher:
   ```bash
   cd /Volumes/Elements/Nebulab/scripts/renpy-8.4.1-sdk/
   ./renpy.sh
   ```
3. In the launcher, click "preferences"
4. Click "Add" and browse to `/Volumes/Elements/Nebulab/HELP_WANTED_Game/`
5. Select the HELP_WANTED_Game project and click "Launch Project"

### Option 2: Direct Command Line
```bash
cd /Volumes/Elements/Nebulab/scripts/renpy-8.4.1-sdk/
./renpy.sh /Volumes/Elements/Nebulab/HELP_WANTED_Game/
```

### Option 3: Create Shortcut Script
Create a launch script in the project directory:
```bash
#!/bin/bash
cd /Volumes/Elements/Nebulab/scripts/renpy-8.4.1-sdk/
./renpy.sh /Volumes/Elements/Nebulab/HELP_WANTED_Game/ "$@"
```

## Technical Notes

### Game State Management
- Character department and skills affect all subsequent slides
- T.A.S.K.S. interaction counter tracks player engagement
- Persistent variables maintain progress across playthroughs
- Unlock system gates advanced content

### Narrative Structure
The game follows a four-act structure:
1. **Tutorial**: Linear introduction to mechanics
2. **Persona Runs**: Character-specific narrative paths
3. **Deep Immersion**: AI emergence and glitch mechanics
4. **CEO Meta-Game**: Command-line interface overlay

### Asset Requirements
- Corporate slide backgrounds with professional aesthetic
- Department-specific visual overlays
- T.A.S.K.S. interface graphics
- Character portraits for PeopleDirectory integration
- Sound effects for slide transitions and T.A.S.K.S. responses

## Integration with Vault Content

The game draws authentic content from:
- T.A.S.K.S. system documentation
- Eckenrode Muziekopname company information
- PeopleDirectory character profiles
- Actual company missions, values, and culture
- Real departmental structures and workflows

## Future Expansion

This foundation supports:
- Additional character paths from the full PeopleDirectory
- Integration with Discord server for community features
- Expanded universe connections to Orbis and EM Colonization Fleet
- Advanced AI personality development
- Community-generated content through character creation

---

**Development Contact**: See T.A.S.K.S. system for technical support and implementation assistance.

**Status**: Alpha - Core framework complete, content development ongoing.