## HELP WANTED - T.A.S.K.S. Integration Training
## Interactive Corporate Onboarding Narrative

define config.name = _("HELP WANTED")

define gui.show_name = True

define config.version = "1.0.0"

## Sound and music ############################################################

define config.has_sound = True

define config.has_music = True

define config.has_voice = False

## Transitions #################################################################

define config.enter_transition = dissolve

define config.exit_transition = dissolve

define config.intra_transition = dissolve

define config.after_load_transition = None

## Window management ###########################################################

define config.window = "auto"

define config.window_show_transition = Dissolve(.2)

define config.window_hide_transition = Dissolve(.2)

## Preference defaults #########################################################

default preferences.text_cps = 40

default preferences.auto_forward_time = 15

## Save directory ##############################################################

define config.save_directory = "HELP_WANTED-1"

## Icon ########################################################################

define config.window_icon = "gui/window_icon.png"

## Corporate Slide Deck Theme Configuration ###################################

## These are valid Ren'Py configuration variables

## Build configuration #########################################################

init python:
    build.classify('**~', None)
    build.classify('**.bak', None)
    build.classify('**/.**', None)
    build.classify('**/#**', None)
    build.classify('**/thumbs.db', None)

    build.documentation('*.html')
    build.documentation('*.txt')

## Game-specific settings ######################################################

default persistent.character_department = None

default persistent.character_skills = []

default persistent.tasks_interactions = 0

default persistent.shadow_decks_unlocked = []

default persistent.ceo_mode_unlocked = False
