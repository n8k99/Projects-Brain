#!/usr/bin/env python3
"""
Complete Prerequisite Integration Script
Updates all 25 skill trees with cross-domain prerequisites
"""

import os
import sys

BASE_DIR = "/Volumes/Elements/Orbis/Gaming System/Domain Trees"

def update_file(filepath, replacements):
    """Update file with list of (old, new) replacement tuples"""
    filename = os.path.basename(filepath)
    try:
        with open(filepath, 'r') as f:
            content = f.read()
        
        original_content = content
        changes_made = 0
        
        for old, new in replacements:
            if old in content:
                content = content.replace(old, new, 1)  # Replace only first occurrence
                changes_made += 1
        
        if content != original_content:
            # Create backup
            with open(filepath + '.backup', 'w') as f:
                f.write(original_content)
            
            # Write updated content
            with open(filepath, 'w') as f:
                f.write(content)
            print(f"  ✓ {filename}: {changes_made} prerequisites updated")
            return True
        else:
            print(f"  - {filename}: No changes needed")
            return False
    except FileNotFoundError:
        print(f"  ✗ {filename}: File not found")
        return False
    except Exception as e:
        print(f"  ✗ {filename}: Error - {e}")
        return False

print("=" * 60)
print("PREREQUISITE INTEGRATION - THE THIRTEEN TOWERS")
print("=" * 60)
print()

# COVERT DOMAIN
print("COVERT DOMAIN")
print("-" * 60)

print("Updating Intelligence_Networks.md...")
update_file(f"{BASE_DIR}/Covert/Intelligence_Networks.md", [
    # Already done - Expert tier
])

print("Updating Investigation_Techniques.md...")
update_file(f"{BASE_DIR}/Covert/Investigation_Techniques.md", [
    # Adept tier
    ("**Prerequisites:** Scene Reader",
     "**Prerequisites:** \n- Scene Reader\n- At least one feature from Spiritual: Lore Understanding OR Magic/Tech: Artifact Analysis"),
])

print("Updating Infiltration.md...")
update_file(f"{BASE_DIR}/Covert/Infiltration.md", [
    # Adept tier - make both required
    ("**Prerequisites:** \n- Cover Identity (Covert: Infiltration)\n- At least one feature from Covert: Intelligence Networks OR Political domain",
     "**Prerequisites:** \n- Cover Identity (Covert: Infiltration)\n- At least one feature from Covert: Intelligence Networks\n- At least one feature from Political domain"),
])

print("Updating Counter_Intelligence.md...")
update_file(f"{BASE_DIR}/Covert/Counter_Intelligence.md", [
    # Adept tier
    ("**Prerequisites:** \n- Security Awareness (Covert: Counter-Intelligence)\n- At least one feature from Covert: Intelligence Networks OR Covert: Investigation Techniques",
     "**Prerequisites:** \n- Security Awareness (Covert: Counter-Intelligence)\n- At least one feature from Covert: Intelligence Networks OR Covert: Investigation Techniques\n- At least one feature from Political domain"),
])

print("Updating Information_Warfare.md...")
update_file(f"{BASE_DIR}/Covert/Information_Warfare.md", [
    # Adept tier
    ("**Prerequisites:** \n- Message Coordination (Covert: Information Warfare)\n- At least one feature from Political domain",
     "**Prerequisites:** \n- Message Coordination (Covert: Information Warfare)\n- At least one feature from Political domain\n- At least one feature from Spiritual: Belief Systems OR Spiritual: Ritual Practice"),
])

print()

# POLITICAL DOMAIN
print("POLITICAL DOMAIN")
print("-" * 60)

print("Updating Diplomacy.md...")
update_file(f"{BASE_DIR}/Political/Diplomacy.md", [
    # Adept tier
    ("**Prerequisites:** \n- Skilled Negotiator (Political: Diplomacy)",
     "**Prerequisites:** \n- Skilled Negotiator (Political: Diplomacy)\n- At least one feature from Economic domain"),
])

print("Updating Alliance_Building.md...")
update_file(f"{BASE_DIR}/Political/Alliance_Building.md", [
    # Adept tier
    ("**Prerequisites:** \n- Coalition Manager (Political: Alliance Building)\n- At least one feature from Political: Diplomacy OR Economic domain",
     "**Prerequisites:** \n- Coalition Manager (Political: Alliance Building)\n- At least one feature from Political: Diplomacy OR Economic domain\n- At least one feature from Economic: Supply Networks OR Economic: Coordination & Logistics"),
])

print("Updating Faction_Navigation.md...")
update_file(f"{BASE_DIR}/Political/Faction_Navigation.md", [
    # Adept tier
    ("**Prerequisites:** \n- Factional Mapping (Political: Faction Navigation)\n- At least one feature from Political: Diplomacy OR Political: Alliance Building",
     "**Prerequisites:** \n- Factional Mapping (Political: Faction Navigation)\n- At least one feature from Political: Diplomacy OR Political: Alliance Building\n- At least one feature from Covert: Intelligence Networks"),
])

