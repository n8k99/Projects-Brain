#!/bin/bash

# HELP WANTED - T.A.S.K.S. Integration Training Game Launcher
# Launch script for the Ren'Py interactive narrative

echo "🎮 Launching HELP WANTED - T.A.S.K.S. Integration Training"
echo "📍 Project Location: $(pwd)"
echo "🔧 Using Ren'Py SDK at: /Volumes/Elements/Nebulab/scripts/renpy-8.4.1-sdk/"

# Check if Ren'Py SDK exists
if [ ! -d "/Volumes/Elements/Nebulab/scripts/renpy-8.4.1-sdk/" ]; then
    echo "❌ Error: Ren'Py SDK not found at expected location"
    echo "   Please ensure the SDK is installed at: /Volumes/Elements/Nebulab/scripts/renpy-8.4.1-sdk/"
    exit 1
fi

# Check if game directory exists
if [ ! -d "game" ]; then
    echo "❌ Error: Game directory not found. Make sure you're running this from the HELP_WANTED_Game directory."
    exit 1
fi

echo "🚀 Starting Ren'Py..."

# Launch the game with Ren'Py
cd /Volumes/Elements/Nebulab/scripts/renpy-8.4.1-sdk/
./renpy.sh /Volumes/Elements/Nebulab/HELP_WANTED_Game/ "$@"
