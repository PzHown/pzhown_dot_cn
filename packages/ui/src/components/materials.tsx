'use client'

import * as React from 'react'
import { Glass, type GlassOptics, type GlassProps } from '@samasante/liquid-glass'
import { cx } from './shared'

export type LiquidGlassMaterial = 'small' | 'medium' | 'large'

const materialOptics: Record<LiquidGlassMaterial, Partial<GlassOptics>> = {
  small: {
    strength: 0.09,
    depth: 0.9,
    curvature: 0.42,
    dispersion: 0.12,
    bend: 0.34,
    bendWidth: 0.06,
    sheen: 0.9,
    sheenWidth: 2.2,
    specular: 1.25,
    glow: 0.06,
    frost: 0.6,
    brightness: 0,
  },
  medium: {
    strength: 0.12,
    depth: 0.93,
    curvature: 0.46,
    dispersion: 0.16,
    bend: 0.38,
    bendWidth: 0.065,
    sheen: 1.05,
    sheenWidth: 2.8,
    specular: 1.4,
    glow: 0.08,
    frost: 0.8,
    brightness: 0,
  },
  large: {
    strength: 0.14,
    depth: 0.95,
    curvature: 0.5,
    dispersion: 0.2,
    bend: 0.4,
    bendWidth: 0.07,
    sheen: 1.2,
    sheenWidth: 3.5,
    specular: 1.6,
    glow: 0.1,
    frost: 1,
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
