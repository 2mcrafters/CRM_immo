# 🌐 URLs du Projet CRM Immobilier

## ✅ Configuration Actuelle

### Frontend (React + Vite)
- **URL principale:** http://localhost:5175
- **Port:** 5175
- **Fichier config:** `frontend/vite.config.js`

### Backend (Laravel + MySQL)
- **URL API:** http://localhost:8000
- **Port:** 8000
- **Fichier config:** `backend/.env`

---

## 🔗 Pages Disponibles

### 🔐 Authentification
- **Login:** http://localhost:5175/login
- **Register:** http://localhost:5175/register

### 📊 Tableau de Bord
- **Dashboard:** http://localhost:5175/dashboard

### 👥 Gestion des Utilisateurs
- **Liste des utilisateurs:** http://localhost:5175/users

### 🏠 Autres Pages
- **Accueil:** http://localhost:5175/
- **Page 404:** Automatique pour les routes inconnues

---

## 🔧 Configuration Proxy

### Vite Proxy (frontend/vite.config.js)
```javascript
server: {
  port: 5175,
  proxy: {
    "/api": {
      target: "http://localhost:8000",
      changeOrigin: true,
    },
  },
}
```

### Fonctionnement
- Les requêtes vers `/api/*` depuis le frontend sont automatiquement redirigées vers `http://localhost:8000/api/*`
- Exemple: `http://localhost:5175/api/login` → `http://localhost:8000/api/login`

---

## 🚀 Démarrage du Projet

### 1. Démarrer le Backend
```powershell
cd backend
php artisan serve
```
**Résultat:** Backend disponible sur http://localhost:8000

### 2. Démarrer le Frontend
```powershell
cd frontend
npm run dev
```
**Résultat:** Frontend disponible sur http://localhost:5175

---

## 🎯 URLs de Test

### API Endpoints (Backend Direct)
- **Login:** POST http://localhost:8000/api/login
- **Register:** POST http://localhost:8000/api/register
- **User Info:** GET http://localhost:8000/api/user (avec token)
- **Users List:** GET http://localhost:8000/api/users (avec token + permission)

### Frontend Routes
- **Login:** http://localhost:5175/login ✅
- **Register:** http://localhost:5175/register ✅
- **Dashboard:** http://localhost:5175/dashboard ✅
- **Users:** http://localhost:5175/users ✅

---

## 👤 Comptes de Test

### Administrateur
- **Email:** admin@tgi.fr
- **Password:** password
- **Rôle:** Administrateur
- **Permissions:** Toutes

### Juridique
- **Email:** juridique@tgi.fr
- **Password:** password
- **Rôle:** Juridique
- **Permissions:** Dossiers, contrats, documents

### Comptable
- **Email:** comptable@tgi.fr
- **Password:** password
- **Rôle:** Comptable
- **Permissions:** Finances, factures, paiements

### Technique
- **Email:** technique@tgi.fr
- **Password:** password
- **Rôle:** Technique
- **Permissions:** Biens, maintenance, diagnostics

### Commercial
- **Email:** commercial@tgi.fr
- **Password:** password
- **Rôle:** Commercial
- **Permissions:** Clients, prospects, visites

### Manager
- **Email:** manager@tgi.fr
- **Password:** password
- **Rôle:** Manager
- **Permissions:** Équipe, rapports, statistiques

---

## 🔍 Vérification des Services

### Backend
```powershell
# Test si le serveur répond
curl http://localhost:8000/api/health

# Ou dans un navigateur
http://localhost:8000
```

### Frontend
```powershell
# Dans un navigateur
http://localhost:5175
```

### Base de Données
```powershell
cd backend
php artisan migrate:status
```

---

## 🐛 Résolution de Problèmes

### Port 5175 déjà utilisé
```powershell
# Trouver le processus
netstat -ano | findstr :5175

# Tuer le processus (remplacer PID)
taskkill /PID <PID> /F

# Ou changer le port dans vite.config.js
```

### Port 8000 déjà utilisé
```powershell
# Trouver le processus
netstat -ano | findstr :8000

# Tuer le processus
taskkill /PID <PID> /F

# Ou utiliser un autre port
php artisan serve --port=8001
```

### Erreur CORS
- Vérifier que `backend/config/cors.php` autorise `http://localhost:5175`
- Vérifier que le proxy Vite est actif
- Redémarrer les deux serveurs

### Erreur 404 sur /api
- Vérifier que le backend tourne sur le port 8000
- Vérifier la configuration du proxy dans `vite.config.js`
- Vérifier les routes dans `backend/routes/api.php`

---

## 📝 Notes Importantes

### ✅ Configuration Correcte
- Frontend: **Port 5175** ✓
- Backend: **Port 8000** ✓
- Proxy: **/api → :8000** ✓
- CORS: **Activé** ✓

### 🎨 Card de Login
- Largeur responsive: 672px → 768px → **1024px**
- Padding adaptatif: 24px → 32px → 48px → **64px**
- Breakpoints: sm (640px), lg (1024px), xl (1280px)

### 🔐 Authentification
- Type: **Laravel Sanctum** (Token-based)
- Storage: **localStorage** (`auth_token`)
- Durée: Session (jusqu'à logout)

### 🎭 RBAC (Rôles & Permissions)
- Package: **Spatie Laravel Permission**
- Rôles: 6 (Admin, Juridique, Comptable, Technique, Commercial, Manager)
- Permissions: 60+ (CRUD sur 10+ entités)
- Middleware: `auth:sanctum` + `can:permission.name`

---

## 🎉 Quick Start

1. **Ouvrir 2 terminaux**

2. **Terminal 1 - Backend:**
   ```powershell
   cd "c:\Users\HP\Documents\works of crft\CRM Immobilier\backend"
   php artisan serve
   ```

3. **Terminal 2 - Frontend:**
   ```powershell
   cd "c:\Users\HP\Documents\works of crft\CRM Immobilier\frontend"
   npm run dev
   ```

4. **Ouvrir le navigateur:**
   ```
   http://localhost:5175/login
   ```

5. **Se connecter avec:**
   - Email: `admin@tgi.fr`
   - Password: `password`

**C'est parti! 🚀**

---

## 📱 Responsive Breakpoints

| Écran | Largeur | Card Login | Padding |
|-------|---------|------------|---------|
| Mobile | < 640px | 672px | 24px |
| Tablet | 640px - 1024px | 672px | 32px |
| Desktop | 1024px - 1280px | 768px | 48px |
| Large | ≥ 1280px | **1024px** | **64px** |

---

## 🔗 Liens Utiles

- **Frontend:** http://localhost:5175 ← **Utiliser cette URL!**
- **Backend API:** http://localhost:8000/api
- **Documentation:** `README.md`
- **Config RBAC:** `backend/database/seeders/RolesAndPermissionsSeeder.php`
- **Traductions:** `frontend/src/lib/i18n.js`

---

**Dernière mise à jour:** 19 octobre 2025  
**Status:** ✅ Projet opérationnel sur les ports **5175** (front) et **8000** (back)