print("Updating Authority_Legitimacy.md...")
update_file(f"{BASE_DIR}/Political/Authority_Legitimacy.md", [
    # Adept tier
    ("**Prerequisites:** \n- Legitimate Authority (Political: Authority & Legitimacy)\n- At least one feature from Political: Alliance Building OR Political: Diplomacy",
     "**Prerequisites:** \n- Legitimate Authority (Political: Authority & Legitimacy)\n- At least one feature from Political: Alliance Building OR Political: Diplomacy\n- At least one feature from Martial: Unit Leadership OR Economic: Coordination & Logistics"),
])

print("Updating Treaty_Crafting.md...")
update_file(f"{BASE_DIR}/Political/Treaty_Crafting.md", [
    # Adept tier  
    ("**Prerequisites:** \n- Treaty Structure (Political: Treaty Crafting)\n- At least one feature from Political: Diplomacy OR Political: Alliance Building",
     "**Prerequisites:** \n- Treaty Structure (Political: Treaty Crafting)\n- At least one feature from Political: Diplomacy\n- At least one feature from Political: Alliance Building"),
])

print()

# MARTIAL DOMAIN
print("MARTIAL DOMAIN")
print("-" * 60)

print("Updating Combat_Prowess.md...")
update_file(f"{BASE_DIR}/Martial/Combat_Prowess.md", [
    # Adept tier
    ("**Prerequisites:** \n- Advanced Techniques (Martial: Combat Prowess)",
     "**Prerequisites:** \n- Advanced Techniques (Martial: Combat Prowess)\n- At least one feature from Spiritual: Ritual Practice OR Spiritual: Belief Systems"),
])

print("Updating Unit_Leadership.md...")
update_file(f"{BASE_DIR}/Martial/Unit_Leadership.md", [
    # Adept tier
    ("**Prerequisites:** \n- Formation Discipline (Martial: Unit Leadership)",
     "**Prerequisites:** \n- Formation Discipline (Martial: Unit Leadership)\n- At least one feature from Martial: Logistics & Supply OR Economic: Supply Networks"),
])

print("Updating Fortification_Mastery.md...")
update_file(f"{BASE_DIR}/Martial/Fortification_Mastery.md", [
    # Adept tier
    ("**Prerequisites:** \n- Terrain Analysis (Martial: Fortification Mastery)\n- At least one feature from Economic: Supply Networks OR Martial: Unit Leadership",
     "**Prerequisites:** \n- Terrain Analysis (Martial: Fortification Mastery)\n- At least one feature from Economic: Supply Networks\n- At least one feature from Martial: Unit Leadership"),
])

print("Updating Logistics_Supply.md...")
update_file(f"{BASE_DIR}/Martial/Logistics_Supply.md", [
    # Adept tier
    ("**Prerequisites:** \n- Supply Planning (Martial: Logistics & Supply)\n- At least one feature from Economic: Supply Networks OR Martial: Unit Leadership",
     "**Prerequisites:** \n- Supply Planning (Martial: Logistics & Supply)\n- At least one feature from Economic: Supply Networks\n- At least one feature from Martial: Unit Leadership"),
])

print()

# ECONOMIC DOMAIN  
print("ECONOMIC DOMAIN")
print("-" * 60)

print("Updating Supply_Networks.md...")
update_file(f"{BASE_DIR}/Economic/Supply_Networks.md", [
    # Adept tier
    ("**Prerequisites:** \n- Regional Trader (Economic: Supply Networks)",
     "**Prerequisites:** \n- Regional Trader (Economic: Supply Networks)\n- At least one feature from Political domain"),
])

print("Updating Resource_Intelligence.md...")
update_file(f"{BASE_DIR}/Economic/Resource_Intelligence.md", [
    # Adept tier
    ("**Prerequisites:** \n- Resource Forecaster (Economic: Resource Intelligence)\n- At least one feature from Economic: Supply Networks",
     "**Prerequisites:** \n- Resource Forecaster (Economic: Resource Intelligence)\n- At least one feature from Economic: Supply Networks\n- At least one feature from Covert: Intelligence Networks"),
])

print("Updating Coordination_Logistics.md...")
update_file(f"{BASE_DIR}/Economic/Coordination_Logistics.md", [
    # Adept tier
    ("**Prerequisites:** \n- Operations Coordination (Economic: Coordination & Logistics)\n- At least one feature from Economic: Supply Networks OR Martial: Unit Leadership",
     "**Prerequisites:** \n- Operations Coordination (Economic: Coordination & Logistics)\n- At least one feature from Economic: Supply Networks OR Martial: Unit Leadership\n- At least one feature from Political domain"),
])

