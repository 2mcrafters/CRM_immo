# 🚀 Script de Vérification et Démarrage - CRM TGI

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   CRM Immobilier TGI - Vérification Système" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

$errors = @()
$warnings = @()
$success = @()

# Fonction pour vérifier si un port est utilisé
function Test-Port {
    param([int]$Port)
    try {
        $connection = New-Object System.Net.Sockets.TcpClient("localhost", $Port)
        $connection.Close()
        return $true
    } catch {
        return $false
    }
}

# 1. Vérifier PHP
Write-Host "[1/8] Vérification de PHP..." -ForegroundColor Yellow
try {
    $phpVersion = php -v 2>&1 | Select-Object -First 1
    if ($phpVersion -match "PHP (\d+\.\d+)") {
        $version = $matches[1]
        if ([double]$version -ge 8.2) {
            Write-Host "  ✓ PHP $version installé" -ForegroundColor Green
            $success += "PHP version OK"
        } else {
            Write-Host "  ⚠ PHP $version (8.2+ recommandé)" -ForegroundColor Yellow
            $warnings += "PHP version < 8.2"
        }
    }
} catch {
    Write-Host "  ✗ PHP non trouvé dans PATH" -ForegroundColor Red
    $errors += "PHP manquant"
}

# 2. Vérifier Node.js
Write-Host "[2/8] Vérification de Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node -v
    Write-Host "  ✓ Node.js $nodeVersion installé" -ForegroundColor Green
    $success += "Node.js OK"
} catch {
    Write-Host "  ✗ Node.js non trouvé" -ForegroundColor Red
    $errors += "Node.js manquant"
}

# 3. Vérifier Composer
Write-Host "[3/8] Vérification de Composer..." -ForegroundColor Yellow
try {
    $composerVersion = composer --version 2>&1 | Select-Object -First 1
    Write-Host "  ✓ Composer installé" -ForegroundColor Green
    $success += "Composer OK"
} catch {
    Write-Host "  ⚠ Composer non trouvé (optionnel)" -ForegroundColor Yellow
    $warnings += "Composer manquant"
}

# 4. Vérifier dossier backend
Write-Host "[4/8] Vérification du backend..." -ForegroundColor Yellow
$backendPath = ".\backend"
if (Test-Path $backendPath) {
    Write-Host "  ✓ Dossier backend trouvé" -ForegroundColor Green
    
    # Vérifier .env
    if (Test-Path "$backendPath\.env") {
        Write-Host "  ✓ Fichier .env présent" -ForegroundColor Green
        $success += "Backend configuré"
    } else {
        Write-Host "  ⚠ Fichier .env manquant" -ForegroundColor Yellow
        $warnings += ".env manquant"
    }
} else {
    Write-Host "  ✗ Dossier backend non trouvé" -ForegroundColor Red
    $errors += "Backend manquant"
}

# 5. Vérifier dossier frontend
Write-Host "[5/8] Vérification du frontend..." -ForegroundColor Yellow
$frontendPath = ".\frontend"
if (Test-Path $frontendPath) {
    Write-Host "  ✓ Dossier frontend trouvé" -ForegroundColor Green
    
    # Vérifier node_modules
    if (Test-Path "$frontendPath\node_modules") {
        Write-Host "  ✓ Dépendances installées" -ForegroundColor Green
        $success += "Frontend configuré"
    } else {
        Write-Host "  ⚠ node_modules manquant - Lancer: cd frontend && npm install" -ForegroundColor Yellow
        $warnings += "node_modules manquant"
    }
} else {
    Write-Host "  ✗ Dossier frontend non trouvé" -ForegroundColor Red
    $errors += "Frontend manquant"
}

# 6. Vérifier si le backend est en cours d'exécution
Write-Host "[6/8] Vérification du serveur backend..." -ForegroundColor Yellow
if (Test-Port -Port 8000) {
    Write-Host "  ✓ Backend en cours d'exécution sur port 8000" -ForegroundColor Green
    $success += "Backend actif"
} else {
    Write-Host "  ✗ Backend non démarré sur port 8000" -ForegroundColor Red
    Write-Host "    Lancer: cd backend && php -S localhost:8000 -t public" -ForegroundColor Gray
    $errors += "Backend non démarré"
}

