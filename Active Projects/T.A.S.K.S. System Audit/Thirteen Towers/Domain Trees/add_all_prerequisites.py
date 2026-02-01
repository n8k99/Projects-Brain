#!/usr/bin/env python3
"""
Complete prerequisite integration for all 25 trees
"""

import re
import os

def add_prereq(content, tier_name, tier_level, new_prereq):
    """Add prerequisite line to tier section"""
    pattern = rf'(##\s+{re.escape(tier_name)}\s+\({re.escape(tier_level)}\s+Tier\).*?\*\*Prerequisites:\*\*\n)((?:- .*?\n)*)'
    
    match = re.search(pattern, content, re.DOTALL)
    if match:
        existing = match.group(2)
        if new_prereq not in existing:
            updated = match.group(1) + existing + new_prereq + '\n'
            return content.replace(match.group(0), updated), True
    return content, False

def update_file(path, updates):
    """Apply all updates to file"""
    try:
        with open(path, 'r') as f:
            content = f.read()
        
        original = content
        count = 0
        
        for tier_name, tier_level, prereq in updates:
            content, changed = add_prereq(content, tier_name, tier_level, prereq)
            if changed:
                count += 1
        
        if content != original:
            with open(path, 'w') as f:
                f.write(content)
        
        return count
    except Exception as e:
        print(f"  Error: {e}")
        return 0

BASE = "/Volumes/Elements/Orbis/Gaming System/Domain Trees"

print("COMPLETE PREREQUISITE INTEGRATION\n")

# ALL 25 TREES WITH COMPLETE PREREQUISITE UPDATES

# POLITICAL DOMAIN
print("POLITICAL DOMAIN")
print("-" * 60)

print("Diplomacy...")
update_file(f"{BASE}/Political/Diplomacy.md", [
    ("Dealmaker", "Adept", "- At least one feature from Economic domain"),
    ("Ambassador", "Expert", "- At least one feature from Spiritual: Belief Systems OR Spiritual: Lore Understanding"),
    ("Voice of Realms", "Master", "- At least one Master-tier feature from Economic OR Spiritual domain"),
    ("Voice of Realms", "Master", "- At least one Master-tier feature from Covert: Intelligence Networks"),
    ("The Great Mediator", "Apex", "- At least one Master-tier feature from Spiritual domain"),
])

print("Alliance Building...")
update_file(f"{BASE}/Political/Alliance_Building.md", [
    ("Political Organizer", "Adept", "- At least one feature from Economic: Supply Networks OR Economic: Coordination & Logistics"),
    ("Kingmaker", "Expert", "- At least one feature from Martial domain"),
    ("League Architect", "Master", "- At least one Master-tier feature from Economic: Coordination & Logistics"),
    ("Continental Hegemon", "Apex", "- At least one Master-tier feature from Martial domain"),
    ("Continental Hegemon", "Apex", "- At least one Master-tier feature from Spiritual domain"),
])

print("Faction Navigation...")
update_file(f"{BASE}/Political/Faction_Navigation.md", [
    ("Political Operator", "Adept", "- At least one feature from Covert: Intelligence Networks"),
    ("Continental Broker", "Expert", "- At least one feature from Covert: Intelligence Networks"),
    ("The Gray Cardinal", "Master", "- At least one Master-tier feature from Covert: Information Warfare"),
    ("The Shadow Parliament", "Apex", "- At least one Master-tier feature from Spiritual: Belief Systems"),
])

print("Authority & Legitimacy...")
update_file(f"{BASE}/Political/Authority_Legitimacy.md", [
    ("Regional Power", "Adept", "- At least one feature from Martial: Unit Leadership OR Economic: Coordination & Logistics"),
    ("Sovereign", "Expert", "- At least one feature from Economic domain"),
    ("Sovereign", "Expert", "- At least one feature from Martial domain"),
    ("The Sovereign", "Master", "- At least one Master-tier feature from Economic domain"),
    ("The Sovereign", "Master", "- At least one Master-tier feature from Martial domain"),
    ("The God-King", "Apex", "- At least one Master-tier feature from Spiritual: Belief Systems"),
    ("The God-King", "Apex", "- At least one Master-tier feature from Covert: Information Warfare"),
])

print("Treaty Crafting...")
update_file(f"{BASE}/Political/Treaty_Crafting.md", [
    ("Treaty Master", "Adept", "- At least one feature from Political: Alliance Building"),
    ("Peace Architect", "Expert", "- At least one feature from Economic domain"),
    ("The Lawgiver", "Master", "- At least one Master-tier feature from Spiritual: Belief Systems"),
    ("The Eternal Covenant", "Apex", "- At least one Master-tier feature from Covert: Information Warfare"),
])

print("\nMARTIAL DOMAIN")
print("-" * 60)

