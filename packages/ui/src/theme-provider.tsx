'use client'

import * as React from 'react'

export type ThemeName = 'ios27'
export type ThemeMode = 'light' | 'dark' | 'system'
export type ResolvedThemeMode = Exclude<ThemeMode, 'system'>

type ThemeContextValue = {
  theme: ThemeName
  mode: ThemeMode
  resolvedMode: ResolvedThemeMode
  setMode: (mode: ThemeMode) => void
}

type ThemeProviderProps = {
  children: React.ReactNode
  theme?: ThemeName
  mode?: ThemeMode
  defaultMode?: ThemeMode
  onModeChange?: (mode: ThemeMode) => void
  syncDocument?: boolean
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)
const darkQuery = '(prefers-color-scheme: dark)'

function subscribeToSystemTheme(callback: () => void) {
  if (typeof window === 'undefined') return () => undefined
  const media = window.matchMedia(darkQuery)
  media.addEventListener('change', callback)
  return () => media.removeEventListener('change', callback)
}

function getSystemTheme(): ResolvedThemeMode {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia(darkQuery).matches ? 'dark' : 'light'
}

export function ThemeProvider({
  children,
  theme = 'ios27',
  mode: controlledMode,
  defaultMode = 'system',
  onModeChange,
  syncDocument = true,
}: ThemeProviderProps) {
  const [uncontrolledMode, setUncontrolledMode] = React.useState<ThemeMode>(defaultMode)
  const systemMode = React.useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemTheme,
    () => 'light' as ResolvedThemeMode,
  )

  const mode = controlledMode ?? uncontrolledMode
  const resolvedMode: ResolvedThemeMode = mode === 'system' ? systemMode : mode

  const setMode = React.useCallback(
    (nextMode: ThemeMode) => {
      if (controlledMode === undefined) setUncontrolledMode(nextMode)
      onModeChange?.(nextMode)
    },
    [controlledMode, onModeChange],
  )

  React.useEffect(() => {
    if (!syncDocument) return

    const root = document.documentElement
    const previous = {
      theme: root.getAttribute('data-pzhown-theme'),
      mode: root.getAttribute('data-theme'),
      hadUiClass: root.classList.contains('pzhown-ui'),
      hadDarkClass: root.classList.contains('dark'),
      colorScheme: root.style.colorScheme,
    }

    root.classList.add('pzhown-ui')
    root.classList.toggle('dark', resolvedMode === 'dark')
    root.setAttribute('data-pzhown-theme', theme)
    root.setAttribute('data-theme', resolvedMode)
    root.style.colorScheme = resolvedMode

    return () => {
      if (!previous.hadUiClass) root.classList.remove('pzhown-ui')
      root.classList.toggle('dark', previous.hadDarkClass)

      if (previous.theme === null) root.removeAttribute('data-pzhown-theme')
      else root.setAttribute('data-pzhown-theme', previous.theme)

      if (previous.mode === null) root.removeAttribute('data-theme')
      else root.setAttribute('data-theme', previous.mode)

      root.style.colorScheme = previous.colorScheme
    }
  }, [resolvedMode, syncDocument, theme])

  const value = React.useMemo<ThemeContextValue>(
    () => ({ theme, mode, resolvedMode, setMode }),
    [mode, resolvedMode, setMode, theme],
  )

  return (
    <ThemeContext.Provider value={value}>
      <div
        className="pzhown-ui"
        data-pzhown-theme={theme}
        data-theme={resolvedMode}
        style={{ display: 'contents' }}
        suppressHydrationWarning
      >
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider.')
  return context
}
