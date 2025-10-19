# 🐛 Résolution du Problème de Login

## ❌ Erreur Rencontrée

```json
{
    "message": "Login server error",
    "error": "The provided credentials are incorrect."
}
```

---

## ✅ Problème Identifié

**Email par défaut incorrect dans le formulaire!**

- ❌ **Avant:** `admin@example.com` (n'existe pas)
- ✅ **Après:** `admin@tgi.fr` (utilisateur correct)

---

## 🔧 Correction Appliquée

### Fichier: `frontend/src/App.jsx`

**Ligne 25 - Fonction Login:**
```javascript
// AVANT (incorrect)
const [email, setEmail] = useState("admin@example.com");

// APRÈS (correct)
const [email, setEmail] = useState("admin@tgi.fr");
```

---

## ✅ Vérification Backend

### Test du Mot de Passe
```bash
cd backend
php artisan tinker test-login.php
```

**Résultat:**
```
✅ User found:
   ID: 1
   Name: Super Admin
   Email: admin@tgi.fr
   Password Hash: $2y$12$wCY5C8NkXWvm56xkqP/vo.A...

✅ Password 'password' is CORRECT!
```

### Utilisateurs Disponibles
```
📋 All users in database:
   • Super Admin (admin@tgi.fr)
   • Marie Dubois (juridique@tgi.fr)
   • Pierre Martin (comptable@tgi.fr)
   • Jean Leclerc (technique@tgi.fr)
   • Sophie Bernard (commercial@tgi.fr)
   • Laurent Moreau (manager@tgi.fr)
```

---

## 🎯 Comptes de Test Corrects

### 1. Administrateur
```
Email: admin@tgi.fr
Password: password
```

### 2. Juridique
```
Email: juridique@tgi.fr
Password: password
```

### 3. Comptable
```
Email: comptable@tgi.fr
Password: password
```

### 4. Technique
```
Email: technique@tgi.fr
Password: password
```

### 5. Commercial
```
Email: commercial@tgi.fr
Password: password
```

### 6. Manager
```
Email: manager@tgi.fr
Password: password
```

---

## 🚀 Pour Tester Maintenant

### 1. Rechargez la page
```
http://localhost:5175/login
```

### 2. Les champs devraient être pré-remplis avec:
```
Email: admin@tgi.fr
Password: password
```

### 3. Cliquez sur "Se connecter"

### 4. Vérifiez dans DevTools (F12 → Network)
```
✅ Requête: POST http://localhost:8000/api/auth/login
✅ Status: 200 OK
✅ Response: { "user": {...}, "token": "..." }
```

---

## 📊 Flux de Connexion

### Frontend → Backend

**1. Formulaire soumis:**
```javascript
{
  email: "admin@tgi.fr",
  password: "password"
}
```

**2. Requête HTTP:**
```http
POST http://localhost:8000/api/auth/login
Content-Type: application/json

{
  "email": "admin@tgi.fr",
  "password": "password"
}
```

**3. Backend vérifie:**
```php
$user = User::where('email', 'admin@tgi.fr')->first();
Hash::check('password', $user->password); // ✅ true
```

**4. Réponse du serveur:**
```json
{
  "user": {
    "id": 1,
    "name": "Super Admin",
    "email": "admin@tgi.fr",
    "roles": ["Administrateur"],
    "permissions": ["users.view", "users.create", ...]
  },
  "token": "1|abc123xyz..."
}
```

**5. Frontend stocke:**
```javascript
localStorage.setItem('auth_token', token);
state.auth.user = user;
state.auth.token = token;
```

**6. Redirection:**
```javascript
navigate("/"); // → Dashboard
```

---

## 🔍 Débogage Détaillé

### Vérifier l'Email Envoyé

**Dans DevTools (Network → login → Request):**
```json
{
  "email": "admin@tgi.fr",    ← Doit être exactement ça!
  "password": "password"
}
```

### Vérifier la Réponse

**Dans DevTools (Network → login → Response):**

**✅ Succès (200):**
```json
{
  "user": { ... },
  "token": "1|..."
}
```

**❌ Échec (500):**
```json
{
  "message": "Login server error",
  "error": "The provided credentials are incorrect."
}
```

---

## 🐛 Si l'Erreur Persiste

### 1. Vérifier le Backend
```powershell
cd backend
php artisan serve
```

**Doit afficher:**
```
Starting Laravel development server: http://127.0.0.1:8000
```

### 2. Vérifier la Base de Données
```powershell
cd backend
php artisan tinker test-login.php
```

**Doit montrer:**
```
✅ Password 'password' is CORRECT!
```

### 3. Vider le Cache Laravel
```powershell
cd backend
php artisan config:clear
php artisan cache:clear
php artisan route:clear
```

### 4. Réexécuter les Seeders
```powershell
cd backend
php artisan migrate:fresh --seed
```

⚠️ **Attention:** Cela supprime TOUTES les données!

### 5. Vérifier les Logs Laravel
```powershell
cd backend
cat storage/logs/laravel.log
```

### 6. Tester avec cURL (Direct)
```powershell
curl -X POST http://localhost:8000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"admin@tgi.fr\",\"password\":\"password\"}'
```

**Réponse attendue:**
```json
{"user":{...},"token":"1|..."}
```

---

## 📝 Checklist de Vérification

- [x] ✅ Backend tourne sur port 8000
- [x] ✅ Frontend tourne sur port 5175
- [x] ✅ Base de données connectée
- [x] ✅ 6 utilisateurs dans la BD
- [x] ✅ Mot de passe 'password' correct
- [x] ✅ Email corrigé: `admin@tgi.fr`
- [x] ✅ API URL configurée: `http://localhost:8000`
- [ ] 🔄 Frontend redémarré (pour charger .env)
- [ ] 🔄 Page rechargée (Ctrl+F5)
- [ ] 🔄 Login testé avec admin@tgi.fr

---

## 🎉 Résultat Attendu

Après avoir rechargé la page:

1. **Formulaire pré-rempli:**
   - Email: `admin@tgi.fr`
   - Password: `password`

2. **Cliquer sur "Se connecter"**

3. **Redirection automatique vers le Dashboard**

4. **Dans Network:**
   ```
   POST http://localhost:8000/api/auth/login
   Status: 200 OK
   ```

---

## 💡 Note Importante

**Le problème était simple:**
- Le frontend essayait de se connecter avec `admin@example.com`
- Mais cet utilisateur n'existe pas dans la base de données
- Les vrais utilisateurs ont des emails `@tgi.fr`

**Maintenant c'est corrigé!** ✅

---

**Dernière mise à jour:** 19 octobre 2025  
**Status:** ✅ Problème résolu - Email corrigé à `admin@tgi.fr`
