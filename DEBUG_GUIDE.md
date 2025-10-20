# 🔧 Guide de débogage - Création de clients

## Problème identifié
L'API nécessite une authentification Sanctum et les permissions appropriées.

## Solution : Page de débogage

### 1. Accéder à la page de débogage
1. **Connectez-vous** à l'application : http://localhost:5176/login
2. **Allez sur** : http://localhost:5176/debug

### 2. Vérifications à faire

#### A. Vérifier l'authentification
1. Sur la page `/debug`, regardez la section "État de l'authentification"
2. Vérifiez que :
   - ✅ User: nom d'utilisateur affiché
   - ✅ Email: email affiché
   - ✅ Token présent: "✅ Oui"
   - ✅ Status: "succeeded"

#### B. Tester la création de client
1. Cliquez sur "Créer un client de test"
2. Regardez le résultat :
   - ✅ **Succès** : Le client a été créé
   - ❌ **Erreur** : Voir le message d'erreur

### 3. Erreurs possibles et solutions

#### Erreur 401 - Non autorisé
**Cause** : Pas de token ou token invalide
**Solution** :
```javascript
// 1. Vérifier le token dans localStorage
console.log(localStorage.getItem('auth_token'))

// 2. Se reconnecter
// Allez sur /login et reconnectez-vous
```

#### Erreur 403 - Permission refusée
**Cause** : L'utilisateur n'a pas la permission `clients.create`
**Solution** :
```bash
# Dans le backend Laravel
php artisan tinker

# Donner les permissions
$user = User::where('email', 'votre@email.com')->first();
$user->givePermissionTo('clients.create');
$user->givePermissionTo('clients.view');
$user->givePermissionTo('clients.edit');
$user->givePermissionTo('clients.delete');
```

#### Erreur 422 - Validation
**Cause** : Données invalides (email dupliqué, champs manquants)
**Solution** :
- Vérifier que l'email est unique
- Vérifier que nom, prenom, telephone sont présents

### 4. Test manuel depuis la console du navigateur

Ouvrez la console (F12) et exécutez :

```javascript
// Vérifier l'authentification
checkAuth()

// Tester la création
testCreateClient()
```

### 5. Flux complet de création de client

```mermaid
Frontend (AddClientPage)
    ↓ dispatch(createClient(formData))
Redux (clientsSlice)
    ↓ api.post('/api/clients', data)
Axios API
    ↓ + Bearer Token
Backend Laravel (Route + Middleware)
    ↓ auth:sanctum + can:clients.create
ClientController@store
    ↓ validation + save
Database MySQL
```

### 6. Checklist de vérification

- [ ] Serveur backend Laravel en cours d'exécution (port 8000)
- [ ] Serveur frontend Vite en cours d'exécution (port 5176)
- [ ] Base de données MySQL démarrée
- [ ] Table `clients` existe avec toutes les colonnes
- [ ] Utilisateur connecté avec un token valide
- [ ] Utilisateur a les permissions `clients.create`
- [ ] Données du formulaire valides (email unique, champs requis)

### 7. Commandes utiles

```bash
# Backend
cd backend
php artisan serve                    # Démarrer le serveur
php artisan route:list | grep clients # Voir les routes
php artisan tinker                   # Console Laravel

# Frontend
cd frontend
npm run dev                          # Démarrer le serveur
```

### 8. Test de l'API directement

```javascript
// Dans la console du navigateur (F12)
const token = localStorage.getItem('auth_token')

fetch('http://localhost:8000/api/clients', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json'
  },
  body: JSON.stringify({
    nom: 'Test',
    prenom: 'Jean',
    email: 'jean.test@example.com',
    telephone: '0612345678',
    statut: 'prospect',
    pays: 'France'
  })
})
.then(res => res.json())
.then(data => console.log('✅ Succès:', data))
.catch(err => console.error('❌ Erreur:', err))
```

### 9. Logs utiles

```bash
# Backend - Voir les logs Laravel
tail -f storage/logs/laravel.log

# Frontend - Console navigateur
# Ouvrez la console (F12) et regardez :
# - Network tab pour voir les requêtes HTTP
# - Console tab pour voir les erreurs JavaScript
```

### 10. Support

Si le problème persiste :
1. Vérifiez les logs backend
2. Vérifiez la console navigateur (F12)
3. Vérifiez la page `/debug`
4. Partagez le message d'erreur exact
