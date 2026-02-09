@echo off
echo ========================================
echo Starting MIPL Chatbot System
echo ========================================
echo.

echo [1/3] Installing backend dependencies...
cd server
call npm install
echo.

echo [2/3] Starting backend server...
start "MIPL Chatbot Backend" cmd /k "npm start"
echo Backend started on http://localhost:3001
echo.

echo [3/3] Starting frontend...
cd ..
timeout /t 3 /nobreak > nul
start "MIPL Website" cmd /k "npm run dev"
echo.

echo ========================================
echo Chatbot system is starting!
echo Backend: http://localhost:3001
echo Frontend: http://localhost:5173
echo ========================================
echo.
echo Press any key to exit this window...
pause > nul
