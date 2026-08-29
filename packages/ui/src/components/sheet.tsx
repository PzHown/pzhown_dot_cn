"use client"

import * as React from "react"
import {
  Heading,
  ModalOverlay as ModalOverlayPrimitive,
  Modal as ModalPrimitive,
  Dialog as SheetPrimitive,
  DialogTrigger as SheetTriggerPrimitive,
  type ModalOverlayProps as ModalOverlayPrimitiveProps,
  type DialogProps as SheetPrimitiveProps,
  type DialogTriggerProps as SheetTriggerPrimitiveProps,
} from "react-aria-components"

import { cn } from "@pzhown/ui/lib/utils"
import { Button } from "@pzhown/ui/components/button"
import { XIcon } from "lucide-react"

function SheetTrigger({ ...props }: SheetTriggerPrimitiveProps) {
  return <SheetTriggerPrimitive data-slot="sheet-trigger" {...props} />
}

function SheetClose({
  className,
  variant = "outline",
  size = "default",
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      slot="close"
      data-slot="sheet-close"
      variant={variant}
      size={size}
      className={cn(className)}
      {...props}
    />
  )
}

function SheetOverlay({
  className,
  children,
  ...props
}: Omit<ModalOverlayPrimitiveProps, "className" | "children"> & {
  className?: string
  children: React.ReactNode
}) {
  return (
    <ModalOverlayPrimitive
      data-slot="sheet-overlay"
      isDismissable
      className={cn(
        "pzhown-ui tw:fixed tw:inset-0 tw:z-50 tw:bg-black/10 tw:transition-opacity tw:duration-150 tw:data-entering:opacity-0 tw:data-exiting:opacity-0 tw:supports-backdrop-filter:backdrop-blur-xs",
        className
      )}
      {...props}
    >
      {children}
    </ModalOverlayPrimitive>
  )
}

function Sheet({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: Omit<ModalOverlayPrimitiveProps, "className" | "children"> &
  Pick<React.ComponentProps<typeof ModalPrimitive>, "isDismissable"> & {
    className?: string
    children: React.ReactNode
    side?: "top" | "right" | "bottom" | "left"
    showCloseButton?: boolean
  }) {
  return (
    <SheetOverlay {...props}>
      <ModalPrimitive
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          "tw:fixed tw:z-50 tw:flex tw:flex-col tw:gap-4 tw:bg-popover tw:bg-clip-padding tw:text-sm tw:text-popover-foreground tw:shadow-lg tw:transition tw:duration-200 tw:ease-in-out tw:data-entering:opacity-0 tw:data-exiting:opacity-0 tw:data-[side=bottom]:inset-x-0 tw:data-[side=bottom]:bottom-0 tw:data-[side=bottom]:h-auto tw:data-[side=bottom]:border-t tw:data-[side=bottom]:data-entering:translate-y-[2.5rem] tw:data-[side=bottom]:data-exiting:translate-y-[2.5rem] tw:data-[side=left]:inset-y-0 tw:data-[side=left]:left-0 tw:data-[side=left]:h-full tw:data-[side=left]:w-3/4 tw:data-[side=left]:border-r tw:data-[side=left]:data-entering:translate-x-[-2.5rem] tw:data-[side=left]:data-exiting:translate-x-[-2.5rem] tw:data-[side=right]:inset-y-0 tw:data-[side=right]:right-0 tw:data-[side=right]:h-full tw:data-[side=right]:w-3/4 tw:data-[side=right]:border-l tw:data-[side=right]:data-entering:translate-x-[2.5rem] tw:data-[side=right]:data-exiting:translate-x-[2.5rem] tw:data-[side=top]:inset-x-0 tw:data-[side=top]:top-0 tw:data-[side=top]:h-auto tw:data-[side=top]:border-b tw:data-[side=top]:data-entering:translate-y-[-2.5rem] tw:data-[side=top]:data-exiting:translate-y-[-2.5rem] tw:data-[side=left]:sm:max-w-sm tw:data-[side=right]:sm:max-w-sm",
          className
        )}
      >
        <SheetPrimitive
          data-slot="sheet"
          className="tw:[display:inherit] tw:h-full tw:max-h-[inherit] tw:[flex-direction:inherit] tw:[gap:inherit] tw:outline-none"
        >
          {children}
          {showCloseButton && (
            <SheetClose
              variant="ghost"
              className="tw:absolute tw:top-2 tw:right-2 tw:size-11 tw:rounded-full tw:text-muted-foreground hover:tw:text-foreground"
              size="icon-sm"
              aria-label="Close"
            >
              <XIcon className="tw:size-[18px]" />
              <span className="tw:sr-only">Close</span>
            </SheetClose>
          )}
        </SheetPrimitive>
      </ModalPrimitive>
    </SheetOverlay>
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof Sheet> & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
}) {
  return (
    <Sheet
      className={className}
      side={side}
      showCloseButton={showCloseButton}
      {...props}
    >
      {children}
    </Sheet>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("tw:flex tw:flex-col tw:gap-0.5 tw:p-4 tw:pr-16", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("tw:mt-auto tw:flex tw:flex-col tw:gap-2 tw:p-4", className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Heading>, "slot">) {
  return (
    <Heading
      slot="title"
      data-slot="sheet-title"
      className={cn(
        "tw:text-base tw:font-medium tw:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "slot">) {
  return (
    <div
      data-slot="sheet-description"
      className={cn("tw:text-sm tw:text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  type SheetPrimitiveProps,
  type SheetTriggerPrimitiveProps,
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
