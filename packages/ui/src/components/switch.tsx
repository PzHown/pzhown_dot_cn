'use client'

import { Switch as SwitchPrimitive } from '@base-ui/react/switch'

import { cn } from '../lib/utils'

function Switch({
  className,
  size = 'default',
  ...props
}: SwitchPrimitive.Root.Props & { size?: 'sm' | 'default' }) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        'pzhown-ui pzhown-switch tw:relative tw:inline-flex tw:shrink-0 tw:cursor-default tw:items-center tw:rounded-full tw:outline-none tw:transition-colors tw:data-[size=default]:h-5 tw:data-[size=default]:w-9 tw:data-[size=sm]:h-4 tw:data-[size=sm]:w-7 tw:focus-visible:ring-3 tw:focus-visible:ring-[var(--pzhown-ui-ring)] tw:data-disabled:cursor-not-allowed tw:data-disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pzhown-switch-thumb tw:pointer-events-none tw:block tw:size-4 tw:rounded-full tw:transition-transform"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
