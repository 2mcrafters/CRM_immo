@echo off
chcp 65001 >nul
echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║         🔄 REDÉMARRAGE DU FRONTEND 🔄                 ║
echo ╚════════════════════════════════════════════════════════╝
echo.
echo 📋 Raison: Nouveau .env chargé
echo    • VITE_API_URL=http://localhost:8000
echo.
echo ⏳ Redémarrage du serveur Vite...
echo.

cd /d "%~dp0frontend"
npm run dev

pause
