## Character definitions for HELP WANTED

## T.A.S.K.S. - The AI system with philosophical depth
define tasks = Character("T.A.S.K.S.", color="#00a8ff")

## Corporate Presenter - The neutral training voice
define presenter = Character("Training System", color="#ffffff")

## Department Representatives
define vincent = Character("Vincent Janssen", color="#ff6b6b")  # Creative Director
define eliana = Character("Eliana Riviera", color="#4ecdc4")   # Engineering Head
define jmaxwell = Character("JMaxwell Charbourne", color="#ffe66d")  # Legal Head
define nathan = Character("Nathan Eckenrode", color="#ff9ff3")  # CEO

## Player character placeholder
define player = Character("[player_name]", color="#95e1d3")

## Narrator for slide transitions
define narrator = Character(None, kind=nvl)

## Game state variables
default player_name = "New Hire"
default character_department = None
default character_skills = []
default tasks_interactions = 0
default slide_number = 1
default tutorial_complete = False
default persona_unlocked = False
default shadow_decks = []
default ceo_mode = False

## Department tracking
default dept_creative = False
default dept_legal = False  
default dept_engineering = False
default dept_marketing = False

## Skill tracking
default skill_music = False
default skill_legal = False
default skill_technical = False
default skill_creative = False

## Interactive demo tracking
default demo_routing_complete = False
default demo_creative_complete = False
default demo_knowledge_complete = False
