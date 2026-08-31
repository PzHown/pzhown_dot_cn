'use client'

import * as React from 'react'
import { LiquidGlassEngine, type LiquidGlassOptions } from 'liquid-glass-web-react'

export type LiquidGlassSourceRef = React.RefObject<HTMLElement | null>
export type LiquidGlassPortalRef = React.RefObject<HTMLElement | null>
export type LiquidGlassOpticalOverrides = Partial<Omit<LiquidGlassOptions, 'width' | 'height' | 'radius'>>

/** Pass PallavAg engine options through without redefining optical semantics. */
export type ExternalLiquidGlassOptions = Partial<LiquidGlassOptions>

type ExternalLensRegistration = {
  id: symbol
  target: HTMLElement
  options: ExternalLiquidGlassOptions
}

export interface LiquidGlassContextValue {
  enabled: boolean
  opticalEnabled: boolean
  opticalOverrides: LiquidGlassOpticalOverrides
  setEnabled: (enabled: boolean) => void
  sourceRef: LiquidGlassSourceRef | null
  portalRef: LiquidGlassPortalRef | null
  registerExternalLens: (target: HTMLElement, options?: ExternalLiquidGlassOptions) => () => void
}

const fallbackContext: LiquidGlassContextValue = {
  enabled: true,
  opticalEnabled: true,
  opticalOverrides: {},
  setEnabled: () => undefined,
  sourceRef: null,
  portalRef: null,
  registerExternalLens: () => () => undefined,
}

const LiquidGlassContext = React.createContext<LiquidGlassContextValue | null>(null)

export interface LiquidGlassProviderProps {
  children: React.ReactNode
  enabled?: boolean
  defaultEnabled?: boolean
  onEnabledChange?: (enabled: boolean) => void
  /** Optional live overrides for PallavAg optical parameters. Geometry stays owned by the target component. */
  opticalOverrides?: LiquidGlassOpticalOverrides
  /** External live DOM refracted behind floating glass. */
  sourceRef?: LiquidGlassSourceRef | null
  /** Optional sibling portal host sharing the source coordinate space. */
  portalRef?: LiquidGlassPortalRef | null
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

export function LiquidGlassProvider({
  children,
  enabled: controlledEnabled,
  defaultEnabled = true,
  onEnabledChange,
  opticalOverrides = {},
  sourceRef = null,
  portalRef = null,
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
  const opticalOverridesRef = React.useRef<LiquidGlassOpticalOverrides>(opticalOverrides)
  opticalOverridesRef.current = opticalOverrides

  const registrationsRef = React.useRef<ExternalLensRegistration[]>([])
  const engineRef = React.useRef<LiquidGlassEngine | null>(null)
  const engineSourceRef = React.useRef<HTMLElement | null>(null)
  const activeTargetRef = React.useRef<HTMLElement | null>(null)
  const defsHostRef = React.useRef<HTMLDivElement | null>(null)
  const previousFilterRef = React.useRef('')
  const resizeObserverRef = React.useRef<ResizeObserver | null>(null)
  const observedTargetRef = React.useRef<HTMLElement | null>(null)
  const rafRef = React.useRef<number | null>(null)

  const clearActiveTarget = React.useCallback(() => {
    activeTargetRef.current?.removeAttribute('data-liquid-glass-optical')
    activeTargetRef.current = null
  }, [])

  const destroyExternalEngine = React.useCallback(() => {
    resizeObserverRef.current?.disconnect()
    resizeObserverRef.current = null
    observedTargetRef.current = null
    clearActiveTarget()
    engineRef.current?.destroy()
    engineRef.current = null
    if (engineSourceRef.current) engineSourceRef.current.style.filter = previousFilterRef.current
    engineSourceRef.current = null
    defsHostRef.current?.remove()
    defsHostRef.current = null
  }, [clearActiveTarget])

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

      if (!sourceCoversTarget(sourceRect, targetRect)) {
        destroyExternalEngine()
        return
      }

      const x = (targetRect.left + targetRect.width / 2 - sourceRect.left) / sourceRect.width
      const y = (targetRect.top + targetRect.height / 2 - sourceRect.top) / sourceRect.height
      const options: Partial<LiquidGlassOptions> = {
        ...active.options,
        ...opticalOverridesRef.current,
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

      if (activeTargetRef.current !== active.target) {
        clearActiveTarget()
        active.target.setAttribute('data-liquid-glass-optical', 'on')
        activeTargetRef.current = active.target
      }

      if (observedTargetRef.current !== active.target) {
        resizeObserverRef.current?.disconnect()
        const observer = new ResizeObserver(() => syncExternalLens())
        observer.observe(source)
        observer.observe(active.target)
        resizeObserverRef.current = observer
        observedTargetRef.current = active.target
      }
    })
  }, [clearActiveTarget, destroyExternalEngine])

  const registerExternalLens = React.useCallback((target: HTMLElement, options: ExternalLiquidGlassOptions = {}) => {
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
    syncExternalLens()
  }, [opticalOverrides, syncExternalLens])

  React.useEffect(() => {
    const resync = () => syncExternalLens()
    window.addEventListener('resize', resync)
    document.addEventListener('scroll', resync, true)
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
    () => ({ enabled, opticalEnabled, opticalOverrides, setEnabled, sourceRef, portalRef, registerExternalLens }),
    [enabled, opticalEnabled, opticalOverrides, setEnabled, sourceRef, portalRef, registerExternalLens],
  )
  return <LiquidGlassContext.Provider value={value}>{children}</LiquidGlassContext.Provider>
}

export interface LiquidGlassViewportProps
  extends Omit<LiquidGlassProviderProps, 'children' | 'sourceRef' | 'portalRef'>,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  children: React.ReactNode
  sourceClassName?: string
  portalClassName?: string
}

export function LiquidGlassViewport({
  children,
  className,
  sourceClassName,
  portalClassName,
  ...providerProps
}: LiquidGlassViewportProps) {
  const sourceRef = React.useRef<HTMLDivElement>(null)
  const portalRef = React.useRef<HTMLDivElement>(null)
  const rootClassName = ['ios27-liquid-glass-viewport', className].filter(Boolean).join(' ')
  const sourceClasses = ['ios27-liquid-glass-viewport__source', sourceClassName].filter(Boolean).join(' ')
  const portalClasses = ['ios27-liquid-glass-viewport__portals', portalClassName].filter(Boolean).join(' ')

  return (
    <LiquidGlassProvider {...providerProps} sourceRef={sourceRef} portalRef={portalRef}>
      <div className={rootClassName}>
        <div ref={sourceRef} className={sourceClasses} data-liquid-glass-source="viewport">
          {children}
        </div>
        <div ref={portalRef} className={portalClasses} data-liquid-glass-portals="viewport" />
      </div>
    </LiquidGlassProvider>
  )
}

export function useLiquidGlass() {
  return React.useContext(LiquidGlassContext) ?? fallbackContext
}

export function useLiquidGlassEnabled(localEnabled = true) {
  const { opticalEnabled } = useLiquidGlass()
  return opticalEnabled && localEnabled
}
