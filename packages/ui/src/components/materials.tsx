'use client'

import * as React from 'react'
import {
  LiquidGlass,
  type LiquidGlassHandle,
  type LiquidGlassProps,
} from 'liquid-glass-web-react'
import { cx } from './shared'

export type LiquidGlassMaterial = 'small' | 'medium' | 'large'

/**
 * PallavAg is used only for explicit optical lenses. These presets keep the
 * lens restrained so the iOS 27 visual system still owns geometry, colour,
 * blur, shadow and component state.
 */
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

export interface LiquidGlassSurfaceProps extends LiquidGlassProps {
  material?: LiquidGlassMaterial
}

/**
 * Explicit live-DOM refraction lens powered by PallavAg/liquid-glass-web-react.
 *
 * Important: this is not the default material implementation for iOS 27
 * controls. The iOS 27 component library uses its native tint + backdrop blur +
 * shadow recipe. Use this primitive only where real displacement is intentional.
 */
export const LiquidGlassSurface = React.forwardRef<
  LiquidGlassHandle,
  LiquidGlassSurfaceProps
>(function LiquidGlassSurface(
  { material = 'medium', className, children, ...props },
  ref,
) {
  return (
    <LiquidGlass
      ref={ref}
      {...opticalPresets[material]}
      {...props}
      className={cx('ios27-optical-lens', `ios27-optical-lens--${material}`, className)}
    >
      {children}
    </LiquidGlass>
  )
})

export interface LiquidGlassBackdropProps extends React.HTMLAttributes<HTMLDivElement> {
  material?: LiquidGlassMaterial
}

/**
 * Compatibility shim for components created while the old optical engine was
 * embedded as a backdrop child. Standard iOS 27 components now draw their
 * material directly in CSS, matching ios27-design-system, so no extra layer is
 * rendered here. New components should not add this shim.
 */
export function LiquidGlassBackdrop(_props: LiquidGlassBackdropProps) {
  return null
}
