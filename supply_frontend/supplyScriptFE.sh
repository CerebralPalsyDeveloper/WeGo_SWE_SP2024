#!/bin/bash

echo "Script running"

# Path to the supply_frontend directory
SUPPLY_FRONTEND_DIR="/home/team22/repos/supply_frontend"

# Check if the supply_frontend directory exists
if [ ! -d "$SUPPLY_FRONTEND_DIR" ]; then
    echo "Error: supply_frontend directory does not exist at $SUPPLY_FRONTEND_DIR"
    exit 1
fi

echo "Changing directory to supply_frontend..."
# Change directory to supply_frontend
cd "$SUPPLY_FRONTEND_DIR" || {
    echo "Error: Unable to change directory to $SUPPLY_FRONTEND_DIR"
    exit 1
}

echo "Pulling changes from the remote repository..."
# Pull changes from the remote repository
if ! git pull origin main; then
    echo "Error: Failed to pull changes from the remote repository"
    exit 1
fi

# Installing dependencies
npm install

# Running build
npm run build


echo "Script execution completed successfully"