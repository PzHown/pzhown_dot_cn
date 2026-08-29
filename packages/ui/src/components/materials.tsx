'use client'

import * as React from 'react'
import { Glass, type GlassOptics, type GlassProps } from '@samasante/liquid-glass'
import { cx } from './shared'

export type LiquidGlassMaterial = 'small' | 'medium' | 'large'

/**
 * Material-mode optics stay intentionally close to the upstream GlassMaterial
 * defaults. These are floating surfaces, not magnifying lenses: the bend should
 * be readable at the rim without visibly warping the whole control.
 */
const materialOptics: Record<LiquidGlassMaterial, Partial<GlassOptics>> = {
  small: {
    strength: 0.035,
    depth: 0.42,
    curvature: 0.28,
    dispersion: 0.22,
    bend: 0.42,
    bendWidth: 0.18,
    sheen: 0.28,
    sheenWidth: 2.4,
    specular: 0.9,
    glow: 0.07,
    frost: 5,
    saturate: 1.12,
    brightness: 0,
  },
  medium: {
    strength: 0.045,
    depth: 0.48,
    curvature: 0.3,
    dispersion: 0.26,
    bend: 0.45,
    bendWidth: 0.17,
    sheen: 0.32,
    sheenWidth: 3,
    specular: 1,
    glow: 0.09,
    frost: 7,
    saturate: 1.15,
    brightness: 0,
  },
  large: {
    strength: 0.05,
    depth: 0.52,
    curvature: 0.32,
    dispersion: 0.28,
    bend: 0.46,
    bendWidth: 0.16,
    sheen: 0.34,
    sheenWidth: 3.2,
    specular: 1.05,
    glow: 0.1,
    frost: 9,
    saturate: 1.15,
    brightness: 0,
  },
}

export interface LiquidGlassSurfaceProps extends Omit<GlassProps, 'optics'> {
  material?: LiquidGlassMaterial
  optics?: Partial<GlassOptics>
}

/**
 * Optical material primitive for iOS 27 floating chrome.
 *
 * `@samasante/liquid-glass` owns refraction/displacement only; component
 * geometry, colour semantics and interaction remain owned by @pzhown/ui.
 */
export function LiquidGlassSurface({
  material = 'medium',
  optics,
  className,
  ...props
}: LiquidGlassSurfaceProps) {
  const resolvedOptics = React.useMemo(
    () => ({ ...materialOptics[material], ...optics }),
    [material, optics],
  )

  return (
    <Glass
      {...props}
      optics={resolvedOptics}
      className={cx('ios27-optical-glass', `ios27-optical-glass--${material}`, className)}
    />
  )
}

export type LiquidGlassBackdropProps = Omit<LiquidGlassSurfaceProps, 'children'>

/** Decorative, non-interactive optical layer placed behind crisp component UI. */
export function LiquidGlassBackdrop({
  material = 'medium',
  className,
  style,
  ...props
}: LiquidGlassBackdropProps) {
  return (
    <LiquidGlassSurface
      {...props}
      material={material}
      className={cx('ios27-optical-glass__backdrop', className)}
      style={{ pointerEvents: 'none', ...style }}
    />
  )
}
