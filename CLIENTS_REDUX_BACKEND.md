# 🎉 Gestion des Clients - Redux + Backend

## ✅ Modifications Complétées

### Backend

#### 1. **Model Client** (`backend/app/Models/Client.php`)
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = [
        'nom', 'prenom', 'email', 'telephone', 'telephone_secondaire',
        'adresse', 'ville', 'code_postal', 'pays',
        'type', 'statut', 'budget_min', 'budget_max',
        'preferences', 'notes', 'user_id',
    ];

    protected $casts = [
        'preferences' => 'array',
        'budget_min' => 'decimal:2',
        'budget_max' => 'decimal:2',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function getNomCompletAttribute() {
        return "{$this->prenom} {$this->nom}";
    }
}
```

#### 2. **Controller** (`backend/app/Http/Controllers/ClientController.php`)
**Endpoints disponibles:**
- `GET /api/clients` - Liste des clients (avec filtres, pagination, recherche)
- `POST /api/clients` - Créer un client
- `GET /api/clients/{id}` - Détails d'un client
- `PUT /api/clients/{id}` - Mettre à jour un client
- `DELETE /api/clients/{id}` - Supprimer un client
- `GET /api/clients/statistics` - Statistiques clients

**Fonctionnalités:**
✅ Filtrage par type (acheteur, vendeur, locataire, proprietaire)
✅ Filtrage par statut (prospect, actif, inactif, archive)
✅ Recherche par nom, prénom, email, téléphone
✅ Tri personnalisable
✅ Pagination

#### 3. **Routes API** (`backend/routes/api.php`)
```php
Route::middleware('auth:sanctum')->prefix('clients')->group(function () {
    Route::get('/', [ClientController::class, 'index'])->middleware('can:clients.view');
    Route::post('/', [ClientController::class, 'store'])->middleware('can:clients.create');
    Route::get('/statistics', [ClientController::class, 'statistics'])->middleware('can:clients.view');
    Route::get('/{id}', [ClientController::class, 'show'])->middleware('can:clients.view');
    Route::put('/{id}', [ClientController::class, 'update'])->middleware('can:clients.edit');
    Route::delete('/{id}', [ClientController::class, 'destroy'])->middleware('can:clients.delete');
});
```

#### 4. **Seeder** (`backend/database/seeders/ClientsSeeder.php`)
✅ 10 clients de démonstration créés
✅ Différents types: Acheteurs, Vendeurs, Locataires, Propriétaires
✅ Différents statuts: Prospects, Actifs, Inactifs
✅ Assignés à des agents (users)

---

### Frontend

#### 1. **Redux Slice** (`frontend/src/features/clients/clientsSlice.js`)

**State Structure:**
```javascript
{
  clients: [],           // Liste des clients
  currentClient: null,   // Client sélectionné
  statistics: null,      // Statistiques
  status: 'idle',        // État du chargement
  error: null,           // Erreurs
  pagination: {          // Pagination
    current_page: 1,
    per_page: 15,
    total: 0,
    last_page: 1,
  },
  filters: {             // Filtres
    type: null,
    statut: null,
    search: '',
  }
}
```

**Actions Async:**
```javascript
fetchClients(params)        // Charger la liste
fetchClient(id)             // Charger un client
createClient(data)          // Créer un client
updateClient({id, ...data}) // Mettre à jour
deleteClient(id)            // Supprimer
fetchClientStatistics()     // Statistiques
```

**Actions Synchrones:**
```javascript
setFilters(filters)     // Définir les filtres
clearFilters()          // Réinitialiser les filtres
clearCurrentClient()    // Vider le client actuel
clearError()            // Effacer les erreurs
```

#### 2. **Store Redux** (`frontend/src/store/store.js`)
```javascript
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice.js'
import clientsReducer from '../features/clients/clientsSlice.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    clients: clientsReducer,  // ← Nouveau!
  },
})
```

---

## 📊 Structure de Données

### Client Object
```javascript
{
  id: 1,
  nom: "Dubois",
  prenom: "Jean",
  nom_complet: "Jean Dubois",
  email: "jean.dubois@example.fr",
  telephone: "0612345678",
  telephone_secondaire: "0187654321",
  adresse: "15 Rue de la République",
  ville: "Paris",
  code_postal: "75001",
  pays: "France",
  type: "acheteur",  // acheteur | vendeur | locataire | proprietaire
  statut: "actif",   // prospect | actif | inactif | archive
  budget_min: 200000.00,
  budget_max: 350000.00,
  preferences: {
    type: "appartement",
    pieces: 3,
    surface_min: 70
  },
  notes: "Client sérieux, recherche appartement T3 dans le 15ème.",
  user_id: 5,       // ID de l'agent assigné
  user: {           // Relation avec User
    id: 5,
    name: "Sophie Bernard",
    email: "commercial@tgi.fr"
  },
  created_at: "2025-10-19T21:00:00.000000Z",
  updated_at: "2025-10-19T21:00:00.000000Z"
}
```

### Statistics Object
```javascript
{
  total: 10,
  prospects: 2,
  actifs: 6,
  by_type: {
    acheteurs: 4,
    vendeurs: 2,
    locataires: 2,
    proprietaires: 2
  },
  by_statut: {
    prospects: 2,
    actifs: 6,
    inactifs: 1,
    archives: 0
  }
}
```

---

## 🎯 Utilisation dans les Composants

### Exemple: Liste des Clients

```javascript
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchClients, setFilters } from '../features/clients/clientsSlice'

