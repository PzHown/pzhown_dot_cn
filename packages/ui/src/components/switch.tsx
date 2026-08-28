'use client'

import * as React from 'react'
import { Switch as SwitchPrimitive, type SwitchProps as SwitchPrimitiveProps } from 'react-aria-components'

import { cn } from '../lib/utils'

type SwitchProps = Omit<
  SwitchPrimitiveProps,
  'className' | 'children' | 'isSelected' | 'defaultSelected' | 'onChange'
> & {
  className?: string
  children?: React.ReactNode
  size?: 'sm' | 'default'
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  isSelected?: boolean
  defaultSelected?: boolean
  onChange?: (checked: boolean) => void
}

function Switch({
  className,
  size = 'default',
  children,
  checked,
  defaultChecked,
  onCheckedChange,
  isSelected,
  defaultSelected,
  onChange,
  ...props
}: SwitchProps) {
  return (
    <SwitchPrimitive
      data-slot="switch"
      data-size={size}
      isSelected={isSelected ?? checked}
      defaultSelected={defaultSelected ?? defaultChecked}
      onChange={(value) => {
        onChange?.(value)
        onCheckedChange?.(value)
      }}
      className={cn(
        'pzhown-ui pzhown-switch tw:relative tw:inline-flex tw:shrink-0 tw:items-center tw:outline-none tw:data-[size=default]:h-6 tw:data-[size=default]:w-10 tw:data-[size=sm]:h-5 tw:data-[size=sm]:w-8',
        className,
      )}
      {...props}
    >
      <span data-slot="switch-thumb" className="pzhown-switch-thumb tw:pointer-events-none tw:block" />
      {children}
    </SwitchPrimitive>
  )
}

export { Switch }
