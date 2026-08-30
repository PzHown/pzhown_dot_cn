'use client'

import * as React from 'react'

export interface LiquidGlassContextValue {
  enabled: boolean
  setEnabled: (enabled: boolean) => void
}

const fallbackContext: LiquidGlassContextValue = {
  enabled: true,
  setEnabled: () => undefined,
}

const LiquidGlassContext = React.createContext<LiquidGlassContextValue | null>(null)

export interface LiquidGlassProviderProps {
  children: React.ReactNode
  enabled?: boolean
  defaultEnabled?: boolean
  onEnabledChange?: (enabled: boolean) => void
}

/**
 * Global switch for iOS 27 Liquid Glass materials and optional optical lenses.
 * It is layout-neutral and synchronizes documentElement so Portal surfaces obey
 * the same setting as in-tree components.
 */
export function LiquidGlassProvider({
  children,
  enabled: controlledEnabled,
  defaultEnabled = true,
  onEnabledChange,
}: LiquidGlassProviderProps) {
  const [internalEnabled, setInternalEnabled] = React.useState(defaultEnabled)
  const enabled = controlledEnabled ?? internalEnabled

  const setEnabled = React.useCallback((next: boolean) => {
    if (controlledEnabled === undefined) setInternalEnabled(next)
    onEnabledChange?.(next)
  }, [controlledEnabled, onEnabledChange])

  React.useEffect(() => {
    const root = document.documentElement
    const previous = root.getAttribute('data-liquid-glass')
    root.setAttribute('data-liquid-glass', enabled ? 'on' : 'off')
    return () => {
      if (previous === null) root.removeAttribute('data-liquid-glass')
      else root.setAttribute('data-liquid-glass', previous)
    }
  }, [enabled])

  const value = React.useMemo(() => ({ enabled, setEnabled }), [enabled, setEnabled])
  return <LiquidGlassContext.Provider value={value}>{children}</LiquidGlassContext.Provider>
}

export function useLiquidGlass() {
  return React.useContext(LiquidGlassContext) ?? fallbackContext
}

export function useLiquidGlassEnabled(localEnabled = true) {
  const { enabled } = useLiquidGlass()
  return enabled && localEnabled
}
