import type { CSSProperties, HTMLAttributes } from 'react'

import { createProgressiveBlurModel, type ProgressiveBlurOptions } from './core'

export type ProgressiveBlurProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
  ProgressiveBlurOptions

type CustomProperties = CSSProperties & Record<`--pzhown-pb-${string}`, string>

export function ProgressiveBlur({
  mode = 'linear',
  side = 'top',
  strength = 64,
  steps = 8,
  falloff = 100,
  tint = 'transparent',
  className,
  style,
  ...props
}: ProgressiveBlurProps) {
  const model = createProgressiveBlurModel({ mode, side, strength, steps, falloff, tint })
  const rootStyle: CustomProperties = {
    ...style,
    '--pzhown-pb-tint': model.tintBackground,
  }

  return (
    <div
      {...props}
      aria-hidden="true"
      className={['pzhown-progressive-blur', className].filter(Boolean).join(' ')}
      data-progressive-blur={mode}
      style={rootStyle}
    >
      <div className="pzhown-progressive-blur__tint" />
      {model.layers.map((layer, index) => {
        const layerStyle: CustomProperties = {
          '--pzhown-pb-blur': `${layer.blur.toFixed(3)}px`,
          '--pzhown-pb-mask': layer.mask,
        }

        return <div className="pzhown-progressive-blur__layer" key={index} style={layerStyle} />
      })}
    </div>
  )
}

export default ProgressiveBlur
