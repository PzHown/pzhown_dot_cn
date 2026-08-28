export type ProgressiveBlurMode = 'linear' | 'radial'
export type ProgressiveBlurSide = 'top' | 'right' | 'bottom' | 'left'

export interface ProgressiveBlurOptions {
  mode?: ProgressiveBlurMode
  side?: ProgressiveBlurSide
  strength?: number
  steps?: number
  falloff?: number
  tint?: string
}

export interface ProgressiveBlurLayer {
  blur: number
  mask: string
}

export interface ProgressiveBlurModel {
  tintBackground: string
  layers: ProgressiveBlurLayer[]
}

const directions: Record<ProgressiveBlurSide, string> = {
  top: 'to bottom',
  right: 'to left',
  bottom: 'to top',
  left: 'to right',
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

const formatPercent = (value: number) => `${clamp(value, 0, 100).toFixed(3)}%`

const buildStops = (index: number, start: number, segment: number) => {
  if (index === 0) {
    return `#000 ${formatPercent(start)}, transparent ${formatPercent(start + segment)}`
  }

  if (index === 1) {
    return `#000 ${formatPercent(start)}, #000 ${formatPercent(start + segment)}, transparent ${formatPercent(start + segment * 2)}`
  }

  const fadeIn = start + (index - 2) * segment
  const opaqueStart = start + (index - 1) * segment
  const opaqueEnd = start + index * segment
  const fadeOut = start + (index + 1) * segment

  return `transparent ${formatPercent(fadeIn)}, #000 ${formatPercent(opaqueStart)}, #000 ${formatPercent(opaqueEnd)}, transparent ${formatPercent(fadeOut)}`
}

const buildBlur = (strength: number, index: number, steps: number) => {
  if (strength === 0 || steps === 1) return strength

  const floor = Math.min(0.5, strength)
  const progress = index / (steps - 1)
  return strength * Math.pow(floor / strength, progress)
}

export function createProgressiveBlurModel(
  options: ProgressiveBlurOptions = {},
): ProgressiveBlurModel {
  const mode = options.mode ?? 'linear'
  const side = options.side ?? 'top'
  const strength = clamp(options.strength ?? 64, 0, 256)
  const steps = Math.round(clamp(options.steps ?? 8, 1, 16))
  const falloff = clamp(options.falloff ?? 100, 1, 100)
  const tint = options.tint ?? 'transparent'
  const start = 100 - falloff
  const segment = falloff / steps
  const direction = directions[side]

  const layers = Array.from({ length: steps }, (_, index) => {
    const stops = buildStops(index, start, segment)
    const mask =
      mode === 'radial'
        ? `radial-gradient(closest-side at center, ${stops})`
        : `linear-gradient(${direction}, ${stops})`

    return {
      blur: buildBlur(strength, index, steps),
      mask,
    }
  })

  const tintBackground =
    mode === 'radial'
      ? `radial-gradient(closest-side at center, ${tint} 0%, transparent 100%)`
      : `linear-gradient(${direction}, ${tint} 0%, transparent 100%)`

  return { tintBackground, layers }
}
