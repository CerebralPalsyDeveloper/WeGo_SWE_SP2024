#!/bin/bash

echo "Script running"

# Path to the supply_backend directory
DEMAND_BACKEND_DIR="/home/team22/repos/demand_backend"

# Check if the supply_backend directory exists
if [ ! -d "$DEMAND_BACKEND_DIR" ]; then
    echo "Error: demand_backend directory does not exist at $DEMAND_BACKEND_DIR"
    exit 1
fi


echo "Changing directory to demand_backend..."

# Change directory to supply_backend
cd "$DEMAND_BACKEND_DIR" || {
    echo "Error: Unable to change directory to $DEMAND_BACKEND_DIR"
    exit 1
}

#echo "Pulling changes from the remote repository..."
echo "Pulling changes from the remote repository..."
# Pull changes from the remote repository
if ! git pull origin main; then
    echo "Error: Failed to pull changes from the remote repository"
    exit 1
fi


echo "Script execution completed successfully"
