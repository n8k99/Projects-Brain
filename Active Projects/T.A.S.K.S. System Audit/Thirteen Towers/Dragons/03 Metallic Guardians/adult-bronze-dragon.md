---
Present_0_AY: '723
cssclasses:
- json5e-monster
image: '[[adult-bronze-dragon.png]]'
lineage:
- '[[young-bronze-dragon]]'
obsidianUIMode: preview
title: adult-bronze-dragon
---
```statblock
name: Adult Bronze Dragon
image: adult-bronze-dragon.png
size: Huge
type: dragon
alignment: Lawful Good
ac: 19
hp: 212
hit_dice: 17d12 + 102
speed: 40 ft., fly 80 ft., swim 40 ft.
cr: 15.0
stats:
- 10
- 10
- 10
- 10
- 10
- 10
saves:
  dexterity: 5
  constitution: 11
  wisdom: 7
  charisma: 9
skillsaves:
  insight: 7
  perception: 12
  stealth: 5
damage_immunities: lightning
senses: blindsight 60 ft., darkvision 120 ft., passive Perception 22
languages: Common, Draconic
traits:
- name: Legendary Resistance (3/Day).
  desc: If the dragon fails a saving throw, it can choose to succeed instead.
actions:
- name: Bite.
  desc: '*Melee Weapon Attack:* +12 to hit, reach 10 ft., one target. *Hit:* 18 (`2d10
    + 7`) piercing damage.'
- name: Claw.
  desc: '*Melee Weapon Attack:* +12 to hit, reach 5 ft., one target. *Hit:* 14 (`2d6
    + 7`) slashing damage.'
- name: Tail.
  desc: '*Melee Weapon Attack:* +12 to hit, reach 15 ft., one target. *Hit:* 16 (`2d8
    + 7`) bludgeoning damage.'
- name: Frightful Presence.
  desc: Each creature of the dragon's choice that is within 120 feet of the dragon
    and aware of it must succeed on a DC 17 Wisdom saving throw or become [frightened](rules/conditions.mdfrightened)
    for 1 minute. A creature can repeat the saving throw at the end of each of its
    turns, ending the effect on itself on a success. If a creature's saving throw
    is successful or the effect ends for it, the creature is immune to the dragon's
    Frightful Presence for the next 24 hours.
- name: Breath Weapons (Recharge 5-6).
  desc: The dragon uses one of the following breath weapons. - **Lightning Breath.**
    The dragon exhales lightning in a 90-foot line that is 5 feet wide. Each creature
    in that line must make a DC 19 Dexterity saving throw, taking 66 (`12d10`) lightning
    damage on a failed save, or half as much damage on a successful one.   - **Repulsion
    Breath.** The dragon exhales repulsion energy in a 30-foot cone. Each creature
    in that area must succeed on a DC 19 Strength saving throw. On a failed save,
    the creature is pushed 60 feet away from the dragon.
- name: Change Shape.
  desc: The dragon magically polymorphs into a humanoid or beast that has a challenge
    rating no higher than its own, or back into its true form. It reverts to its true
    form if it dies. Any equipment it is wearing or carrying is absorbed or borne
    by the new form (the dragon's choice). In a new form, the dragon retains its alignment,
    hit points, Hit Dice, ability to speak, proficiencies, Legendary Resistance, lair
    actions, and Intelligence, Wisdom, and Charisma scores, as well as this action.
    Its statistics and capabilities are otherwise replaced by those of the new form,
    except any class features or legendary actions of that form.
legendary_actions:
- name: Tail Attack.
  desc: The dragon makes a tail attack.
- name: Wing Attack (Costs 2 Actions).
  desc: The dragon beats its wings. Each creature within 10 feet of the dragon must
    succeed on a DC 20 Dexterity saving throw or take 14 (`2d6 + 7`) bludgeoning damage
    and be knocked [prone](rules/conditions.mdprone). The dragon can then fly up to
    half its flying speed.
```