print("Combat Prowess...")
update_file(f"{BASE}/Martial/Combat_Prowess.md", [
    ("Weapon Master", "Adept", "- At least one feature from Spiritual: Ritual Practice OR Spiritual: Belief Systems"),
    ("Champion", "Expert", "- At least one feature from Political domain"),
    ("Legendary Warrior", "Master", "- At least one Master-tier feature from Spiritual: Belief Systems"),
    ("Legendary Warrior", "Master", "- At least one Master-tier feature from Political domain"),
    ("The Blade", "Apex", "- At least one Master-tier feature from Spiritual: Mystical Experience"),
    ("The Blade", "Apex", "- At least one Master-tier feature from Political: Authority & Legitimacy"),
])

print("Unit Leadership...")
update_file(f"{BASE}/Martial/Unit_Leadership.md", [
    ("Battle Captain", "Adept", "- At least one feature from Martial: Logistics & Supply OR Economic: Supply Networks"),
    ("Strategic Commander", "Expert", "- At least one feature from Political domain"),
    ("General of Renown", "Master", "- At least one Master-tier feature from Political: Authority & Legitimacy"),
    ("General of Renown", "Master", "- At least one Master-tier feature from Economic: Coordination & Logistics"),
    ("Theater Tactician", "Apex", "- At least one Master-tier feature from Covert: Intelligence Networks"),
])

print("Fortification Mastery...")
update_file(f"{BASE}/Martial/Fortification_Mastery.md", [
    ("Siege Specialist", "Adept", "- At least one feature from Martial: Unit Leadership"),
    ("Master Engineer", "Expert", "- At least one feature from Magic/Tech: Artifact Analysis OR Magic/Tech: Monument Research"),
    ("The Architect", "Master", "- At least one Master-tier feature from Economic: Supply Networks"),
    ("The Unbreakable", "Apex", "- At least one Master-tier feature from Magic/Tech domain"),
])

print("Logistics & Supply...")
update_file(f"{BASE}/Martial/Logistics_Supply.md", [
    ("Campaign Logistician", "Adept", "- At least one feature from Martial: Unit Leadership"),
    ("Master Logistician", "Expert", "- At least one feature from Political domain"),
    ("The Grand Logistician", "Master", "- At least one Master-tier feature from Political: Authority & Legitimacy"),
    ("Quartermaster Divine", "Apex", "- At least one Master-tier feature from Covert: Intelligence Networks"),
])

print("\nECONOMIC DOMAIN")
print("-" * 60)

print("Supply Networks...")
update_file(f"{BASE}/Economic/Supply_Networks.md", [
    ("Trade Administrator", "Adept", "- At least one feature from Political domain"),
    ("Regional Commerce Lord", "Expert", "- At least one feature from Covert: Intelligence Networks"),
    ("Continental Trade Sovereign", "Master", "- At least one Master-tier feature from Covert: Intelligence Networks"),
    ("The Invisible Market", "Apex", "- At least one Master-tier feature from Covert: Information Warfare"),
])

print("Resource Intelligence...")
update_file(f"{BASE}/Economic/Resource_Intelligence.md", [
    ("Economic Strategist", "Adept", "- At least one feature from Covert: Intelligence Networks"),
    ("The Accountant", "Expert", "- At least one feature from Political domain"),
    ("See the Economy", "Master", "- At least one Master-tier feature from Political: Faction Navigation OR Political: Diplomacy"),
    ("Civilizational Economics", "Apex", "- At least one Master-tier feature from Political: Authority & Legitimacy"),
    ("Civilizational Economics", "Apex", "- At least one Master-tier feature from Covert: Information Warfare"),
])

print("Coordination & Logistics...")
update_file(f"{BASE}/Economic/Coordination_Logistics.md", [
    ("Campaign Planner", "Adept", "- At least one feature from Political domain"),
    ("Master Coordinator", "Expert", "- At least one feature from Martial: Unit Leadership OR Martial: Logistics & Supply"),
    ("The Quartermaster", "Master", "- At least one Master-tier feature from Political: Alliance Building OR Political: Faction Navigation"),
    ("The Quartermaster", "Master", "- At least one Master-tier feature from Martial: Logistics & Supply"),
    ("The Invisible Hand", "Apex", "- At least one Master-tier feature from Political: Treaty Crafting"),
])

print("\nSPIRITUAL DOMAIN")
print("-" * 60)

print("Lore Understanding...")
update_file(f"{BASE}/Spiritual/Lore_Understanding.md", [
    ("Keeper of Forgotten Truths", "Adept", "- At least one feature from Magic/Tech: Monument Research OR Magic/Tech: Artifact Analysis"),
    ("The Librarian", "Expert", "- At least one feature from Covert: Investigation Techniques"),
    ("Living Chronicle", "Master", "- At least one Master-tier feature from Magic/Tech domain"),
    ("Living Chronicle", "Master", "- At least one Master-tier feature from Covert: Investigation Techniques"),
    ("Complete Narrative Heritage", "Apex", "- At least one Master-tier feature from Covert: Information Warfare"),
])

