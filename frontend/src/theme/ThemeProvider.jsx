import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { lightTheme, darkTheme } from './theme.js'

const ThemeCtx = createContext({ theme: lightTheme, setTheme: () => {}, toggle: () => {} })
const key = 'ui_theme'

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => localStorage.getItem(key) || 'dark')
  const theme = mode === 'dark' ? darkTheme : lightTheme

  useEffect(() => {
    localStorage.setItem(key, mode)
    if (mode === 'dark') document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [mode])

  const value = useMemo(() => ({ theme, setTheme: setMode, toggle: () => setMode((m) => (m === 'dark' ? 'light' : 'dark')) }), [theme])
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>
}

export function useTheme() {
  return useContext(ThemeCtx)
}
