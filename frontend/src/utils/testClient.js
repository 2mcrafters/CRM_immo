// Fichier de test pour vérifier la création de client
import { api } from '../lib/api.js'

export async function testCreateClient() {
  const testData = {
    name: 'Test Client',
    nom: 'Dupont',
    prenom: 'Jean',
    email: 'test@example.com',
    telephone: '0612345678',
    statut: 'prospect',
    ville: 'Paris',
    pays: 'France'
  }

  try {
    console.log('🔍 Test de création de client...')
    console.log('📦 Données à envoyer:', testData)
    
    const token = localStorage.getItem('auth_token')
    console.log('🔑 Token présent:', token ? 'Oui' : 'Non')
    
    const response = await api.post('/api/clients', testData)
    console.log('✅ Succès:', response.data)
    return response.data
  } catch (error) {
    console.error('❌ Erreur:', error.response?.data || error.message)
    throw error
  }
}

// Fonction pour vérifier l'authentification
export function checkAuth() {
  const token = localStorage.getItem('auth_token')
  console.log('🔐 État de l\'authentification:')
  console.log('  - Token présent:', token ? 'Oui' : 'Non')
  console.log('  - Token:', token?.substring(0, 20) + '...')
  return !!token
}

// Export global pour tester depuis la console
if (typeof window !== 'undefined') {
  window.testCreateClient = testCreateClient
  window.checkAuth = checkAuth
}
