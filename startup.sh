#!/bin/bash

if [ -x "$(command -v docker)" ]; then
    docker compose up --build
else
    echo "Docker is missing."
    if [ -x "$(command -v node)" ]; then
        cd backend
        npm install
        node app.js &
        cd ../frontend
        npm install
        npm run dev && fg
    else
        echo "Node is missing."
        echo "You'll need either docker or node."
    fi
fi