function ClientsPage() {
  const dispatch = useDispatch()
  const { clients, status, error, filters, pagination } = useSelector((state) => state.clients)

  useEffect(() => {
    dispatch(fetchClients(filters))
  }, [dispatch, filters])

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters))
  }

  if (status === 'loading') return <div>Chargement...</div>
  if (error) return <div>Erreur: {error}</div>

  return (
    <div>
      <h1>Clients ({pagination.total})</h1>
      {clients.map((client) => (
        <div key={client.id}>
          <h3>{client.nom_complet}</h3>
          <p>{client.email} - {client.telephone}</p>
          <p>Type: {client.type} | Statut: {client.statut}</p>
          {client.user && <p>Agent: {client.user.name}</p>}
        </div>
      ))}
    </div>
  )
}
```

### Exemple: Créer un Client

```javascript
import { useDispatch } from 'react-redux'
import { createClient } from '../features/clients/clientsSlice'

function CreateClientForm() {
  const dispatch = useDispatch()

  const handleSubmit = async (formData) => {
    try {
      await dispatch(createClient({
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        telephone: formData.telephone,
        type: formData.type,
        statut: 'prospect',
        user_id: formData.agent_id,
      })).unwrap()
      // Succès!
    } catch (error) {
      // Erreur
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Vos champs de formulaire */}
    </form>
  )
}
```

### Exemple: Mettre à Jour un Client

```javascript
import { useDispatch } from 'react-redux'
import { updateClient } from '../features/clients/clientsSlice'

function EditClientForm({ clientId }) {
  const dispatch = useDispatch()

  const handleUpdate = async (updates) => {
    try {
      await dispatch(updateClient({
        id: clientId,
        ...updates,
      })).unwrap()
      // Succès!
    } catch (error) {
      // Erreur
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleUpdate}>
      {/* Vos champs de formulaire */}
    </form>
  )
}
```

### Exemple: Filtrer les Clients

```javascript
import { useDispatch } from 'react-redux'
import { setFilters, clearFilters } from '../features/clients/clientsSlice'

function ClientFilters() {
  const dispatch = useDispatch()

  return (
    <div>
      <select onChange={(e) => dispatch(setFilters({ type: e.target.value }))}>
        <option value="">Tous les types</option>
        <option value="acheteur">Acheteurs</option>
        <option value="vendeur">Vendeurs</option>
        <option value="locataire">Locataires</option>
        <option value="proprietaire">Propriétaires</option>
      </select>

      <select onChange={(e) => dispatch(setFilters({ statut: e.target.value }))}>
        <option value="">Tous les statuts</option>
        <option value="prospect">Prospects</option>
        <option value="actif">Actifs</option>
        <option value="inactif">Inactifs</option>
        <option value="archive">Archivés</option>
      </select>

      <input
        type="search"
        placeholder="Rechercher..."
        onChange={(e) => dispatch(setFilters({ search: e.target.value }))}
      />

      <button onClick={() => dispatch(clearFilters())}>
        Réinitialiser les filtres
      </button>
    </div>
  )
}
```

---

## 🔐 Permissions Requises

Pour utiliser les endpoints clients, l'utilisateur doit avoir les permissions suivantes:

- `clients.view` - Voir la liste et les détails
- `clients.create` - Créer un nouveau client
- `clients.edit` - Modifier un client existant
- `clients.delete` - Supprimer un client

**Note:** Ces permissions doivent être ajoutées au `RolesAndPermissionsSeeder.php`

---

## 📝 Prochaines Étapes

### 1. Ajouter les Permissions
Éditer `backend/database/seeders/RolesAndPermissionsSeeder.php`:

```php
// Ajouter les permissions clients
$permissions = [
    // ... permissions existantes ...
    'clients.view',
    'clients.create',
    'clients.edit',
    'clients.delete',
];
```

### 2. Créer les Composants UI
- `ClientsList.jsx` - Liste des clients avec filtres
- `ClientCard.jsx` - Card d'affichage d'un client
- `ClientForm.jsx` - Formulaire création/édition
- `ClientModal.jsx` - Modal pour les actions
- `ClientsStatistics.jsx` - Dashboard des stats

### 3. Ajouter les Traductions
Dans `frontend/src/lib/i18n.js`:

```javascript
clients: {
  title: "Clients",
  add: "Ajouter un client",
  edit: "Modifier le client",
  delete: "Supprimer le client",
  types: {
    acheteur: "Acheteur",
    vendeur: "Vendeur",
    locataire: "Locataire",
    proprietaire: "Propriétaire",
  },
  status: {
    prospect: "Prospect",
    actif: "Actif",
    inactif: "Inactif",
    archive: "Archivé",
  },
  // ... etc
}
```

---

## 🚀 Pour Tester

### Backend
```bash
# Tester la liste des clients
curl http://localhost:8000/api/clients \
  -H "Authorization: Bearer YOUR_TOKEN"

# Créer un client
curl -X POST http://localhost:8000/api/clients \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Test",
    "prenom": "Client",
    "email": "test@example.com",
    "type": "acheteur"
  }'
```

### Frontend
```javascript
// Dans Redux DevTools, dispatch:
dispatch(fetchClients())
dispatch(createClient({ nom: "Test", prenom: "User", email: "test@test.fr", type: "acheteur" }))
dispatch(fetchClientStatistics())
```

---

**Système de gestion des clients complet et prêt à l'emploi!** 🎉

**Dernière mise à jour:** 19 octobre 2025  
**Status:** ✅ Backend + Redux configurés
