'use client'

import * as React from 'react'
import {
  LiquidGlass,
  type LiquidGlassHandle,
  type LiquidGlassProps,
} from 'liquid-glass-web-react'
import {
  type ExternalLiquidGlassOptions,
  useLiquidGlass,
  useLiquidGlassEnabled,
} from '../liquid-glass-provider'
import { cx } from './shared'

export type LiquidGlassMaterial = 'small' | 'medium' | 'large'

const opticalPresets: Record<
  LiquidGlassMaterial,
  Pick<
    LiquidGlassProps,
    | 'strength'
    | 'chromaticAberration'
    | 'blur'
    | 'depth'
    | 'curvature'
    | 'glow'
    | 'edgeHighlight'
    | 'specular'
  >
> = {
  small: {
    strength: 0.045,
    chromaticAberration: 0.08,
    blur: 4,
    depth: 8,
    curvature: 0.58,
    glow: 0.08,
    edgeHighlight: 0.22,
    specular: 0.8,
  },
  medium: {
    strength: 0.065,
    chromaticAberration: 0.12,
    blur: 8,
    depth: 10,
    curvature: 0.65,
    glow: 0.1,
    edgeHighlight: 0.26,
    specular: 0.9,
  },
  large: {
    strength: 0.08,
    chromaticAberration: 0.15,
    blur: 12,
    depth: 12,
    curvature: 0.7,
    glow: 0.12,
    edgeHighlight: 0.3,
    specular: 1,
  },
}

/* External optics use fixed CSS-pixel displacement and PallavAg's own blur.
   Small controls intentionally keep blur at 0 so the single active external
   engine cannot make one sibling control look blurrier than another. Hover,
   focus and press never change which optical registration is active. */
const externalOpticalPresets: Record<LiquidGlassMaterial, ExternalLiquidGlassOptions> = {
  small: {
    displacementPx: 8,
    chromaticAberration: 0.08,
    blur: 0,
    depth: 7,
    curvature: 0.62,
    glow: 0.08,
    edgeHighlight: 0.24,
    specular: 0.78,
  },
  medium: {
    displacementPx: 11,
    chromaticAberration: 0.12,
    blur: 8,
    depth: 10,
    curvature: 0.7,
    glow: 0.1,
    edgeHighlight: 0.28,
    specular: 0.9,
  },
  large: {
    displacementPx: 14,
    chromaticAberration: 0.14,
    blur: 12,
    depth: 12,
    curvature: 0.74,
    glow: 0.11,
    edgeHighlight: 0.3,
    specular: 0.95,
  },
}

export interface LiquidGlassSurfaceProps extends LiquidGlassProps {
  material?: LiquidGlassMaterial
  enabled?: boolean
}

/** Explicit PallavAg lens whose filtered source is its own live DOM subtree. */
export const LiquidGlassSurface = React.forwardRef<
  LiquidGlassHandle,
  LiquidGlassSurfaceProps
>(function LiquidGlassSurface(
  { material = 'medium', enabled = true, className, children, style, ...props },
  ref,
) {
  const active = useLiquidGlassEnabled(enabled)

  if (!active) {
    return (
      <div
        className={cx('ios27-optical-lens', 'is-disabled', className)}
        data-liquid-glass-lens="off"
        style={style}
      >
        {children}
      </div>
    )
  }

  return (
    <LiquidGlass
      ref={ref}
      {...opticalPresets[material]}
      {...props}
      style={style}
      data-liquid-glass-lens="on"
      className={cx('ios27-optical-lens', `ios27-optical-lens--${material}`, className)}
    >
      {children}
    </LiquidGlass>
  )
})

export interface ExternalLiquidGlassBackdropProps {
  material?: LiquidGlassMaterial
  enabled?: boolean
  radius?: number | 'auto'
  /** Only activate when the glass surface is outside the filtered source tree. */
  outsideSourceOnly?: boolean
}

/**
 * Registers the parent floating/control surface as a PallavAg lens over the
 * external live DOM supplied to LiquidGlassProvider.sourceRef. Nothing is
 * cloned or snapshotted: the provider's actual DOM element receives the SVG
 * displacement filter.
 *
 * Important: the glass surface itself must not be a descendant of `sourceRef`.
 * Filtering a source that contains the lens also refracts the lens/control and
 * creates duplicated / drifting geometry.
 */
export function ExternalLiquidGlassBackdrop({
  material = 'medium',
  enabled = true,
  radius,
  outsideSourceOnly = true,
}: ExternalLiquidGlassBackdropProps) {
  const anchorRef = React.useRef<HTMLSpanElement>(null)
  const { enabled: globalEnabled, sourceRef, registerExternalLens } = useLiquidGlass()

  React.useLayoutEffect(() => {
    const target = anchorRef.current?.parentElement
    const source = sourceRef?.current
    if (!enabled || !globalEnabled || !source || !target) return

    const insideSource = source.contains(target)
    if (insideSource) return
    if (outsideSourceOnly && !target.isConnected) return

    const options: ExternalLiquidGlassOptions = {
      ...externalOpticalPresets[material],
      ...(radius === undefined ? {} : { radius }),
    }

    const isGlassControl = target.matches('.ios27-btn--glass')
    if (isGlassControl) target.setAttribute('data-liquid-glass-ready', 'on')

    const unregister = registerExternalLens(target, options)

    return () => {
      if (isGlassControl) target.removeAttribute('data-liquid-glass-ready')
      unregister()
    }
  }, [enabled, globalEnabled, material, outsideSourceOnly, radius, registerExternalLens, sourceRef])

  return <span ref={anchorRef} className="ios27-external-glass-anchor" aria-hidden="true" />
}

export interface LiquidGlassBackdropProps extends React.HTMLAttributes<HTMLDivElement> {
  material?: LiquidGlassMaterial
}

/**
 * Standard component bridge to the external optical path. It activates only
 * when the component is rendered outside the provider's filtered source tree.
 */
export function LiquidGlassBackdrop({ material = 'medium' }: LiquidGlassBackdropProps) {
  return <ExternalLiquidGlassBackdrop material={material} radius={material === 'small' ? 'auto' : undefined} outsideSourceOnly />
}
