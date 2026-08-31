'use client'

import * as React from 'react'
import {
  LiquidGlass,
  type LiquidGlassHandle,
  type LiquidGlassProps,
  type LiquidGlassOptions,
} from 'liquid-glass-web-react'
import { useLiquidGlass, useLiquidGlassEnabled } from '../liquid-glass-provider'
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
    blur: 0,
    depth: 8,
    curvature: 0.58,
    glow: 0.08,
    edgeHighlight: 0.22,
    specular: 0.8,
  },
  medium: {
    strength: 0.065,
    chromaticAberration: 0.12,
    blur: 0,
    depth: 10,
    curvature: 0.65,
    glow: 0.1,
    edgeHighlight: 0.26,
    specular: 0.9,
  },
  large: {
    strength: 0.08,
    chromaticAberration: 0.15,
    blur: 0,
    depth: 12,
    curvature: 0.7,
    glow: 0.12,
    edgeHighlight: 0.3,
    specular: 1,
  },
}

/* External sources are usually much larger than a local lens container, so the
   strength is intentionally lower: PallavAg expresses strength relative to the
   filtered source footprint, not the lens width. */
const externalOpticalPresets: Record<LiquidGlassMaterial, Partial<LiquidGlassOptions>> = {
  small: {
    strength: 0.018,
    chromaticAberration: 0.08,
    blur: 0,
    depth: 7,
    curvature: 0.62,
    glow: 0.08,
    edgeHighlight: 0.24,
    specular: 0.78,
  },
  medium: {
    strength: 0.026,
    chromaticAberration: 0.12,
    blur: 0,
    depth: 10,
    curvature: 0.7,
    glow: 0.1,
    edgeHighlight: 0.28,
    specular: 0.9,
  },
  large: {
    strength: 0.032,
    chromaticAberration: 0.14,
    blur: 0,
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

export type ExternalLiquidGlassSourcePolicy = boolean | 'except-glass-controls'

export interface ExternalLiquidGlassBackdropProps {
  material?: LiquidGlassMaterial
  enabled?: boolean
  radius?: number | 'auto'
  /**
   * `true` only activates outside the source tree. `except-glass-controls`
   * keeps that protection for normal in-tree surfaces while allowing iOS 27
   * glass Buttons/IconButtons to refract the provider source as a control lens.
   */
  outsideSourceOnly?: ExternalLiquidGlassSourcePolicy
}

/**
 * Registers the parent floating/control surface as a PallavAg lens over the
 * external live DOM supplied to LiquidGlassProvider.sourceRef. Nothing is
 * cloned or snapshotted: the provider's actual DOM element receives the SVG
 * displacement filter.
 *
 * A provider source can only have one active PallavAg engine in the current
 * architecture. Glass controls therefore promote themselves when hovered,
 * focused or pressed; the most recently interacted control gets the optical
 * lens while the remaining controls retain their iOS 27 glass material.
 */
export function ExternalLiquidGlassBackdrop({
  material = 'medium',
  enabled = true,
  radius,
  outsideSourceOnly = false,
}: ExternalLiquidGlassBackdropProps) {
  const anchorRef = React.useRef<HTMLSpanElement>(null)
  const { enabled: globalEnabled, sourceRef, registerExternalLens } = useLiquidGlass()

  React.useLayoutEffect(() => {
    const target = anchorRef.current?.parentElement
    const source = sourceRef?.current
    if (!enabled || !globalEnabled || !source || !target) return

    const insideSource = source.contains(target)
    const isGlassControl = target.matches('.ios27-btn--glass')
    const allowInsideSource = outsideSourceOnly === 'except-glass-controls' && isGlassControl
    if (insideSource && outsideSourceOnly && !allowInsideSource) return

    const options: Partial<LiquidGlassOptions> = {
      ...externalOpticalPresets[material],
      ...(radius === undefined ? {} : { radius }),
    }

    let unregister = registerExternalLens(target, options)
    if (isGlassControl) target.setAttribute('data-external-liquid-glass', 'on')

    const promote = () => {
      unregister()
      unregister = registerExternalLens(target, options)
    }

    if (isGlassControl) {
      target.addEventListener('pointerenter', promote)
      target.addEventListener('pointerdown', promote)
      target.addEventListener('focusin', promote)
    }

    return () => {
      if (isGlassControl) {
        target.removeEventListener('pointerenter', promote)
        target.removeEventListener('pointerdown', promote)
        target.removeEventListener('focusin', promote)
        target.removeAttribute('data-external-liquid-glass')
      }
      unregister()
    }
  }, [enabled, globalEnabled, material, outsideSourceOnly, radius, registerExternalLens, sourceRef])

  return <span ref={anchorRef} className="ios27-external-glass-anchor" aria-hidden="true" />
}

export interface LiquidGlassBackdropProps extends React.HTMLAttributes<HTMLDivElement> {
  material?: LiquidGlassMaterial
}

/**
 * Compatibility path used by standard components. Portal surfaces can refract
 * the external live DOM as before; in-tree components stay protected from
 * self-filtering except glass Buttons/IconButtons, which are explicit optical
 * control lenses and promote on interaction.
 */
export function LiquidGlassBackdrop({ material = 'medium' }: LiquidGlassBackdropProps) {
  return <ExternalLiquidGlassBackdrop material={material} radius={material === 'small' ? 'auto' : undefined} outsideSourceOnly="except-glass-controls" />
}
