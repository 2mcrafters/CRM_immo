import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { lightTheme, darkTheme } from './theme.js'

const ThemeCtx = createContext({ theme: lightTheme, setTheme: () => {}, toggle: () => {} })
const key = 'ui_theme'

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    // Check localStorage first, then system preference, default to dark
    const saved = localStorage.getItem(key);
    if (saved) return saved;

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
    ) {
      return "light";
    }
    return "dark";
  });

  const theme = mode === "dark" ? darkTheme : lightTheme;

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem(key, mode);

    // Update document classes
    const root = document.documentElement;

    // Add transitioning class to prevent flash
    root.classList.add("theme-transitioning");

    if (mode === "dark") {
      root.classList.remove("light");
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }

    // Remove transitioning class after a short delay
    const timer = setTimeout(() => {
      root.classList.remove("theme-transitioning");
    }, 50);

    return () => clearTimeout(timer);
  }, [mode]);

  const value = useMemo(
    () => ({
      theme,
      mode,
      setTheme: setMode,
      toggle: () => {
        setMode((m) => {
          const newMode = m === "dark" ? "light" : "dark";
          console.log("Toggling theme from", m, "to", newMode);
          return newMode;
        });
      },
    }),
    [theme, mode]
  );

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeCtx);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
