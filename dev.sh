#!/bin/bash

# 1. Start Auth (Supabase) in background if not running
echo "Checking Auth Stack..."
if [ -z "$(docker network ls | grep sentinel-auth_default)" ]; then
    echo "Starting Supabase (Auth)..."
    docker-compose -f docker-compose.auth.yml up -d
    echo "Waiting for network to be ready..."
    sleep 3
else
    echo "Auth Stack is already running."
fi

# 2. Start Apps (Frontend/Backend)
echo "Starting Apps..."
docker-compose up
