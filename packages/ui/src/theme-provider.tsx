'use client'

import * as React from 'react'

export type ThemeMode = 'light' | 'dark' | 'system'
export type ResolvedThemeMode = Exclude<ThemeMode, 'system'>

type ThemeContextValue = {
  mode: ThemeMode
  resolvedMode: ResolvedThemeMode
  setMode: (mode: ThemeMode) => void
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)
const darkQuery = '(prefers-color-scheme: dark)'

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => undefined
  const media = window.matchMedia(darkQuery)
  media.addEventListener('change', callback)
  return () => media.removeEventListener('change', callback)
}

function snapshot(): ResolvedThemeMode {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia(darkQuery).matches ? 'dark' : 'light'
}

export interface ThemeProviderProps {
  children: React.ReactNode
  mode?: ThemeMode
  defaultMode?: ThemeMode
  onModeChange?: (mode: ThemeMode) => void
  syncDocument?: boolean
}

export function ThemeProvider({ children, mode: controlledMode, defaultMode = 'system', onModeChange, syncDocument = true }: ThemeProviderProps) {
  const [internalMode, setInternalMode] = React.useState<ThemeMode>(defaultMode)
  const systemMode = React.useSyncExternalStore(subscribe, snapshot, () => 'light')
  const mode = controlledMode ?? internalMode
  const resolvedMode = mode === 'system' ? systemMode : mode
  const setMode = React.useCallback((next: ThemeMode) => {
    if (controlledMode === undefined) setInternalMode(next)
    onModeChange?.(next)
  }, [controlledMode, onModeChange])

  React.useEffect(() => {
    if (!syncDocument) return
    const root = document.documentElement
    const previous = root.getAttribute('data-theme')
    root.setAttribute('data-theme', resolvedMode)
    root.setAttribute('data-design-system', 'ios27')
    return () => {
      if (previous === null) root.removeAttribute('data-theme')
      else root.setAttribute('data-theme', previous)
      root.removeAttribute('data-design-system')
    }
  }, [resolvedMode, syncDocument])

  const value = React.useMemo(() => ({ mode, resolvedMode, setMode }), [mode, resolvedMode, setMode])
  return <ThemeContext.Provider value={value}><div className="pzhown-ios27" data-theme={resolvedMode}>{children}</div></ThemeContext.Provider>
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