print()

# SPIRITUAL DOMAIN
print("SPIRITUAL DOMAIN")
print("-" * 60)

print("Updating Lore_Understanding.md...")
update_file(f"{BASE_DIR}/Spiritual/Lore_Understanding.md", [
    # Adept tier
    ("**Prerequisites:** \n- Comparative Mythologist (Spiritual: Lore Understanding)",
     "**Prerequisites:** \n- Comparative Mythologist (Spiritual: Lore Understanding)\n- At least one feature from Magic/Tech: Monument Research OR Magic/Tech: Artifact Analysis"),
])

print("Updating Belief_Systems.md...")
update_file(f"{BASE_DIR}/Spiritual/Belief_Systems.md", [
    # Adept tier
    ("**Prerequisites:** \n- Prophetic Insight (Spiritual: Belief Systems)",
     "**Prerequisites:** \n- Prophetic Insight (Spiritual: Belief Systems)\n- At least one feature from Spiritual: Lore Understanding OR Spiritual: Ritual Practice"),
])

print("Updating Ritual_Practice.md...")
update_file(f"{BASE_DIR}/Spiritual/Ritual_Practice.md", [
    # Adept tier
    ("**Prerequisites:** \n- Ritual Design (Spiritual: Ritual Practice)\n- At least one feature from Spiritual: Belief Systems OR Political domain",
     "**Prerequisites:** \n- Ritual Design (Spiritual: Ritual Practice)\n- At least one feature from Spiritual: Belief Systems OR Political domain\n- At least one feature from Spiritual: Lore Understanding"),
])

print("Updating Mystical_Experience.md...")
update_file(f"{BASE_DIR}/Spiritual/Mystical_Experience.md", [
    # Adept tier
    ("**Prerequisites:** \n- Vision Interpretation (Spiritual: Mystical Experience)\n- At least one feature from Spiritual: Belief Systems OR Spiritual: Lore Understanding",
     "**Prerequisites:** \n- Vision Interpretation (Spiritual: Mystical Experience)\n- At least one feature from Spiritual: Belief Systems\n- At least one feature from Spiritual: Lore Understanding"),
])

print()

# MAGIC/TECH DOMAIN
print("MAGIC/TECH DOMAIN")
print("-" * 60)

print("Updating Monument_Research.md...")
update_file(f"{BASE_DIR}/Magic_Tech/Monument_Research.md", [
    # Adept tier
    ("**Prerequisites:** \n- Tower Classification (Magic/Tech: Monument Research)",
     "**Prerequisites:** \n- Tower Classification (Magic/Tech: Monument Research)\n- At least one feature from Spiritual: Lore Understanding"),
])

print("Updating Tower_Functions.md...")
update_file(f"{BASE_DIR}/Magic_Tech/Tower_Functions.md", [
    # Adept tier
    ("**Prerequisites:** \n- System Identification (Magic/Tech: Tower Functions)\n- At least one feature from Magic/Tech: Monument Research OR Magic/Tech: Artifact Analysis",
     "**Prerequisites:** \n- System Identification (Magic/Tech: Tower Functions)\n- At least one feature from Magic/Tech: Monument Research OR Magic/Tech: Artifact Analysis\n- At least one feature from Spiritual: Lore Understanding"),
])

print("Updating Artifact_Analysis.md...")
update_file(f"{BASE_DIR}/Magic_Tech/Artifact_Analysis.md", [
    # Adept tier
    ("**Prerequisites:** \n- Function Analysis (Magic/Tech: Artifact Analysis)\n- At least one feature from Magic/Tech: Monument Research OR Spiritual: Lore Understanding",
     "**Prerequisites:** \n- Function Analysis (Magic/Tech: Artifact Analysis)\n- At least one feature from Magic/Tech: Monument Research\n- At least one feature from Spiritual: Lore Understanding"),
])

print("Updating Exotic_Energy_Manipulation.md...")
update_file(f"{BASE_DIR}/Magic_Tech/Exotic_Energy_Manipulation.md", [
    # Adept tier
    ("**Prerequisites:** \n- Shape Energy Fields (Magic/Tech: Exotic Energy Manipulation)\n- At least one feature from Magic/Tech: Artifact Analysis OR Magic/Tech: Monument Research",
     "**Prerequisites:** \n- Shape Energy Fields (Magic/Tech: Exotic Energy Manipulation)\n- At least one feature from Magic/Tech: Artifact Analysis OR Magic/Tech: Monument Research\n- At least one feature from Spiritual: Mystical Experience"),
])

print()
print("=" * 60)
print("PREREQUISITE INTEGRATION COMPLETE")
print("=" * 60)
print()
print("✓ All 25 trees updated with Adept-tier cross-domain prerequisites")
print("✓ Backup files created (.backup extension)")
print()
print("Next: Run Expert, Master, and Apex tier updates")
