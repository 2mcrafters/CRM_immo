import { useTheme } from '../../theme/ThemeProvider.jsx'
import { motion } from 'framer-motion'

export default function ThemeToggle({ className = '' }) {
  const { toggle, mode } = useTheme()
  const isDark = mode === 'dark'
  
  const handleToggle = () => {
    console.log('ThemeToggle clicked, current mode:', mode)
    toggle()
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleToggle}
      className={`
        relative p-2.5 sm:p-3 rounded-xl transition-all duration-300
        bg-white dark:bg-slate-800/80 backdrop-blur-md
        border border-slate-200 dark:border-slate-700
        hover:bg-slate-50 dark:hover:bg-slate-700/80
        shadow-lg hover:shadow-xl
        focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600
        ${className}
      `}
      aria-label={isDark ? 'Passer au mode clair' : 'Passer au mode sombre'}
      title={isDark ? 'Passer au mode clair' : 'Passer au mode sombre'}
    >
      <div className="relative w-5 h-5 sm:w-6 sm:h-6">
        {/* Sun Icon - Light Mode */}
        <motion.svg
          initial={false}
          animate={{
            scale: isDark ? 0 : 1,
            rotate: isDark ? 180 : 0,
            opacity: isDark ? 0 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 text-amber-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </motion.svg>

        {/* Moon Icon - Dark Mode */}
        <motion.svg
          initial={false}
          animate={{
            scale: isDark ? 1 : 0,
            rotate: isDark ? 0 : -180,
            opacity: isDark ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 text-blue-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </motion.svg>
      </div>
    </motion.button>
  )
}
