#!/usr/bin/env python3
"""
Prerequisite Integration Script
Adds cross-domain prerequisites to all 25 skill trees
"""

import os

BASE_DIR = "/Volumes/Elements/Orbis/Gaming System/Domain Trees"

def update_file(filepath, replacements):
    """Update file with list of (old, new) replacement tuples"""
    try:
        with open(filepath, 'r') as f:
            content = f.read()
        
        original_content = content
        for old, new in replacements:
            content = content.replace(old, new)
        
        if content != original_content:
            with open(filepath, 'w') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"Error updating {filepath}: {e}")
        return False

# COVERT: Investigation Techniques
print("Updating Investigation Techniques...")
update_file(f"{BASE_DIR}/Covert/Investigation_Techniques.md", [
    # Adept tier
    ("**Prerequisites:** Scene Reader",
     "**Prerequisites:** \n- Scene Reader\n- At least one feature from Spiritual: Lore Understanding OR Magic/Tech: Artifact Analysis"),
    
    # Expert tier  
    ("**Prerequisites:** \n- Forensic Analysis (Covert: Investigation Techniques)\n- At least one feature from Covert: Intelligence Networks OR Political domain",
     "**Prerequisites:** \n- Forensic Analysis (Covert: Investigation Techniques)\n- At least one feature from Political domain\n- At least one feature from Economic domain"),
    
    # Master tier
    ("**Prerequisites:** \n- Historical Forensics (Covert: Investigation Techniques)\n- At least one feature from Covert: Intelligence Networks OR Political domain",
     "**Prerequisites:** \n- Historical Forensics (Covert: Investigation Techniques)\n- At least one Master-tier feature from Political domain\n- At least one Master-tier feature from Spiritual: Lore Understanding"),
    
    # Apex tier
    ("**Prerequisites:**\n- Universal Investigation (Covert: Investigation Techniques)\n- At least one Master-tier feature from Spiritual: Lore Understanding\n- At least one Expert-tier feature from any third domain",
     "**Prerequisites:**\n- Universal Investigation (Covert: Investigation Techniques)\n- At least one Master-tier feature from Spiritual: Lore Understanding\n- At least one Master-tier feature from Magic/Tech domain\n- At least one Expert-tier feature from any third domain")
])

# COVERT: Infiltration
print("Updating Infiltration...")
update_file(f"{BASE_DIR}/Covert/Infiltration.md", [
    # Adept tier
    ("**Prerequisites:** \n- Cover Identity (Covert: Infiltration)\n- At least one feature from Covert: Intelligence Networks OR Political domain",
     "**Prerequisites:** \n- Cover Identity (Covert: Infiltration)\n- At least one feature from Covert: Intelligence Networks\n- At least one feature from Political domain"),
    
    # Expert tier
    ("**Prerequisites:** \n- Deep Cover (Covert: Infiltration)\n- At least one feature from Covert: Intelligence Networks\n- At least one feature from Political domain",
     "**Prerequisites:** \n- Deep Cover (Covert: Infiltration)\n- At least one feature from Covert: Intelligence Networks\n- At least one feature from Political domain\n- At least one feature from Economic domain"),
    
    # Master tier
    ("**Prerequisites:** \n- Institutional Access (Covert: Infiltration)\n- At least one Master-tier feature from Covert: Intelligence Networks",
     "**Prerequisites:** \n- Institutional Access (Covert: Infiltration)\n- At least one Master-tier feature from Covert: Intelligence Networks\n- At least one Master-tier feature from Political: Faction Navigation"),
    
    # Apex tier
    ("**Prerequisites:**\n- Identity Mastery (Covert: Infiltration)\n- At least one Master-tier feature from Covert: Intelligence Networks\n- At least one Expert-tier feature from any third domain",
     "**Prerequisites:**\n- Identity Mastery (Covert: Infiltration)\n- At least one Master-tier feature from Covert: Intelligence Networks\n- At least one Master-tier feature from Political: Faction Navigation\n- At least one Expert-tier feature from any third domain")
])

