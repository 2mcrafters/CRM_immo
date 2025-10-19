# 🔧 Configuration API depuis .env

## ✅ Modifications Appliquées

### 1. Fichier `.env` Frontend
**Chemin:** `frontend/.env`

```properties
VITE_API_URL=http://localhost:8000
```

### 2. Fichier `api.js` Mis à Jour
**Chemin:** `frontend/src/lib/api.js`

**Avant:**
```javascript
const baseURL = ''  // Utilisait le proxy Vite
```

**Après:**
```javascript
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
```

---

## 🌐 Comportement dans Network

### Requête de Login

**URL dans Network (DevTools):**
```
http://localhost:8000/api/auth/login
```

**Détails:**
- ✅ **Method:** POST
- ✅ **Base URL:** http://localhost:8000 (depuis .env)
- ✅ **Endpoint:** /api/auth/login
- ✅ **Headers:** Content-Type: application/json
- ✅ **Body:** { email, password }

---

## 📊 Structure des Requêtes

### Login
```http
POST http://localhost:8000/api/auth/login
Content-Type: application/json

{
  "email": "admin@tgi.fr",
  "password": "password"
}
```

### Register
```http
POST http://localhost:8000/api/auth/register
Content-Type: application/json

{
  "name": "Nom Utilisateur",
  "email": "user@example.com",
  "password": "password",
  "password_confirmation": "password"
}
```

### Get User Info
```http
GET http://localhost:8000/api/auth/me
Authorization: Bearer {token}
```

### Logout
```http
POST http://localhost:8000/api/auth/logout
Authorization: Bearer {token}
```

---

## 🔍 Vérification dans DevTools

### 1. Ouvrir DevTools
- **Raccourci:** F12
- **Onglet:** Network

### 2. Tester Login
1. Aller sur: http://localhost:5175/login
2. Entrer les identifiants
3. Cliquer sur "Se connecter"
4. Observer dans Network:

```
✅ Requête visible:
   Name: login
   Status: 200
   Type: xhr
   URL: http://localhost:8000/api/auth/login
```

### 3. Vérifier les Détails

**Headers:**
```http
Request URL: http://localhost:8000/api/auth/login
Request Method: POST
Status Code: 200 OK
```

**Request Headers:**
```http
Accept: application/json, text/plain, */*
Content-Type: application/json
Origin: http://localhost:5175
Referer: http://localhost:5175/login
```

**Request Payload:**
```json
{
  "email": "admin@tgi.fr",
  "password": "password"
}
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "name": "Administrateur",
    "email": "admin@tgi.fr",
    "roles": ["Administrateur"],
    "permissions": ["users.view", "users.create", ...]
  },
  "token": "1|abc123xyz..."
}
```

---

## 📝 Configuration Complète

### Variables d'Environnement

**Backend `.env`:**
```properties
APP_URL=http://localhost
FRONTEND_ORIGINS=http://localhost:5175,http://localhost:5176
```

**Frontend `.env`:**
```properties
VITE_API_URL=http://localhost:8000
VITE_APP_NAME="CRM Immobilier"
VITE_FRONTEND_URL=http://localhost:5175
```

---

## 🔧 Comment ça Marche

### Flux de Requête

1. **Code Frontend:**
   ```javascript
   api.post('/api/auth/login', credentials)
   ```

2. **api.js traite:**
   ```javascript
   baseURL = 'http://localhost:8000'  // Depuis .env
   url = baseURL + '/api/auth/login'
   // = 'http://localhost:8000/api/auth/login'
   ```

3. **Requête HTTP:**
   ```http
   POST http://localhost:8000/api/auth/login
   ```

4. **Backend Laravel reçoit:**
   ```
   Route: POST /api/auth/login
   Controller: AuthController@login
   ```

5. **Réponse:**
   ```json
   { "user": {...}, "token": "..." }
   ```

---

## ✅ Avantages de cette Configuration

### 1. **Clarté**
- ✅ L'URL complète est visible dans Network
- ✅ Pas de confusion avec le proxy
- ✅ Debugging plus facile

### 2. **Flexibilité**
- ✅ Changement facile de l'URL backend (dans .env)
- ✅ Support multi-environnement (dev, staging, prod)
- ✅ Pas besoin de recompiler pour changer l'URL

### 3. **Production Ready**
- ✅ Facile à déployer avec différents backends
- ✅ Variables d'environnement standard
- ✅ Configuration externalisée

---

## 🚀 Pour Tester

### 1. Redémarrer le Frontend
```powershell
# Dans le terminal frontend
# Ctrl+C pour arrêter
npm run dev
```

### 2. Ouvrir DevTools
```
1. Aller sur: http://localhost:5175/login
2. Appuyer sur F12
3. Aller dans l'onglet "Network"
4. Cocher "Preserve log" (optionnel)
```

### 3. Se Connecter
```
Email: admin@tgi.fr
Password: password
```

### 4. Vérifier dans Network
```
✅ Vous devriez voir:
   URL: http://localhost:8000/api/auth/login
   Status: 200
   Type: xhr
```

---

## 🎯 Résultat Attendu

### Dans Network DevTools

```
Name        Status  Type    Size      Time
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
login       200     xhr     1.2 KB    45ms

📋 Details:
   URL: http://localhost:8000/api/auth/login
   Method: POST
   Status: 200 OK
   Remote Address: 127.0.0.1:8000
```

### Preview Tab
```json
{
  "user": {
    "id": 1,
    "name": "Administrateur",
    "email": "admin@tgi.fr",
    "roles": ["Administrateur"],
    "permissions": [...]
  },
  "token": "1|..."
}
```

---

## 🐛 Résolution de Problèmes

### Erreur: Network Error
**Cause:** Backend non démarré
**Solution:**
```powershell
cd backend
php artisan serve
```

### Erreur: CORS
**Cause:** `FRONTEND_ORIGINS` mal configuré
**Solution:** Vérifier `backend/.env`:
```properties
FRONTEND_ORIGINS=http://localhost:5175,http://localhost:5176
```

### Erreur: 404 Not Found
**Cause:** Route non définie
**Solution:** Vérifier `backend/routes/api.php`

### Erreur: 401 Unauthorized
**Cause:** Token invalide ou expiré
**Solution:** Se reconnecter

---

## 📱 Environnements

### Development
```properties
VITE_API_URL=http://localhost:8000
```

### Staging
```properties
VITE_API_URL=https://staging-api.crm-immobilier.com
```

### Production
```properties
VITE_API_URL=https://api.crm-immobilier.com
```

---

## 🎉 C'est Tout!

Maintenant quand vous ouvrez Network dans DevTools, vous verrez:

```
✅ http://localhost:8000/api/auth/login
✅ http://localhost:8000/api/auth/me
✅ http://localhost:8000/api/users
✅ Etc...
```

**L'URL complète est visible, pas de proxy!** 🚀

---

**Dernière mise à jour:** 19 octobre 2025  
**Status:** ✅ Configuration .env active
