#!/bin/bash
echo "===================================================="
echo "Starting Alignex - AI Career Consulting CRM"
echo "===================================================="

if [ ! -d "node_modules" ]; then
    echo "[INFO] Installing required dependencies..."
    npm install
fi

echo "[INFO] Starting local development server on http://localhost:3000 ..."
npm run dev
