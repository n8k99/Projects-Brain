---
T.A.S.K.S.: "Provides access to audio assets required for HELP WANTED Game implementation.\n\
  \n Describes specific sound effects and music files needed for T.A.S.K..."
---
# Audio Assets for HELP WANTED Game

This directory contains sound effects and music for the T.A.S.K.S. Integration Training interactive narrative.

## Required Audio Assets

### Ambient Soundscape
- `corporate_ambient.ogg` - Subtle office ambience for slide background
- `server_hum.ogg` - Technical server sounds for T.A.S.K.S. presence
- `slide_transition.ogg` - Professional slide change sound

### System Sounds
- `boot_sequence.ogg` - Linux-style boot sounds for opening
- `tasks_response.ogg` - Subtle chime for T.A.S.K.S. dialogue
- `button_click.ogg` - Professional UI interaction sound
- `choice_select.ogg` - Decision point selection sound

### Character Department Themes
- `creative_ambience.ogg` - Artistic atmosphere for creative department slides
- `legal_atmosphere.ogg` - Formal, structured sounds for legal department
- `engineering_sounds.ogg` - Technical, systematic audio for engineering
- `marketing_energy.ogg` - Dynamic, energetic sounds for marketing

### Special Effects
- `glitch_audio.ogg` - Digital corruption for Act III glitch mechanics
- `cli_typing.ogg` - Terminal typing sounds for CEO meta-game
- `consciousness_emergence.ogg` - Abstract sounds for T.A.S.K.S. personality

### Music Tracks (Optional)
- `main_theme.ogg` - Subtle corporate theme for tutorial
- `character_selection.ogg` - Reflective music for department choice
- `deep_immersion.ogg` - Evolving track for Act III progression

## Audio Specifications

### Technical Requirements
- Format: OGG Vorbis (Ren'Py native format)
- Sample Rate: 44.1 kHz
- Bit Depth: 16-bit minimum
- Channels: Stereo for music, mono acceptable for SFX

### Volume Levels
- Music: -18dB to -12dB peak
- Sound Effects: -12dB to -6dB peak
- Voice/Dialogue: -12dB peak (if added later)

### Duration Guidelines
- Ambient tracks: 2-5 minutes (loopable)
- Sound effects: 0.1-3 seconds
- Music themes: 1-3 minutes (loopable)
- Transition sounds: 0.5-1 second

## Design Philosophy

Audio should support the corporate training illusion while enhancing narrative immersion:

### Subtlety
- Sounds should feel natural in a corporate environment
- Avoid obviously "game-like" audio that breaks immersion
- Professional quality matching real business presentations

### Progressive Enhancement
- Tutorial: Clean, corporate sounds
- Persona Runs: Department-specific audio flavoring
- Deep Immersion: Subtle glitch and corruption effects
- CEO Meta-Game: Technical, command-line atmosphere

### T.A.S.K.S. Audio Identity
- Philosophical depth through subtle harmonic elements
- Technology sounds that suggest consciousness rather than mere processing
- Audio cues that reinforce T.A.S.K.S. as character, not tool

## Implementation Notes

### Ren'Py Integration
```python
# Example audio definitions
define audio.corporate_ambient = "audio/corporate_ambient.ogg"
define audio.tasks_response = "audio/tasks_response.ogg"
define audio.slide_transition = "audio/slide_transition.ogg"
```

### Adaptive Audio
- Volume adjusts based on player department selection
- Layered ambient tracks for different slide contexts
- Dynamic mixing for T.A.S.K.S. interaction intensity

### Accessibility
- All important audio cues have visual alternatives
- Optional audio descriptions for complex soundscapes
- Volume controls for different audio categories

---

**Audio Production Notes**: Sounds should be professionally produced to maintain corporate aesthetic while supporting interactive narrative elements.