#!/bin/bash
cd identity-server

echo "Pulling commits from remote..."
git fetch origin
git reset --hard origin/master

echo "Installing dependencies..."
npm ci

echo "Building..."
npm run build

echo "Starting the app..."
npm start
