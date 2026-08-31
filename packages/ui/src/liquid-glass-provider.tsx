'use client'

import * as React from 'react'
import { LiquidGlassEngine, type LiquidGlassOptions } from 'liquid-glass-web-react'

export type LiquidGlassSourceRef = React.RefObject<HTMLElement | null>

type ExternalLensRegistration = {
  id: symbol
  target: HTMLElement
  options: Partial<LiquidGlassOptions>
}

export interface LiquidGlassContextValue {
  /** User/application preference. */
  enabled: boolean
  /** Effective optical state after accessibility preferences are applied. */
  opticalEnabled: boolean
  setEnabled: (enabled: boolean) => void
  sourceRef: LiquidGlassSourceRef | null
  registerExternalLens: (target: HTMLElement, options?: Partial<LiquidGlassOptions>) => () => void
}

const fallbackContext: LiquidGlassContextValue = {
  enabled: true,
  opticalEnabled: true,
  setEnabled: () => undefined,
  sourceRef: null,
  registerExternalLens: () => () => undefined,
}

const LiquidGlassContext = React.createContext<LiquidGlassContextValue | null>(null)

export interface LiquidGlassProviderProps {
  children: React.ReactNode
  enabled?: boolean
  defaultEnabled?: boolean
  onEnabledChange?: (enabled: boolean) => void
  /**
   * External live DOM that PallavAg should refract behind floating glass.
   * Keep this to a reasonably sized app/view shell rather than document.body;
   * Safari limits the source footprint an SVG filter can process reliably.
   */
  sourceRef?: LiquidGlassSourceRef | null
}

function readRadius(target: HTMLElement) {
  const value = Number.parseFloat(getComputedStyle(target).borderTopLeftRadius)
  return Number.isFinite(value) ? value : 0
}

/**
 * Global Liquid Glass switch plus a single external live-DOM optical engine.
 *
 * PallavAg's low-level LiquidGlassEngine intentionally allows `container` and
 * `filtered` to be different elements. We use the provider's `sourceRef` as
 * `filtered`, while floating components merely register their own DOM box as
 * the active lens geometry. The most recently mounted floating lens wins;
 * other glass surfaces keep their CSS material instead of competing for the
 * same source element's `style.filter`.
 */
