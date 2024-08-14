#!/bin/bash

echo "Script running"

# Path to the supply_backend directory
SUPPLY_BACKEND_DIR="/home/team22/repos/supply_backend"

# Check if the supply_backend directory exists
if [ ! -d "$SUPPLY_BACKEND_DIR" ]; then
    echo "Error: supply_backend directory does not exist at $SUPPLY_BACKEND_DIR"
    exit 1
fi

echo "Changing directory to supply_backend..."
# Change directory to supply_backend
cd "$SUPPLY_BACKEND_DIR" || {
    echo "Error: Unable to change directory to $SUPPLY_BACKEND_DIR"
    exit 1
}

echo "Pulling changes from the remote repository..."
# Pull changes from the remote repository
if ! git pull origin main; then
    echo "Error: Failed to pull changes from the remote repository"
    exit 1
fi


echo "Script execution completed successfully"