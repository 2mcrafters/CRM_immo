import React from 'react'
import { useTheme } from '../../theme/ThemeProvider.jsx'
import Button from '../ui/Button.jsx'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const { toggle, theme } = useTheme()
  return (
    <header className={`sticky top-0 z-40 border-b ${theme.border} backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-slate-950/60`}>
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link to="/" className="font-semibold text-blue-600 dark:text-blue-400">CRM Immobilier</Link>
        <div className="flex items-center gap-2">
          <Button onClick={toggle} className="!bg-slate-800 !text-slate-100 dark:!bg-slate-200 dark:!text-slate-900">{theme.name === 'dark' ? 'Light' : 'Dark'}</Button>
        </div>
      </div>
    </header>
  )
}
