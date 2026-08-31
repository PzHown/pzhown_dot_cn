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
   * The source box must spatially cover every external lens that uses it.
   */
  sourceRef?: LiquidGlassSourceRef | null
}

function readRadius(target: HTMLElement) {
  const value = Number.parseFloat(getComputedStyle(target).borderTopLeftRadius)
  return Number.isFinite(value) ? value : 0
}

function sourceCoversTarget(source: DOMRect, target: DOMRect) {
  const tolerance = 1
  return (
    target.left >= source.left - tolerance &&
    target.top >= source.top - tolerance &&
    target.right <= source.right + tolerance &&
    target.bottom <= source.bottom + tolerance
  )
}

/**
 * Global Liquid Glass switch plus a single external live-DOM optical engine.
 *
 * PallavAg measures `setPosition()` in the filtered element's own 0..1 box.
 * External targets therefore only activate when the filtered source fully
 * covers their viewport rect. This prevents clamped coordinates and partial
 * SVG filter regions from appearing as a lens shifted to an edge.
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
      if (sourceRect.width <= 0 || sourceRect.height <= 0 || targetRect.width <= 0 || targetRect.height <= 0) {
        destroyExternalEngine()
        return
      }

      // PallavAg clamps setPosition to 0..1 of the filtered box. If the target
      // extends outside that box, the lens can only be drawn at the nearest
      // source edge and visually appears to 'run' sideways. Never activate in
      // that geometry; stable iOS material is a safer fallback.
      if (!sourceCoversTarget(sourceRect, targetRect)) {
        destroyExternalEngine()
        return
      }

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
    // Dialog/Sheet presentation uses transforms. ResizeObserver does not fire
    // for transform-only animation, so remeasure once the visual box settles.
    document.addEventListener('animationend', resync, true)
    document.addEventListener('transitionend', resync, true)
    return () => {
      window.removeEventListener('resize', resync)
      document.removeEventListener('scroll', resync, true)
      document.removeEventListener('animationend', resync, true)
      document.removeEventListener('transitionend', resync, true)
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
