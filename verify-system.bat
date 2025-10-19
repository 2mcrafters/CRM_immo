@echo off
echo ================================================
echo    CRM Immobilier TGI - Verification Systeme
echo ================================================
echo.

echo [1/6] Verification de PHP...
php -v >nul 2>&1
if %errorlevel% == 0 (
    echo   OK - PHP installe
) else (
    echo   ERREUR - PHP manquant
)

echo [2/6] Verification de Node.js...
node -v >nul 2>&1
if %errorlevel% == 0 (
    echo   OK - Node.js installe
) else (
    echo   ERREUR - Node.js manquant
)

echo [3/6] Verification du backend...
if exist "backend\" (
    echo   OK - Dossier backend trouve
) else (
    echo   ERREUR - Dossier backend manquant
)

echo [4/6] Verification du frontend...
if exist "frontend\" (
    echo   OK - Dossier frontend trouve
) else (
    echo   ERREUR - Dossier frontend manquant
)

echo [5/6] Test connexion backend (port 8000)...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:8000/api/ping' -UseBasicParsing -TimeoutSec 2; Write-Host '  OK - Backend repond'; exit 0 } catch { Write-Host '  ERREUR - Backend ne repond pas'; exit 1 }" 2>nul
if %errorlevel% == 0 (
    echo   Backend accessible sur http://localhost:8000
) else (
    echo   Demarrer avec: cd backend ^&^& php -S localhost:8000 -t public
)

echo [6/6] Test connexion frontend...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:5176' -UseBasicParsing -TimeoutSec 2; Write-Host '  OK - Frontend repond'; exit 0 } catch { try { $response = Invoke-WebRequest -Uri 'http://localhost:5175' -UseBasicParsing -TimeoutSec 2; Write-Host '  OK - Frontend repond'; exit 0 } catch { Write-Host '  ERREUR - Frontend ne repond pas'; exit 1 } }" 2>nul
if %errorlevel% == 0 (
    echo   Frontend accessible
) else (
    echo   Demarrer avec: cd frontend ^&^& npm run dev
)

echo.
echo ================================================
echo                   ACCES
echo ================================================
echo.
echo Application:     http://localhost:5176 (ou 5175)
echo Test connexion:  http://localhost:5176/test-connection.html
echo.
echo Comptes de test:
echo   Admin:      admin@tgi.fr / password
echo   Juridique:  juridique@tgi.fr / password
echo   Comptable:  comptable@tgi.fr / password
echo   Technique:  technique@tgi.fr / password
echo   Commercial: commercial@tgi.fr / password
echo   Manager:    manager@tgi.fr / password
echo.
echo ================================================
pause
