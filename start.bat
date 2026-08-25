@echo off
echo ====================================================
echo Starting Alignex - AI Career Consulting CRM
echo ====================================================

if not exist node_modules (
    echo [INFO] Installing required dependencies...
    call npm install
)

echo [INFO] Starting local development server on http://localhost:3000 ...
call npm run dev
pause
