"use client"

import {
  Popover as PopoverPrimitive,
  PreviewTrigger as PreviewTriggerPrimitive,
  type PopoverProps as PopoverPrimitiveProps,
  type PreviewTriggerProps,
} from "react-aria-components"

import { cn } from "@pzhown/ui/lib/utils"

function HoverCardTrigger({ children, ...props }: PreviewTriggerProps) {
  return (
    <PreviewTriggerPrimitive data-slot="hover-card-trigger" {...props}>
      {children}
    </PreviewTriggerPrimitive>
  )
}

function HoverCard({
  className,
  placement = "bottom",
  offset = 4,
  crossOffset = 0,
  ...props
}: Omit<PopoverPrimitiveProps, "className"> & {
  className?: string
}) {
  return (
    <PopoverPrimitive
      data-slot="hover-card-content"
      placement={placement}
      offset={offset}
      crossOffset={crossOffset}
      className={cn(
        "pzhown-ui tw:z-50 tw:w-64 tw:origin-(--trigger-anchor-point) tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-entering:animate-in tw:data-entering:fade-in-0 tw:data-entering:zoom-in-95 tw:data-exiting:animate-out tw:data-exiting:fade-out-0 tw:data-exiting:zoom-out-95 tw:data-[placement=bottom]:slide-in-from-top-2 tw:data-[placement=left]:slide-in-from-right-2 tw:data-[placement=right]:slide-in-from-left-2 tw:data-[placement=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  )
}

export { HoverCard, HoverCardTrigger }