# 7. Vérifier si le frontend est en cours d'exécution
Write-Host "[7/8] Vérification du serveur frontend..." -ForegroundColor Yellow
$frontendRunning = $false
if (Test-Port -Port 5175) {
    Write-Host "  ✓ Frontend en cours d'exécution sur port 5175" -ForegroundColor Green
    $frontendRunning = $true
    $success += "Frontend actif (5175)"
} elseif (Test-Port -Port 5176) {
    Write-Host "  ✓ Frontend en cours d'exécution sur port 5176" -ForegroundColor Green
    $frontendRunning = $true
    $success += "Frontend actif (5176)"
} else {
    Write-Host "  ✗ Frontend non démarré" -ForegroundColor Red
    Write-Host "    Lancer: cd frontend && npm run dev" -ForegroundColor Gray
    $errors += "Frontend non démarré"
}

# 8. Test de connexion API
Write-Host "[8/8] Test de connexion API..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8000/api/ping" -UseBasicParsing -TimeoutSec 3
    $data = $response.Content | ConvertFrom-Json
    Write-Host "  ✓ API répond correctement" -ForegroundColor Green
    Write-Host "    PHP: $($data.php)" -ForegroundColor Gray
    $success += "API accessible"
} catch {
    Write-Host "  ✗ API ne répond pas" -ForegroundColor Red
    $errors += "API inaccessible"
}

# Résumé
Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "                  RÉSUMÉ" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

Write-Host ""
Write-Host "✓ Succès: $($success.Count)" -ForegroundColor Green
foreach ($s in $success) {
    Write-Host "  • $s" -ForegroundColor Green
}

if ($warnings.Count -gt 0) {
    Write-Host ""
    Write-Host "⚠ Avertissements: $($warnings.Count)" -ForegroundColor Yellow
    foreach ($w in $warnings) {
        Write-Host "  • $w" -ForegroundColor Yellow
    }
}

if ($errors.Count -gt 0) {
    Write-Host ""
    Write-Host "✗ Erreurs: $($errors.Count)" -ForegroundColor Red
    foreach ($e in $errors) {
        Write-Host "  • $e" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "              PROCHAINES ÉTAPES" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

if ($errors.Count -eq 0 -and $frontendRunning) {
    Write-Host "🎉 Tout est prêt!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Accéder à l'application:" -ForegroundColor Cyan
    if (Test-Port -Port 5175) {
        Write-Host "  → http://localhost:5175" -ForegroundColor White
    } else {
        Write-Host "  → http://localhost:5176" -ForegroundColor White
    }
    Write-Host ""
    Write-Host "Page de test de connexion:" -ForegroundColor Cyan
    if (Test-Port -Port 5175) {
        Write-Host "  → http://localhost:5175/test-connection.html" -ForegroundColor White
    } else {
        Write-Host "  → http://localhost:5176/test-connection.html" -ForegroundColor White
    }
    Write-Host ""
    Write-Host "Comptes de test:" -ForegroundColor Cyan
    Write-Host "  Admin:      admin@tgi.fr / password" -ForegroundColor White
    Write-Host "  Juridique:  juridique@tgi.fr / password" -ForegroundColor White
    Write-Host "  Comptable:  comptable@tgi.fr / password" -ForegroundColor White
    Write-Host "  Technique:  technique@tgi.fr / password" -ForegroundColor White
    Write-Host "  Commercial: commercial@tgi.fr / password" -ForegroundColor White
    Write-Host "  Manager:    manager@tgi.fr / password" -ForegroundColor White
} else {
    if (-not (Test-Port -Port 8000)) {
        Write-Host "1. Démarrer le backend:" -ForegroundColor Yellow
        Write-Host "   cd backend" -ForegroundColor Gray
        Write-Host "   php -S localhost:8000 -t public" -ForegroundColor Gray
        Write-Host ""
    }
    
    if (-not $frontendRunning) {
        Write-Host "2. Démarrer le frontend:" -ForegroundColor Yellow
        Write-Host "   cd frontend" -ForegroundColor Gray
        Write-Host "   npm run dev" -ForegroundColor Gray
        Write-Host ""
    }
}

Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