export function LiquidGlassProvider({
  children,
  enabled: controlledEnabled,
  defaultEnabled = true,
  onEnabledChange,
  sourceRef = null,
}: LiquidGlassProviderProps) {
  const [internalEnabled, setInternalEnabled] = React.useState(defaultEnabled)
  const [reducedTransparency, setReducedTransparency] = React.useState(false)
  const enabled = controlledEnabled ?? internalEnabled
  const opticalEnabled = enabled && !reducedTransparency

  const setEnabled = React.useCallback((next: boolean) => {
    if (controlledEnabled === undefined) setInternalEnabled(next)
    onEnabledChange?.(next)
  }, [controlledEnabled, onEnabledChange])

  const enabledRef = React.useRef(opticalEnabled)
  enabledRef.current = opticalEnabled
  const sourceRefRef = React.useRef<LiquidGlassSourceRef | null>(sourceRef)
  sourceRefRef.current = sourceRef

  const registrationsRef = React.useRef<ExternalLensRegistration[]>([])
  const engineRef = React.useRef<LiquidGlassEngine | null>(null)
  const engineSourceRef = React.useRef<HTMLElement | null>(null)
  const defsHostRef = React.useRef<HTMLDivElement | null>(null)
  const previousFilterRef = React.useRef('')
  const resizeObserverRef = React.useRef<ResizeObserver | null>(null)
  const observedTargetRef = React.useRef<HTMLElement | null>(null)
  const rafRef = React.useRef<number | null>(null)

  const destroyExternalEngine = React.useCallback(() => {
    resizeObserverRef.current?.disconnect()
    resizeObserverRef.current = null
    observedTargetRef.current = null
    engineRef.current?.destroy()
    engineRef.current = null
    if (engineSourceRef.current) engineSourceRef.current.style.filter = previousFilterRef.current
    engineSourceRef.current = null
    defsHostRef.current?.remove()
    defsHostRef.current = null
  }, [])

  const syncExternalLens = React.useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      const source = sourceRefRef.current?.current ?? null
      const registrations = registrationsRef.current
      const active = registrations[registrations.length - 1]
      if (!enabledRef.current || !source || !active || !active.target.isConnected) {
        destroyExternalEngine()
        return
      }

      const sourceRect = source.getBoundingClientRect()
      const targetRect = active.target.getBoundingClientRect()
      if (sourceRect.width <= 0 || sourceRect.height <= 0 || targetRect.width <= 0 || targetRect.height <= 0) return

      const x = (targetRect.left + targetRect.width / 2 - sourceRect.left) / sourceRect.width
      const y = (targetRect.top + targetRect.height / 2 - sourceRect.top) / sourceRect.height
      const options: Partial<LiquidGlassOptions> = {
        ...active.options,
        width: targetRect.width,
        height: targetRect.height,
        radius: active.options.radius ?? readRadius(active.target),
      }

      if (!engineRef.current || engineSourceRef.current !== source) {
        destroyExternalEngine()
        const defsHost = document.createElement('div')
        defsHost.setAttribute('aria-hidden', 'true')
        defsHost.dataset.liquidGlassDefs = ''
        defsHost.style.position = 'fixed'
        defsHost.style.width = '0'
        defsHost.style.height = '0'
        defsHost.style.overflow = 'hidden'
        defsHost.style.pointerEvents = 'none'
        document.body.appendChild(defsHost)
        defsHostRef.current = defsHost
        previousFilterRef.current = source.style.filter
        engineSourceRef.current = source
        engineRef.current = new LiquidGlassEngine(
          { container: source, filtered: source, defsHost },
          options,
        )
      } else {
        engineRef.current.setOptions(options)
      }
      engineRef.current.setPosition(x, y)

      if (observedTargetRef.current !== active.target) {
        resizeObserverRef.current?.disconnect()
        const observer = new ResizeObserver(() => syncExternalLens())
        observer.observe(source)
        observer.observe(active.target)
        resizeObserverRef.current = observer
        observedTargetRef.current = active.target
      }
    })
  }, [destroyExternalEngine])

  const registerExternalLens = React.useCallback((target: HTMLElement, options: Partial<LiquidGlassOptions> = {}) => {
    const registration: ExternalLensRegistration = { id: Symbol('liquid-glass-lens'), target, options }
    registrationsRef.current.push(registration)
    syncExternalLens()
    return () => {
      registrationsRef.current = registrationsRef.current.filter((item) => item.id !== registration.id)
      syncExternalLens()
    }
  }, [syncExternalLens])

  React.useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-transparency: reduce)')
    const update = () => setReducedTransparency(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  React.useEffect(() => {
    const root = document.documentElement
    const previous = root.getAttribute('data-liquid-glass')
    root.setAttribute('data-liquid-glass', enabled ? 'on' : 'off')
    syncExternalLens()
    return () => {
      if (previous === null) root.removeAttribute('data-liquid-glass')
      else root.setAttribute('data-liquid-glass', previous)
    }
  }, [enabled, opticalEnabled, syncExternalLens])

  React.useEffect(() => {
    const resync = () => syncExternalLens()
    window.addEventListener('resize', resync)
    document.addEventListener('scroll', resync, true)
    return () => {
      window.removeEventListener('resize', resync)
      document.removeEventListener('scroll', resync, true)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      destroyExternalEngine()
    }
  }, [destroyExternalEngine, syncExternalLens])

  const value = React.useMemo(
    () => ({ enabled, opticalEnabled, setEnabled, sourceRef, registerExternalLens }),
    [enabled, opticalEnabled, setEnabled, sourceRef, registerExternalLens],
  )
  return <LiquidGlassContext.Provider value={value}>{children}</LiquidGlassContext.Provider>
}

export function useLiquidGlass() {
  return React.useContext(LiquidGlassContext) ?? fallbackContext
}

export function useLiquidGlassEnabled(localEnabled = true) {
  const { opticalEnabled } = useLiquidGlass()
  return opticalEnabled && localEnabled
}
