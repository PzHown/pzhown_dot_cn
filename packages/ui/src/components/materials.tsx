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

type PallavOptics = Pick<
  LiquidGlassProps,
  | 'strength'
  | 'chromaticAberration'
  | 'blur'
  | 'depth'
  | 'curvature'
  | 'splay'
  | 'glow'
  | 'glowSpread'
  | 'glowExponent'
  | 'edgeHighlight'
  | 'edgeWidth'
  | 'edgeExponent'
  | 'specular'
  | 'specularAngle'
  | 'quality'
>

/**
 * PallavAg upstream DEFAULT_OPTIONS as the optical baseline. The project
 * intentionally overrides only `blur` to 3.0 for all real optical profiles.
 */
const PALLAV_DEFAULT: PallavOptics = {
  strength: 0.1,
  chromaticAberration: 0.2,
  blur: 3.0,
  depth: 10,
  curvature: 0.65,
  splay: 1,
  glow: 0.1,
  glowSpread: 1,
  glowExponent: 1.5,
  edgeHighlight: 0.25,
  edgeWidth: 3,
  edgeExponent: 1.5,
  specular: 1,
  specularAngle: 45,
  quality: 512,
}

/**
 * PallavAg demo's resting selection/pill profile. The demo raises only
 * strength/chromaticAberration while actively dragging; ordinary hover/focus
 * must not mutate the optical profile in @pzhown/ui.
 */
const PALLAV_SELECTION_REST: PallavOptics = {
  ...PALLAV_DEFAULT,
  strength: 0.02,
  chromaticAberration: 0.25,
  curvature: 0.85,
  depth: 8,
  glow: 0.15,
  edgeHighlight: 0.35,
}

/** Local explicit lenses follow PallavAg's own recommended profiles. */
const opticalPresets: Record<LiquidGlassMaterial, PallavOptics> = {
  small: PALLAV_SELECTION_REST,
  medium: PALLAV_DEFAULT,
  large: PALLAV_DEFAULT,
}

/**
 * External component glass uses the same upstream optical model. Small
 * controls map directly to PallavAg's selection/pill demo. Readable floating
 * surfaces start from DEFAULT_OPTIONS but use the demo's resting strength
 * (0.02) because the filtered source is a viewport-sized live DOM rather than
 * a small self-contained lens container. No other optical personality values
 * are customized by material size.
 */
const externalOpticalPresets: Record<LiquidGlassMaterial, ExternalLiquidGlassOptions> = {
  small: PALLAV_SELECTION_REST,
  medium: {
    ...PALLAV_DEFAULT,
    strength: PALLAV_SELECTION_REST.strength,
  },
  large: {
    ...PALLAV_DEFAULT,
    strength: PALLAV_SELECTION_REST.strength,
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
