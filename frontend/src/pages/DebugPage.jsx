import { useState } from 'react'
import { useSelector } from 'react-redux'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { testCreateClient, checkAuth } from '../utils/testClient'

export default function DebugPage() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const auth = useSelector((state) => state.auth)

  const handleTest = async () => {
    setLoading(true)
    try {
      const data = await testCreateClient()
      setResult({ success: true, data })
    } catch (error) {
      setResult({ success: false, error: error.response?.data || error.message })
    } finally {
      setLoading(false)
    }
  }

  const handleCheckAuth = () => {
    const isAuth = checkAuth()
    setResult({ 
      success: isAuth, 
      data: { 
        isAuthenticated: isAuth,
        reduxAuth: auth
      } 
    })
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          🔧 Page de débogage - Création de client
        </h1>

        <Card className="p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            État de l'authentification
          </h2>
          <div className="space-y-2 text-slate-700 dark:text-slate-300">
            <p><strong>User:</strong> {auth.user?.name || 'Non connecté'}</p>
            <p><strong>Email:</strong> {auth.user?.email || 'N/A'}</p>
            <p><strong>Role:</strong> {auth.user?.role || 'N/A'}</p>
            <p><strong>Token présent:</strong> {auth.token ? '✅ Oui' : '❌ Non'}</p>
            <p><strong>Status:</strong> {auth.status}</p>
          </div>
          <Button onClick={handleCheckAuth} className="mt-4">
            Vérifier l'authentification
          </Button>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            Test de création de client
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Cliquez sur le bouton pour tester la création d'un client de test
          </p>
          <Button onClick={handleTest} loading={loading}>
            Créer un client de test
          </Button>
        </Card>

        {result && (
          <Card className={`p-6 ${result.success ? 'border-green-500' : 'border-red-500'} border-2`}>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              {result.success ? '✅ Résultat' : '❌ Erreur'}
            </h2>
            <pre className="bg-slate-800 text-green-400 p-4 rounded-lg overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </Card>
        )}

        <Card className="p-6 bg-blue-50 dark:bg-blue-950/20">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            💡 Instructions
          </h3>
          <ul className="list-disc list-inside space-y-1 text-blue-800 dark:text-blue-200 text-sm">
            <li>Vérifiez d'abord que vous êtes connecté</li>
            <li>Si non connecté, allez à /login</li>
            <li>Une fois connecté, testez la création de client</li>
            <li>Vérifiez les erreurs dans la console du navigateur (F12)</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
