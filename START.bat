@echo off
chcp 65001 >nul
echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║     🚀 CRM IMMOBILIER - DÉMARRAGE DU PROJET 🚀        ║
echo ╚════════════════════════════════════════════════════════╝
echo.
echo 📋 Configuration:
echo    • Frontend: http://localhost:5175
echo    • Backend:  http://localhost:8000
echo    • Database: MySQL (crm_immobilier)
echo.
echo ⏳ Démarrage des services...
echo.

:: Démarrer le backend dans un nouveau terminal
echo 🔧 Démarrage du Backend (Laravel)...
start "Backend - Laravel :8000" cmd /k "cd /d "%~dp0backend" && php artisan serve"
timeout /t 3 >nul

:: Démarrer le frontend dans un nouveau terminal
echo 🎨 Démarrage du Frontend (React + Vite)...
start "Frontend - React :5175" cmd /k "cd /d "%~dp0frontend" && npm run dev"
timeout /t 3 >nul

echo.
echo ✅ Services démarrés!
echo.
echo 🌐 Ouvrir dans le navigateur:
echo    👉 http://localhost:5175/login
echo.
echo 👤 Connexion test:
echo    Email:    admin@tgi.fr
echo    Password: password
echo.
echo 📊 Terminaux ouverts:
echo    • Backend:  Port 8000
echo    • Frontend: Port 5175
echo.
echo 💡 Pour arrêter les services, fermez les terminaux.
echo.
pause