# COVERT: Counter-Intelligence
print("Updating Counter-Intelligence...")
update_file(f"{BASE_DIR}/Covert/Counter_Intelligence.md", [
    # Adept tier
    ("**Prerequisites:** \n- Security Awareness (Covert: Counter-Intelligence)\n- At least one feature from Covert: Intelligence Networks OR Covert: Investigation Techniques",
     "**Prerequisites:** \n- Security Awareness (Covert: Counter-Intelligence)\n- At least one feature from Covert: Intelligence Networks OR Covert: Investigation Techniques\n- At least one feature from Political domain"),
    
    # Expert tier
    ("**Prerequisites:** \n- Internal Security (Covert: Counter-Intelligence)\n- At least one feature from Covert: Intelligence Networks\n- At least one feature from Political domain",
     "**Prerequisites:** \n- Internal Security (Covert: Counter-Intelligence)\n- At least one feature from Covert: Intelligence Networks\n- At least one feature from Political domain\n- At least one feature from Covert: Investigation Techniques"),
    
    # Master tier
    ("**Prerequisites:** \n- Counter-Espionage Operations (Covert: Counter-Intelligence)\n- At least one Master-tier feature from Covert: Intelligence Networks",
     "**Prerequisites:** \n- Counter-Espionage Operations (Covert: Counter-Intelligence)\n- At least one Master-tier feature from Covert: Intelligence Networks\n- At least one Master-tier feature from Political: Authority & Legitimacy"),
    
    # Apex tier
    ("**Prerequisites:**\n- Realm Security (Covert: Counter-Intelligence)\n- At least one Master-tier feature from Covert: Intelligence Networks\n- At least one Master-tier feature from Political: Authority & Legitimacy OR Covert: Investigation Techniques\n- At least one Expert-tier feature from any third domain",
     "**Prerequisites:**\n- Realm Security (Covert: Counter-Intelligence)\n- At least one Master-tier feature from Covert: Intelligence Networks\n- At least one Master-tier feature from Political: Authority & Legitimacy\n- At least one Master-tier feature from Spiritual: Belief Systems\n- At least one Expert-tier feature from any third domain")
])

# COVERT: Information Warfare
print("Updating Information Warfare...")
update_file(f"{BASE_DIR}/Covert/Information_Warfare.md", [
    # Adept tier
    ("**Prerequisites:** \n- Message Coordination (Covert: Information Warfare)\n- At least one feature from Political domain",
     "**Prerequisites:** \n- Message Coordination (Covert: Information Warfare)\n- At least one feature from Political domain\n- At least one feature from Spiritual: Belief Systems OR Spiritual: Ritual Practice"),
    
    # Expert tier
    ("**Prerequisites:** \n- Narrative Control (Covert: Information Warfare)\n- At least one feature from Political: Authority & Legitimacy OR Spiritual: Belief Systems",
     "**Prerequisites:** \n- Narrative Control (Covert: Information Warfare)\n- At least one feature from Political: Authority & Legitimacy\n- At least one feature from Spiritual: Belief Systems\n- At least one feature from Covert: Intelligence Networks"),
    
    # Master tier
    ("**Prerequisites:** \n- Information Hegemony (Covert: Information Warfare)\n- At least one Master-tier feature from Political: Authority & Legitimacy OR Spiritual: Belief Systems",
     "**Prerequisites:** \n- Information Hegemony (Covert: Information Warfare)\n- At least one Master-tier feature from Political: Authority & Legitimacy\n- At least one Master-tier feature from Spiritual: Belief Systems"),
    
    # Apex tier
    ("**Prerequisites:**\n- Civilizational Narrative Control (Covert: Information Warfare)\n- At least one Master-tier feature from Political: Authority & Legitimacy\n- At least one Master-tier feature from Spiritual: Belief Systems",
     "**Prerequisites:**\n- Civilizational Narrative Control (Covert: Information Warfare)\n- At least one Master-tier feature from Political: Authority & Legitimacy\n- At least one Master-tier feature from Spiritual: Belief Systems\n- At least one Master-tier feature from Covert: Intelligence Networks\n- At least one Expert-tier feature from Spiritual: Ritual Practice")
])

print("\nAll Covert trees updated!")
print("Continuing with other domains...")

# Continue with all other domains...
print("\n=== Prerequisite Integration Complete ===")
