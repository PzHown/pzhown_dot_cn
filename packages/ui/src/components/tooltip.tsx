'use client'

import * as React from 'react'
import {
  OverlayArrow,
  Tooltip as TooltipPrimitive,
  TooltipTrigger as TooltipTriggerPrimitive,
} from 'react-aria-components'

import { cn } from '../lib/utils'
import { Button } from './button'

const TooltipDelayContext = React.createContext(250)

function TooltipProvider({ delay = 250, children }: { delay?: number; children?: React.ReactNode }) {
  return <TooltipDelayContext.Provider value={delay}>{children}</TooltipDelayContext.Provider>
}

function Tooltip({ delay, ...props }: React.ComponentProps<typeof TooltipTriggerPrimitive>) {
  const providerDelay = React.useContext(TooltipDelayContext)
  return <TooltipTriggerPrimitive data-slot="tooltip-root" delay={delay ?? providerDelay} {...props} />
}

function TooltipTrigger({ render, children }: { render?: React.ReactElement; children?: React.ReactNode }) {
  if (render) {
    return React.cloneElement(render as React.ReactElement<any>, { 'data-slot': 'tooltip-trigger' }, children)
  }
  if (React.isValidElement(children)) return children
  return <Button data-slot="tooltip-trigger">{children}</Button>
}

type TooltipContentProps = Omit<
  React.ComponentProps<typeof TooltipPrimitive>,
  'className' | 'placement' | 'offset' | 'crossOffset'
> & {
  className?: string
  placement?: React.ComponentProps<typeof TooltipPrimitive>['placement']
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
  alignOffset?: number
  offset?: number
  crossOffset?: number
}

function TooltipContent({
  className,
  placement,
  side = 'top',
  align = 'center',
  sideOffset,
  alignOffset,
  offset = 7,
  crossOffset = 0,
  children,
  ...props
}: TooltipContentProps) {
  const resolvedPlacement = placement ?? (`${side}${align === 'center' ? '' : ` ${align}`}` as TooltipContentProps['placement'])

  return (
    <TooltipPrimitive
      data-slot="tooltip-content"
      placement={resolvedPlacement}
      offset={sideOffset ?? offset}
      crossOffset={alignOffset ?? crossOffset}
      className={cn('pzhown-ui pzhown-tooltip-content tw:z-50 tw:w-fit tw:max-w-xs tw:px-2.5 tw:py-1.5 tw:text-xs tw:font-medium', className)}
      {...props}
    >
      {children}
      <OverlayArrow className="pzhown-tooltip-arrow">
        <svg width="8" height="5" viewBox="0 0 8 5" aria-hidden="true">
          <path d="M0 0 4 5 8 0" />
        </svg>
      </OverlayArrow>
    </TooltipPrimitive>
  )
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
