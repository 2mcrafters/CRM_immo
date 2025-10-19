// Système de traduction français pour CRM Immobilier
export const fr = {
  // Navigation
  nav: {
    dashboard: 'Tableau de bord',
    clients: 'Clients',
    properties: 'Propriétés',
    rentals: 'Locations',
    owners: 'Propriétaires',
    documents: 'Documents',
    reports: 'Rapports',
    settings: 'Paramètres',
    logout: 'Déconnexion',
  },

  // Auth
  auth: {
    login: 'Connexion',
    register: "S'inscrire",
    email: 'Email',
    password: 'Mot de passe',
    name: 'Nom complet',
    signIn: 'Se connecter',
    signUp: 'Créer un compte',
    noAccount: 'Pas encore de compte ?',
    hasAccount: 'Déjà un compte ?',
    forgotPassword: 'Mot de passe oublié ?',
    rememberMe: 'Se souvenir de moi',
    loginSuccess: 'Connexion réussie',
    loginFailed: 'Échec de connexion',
    registerSuccess: 'Inscription réussie',
    registerFailed: "Échec de l'inscription",
    invalidCredentials: 'Identifiants invalides',
    welcome: 'Bienvenue',
    welcomeBack: 'Bon retour',
  },

  // Dashboard
  dashboard: {
    welcome: 'Bienvenue',
    overview: 'Vue d\'ensemble',
    statistics: 'Statistiques',
    recentActivity: 'Activité récente',
    quickActions: 'Actions rapides',
    totalClients: 'Clients totaux',
    activeRentals: 'Locations actives',
    totalProperties: 'Propriétés totales',
    monthlyRevenue: 'Revenu mensuel',
    newClient: 'Nouveau client',
    newProperty: 'Nouvelle propriété',
    newRental: 'Nouvelle location',
    viewAll: 'Tout voir',
    noData: 'Aucune donnée disponible',
    loading: 'Chargement...',
  },

  // Clients
  clients: {
    title: 'Gestion des Clients',
    list: 'Liste des clients',
    add: 'Ajouter un client',
    edit: 'Modifier le client',
    delete: 'Supprimer le client',
    details: 'Détails du client',
    search: 'Rechercher un client...',
    filter: 'Filtrer',
    status: 'Statut',
    active: 'Actif',
    inactive: 'Inactif',
    firstName: 'Prénom',
    lastName: 'Nom',
    phone: 'Téléphone',
    address: 'Adresse',
    city: 'Ville',
    postalCode: 'Code postal',
    country: 'Pays',
    createdAt: 'Créé le',
    actions: 'Actions',
  },

  // Properties
  properties: {
    title: 'Gestion des Propriétés',
    list: 'Liste des propriétés',
    add: 'Ajouter une propriété',
    edit: 'Modifier la propriété',
    delete: 'Supprimer la propriété',
    details: 'Détails de la propriété',
    search: 'Rechercher une propriété...',
    type: 'Type',
    surface: 'Surface',
    rooms: 'Pièces',
    price: 'Prix',
    available: 'Disponible',
    rented: 'Louée',
    apartment: 'Appartement',
    house: 'Maison',
    commercial: 'Commercial',
    land: 'Terrain',
  },

  // Rentals
  rentals: {
    title: 'Gestion des Locations',
    list: 'Liste des locations',
    add: 'Créer une location',
    edit: 'Modifier la location',
    details: 'Détails de la location',
    startDate: 'Date de début',
    endDate: 'Date de fin',
    monthlyRent: 'Loyer mensuel',
    deposit: 'Dépôt de garantie',
    tenant: 'Locataire',
    property: 'Propriété',
    status: 'Statut',
  },

  // Common
  common: {
    save: 'Enregistrer',
    cancel: 'Annuler',
    delete: 'Supprimer',
    edit: 'Modifier',
    view: 'Voir',
    add: 'Ajouter',
    search: 'Rechercher',
    filter: 'Filtrer',
    export: 'Exporter',
    import: 'Importer',
    print: 'Imprimer',
    close: 'Fermer',
    confirm: 'Confirmer',
    yes: 'Oui',
    no: 'Non',
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    warning: 'Attention',
    info: 'Information',
    required: 'Champ requis',
    optional: 'Optionnel',
    selectOption: 'Sélectionner une option',
    noResults: 'Aucun résultat',
    showing: 'Affichage',
    of: 'sur',
    results: 'résultats',
  },

  // Messages
  messages: {
    saveSuccess: 'Enregistré avec succès',
    saveFailed: "Échec de l'enregistrement",
    deleteSuccess: 'Supprimé avec succès',
    deleteFailed: 'Échec de la suppression',
    deleteConfirm: 'Êtes-vous sûr de vouloir supprimer ?',
    updateSuccess: 'Mise à jour réussie',
    updateFailed: 'Échec de la mise à jour',
    networkError: 'Erreur réseau',
    serverError: 'Erreur serveur',
    unauthorized: 'Non autorisé',
    notFound: 'Non trouvé',
  },

  // Time
  time: {
    today: "Aujourd'hui",
    yesterday: 'Hier',
    thisWeek: 'Cette semaine',
    thisMonth: 'Ce mois',
    lastMonth: 'Mois dernier',
    thisYear: 'Cette année',
    minutesAgo: 'il y a {n} minutes',
    hoursAgo: 'il y a {n} heures',
    daysAgo: 'il y a {n} jours',
    weeksAgo: 'il y a {n} semaines',
    monthsAgo: 'il y a {n} mois',
  },

  // Users
  users: {
    title: 'Gestion des Utilisateurs',
    description: 'Gérez les utilisateurs et leurs permissions',
    list: 'Liste des utilisateurs',
    create: 'Créer un utilisateur',
    createUser: 'Créer un utilisateur',
    editUser: 'Modifier un utilisateur',
    deleteUser: 'Supprimer un utilisateur',
    search: 'Rechercher un utilisateur...',
    name: 'Nom',
    email: 'Email',
    role: 'Rôle',
    roles: 'Rôles',
    permissions: 'Permissions',
    password: 'Mot de passe',
    newPassword: 'Nouveau mot de passe',
    leaveEmptyPassword: 'Laisser vide pour garder l\'actuel',
    selectRole: 'Sélectionner un rôle',
    created: 'Créé le',
    noUsers: 'Aucun utilisateur',
    noUsersDescription: 'Commencez par créer votre premier utilisateur',
    deleteConfirmation: 'Êtes-vous sûr de vouloir supprimer l\'utilisateur {name} ?',
  },
}

export const t = (key, params = {}) => {
  const keys = key.split('.')
  let value = fr

  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k]
    } else {
      return key
    }
  }

  if (typeof value === 'string') {
    return Object.entries(params).reduce((str, [key, val]) => {
      return str.replace(new RegExp(`\\{${key}\\}`, 'g'), val)
    }, value)
  }

  return key
}

export default { fr, t }
