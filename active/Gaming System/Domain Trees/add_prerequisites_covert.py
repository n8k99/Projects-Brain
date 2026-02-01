#!/usr/bin/env python3
"""
Add missing cross-domain prerequisites to all 25 trees
Edits files in place on your Mac
"""

import re

def add_prerequisite_line(content, tier_name, tier_level, new_prereq_line):
    """Add a new prerequisite line to a specific tier section"""
    
    # Find the tier section
    tier_pattern = rf'(##\s+{re.escape(tier_name)}\s+\({re.escape(tier_level)}\s+Tier\).*?\*\*Prerequisites:\*\*\n)((?:- .*?\n)*)'
    
    match = re.search(tier_pattern, content, re.DOTALL)
    if match:
        tier_start = match.group(1)
        existing_prereqs = match.group(2)
        
        # Check if this prerequisite already exists
        if new_prereq_line not in existing_prereqs:
            # Add the new prerequisite
            updated_prereqs = existing_prereqs + new_prereq_line + '\n'
            updated_section = tier_start + updated_prereqs
            
            # Replace in content
            content = content.replace(match.group(0), updated_section)
            return content, True
        else:
            return content, False
    else:
        print(f"  ⚠ Could not find tier section: {tier_name} ({tier_level})")
        return content, False

def update_file(filepath, updates):
    """Update a file with list of (tier_name, tier_level, prerequisite_line) tuples"""
    try:
        with open(filepath, 'r') as f:
            content = f.read()
        
        original_content = content
        changes = 0
        
        for tier_name, tier_level, prereq_line in updates:
            content, changed = add_prerequisite_line(content, tier_name, tier_level, prereq_line)
            if changed:
                changes += 1
        
        if content != original_content:
            with open(filepath, 'w') as f:
                f.write(content)
            return changes
        else:
            return 0
            
    except Exception as e:
        print(f"  ✗ Error: {e}")
        return 0

BASE = "/Volumes/Elements/Orbis/Gaming System/Domain Trees"

print("Adding missing cross-domain prerequisites...\n")

# COVERT: Intelligence Networks
print("Intelligence Networks...")
changes = update_file(f"{BASE}/Covert/Intelligence_Networks.md", [
    ("Cross-Realm Strings", "Master", "- At least one Master-tier feature from Political: Diplomacy OR Spiritual: Belief Systems"),
    ("Master of Levers", "Apex", "- At least one Master-tier feature from Economic domain OR Spiritual domain"),
])
print(f"  {changes} prerequisites added\n")

# COVERT: Investigation Techniques  
print("Investigation Techniques...")
changes = update_file(f"{BASE}/Covert/Investigation_Techniques.md", [
    ("Conspiracy Theorist", "Expert", "- At least one feature from Political domain"),
    ("Conspiracy Theorist", "Expert", "- At least one feature from Economic domain"),
    ("Truth-Seeker", "Master", "- At least one Master-tier feature from Political domain"),
    ("Truth-Seeker", "Master", "- At least one Master-tier feature from Spiritual: Lore Understanding"),
    ("The Detective", "Apex", "- At least one Master-tier feature from Magic/Tech domain"),
])
print(f"  {changes} prerequisites added\n")

# COVERT: Infiltration
print("Infiltration...")
changes = update_file(f"{BASE}/Covert/Infiltration.md", [
    ("Organization Mole", "Adept", "- At least one feature from Covert: Intelligence Networks"),
    ("Organization Mole", "Adept", "- At least one feature from Political domain"),
    ("Institutional Infiltrator", "Expert", "- At least one feature from Economic domain"),
    ("The Faceless", "Master", "- At least one Master-tier feature from Political: Faction Navigation"),
    ("Perfect Infiltration", "Apex", "- At least one Expert-tier feature from any third domain"),
])
print(f"  {changes} prerequisites added\n")

# COVERT: Counter-Intelligence
print("Counter-Intelligence...")
changes = update_file(f"{BASE}/Covert/Counter_Intelligence.md", [
    ("Mole Hunter", "Adept", "- At least one feature from Political domain"),
    ("Counter-Espionage Master", "Expert", "- At least one feature from Covert: Investigation Techniques"),
    ("Spycatcher General", "Master", "- At least one Master-tier feature from Political: Authority & Legitimacy"),
    ("Paranoia Made Manifest", "Apex", "- At least one Master-tier feature from Spiritual: Belief Systems"),
])
print(f"  {changes} prerequisites added\n")

# COVERT: Information Warfare
print("Information Warfare...")
changes = update_file(f"{BASE}/Covert/Information_Warfare.md", [
    ("Propaganda Master", "Adept", "- At least one feature from Spiritual: Belief Systems OR Spiritual: Ritual Practice"),
    ("The Narrator", "Expert", "- At least one feature from Covert: Intelligence Networks"),
    ("The Ministry of Truth", "Master", "- At least one Master-tier feature from Spiritual: Belief Systems"),
    ("The Reality Engineer", "Apex", "- At least one Master-tier feature from Covert: Intelligence Networks"),
    ("The Reality Engineer", "Apex", "- At least one Expert-tier feature from Spiritual: Ritual Practice"),
])
print(f"  {changes} prerequisites added\n")

print("=" * 60)
print("COVERT DOMAIN COMPLETE")
print("=" * 60)