print("Belief Systems...")
update_file(f"{BASE}/Spiritual/Belief_Systems.md", [
    ("Prophet", "Adept", "- At least one feature from Spiritual: Lore Understanding OR Spiritual: Ritual Practice"),
    ("Faith Shaper", "Expert", "- At least one feature from Political: Authority & Legitimacy"),
    ("Tradition Founder", "Master", "- At least one Master-tier feature from Political: Authority & Legitimacy"),
    ("Tradition Founder", "Master", "- At least one Master-tier feature from Spiritual: Ritual Practice"),
    ("The Faith", "Apex", "- At least one Master-tier feature from Covert: Information Warfare"),
])

print("Ritual Practice...")
update_file(f"{BASE}/Spiritual/Ritual_Practice.md", [
    ("Master of Ceremonies", "Adept", "- At least one feature from Spiritual: Lore Understanding"),
    ("The Hierophant", "Expert", "- At least one feature from Political: Authority & Legitimacy"),
    ("The Sacred Architect", "Master", "- At least one Master-tier feature from Political: Treaty Crafting OR Political: Alliance Building"),
    ("The Eternal Liturgy", "Apex", "- At least one Master-tier feature from Spiritual: Lore Understanding"),
])

print("Mystical Experience...")
update_file(f"{BASE}/Spiritual/Mystical_Experience.md", [
    ("Seer", "Adept", "- At least one feature from Spiritual: Lore Understanding"),
    ("Oracle", "Expert", "- At least one feature from Covert: Intelligence Networks"),
    ("The Awakened", "Master", "- At least one Master-tier feature from Magic/Tech: Tower Functions OR Magic/Tech: Monument Research"),
    ("The Eye of God", "Apex", "- At least one Master-tier feature from Magic/Tech: Tower Functions"),
    ("The Eye of God", "Apex", "- At least one Master-tier feature from Covert: Counter-Intelligence"),
])

print("\nMAGIC/TECH DOMAIN")
print("-" * 60)

print("Monument Research...")
update_file(f"{BASE}/Magic_Tech/Monument_Research.md", [
    ("Tower Researcher", "Adept", "- At least one feature from Spiritual: Lore Understanding"),
    ("Tower Scholar", "Expert", "- At least one feature from Covert: Investigation Techniques"),
    ("Tower Scholar", "Expert", "- At least one feature from Covert: Intelligence Networks"),
    ("Tower Authority", "Master", "- At least one Master-tier feature from Covert: Investigation Techniques"),
    ("Tower Authority", "Master", "- At least one Master-tier feature from Political: Authority & Legitimacy"),
    ("The Keeper", "Apex", "- At least one Master-tier feature from Spiritual: Mystical Experience"),
])

print("Tower Functions...")
update_file(f"{BASE}/Magic_Tech/Tower_Functions.md", [
    ("Tower Systems Specialist", "Adept", "- At least one feature from Spiritual: Lore Understanding"),
    ("Tower Architect", "Expert", "- At least one feature from Covert: Intelligence Networks"),
    ("The Awakener", "Master", "- At least one Master-tier feature from Political: Authority & Legitimacy"),
    ("The Awakener", "Master", "- At least one Master-tier feature from Spiritual: Mystical Experience"),
    ("Reactivation Theory", "Apex", "- At least one Master-tier feature from Covert: Counter-Intelligence"),
])

print("Artifact Analysis...")
update_file(f"{BASE}/Magic_Tech/Artifact_Analysis.md", [
    ("Artifact Expert", "Adept", "- At least one feature from Spiritual: Lore Understanding"),
    ("The Artificer", "Expert", "- At least one feature from Economic: Supply Networks OR Economic: Resource Intelligence"),
    ("The Last Engineer", "Master", "- At least one Master-tier feature from Economic: Coordination & Logistics"),
    ("The Archive", "Apex", "- At least one Master-tier feature from Covert: Intelligence Networks"),
    ("The Archive", "Apex", "- At least one Master-tier feature from Political: Authority & Legitimacy"),
])

print("Exotic Energy Manipulation...")
update_file(f"{BASE}/Magic_Tech/Exotic_Energy_Manipulation.md", [
    ("Energy Master", "Adept", "- At least one feature from Spiritual: Mystical Experience"),
    ("Grand Manipulator", "Expert", "- At least one feature from Spiritual: Belief Systems"),
    ("The Conduit", "Master", "- At least one Master-tier feature from Magic/Tech: Monument Research"),
    ("The Living Tower", "Apex", "- At least one Master-tier feature from Spiritual: Belief Systems"),
    ("The Living Tower", "Apex", "- At least one Master-tier feature from Covert: Counter-Intelligence"),
])

print("\n" + "=" * 60)
print("ALL 25 TREES UPDATED WITH PREREQUISITES")
print("=" * 60)
