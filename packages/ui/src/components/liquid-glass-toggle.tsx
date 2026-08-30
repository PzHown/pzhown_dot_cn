'use client'

import * as React from 'react'
import { useLiquidGlass } from '../liquid-glass-provider'
import { Switch, type SwitchProps } from './controls'

export interface LiquidGlassToggleProps extends Omit<SwitchProps, 'checked' | 'defaultChecked'> {
  label?: React.ReactNode
}

/** Switch bound to the nearest LiquidGlassProvider. */
export function LiquidGlassToggle({
  label = 'Liquid Glass',
  onCheckedChange,
  ...props
}: LiquidGlassToggleProps) {
  const { enabled, setEnabled } = useLiquidGlass()

  return (
    <Switch
      {...props}
      checked={enabled}
      label={label}
      onCheckedChange={(next) => {
        setEnabled(next)
        onCheckedChange?.(next)
      }}
    />
  )
}
