# Guide de Test Rapide - Système de Rôles et Permissions

## 🚀 Démarrage Rapide

### 1. Lancer le Backend
```bash
cd backend
php -S localhost:8000 -t public
```

### 2. Lancer le Frontend (nouveau terminal)
```bash
cd frontend
npm run dev
```

### 3. Accéder à l'Application
Ouvrir: http://localhost:5175 (ou 5176)

---

## 👥 Comptes de Test

| Email | Mot de passe | Rôle | Peut Gérer Utilisateurs |
|-------|--------------|------|-------------------------|
| **admin@tgi.fr** | password | Administrateur | ✅ Oui |
| juridique@tgi.fr | password | Juridique | ❌ Non |
| comptable@tgi.fr | password | Comptable | ❌ Non |
| technique@tgi.fr | password | Technique | ❌ Non |
| commercial@tgi.fr | password | Commercial | ❌ Non |
| manager@tgi.fr | password | Manager | ❌ Non |

---

## 🧪 Tests à Effectuer

### Test 1: Connexion Admin
1. Se connecter avec `admin@tgi.fr` / `password`
2. ✅ Vérifier que le menu "Gestion des Utilisateurs" apparaît dans la sidebar
3. ✅ Cliquer sur "Gestion des Utilisateurs"
4. ✅ Vérifier que les 6 utilisateurs sont listés
5. ✅ Vérifier que les badges de rôles sont colorés correctement

### Test 2: Créer un Utilisateur (Admin seulement)
1. Connecté en tant qu'admin
2. ✅ Cliquer sur "Créer un utilisateur"
3. ✅ Remplir le formulaire:
   - Nom: Test User
   - Email: test@tgi.fr
   - Mot de passe: password123
   - Rôle: Commercial (par exemple)
4. ✅ Cliquer sur "Créer"
5. ✅ Vérifier que l'utilisateur apparaît dans la liste
6. ✅ Vérifier le toast de succès

### Test 3: Modifier un Utilisateur
1. Connecté en tant qu'admin
2. ✅ Cliquer sur "Modifier" pour un utilisateur
3. ✅ Changer le nom ou le rôle
4. ✅ Enregistrer
5. ✅ Vérifier que les modifications sont visibles

### Test 4: Supprimer un Utilisateur
1. Connecté en tant qu'admin
2. ✅ Cliquer sur "Supprimer" pour l'utilisateur test
3. ✅ Confirmer la suppression
4. ✅ Vérifier que l'utilisateur disparaît de la liste

### Test 5: Permissions - Utilisateur Non-Admin
1. Se déconnecter (menu utilisateur en haut à droite)
2. Se connecter avec `commercial@tgi.fr` / `password`
3. ✅ Vérifier que le menu "Gestion des Utilisateurs" est **masqué**
4. Essayer d'accéder manuellement à http://localhost:5175/users
5. ✅ La page devrait s'afficher mais sans boutons d'action (Create/Edit/Delete masqués)

### Test 6: Auto-suppression Interdite
1. Connecté en tant qu'admin
2. Essayer de se supprimer soi-même
3. ✅ Vérifier qu'un message d'erreur apparaît

### Test 7: Recherche d'Utilisateurs
1. Connecté en tant qu'admin
2. ✅ Taper dans la barre de recherche
3. ✅ Vérifier que la liste se filtre en temps réel

### Test 8: Persistance des Permissions
1. Se connecter avec n'importe quel compte
2. Naviguer dans différentes pages
3. Recharger la page (F5)
4. ✅ Vérifier que l'authentification persiste
5. ✅ Vérifier que les permissions sont toujours respectées

---

## 🎨 Tests Visuels

### Design Glass Morphism
- ✅ Cartes avec effet de verre (backdrop-blur)
- ✅ Bordures subtiles
- ✅ Ombres douces
- ✅ Dégradés de couleurs

### Animations Framer Motion
- ✅ Transitions fluides lors de l'ouverture des modals
- ✅ Animations spring sur les boutons
- ✅ Effet de shimmer sur le bouton principal
- ✅ Apparition progressive des lignes du tableau (stagger)
- ✅ Rotation du loader

### Badges de Rôles (Couleurs)
- ✅ Administrateur: Rouge
- ✅ Juridique: Bleu
- ✅ Comptable: Vert
- ✅ Technique: Orange
- ✅ Commercial: Violet
- ✅ Manager: Gris

---

## 🔍 Tests API (Optionnel - avec Postman)

### Obtenir le Token
```http
POST http://localhost:8000/api/auth/login
Content-Type: application/json

{
  "email": "admin@tgi.fr",
  "password": "password"
}
```

Copier le `token` de la réponse.

### Lister les Utilisateurs
```http
GET http://localhost:8000/api/users
Authorization: Bearer [VOTRE_TOKEN]
```

### Créer un Utilisateur
```http
POST http://localhost:8000/api/users
Authorization: Bearer [VOTRE_TOKEN]
Content-Type: application/json

{
  "name": "API Test User",
  "email": "apitest@tgi.fr",
  "password": "password123",
  "role": "commercial"
}
```

### Obtenir Mes Permissions
```http
GET http://localhost:8000/api/my-permissions
Authorization: Bearer [VOTRE_TOKEN]
```

### Lister les Rôles
```http
GET http://localhost:8000/api/roles
Authorization: Bearer [VOTRE_TOKEN]
```

---

## ❌ Tests d'Erreur

### Test 1: Accès Non Autorisé (Backend)
1. Se connecter avec `commercial@tgi.fr`
2. Obtenir le token
3. Essayer de créer un utilisateur via API
4. ✅ Devrait retourner erreur 403: "Vous n'avez pas les permissions nécessaires"

### Test 2: Validation des Champs
1. Connecté en tant qu'admin
2. Essayer de créer un utilisateur sans remplir tous les champs
3. ✅ Le formulaire devrait afficher les erreurs de validation

### Test 3: Email Déjà Utilisé
1. Connecté en tant qu'admin
2. Essayer de créer un utilisateur avec `admin@tgi.fr`
3. ✅ Devrait afficher une erreur "Email déjà utilisé"

---

## 📊 Résultats Attendus

| Test | Statut | Notes |
|------|--------|-------|
| Connexion Admin | ⬜ | Menu utilisateurs visible |
| Création Utilisateur | ⬜ | Toast succès + liste mise à jour |
| Modification Utilisateur | ⬜ | Changements visibles immédiatement |
| Suppression Utilisateur | ⬜ | Utilisateur retiré de la liste |
| Permissions Non-Admin | ⬜ | Menu masqué, boutons masqués |
| Auto-suppression | ⬜ | Message d'erreur affiché |
| Recherche | ⬜ | Filtrage instantané |
| Persistance | ⬜ | Permissions conservées après F5 |

---

## 🐛 Debugging

### Backend ne démarre pas
```bash
cd backend
php artisan config:clear
php artisan cache:clear
php artisan migrate:fresh --seed
```

### Frontend - Erreurs de permissions
1. Ouvrir DevTools (F12)
2. Console > Vérifier les erreurs réseau
3. Network > Vérifier la réponse de `/api/my-permissions`
4. Si 401: Re-connectez-vous

### Base de données vide
```bash
cd backend
php artisan migrate:fresh --seed
```

### Les permissions ne s'appliquent pas
1. Vérifier que le token est bien envoyé (DevTools > Network > Headers)
2. Vérifier `/api/my-permissions` retourne bien les permissions
3. Vider le localStorage et se reconnecter

---

## 📝 Checklist Complète

- [ ] Backend lancé sur port 8000
- [ ] Frontend lancé sur port 5175/5176
- [ ] Base de données migrée et seedée
- [ ] 6 utilisateurs de démo créés
- [ ] Connexion admin fonctionnelle
- [ ] Menu "Gestion des Utilisateurs" visible pour admin
- [ ] Création d'utilisateur fonctionne
- [ ] Modification d'utilisateur fonctionne
- [ ] Suppression d'utilisateur fonctionne
- [ ] Recherche d'utilisateurs fonctionne
- [ ] Badges de rôles affichés correctement
- [ ] Permissions respectées pour non-admin
- [ ] Menu masqué pour utilisateurs sans permission
- [ ] Boutons masqués selon permissions
- [ ] Auto-suppression bloquée
- [ ] Animations Framer Motion fluides
- [ ] Design glass morphism appliqué
- [ ] Traductions en français
- [ ] Toast de succès/erreur fonctionnels
- [ ] Modals d'édition fonctionnelles

---

**Temps estimé pour tous les tests:** 15-20 minutes

**En cas de problème:** Consulter `RBAC_DOCUMENTATION.md` pour plus de détails
