# 🏢 CRM Immobilier - Plateforme de Gestion Professionnelle

Une application CRM moderne et intuitive pour la gestion immobilière, **entièrement en français**, avec des animations fluides et une interface utilisateur professionnelle de niveau production.

## ✨ Fonctionnalités Principales

### 🎨 Interface Utilisateur Premium
- **Design moderne** avec Tailwind CSS v4 et Framer Motion pour animations cinématiques
- **Glassmorphisme** et effets de backdrop blur professionnels
- **Thème sombre optimisé** avec dégradés bleu/cyan élégants
- **Micro-interactions** sur chaque élément (hover, focus, tap, shimmer effects)
- **Responsive** fluide sur mobile, tablette et desktop

### 🔐 Authentification Sécurisée
- Laravel Sanctum token-based auth avec Redux Toolkit
- Pages login/register animées avec validation en temps réel
- Protection automatique des routes et gestion des sessions
- Intercepteurs Axios pour refresh token transparent

### 📊 Dashboard Professionnel
- **4 cartes statistiques animées** (clients, propriétés, locations, revenus)
- **Timeline d'activité récente** avec avatars et badges
- **Actions rapides** pour créations express
- **Mini-graphique** d'évolution mensuelle avec animations spring

### 👥 Gestion Complète des Clients
- Table interactive avec tri, recherche et filtres en temps réel
- Modals d'ajout/modification avec formulaires validés
- Avatars générés automatiquement avec initiales
- États vides élégants et skeletons de chargement
- Actions CRUD avec confirmations et animations

### 🏗️ Stack Technique

**Frontend:**
- React 19 + Vite 5 (HMR ultra-rapide)
- Redux Toolkit + React Router v6
- Tailwind CSS v4 avec plugin Vite
- Framer Motion pour animations
- Axios avec intercepteurs

**Backend:**
- Laravel 12 + PHP 8.4
- MySQL avec migrations complètes
- Sanctum (auth) + Spatie Permission (rôles)
- CORS configuré multi-origines

## 🚀 Démarrage Rapide

### Backend
```powershell
cd backend
composer install

# Configurer .env avec vos paramètres MySQL
# DB_CONNECTION=mysql
# DB_DATABASE=crm_immobilier
# FRONTEND_ORIGINS=http://localhost:5175,http://localhost:5176

php artisan key:generate
php artisan migrate --seed

# Démarrer le serveur (port 8000)
php -S localhost:8000 -t public
```

**Utilisateur admin par défaut:**
- Email: `admin@example.com`
- Mot de passe: `password`

### Frontend
```powershell
cd frontend
npm install

# Vite proxy configuré automatiquement vers localhost:8000
npm run dev
```

Application disponible sur **http://localhost:5175** (ou 5176)

## 🎯 Composants UI Créés

- **Button** : 6 variantes avec shimmer effect et loading spinner
- **Input** : Focus rings animés, validation, icônes
- **Card** : Glass morphism, gradients, hover lift
- **Modal** : Backdrop blur, animations spring
- **Toast** : Notifications animées 4 types
- **Badge** : 6 variantes avec dot pulsant
- **Avatar** : Initiales auto, statuts colorés
- **Skeleton** : Loading states avec shimmer
- **EmptyState** : États vides avec actions
- **Navbar** : Glass morphism, menu utilisateur, notifications
- **Sidebar** : Navigation animée avec badges
- **Dashboard** : Stats, graphiques, activité
- **ClientsPage** : Table CRUD complète

## 📱 Routes Disponibles

- `/login` - Connexion
- `/register` - Inscription
- `/` - Dashboard (protégé)
- `/clients` - Gestion clients (protégé)
- `/properties` - Propriétés (protégé)
- `/rentals` - Locations (protégé)
- `/owners` - Propriétaires (protégé)
- `/documents` - Documents (protégé)
- `/reports` - Rapports (protégé)

## 🌐 Traductions (100% Français)

Toutes les chaînes centralisées dans `frontend/src/lib/i18n.js`:
```javascript
import { t } from './lib/i18n'

t('auth.login')         // "Connexion"
t('dashboard.welcome')  // "Bienvenue"
t('clients.add')        // "Ajouter un client"
```

## 🔒 Sécurité

✅ Sanctum token-based auth  
✅ CORS multi-origines  
✅ CSRF protection  
✅ Bcrypt password hashing  
✅ Route protection middleware  
✅ Validation côté client & serveur  

## 🎨 Animations & Effets

- Page transitions fluides (Framer Motion)
- Hover effects sur tous les interactifs
- Shimmer loading avec gradients
- Micro-interactions spring physics
- Gestures (tap, hover, drag)
- Glass morphism avec backdrop-blur
- Ombres colorées dynamiques

## 📄 License

Projet propriétaire © 2025
