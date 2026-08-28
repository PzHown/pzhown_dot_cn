'use client'

import * as React from 'react'
import { Menu as MenuPrimitive } from '@base-ui/react/menu'
import { CheckIcon, ChevronRightIcon } from 'lucide-react'

import { cn } from '../lib/utils'

function DropdownMenu(props: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal(props: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
}

function DropdownMenuTrigger(props: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

function DropdownMenuContent({
  align = 'start',
  alignOffset = 0,
  side = 'bottom',
  sideOffset = 6,
  className,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<MenuPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'>) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="tw:isolate tw:z-50 tw:outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            'pzhown-ui pzhown-dropdown-content tw:z-50 tw:min-w-44 tw:origin-[var(--transform-origin)] tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-xl tw:border tw:border-[var(--pzhown-ui-border)] tw:bg-[var(--pzhown-ui-surface)] tw:p-1.5 tw:text-sm tw:text-[var(--pzhown-ui-foreground)] tw:shadow-[var(--pzhown-ui-shadow)] tw:backdrop-blur-xl tw:outline-none',
            className,
          )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

function DropdownMenuGroup(props: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
}

function DropdownMenuLabel({ className, inset, ...props }: MenuPrimitive.GroupLabel.Props & { inset?: boolean }) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        'tw:px-2 tw:py-1.5 tw:text-xs tw:font-medium tw:text-[var(--pzhown-ui-muted-foreground)] tw:data-[inset=true]:pl-8',
        className,
      )}
      {...props}
    />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = 'default',
  ...props
}: MenuPrimitive.Item.Props & { inset?: boolean; variant?: 'default' | 'destructive' }) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        'pzhown-dropdown-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-2 tw:rounded-lg tw:px-2 tw:py-1.5 tw:outline-none tw:select-none tw:data-[inset=true]:pl-8 tw:data-[variant=destructive]:text-[var(--pzhown-ui-destructive)] tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:size-4 tw:[&_svg]:shrink-0',
        className,
      )}
      {...props}
    />
  )
}

function DropdownMenuSub(props: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props & { inset?: boolean }) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        'pzhown-dropdown-sub-trigger tw:flex tw:cursor-default tw:items-center tw:gap-2 tw:rounded-lg tw:px-2 tw:py-1.5 tw:outline-none tw:select-none tw:data-[inset=true]:pl-8 tw:[&_svg]:pointer-events-none tw:[&_svg]:size-4 tw:[&_svg]:shrink-0',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="tw:ml-auto" />
    </MenuPrimitive.SubmenuTrigger>
  )
}

function DropdownMenuSubContent({ className, ...props }: React.ComponentProps<typeof DropdownMenuContent>) {
  return <DropdownMenuContent data-slot="dropdown-menu-sub-content" className={cn('tw:min-w-40', className)} side="right" sideOffset={4} {...props} />
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: MenuPrimitive.CheckboxItem.Props & { inset?: boolean }) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        'pzhown-dropdown-item tw:relative tw:flex tw:cursor-default tw:items-center tw:rounded-lg tw:py-1.5 tw:pr-2 tw:pl-8 tw:outline-none tw:select-none tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50',
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="tw:pointer-events-none tw:absolute tw:left-2 tw:flex tw:size-4 tw:items-center tw:justify-center">
        <MenuPrimitive.CheckboxItemIndicator>
          <CheckIcon className="tw:size-4" />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup(props: MenuPrimitive.RadioGroup.Props) {
  return <MenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: MenuPrimitive.RadioItem.Props) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        'pzhown-dropdown-item tw:relative tw:flex tw:cursor-default tw:items-center tw:rounded-lg tw:py-1.5 tw:pr-2 tw:pl-8 tw:outline-none tw:select-none tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <span className="tw:pointer-events-none tw:absolute tw:left-2 tw:flex tw:size-4 tw:items-center tw:justify-center">
        <MenuPrimitive.RadioItemIndicator>
          <CheckIcon className="tw:size-4" />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  )
}

function DropdownMenuSeparator({ className, ...props }: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn('tw:-mx-1 tw:my-1 tw:h-px tw:bg-[var(--pzhown-ui-border)]', className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn('tw:ml-auto tw:text-xs tw:tracking-widest tw:text-[var(--pzhown-ui-muted-foreground)]', className)}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
}
