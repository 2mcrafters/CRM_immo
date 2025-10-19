# Système de Gestion des Rôles et Permissions - TGI CRM

## Vue d'ensemble

Ce document décrit le système complet de gestion des rôles et permissions (RBAC) implémenté pour le CRM Immobilier TGI.

## Rôles Disponibles

### 1. **Administrateur** (administrateur)
- **Accès complet** à toutes les fonctionnalités du système
- Gestion des utilisateurs et attribution des rôles
- Configuration système
- Toutes les permissions disponibles

### 2. **Service Juridique** (juridique)
**Responsabilités:** Gestion des contrats, locations et documents juridiques

**Permissions:**
- Dashboard: lecture
- Clients & Propriétaires: lecture, création
- Propriétés: lecture
- Locations: toutes les opérations (CRUD + validation)
- Contrats: toutes les opérations
- Documents/GED: toutes les opérations
- Factures: lecture
- Maintenance: lecture

### 3. **Service Comptable** (comptable)
**Responsabilités:** Gestion financière, facturation, trésorerie

**Permissions:**
- Dashboard: lecture
- Factures: toutes les opérations (CRUD + validation/envoi)
- Encaissements: toutes les opérations
- Trésorerie: toutes les opérations
- Liquidations: toutes les opérations
- Locations: lecture
- Clients & Propriétaires: lecture
- Documents: lecture, création, modification

### 4. **Service Technique** (technique)
**Responsabilités:** Maintenance, interventions techniques

**Permissions:**
- Dashboard: lecture
- Propriétés: lecture
- Maintenance: toutes les opérations (CRUD + planification/clôture)
- Interventions: toutes les opérations
- Documents: lecture, création
- Clients: lecture

### 5. **Service Commercial** (commercial)
**Responsabilités:** Prospection, CRM, opportunités commerciales

**Permissions:**
- Dashboard: lecture
- CRM: toutes les opérations
- Opportunités: toutes les opérations (CRUD + conversion)
- Clients: toutes les opérations
- Propriétaires: création
- Propriétés: lecture, création
- Locations: lecture
- Documents: lecture

### 6. **Manager** (manager)
**Responsabilités:** Supervision et reporting

**Permissions:**
- Dashboard: lecture
- Rapports: toutes les opérations (génération/export/planification)
- Analytiques: toutes les opérations
- Lecture seule sur tous les modules (clients, propriétés, locations, etc.)
- Aucune permission de modification

## Structure Technique

### Backend (Laravel)

#### 1. Seeder de Rôles et Permissions
**Fichier:** `backend/database/seeders/RolesAndPermissionsSeeder.php`

Crée automatiquement:
- 6 rôles avec leurs noms et descriptions
- Plus de 60 permissions organisées par module
- Attribution des permissions à chaque rôle selon leurs responsabilités

#### 2. Middleware de Sécurité

**CheckPermission.php**
- Vérifie si l'utilisateur possède une permission spécifique
- Retourne erreur 403 si non autorisé
- Message d'erreur en français

**CheckRole.php**
- Vérifie si l'utilisateur possède un rôle spécifique
- Retourne erreur 403 avec détails du rôle requis
- Utile pour les sections réservées à certains rôles

#### 3. Controller de Gestion des Utilisateurs
**Fichier:** `backend/app/Http/Controllers/UserManagementController.php`

**Endpoints:**
- `GET /api/users` - Liste tous les utilisateurs (permission: users.view)
- `POST /api/users` - Créer un utilisateur (permission: users.create)
- `GET /api/users/{id}` - Détails d'un utilisateur (permission: users.view)
- `PUT /api/users/{id}` - Modifier un utilisateur (permission: users.edit)
- `DELETE /api/users/{id}` - Supprimer un utilisateur (permission: users.delete)
- `GET /api/roles` - Liste des rôles disponibles
- `GET /api/permissions` - Liste des permissions groupées par module (permission: users.view)
- `GET /api/my-permissions` - Permissions de l'utilisateur connecté

#### 4. Routes API
**Fichier:** `backend/routes/api.php`

Toutes les routes utilisateurs sont protégées par:
1. Middleware `auth:sanctum` (authentification requise)
2. Middleware `can:permission.name` (permission spécifique requise)

#### 5. Utilisateurs de Démonstration

Créés automatiquement lors du seed:

| Email | Mot de passe | Rôle |
|-------|--------------|------|
| admin@tgi.fr | password | Administrateur |
| juridique@tgi.fr | password | Juridique |
| comptable@tgi.fr | password | Comptable |
| technique@tgi.fr | password | Technique |
| commercial@tgi.fr | password | Commercial |
| manager@tgi.fr | password | Manager |

### Frontend (React)

#### 1. Hook de Permissions
**Fichier:** `frontend/src/hooks/usePermissions.js`

**Fonctions exportées:**
- `usePermissions()` - Hook pour accéder aux permissions
  - `permissions` - Liste des permissions de l'utilisateur
  - `loading` - État de chargement
  - `can(permission)` - Vérifie une permission
  - `canAll([permissions])` - Vérifie toutes les permissions
  - `canAny([permissions])` - Vérifie au moins une permission

- `useRole()` - Hook pour accéder au rôle
  - `role` - Rôle de l'utilisateur
  - `is(roleName)` - Vérifie si l'utilisateur a un rôle spécifique

#### 2. Composants de Contrôle d'Accès
**Fichier:** `frontend/src/components/permissions/Can.jsx`

**`<Can>` Component:**
```jsx
// Vérifier une seule permission
<Can permission="users.create">
  <Button>Créer un utilisateur</Button>
</Can>

// Vérifier plusieurs permissions (toutes requises)
<Can permissions={['users.view', 'users.edit']} requireAll>
  <Button>Modifier</Button>
</Can>

// Vérifier plusieurs permissions (au moins une requise)
<Can permissions={['users.view', 'users.edit']}>
  <Button>Voir ou Modifier</Button>
</Can>

// Avec fallback
<Can permission="users.delete" fallback={<span>Accès refusé</span>}>
  <Button>Supprimer</Button>
</Can>
```

**`<HasRole>` Component:**
```jsx
<HasRole role="administrateur">
  <AdminPanel />
</HasRole>
```

#### 3. Page de Gestion des Utilisateurs
**Fichier:** `frontend/src/components/users/UsersManagement.jsx`

**Fonctionnalités:**
- Liste paginée et recherche d'utilisateurs
- Affichage des rôles avec badges colorés
- Création d'utilisateurs (modal)
- Modification d'utilisateurs (modal)
- Suppression avec confirmation
- Protection par permissions (`users.view`, `users.create`, `users.edit`, `users.delete`)
- Interface en français avec animations Framer Motion
- Design glass morphism cohérent

#### 4. Navigation Conditionnelle
**Fichier:** `frontend/src/components/layout/Sidebar.jsx`

Le menu "Gestion des Utilisateurs" est automatiquement masqué si l'utilisateur n'a pas la permission `users.view`.

```jsx
{
  to: '/users',
  icon: <UsersIcon />,
  label: t('users.title'),
  permission: 'users.view', // Menu masqué si pas cette permission
}
```

#### 5. Route Protégée
**Fichier:** `frontend/src/App.jsx`

```jsx
<Route path="/users" element={<ProtectedRoute><UsersRoute /></ProtectedRoute>} />
```

#### 6. Traductions
**Fichier:** `frontend/src/lib/i18n.js`

Toutes les traductions pour le module utilisateurs ont été ajoutées:
- `users.title` - "Gestion des Utilisateurs"
- `users.create` - "Créer un utilisateur"
- `users.role` - "Rôle"
- etc.

## Modules de Permissions

### 1. Dashboard
- `dashboard.view` - Voir le tableau de bord

### 2. Utilisateurs
- `users.view` - Voir les utilisateurs
- `users.create` - Créer des utilisateurs
- `users.edit` - Modifier des utilisateurs
- `users.delete` - Supprimer des utilisateurs

### 3. Clients
- `clients.view` - Voir les clients
- `clients.create` - Créer des clients
- `clients.edit` - Modifier des clients
- `clients.delete` - Supprimer des clients

### 4. Propriétaires
- `owners.view` - Voir les propriétaires
- `owners.create` - Créer des propriétaires
- `owners.edit` - Modifier des propriétaires
- `owners.delete` - Supprimer des propriétaires

### 5. Propriétés
- `properties.view` - Voir les propriétés
- `properties.create` - Créer des propriétés
- `properties.edit` - Modifier des propriétés
- `properties.delete` - Supprimer des propriétés

### 6. Locations
- `rentals.view` - Voir les locations
- `rentals.create` - Créer des locations
- `rentals.edit` - Modifier des locations
- `rentals.delete` - Supprimer des locations
- `rentals.validate` - Valider des locations

### 7. Contrats
- `contracts.view` - Voir les contrats
- `contracts.create` - Créer des contrats
- `contracts.edit` - Modifier des contrats
- `contracts.delete` - Supprimer des contrats
- `contracts.sign` - Signer des contrats

### 8. Documents/GED
- `documents.view` - Voir les documents
- `documents.create` - Créer des documents
- `documents.edit` - Modifier des documents
- `documents.delete` - Supprimer des documents
- `documents.download` - Télécharger des documents

### 9. Factures
- `invoices.view` - Voir les factures
- `invoices.create` - Créer des factures
- `invoices.edit` - Modifier des factures
- `invoices.delete` - Supprimer des factures
- `invoices.validate` - Valider des factures
- `invoices.send` - Envoyer des factures

### 10. Encaissements
- `payments.view` - Voir les encaissements
- `payments.create` - Créer des encaissements
- `payments.edit` - Modifier des encaissements
- `payments.delete` - Supprimer des encaissements

### 11. Trésorerie
- `treasury.view` - Voir la trésorerie
- `treasury.edit` - Modifier la trésorerie

### 12. Liquidations
- `liquidations.view` - Voir les liquidations
- `liquidations.create` - Créer des liquidations
- `liquidations.edit` - Modifier des liquidations
- `liquidations.validate` - Valider des liquidations

### 13. Maintenance
- `maintenance.view` - Voir les maintenances
- `maintenance.create` - Créer des maintenances
- `maintenance.edit` - Modifier des maintenances
- `maintenance.delete` - Supprimer des maintenances
- `maintenance.schedule` - Planifier des maintenances
- `maintenance.close` - Clôturer des maintenances

### 14. CRM
- `crm.view` - Voir le CRM
- `crm.create` - Créer des entrées CRM
- `crm.edit` - Modifier des entrées CRM
- `crm.delete` - Supprimer des entrées CRM

### 15. Opportunités
- `opportunities.view` - Voir les opportunités
- `opportunities.create` - Créer des opportunités
- `opportunities.edit` - Modifier des opportunités
- `opportunities.delete` - Supprimer des opportunités
- `opportunities.convert` - Convertir des opportunités

### 16. Rapports
- `reports.view` - Voir les rapports
- `reports.generate` - Générer des rapports
- `reports.export` - Exporter des rapports
- `reports.schedule` - Planifier des rapports

### 17. Analytiques
- `analytics.view` - Voir les analytiques
- `analytics.export` - Exporter les analytiques

## Utilisation

### Configuration Initiale

1. **Exécuter les migrations et seeders:**
```bash
cd backend
php artisan migrate:fresh --seed
```

2. **Se connecter avec un utilisateur de démo:**
- Admin: admin@tgi.fr / password
- Juridique: juridique@tgi.fr / password
- etc.

### Ajouter une Nouvelle Permission

1. **Backend** - Dans `RolesAndPermissionsSeeder.php`:
```php
$permissions[] = Permission::create(['name' => 'module.action']);
```

2. **Assigner à un rôle:**
```php
$role = Role::findByName('juridique');
$role->givePermissionTo('module.action');
```

