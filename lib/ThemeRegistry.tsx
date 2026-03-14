'use client'

import * as React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { getTheme } from './theme'

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark')
  const theme = getTheme(mode)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Pass toggleTheme via context so any child can use it */}
      <ThemeToggleContext.Provider value={{ mode, setMode }}>
        {children}
      </ThemeToggleContext.Provider>
    </ThemeProvider>
  )
}

export const ThemeToggleContext = React.createContext<{
  mode: 'light' | 'dark'
  setMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>
}>({
  mode: 'dark',
  setMode: () => {},
})
