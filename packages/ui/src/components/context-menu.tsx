"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import {
  composeRenderProps,
  Header as HeaderPrimitive,
  MenuItem as MenuItemPrimitive,
  Menu as MenuPrimitive,
  MenuSection as MenuSectionPrimitive,
  MenuTrigger as MenuTriggerPrimitive,
  Popover as PopoverPrimitive,
  Separator as SeparatorPrimitive,
  SubmenuTrigger as SubmenuTriggerPrimitive,
  type MenuItemProps as MenuItemPrimitiveProps,
  type MenuSectionProps as MenuSectionPrimitiveProps,
} from "react-aria-components"

import { cn } from "@pzhown/ui/lib/utils"
import { CheckIcon, ChevronRightIcon } from "lucide-react"

function ContextMenu({
  "data-slot": dataSlot = "context-menu-content",
  placement = "bottom start",
  offset = 4,
  crossOffset = 0,
  className,
  children,
  ...props
}: Omit<
  React.ComponentProps<typeof MenuPrimitive<object>>,
  "children" | "className"
> &
  Pick<
    React.ComponentProps<typeof PopoverPrimitive>,
    "placement" | "offset" | "crossOffset"
  > & {
    "data-slot"?: string
    className?: string
    children?: React.ReactNode
  }) {
  return (
    <PopoverPrimitive
      data-slot={dataSlot}
      placement={placement}
      offset={offset}
      crossOffset={crossOffset}
      className={cn("pzhown-ui tw:z-50 tw:w-(--trigger-width) tw:min-w-36 tw:origin-(--trigger-anchor-point) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:data-entering:animate-in tw:data-entering:fade-in-0 tw:data-entering:zoom-in-95 tw:data-exiting:animate-out tw:data-exiting:overflow-hidden tw:data-exiting:fade-out-0 tw:data-exiting:zoom-out-95 tw:data-[placement=bottom]:slide-in-from-top-2 tw:data-[placement=left]:slide-in-from-right-2 tw:data-[placement=right]:slide-in-from-left-2 tw:data-[placement=top]:slide-in-from-bottom-2 tw:**:data-[slot$=-item]:data-focused:bg-foreground/10", className )}
    >
      <MenuPrimitive
        className="tw:max-h-[inherit] tw:overflow-x-hidden tw:overflow-y-auto tw:outline-hidden"
        {...props}
      >
        {children}
      </MenuPrimitive>
    </PopoverPrimitive>
  )
}

function ContextMenuTrigger({
  ...props
}: Omit<React.ComponentProps<typeof MenuTriggerPrimitive>, "trigger">) {
  return (
    <MenuTriggerPrimitive
      data-slot="context-menu"
      trigger="contextMenu"
      {...props}
    />
  )
}

function ContextMenuGroup({
  ...props
}: Omit<MenuSectionPrimitiveProps<object>, "children"> & {
  children?: React.ReactNode
}) {
  return <MenuSectionPrimitive data-slot="context-menu-group" {...props} />
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof HeaderPrimitive> & {
  inset?: boolean
}) {
  return (
    <HeaderPrimitive
      data-slot="context-menu-label"
      data-inset={inset}
      className={cn(
        "tw:px-1.5 tw:py-1 tw:text-xs tw:font-medium tw:text-muted-foreground tw:data-inset:pl-7",
        className
      )}
      {...props}
    />
  )
}

const contextMenuItemVariants = cva(
  "tw:group/context-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:outline-hidden tw:select-none tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0",
  {
    variants: {
      selectionMode: {
        none: "tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:pl-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:[&_svg:not([class*=size-])]:size-4 tw:focus:*:[svg]:text-accent-foreground tw:data-[variant=destructive]:*:[svg]:text-destructive",
        single:
          "tw:gap-1.5 tw:rounded-md tw:py-1 tw:pr-8 tw:pl-1.5 tw:text-sm tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:pl-7 tw:[&_svg:not([class*=size-])]:size-4",
        multiple:
          "tw:gap-1.5 tw:rounded-md tw:py-1 tw:pr-8 tw:pl-1.5 tw:text-sm tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:pl-7 tw:[&_svg:not([class*=size-])]:size-4",
      },
    },
  }
)

function ContextMenuItem({
  className,
  inset,
  variant = "default",
  children,
  ...props
}: MenuItemPrimitiveProps<object> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <MenuItemPrimitive
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      textValue={typeof children === "string" ? children : props.textValue}
      className={composeRenderProps(className, (className, { selectionMode }) =>
        cn(contextMenuItemVariants({ selectionMode }), className)
      )}
      {...props}
    >
      {composeRenderProps(
        children,
        (children, { isSelected, selectionMode }) => (
          <>
            {selectionMode !== "none" ? (
              <span
                className="tw:pointer-events-none tw:absolute tw:right-2"
                data-slot={
                  selectionMode === "single"
                    ? "context-menu-radio-item-indicator"
                    : "context-menu-checkbox-item-indicator"
                }
              >
                {isSelected ? (
                  <CheckIcon
                  />
                ) : null}
              </span>
            ) : null}
            {children}
          </>
        )
      )}
    </MenuItemPrimitive>
  )
}

function ContextMenuSub({
  ...props
}: React.ComponentProps<typeof SubmenuTriggerPrimitive>) {
  return <SubmenuTriggerPrimitive data-slot="context-menu-sub" {...props} />
}

function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuItemPrimitiveProps<object> & {
  inset?: boolean
}) {
  return (
    <MenuItemPrimitive
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      textValue={typeof children === "string" ? children : props.textValue}
      className={cn(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:pl-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      {...props}
    >
      {composeRenderProps(children, (children) => (
        <>
          {children}
          <ChevronRightIcon className="tw:ml-auto" />
        </>
      ))}
    </MenuItemPrimitive>
  )
}

function ContextMenuSubContent({
  placement = "end top",
  crossOffset = -3,
  offset = 0,
  className,
  ...props
}: React.ComponentProps<typeof ContextMenu>) {
  return (
    <ContextMenu
      data-slot="context-menu-sub-content"
      className={cn("tw: tw: tw:w-auto tw:min-w-32 tw:rounded-lg tw:border tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:duration-100", className )}
      placement={placement}
      crossOffset={crossOffset}
      offset={offset}
      {...props}
    />
  )
}

function ContextMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive>) {
  return (
    <SeparatorPrimitive
      data-slot="context-menu-separator"
      className={cn("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", className)}
      {...props}
    />
  )
}

function ContextMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(
        "tw:ml-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-focus/context-menu-item:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
}