3. **Protéger une route API:**
```php
Route::get('/api/module/action', [Controller::class, 'method'])
    ->middleware(['auth:sanctum', 'can:module.action']);
```

4. **Frontend** - Utiliser dans le composant:
```jsx
<Can permission="module.action">
  <Button>Action</Button>
</Can>
```

### Vérifier les Permissions dans le Code

**Backend (Controller):**
```php
if ($user->can('permission.name')) {
    // Action autorisée
}

if ($user->hasRole('administrateur')) {
    // Utilisateur est admin
}
```

**Frontend (Component):**
```jsx
const { can, canAll, canAny } = usePermissions();

if (can('users.create')) {
  // Afficher le bouton créer
}

if (canAll(['users.view', 'users.edit'])) {
  // Toutes les permissions requises
}

if (canAny(['users.view', 'users.edit'])) {
  // Au moins une permission requise
}
```

## Sécurité

### Backend
1. **Authentification Sanctum** - Toutes les routes protégées nécessitent un token valide
2. **Middleware de permissions** - Vérification automatique des permissions
3. **Protection contre la suppression** - Un utilisateur ne peut pas se supprimer lui-même
4. **Validation des données** - Toutes les entrées sont validées

### Frontend
1. **Masquage conditionnel** - Les éléments inaccessibles sont masqués
2. **Vérification des permissions** - Avant chaque action sensible
3. **Messages d'erreur** - En français, explicites
4. **Redirection automatique** - Si non authentifié

## Évolutions Futures

### Suggestions d'Améliorations

1. **Permissions Personnalisées**
   - Permettre aux admins de créer des permissions custom
   - Interface de création de rôles personnalisés

2. **Audit Trail**
   - Journalisation de toutes les actions sensibles
   - Historique des modifications de permissions

3. **Permissions Granulaires**
   - Permissions par propriété (ex: voir uniquement ses propres clients)
   - Permissions basées sur des critères (ex: montant de facture)

4. **Approbations Multi-niveaux**
   - Workflow d'approbation pour certaines actions
   - Notifications aux superviseurs

5. **Gestion des Équipes**
   - Regrouper les utilisateurs par équipes
   - Permissions au niveau de l'équipe

6. **Permissions Temporaires**
   - Attribution temporaire de permissions
   - Expiration automatique

7. **Dashboard de Permissions**
   - Vue d'ensemble des permissions par utilisateur
   - Matrice rôles/permissions

## Support

Pour toute question ou problème:
1. Vérifier les logs Laravel: `storage/logs/laravel.log`
2. Vérifier la console navigateur pour les erreurs frontend
3. Tester avec l'utilisateur admin@tgi.fr pour debug

## Résumé des Fichiers Créés/Modifiés

### Backend
- ✅ `database/seeders/RolesAndPermissionsSeeder.php` - Définition des rôles et permissions
- ✅ `database/seeders/DatabaseSeeder.php` - Création des utilisateurs de démo
- ✅ `app/Http/Middleware/CheckPermission.php` - Middleware de vérification des permissions
- ✅ `app/Http/Middleware/CheckRole.php` - Middleware de vérification des rôles
- ✅ `app/Http/Controllers/UserManagementController.php` - CRUD des utilisateurs
- ✅ `routes/api.php` - Routes API pour la gestion des utilisateurs

### Frontend
- ✅ `src/hooks/usePermissions.js` - Hook de gestion des permissions
- ✅ `src/components/permissions/Can.jsx` - Composants de contrôle d'accès
- ✅ `src/components/users/UsersManagement.jsx` - Page de gestion des utilisateurs
- ✅ `src/lib/i18n.js` - Traductions pour le module utilisateurs
- ✅ `src/components/layout/Sidebar.jsx` - Navigation conditionnelle
- ✅ `src/App.jsx` - Route pour la gestion des utilisateurs

---

**Dernière mise à jour:** Janvier 2025
**Version:** 1.0.0
