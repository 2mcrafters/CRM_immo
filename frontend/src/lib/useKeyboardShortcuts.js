import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function useKeyboardShortcuts() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ignore si dans un input/textarea
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return

      // Avec Ctrl/Cmd
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'k':
            e.preventDefault()
            // Ouvrir recherche (à implémenter)
            break
          case 'h':
            e.preventDefault()
            navigate('/')
            break
          case 'n':
            e.preventDefault()
            // Nouveau client modal (à implémenter)
            break
        }
      }

      // Sans modificateur
      switch (e.key) {
        case 'Escape':
          // Fermer modals/dropdowns (à implémenter)
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [navigate])
}

// Composant d'aide des raccourcis
export function KeyboardShortcutsHelp({ isOpen, onClose }) {
  if (!isOpen) return null

  const shortcuts = [
    { keys: ['Ctrl', 'K'], description: 'Recherche globale' },
    { keys: ['Ctrl', 'H'], description: 'Accueil / Dashboard' },
    { keys: ['Ctrl', 'N'], description: 'Nouveau client' },
    { keys: ['Esc'], description: 'Fermer les modals' },
    { keys: ['?'], description: "Afficher l'aide" },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full">
        <h3 className="text-xl font-bold text-white mb-4">Raccourcis clavier</h3>
        
        <div className="space-y-3">
          {shortcuts.map((shortcut, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-slate-300">{shortcut.description}</span>
              <div className="flex gap-1">
                {shortcut.keys.map((key, j) => (
                  <kbd
                    key={j}
                    className="px-2 py-1 bg-slate-800 border border-slate-600 rounded text-xs text-slate-300 font-mono"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Fermer
        </button>
      </div>
    </div>
  )
}
