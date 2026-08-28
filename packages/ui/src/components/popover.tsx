'use client'

import * as React from 'react'
import {
  DialogTrigger as DialogTriggerPrimitive,
  Heading,
  Popover as PopoverPrimitive,
  type DialogTriggerProps as DialogTriggerPrimitiveProps,
} from 'react-aria-components'

import { cn } from '../lib/utils'
import { Button } from './button'

type PopoverProps = Omit<DialogTriggerPrimitiveProps, 'isOpen'> & { open?: boolean }

function Popover({ open, ...props }: PopoverProps) {
  return <DialogTriggerPrimitive data-slot="popover-root" isOpen={open} {...props} />
}

function PopoverTrigger({ render, children }: { render?: React.ReactElement; children?: React.ReactNode }) {
  if (render) {
    return React.cloneElement(render as React.ReactElement<any>, { 'data-slot': 'popover-trigger' }, children)
  }
  if (React.isValidElement(children)) return children
  return <Button data-slot="popover-trigger">{children}</Button>
}

type PopoverContentProps = Omit<
  React.ComponentProps<typeof PopoverPrimitive>,
  'className' | 'placement' | 'offset' | 'crossOffset'
> & {
  className?: string
  placement?: React.ComponentProps<typeof PopoverPrimitive>['placement']
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
  alignOffset?: number
  offset?: number
  crossOffset?: number
}

function PopoverContent({
  className,
  placement,
  side = 'bottom',
  align = 'center',
  sideOffset,
  alignOffset,
  offset = 8,
  crossOffset = 0,
  ...props
}: PopoverContentProps) {
  const resolvedPlacement = placement ?? (`${side}${align === 'center' ? '' : ` ${align}`}` as PopoverContentProps['placement'])

  return (
    <PopoverPrimitive
      data-slot="popover-content"
      placement={resolvedPlacement}
      offset={sideOffset ?? offset}
      crossOffset={alignOffset ?? crossOffset}
      className={cn('pzhown-ui pzhown-popover-content tw:z-50 tw:w-72 tw:p-4 tw:outline-none', className)}
      {...props}
    />
  )
}

function PopoverHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="popover-header" className={cn('tw:flex tw:flex-col tw:gap-1', className)} {...props} />
}

function PopoverTitle({ className, ...props }: React.ComponentProps<typeof Heading>) {
  return <Heading data-slot="popover-title" className={cn('pzhown-popover-title', className)} {...props} />
}

function PopoverDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="popover-description" className={cn('pzhown-popover-description', className)} {...props} />
}

export { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger }
