'use client'

import * as React from 'react'
import {
  composeRenderProps,
  Header as HeaderPrimitive,
  Menu as MenuPrimitive,
  MenuItem as MenuItemPrimitive,
  MenuSection as MenuSectionPrimitive,
  MenuTrigger as MenuTriggerPrimitive,
  Popover as PopoverPrimitive,
  Separator as SeparatorPrimitive,
  SubmenuTrigger as SubmenuTriggerPrimitive,
  type MenuItemProps as MenuItemPrimitiveProps,
  type MenuSectionProps as MenuSectionPrimitiveProps,
} from 'react-aria-components'
import { CheckIcon, ChevronRightIcon } from 'lucide-react'

import { cn } from '../lib/utils'
import { Button } from './button'

function DropdownMenu(props: React.ComponentProps<typeof MenuTriggerPrimitive>) {
  return <MenuTriggerPrimitive data-slot="dropdown-menu-root" {...props} />
}

function DropdownMenuPortal({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}

function DropdownMenuTrigger({ render, children }: { render?: React.ReactElement; children?: React.ReactNode }) {
  if (render) {
    return React.cloneElement(render as React.ReactElement<any>, { 'data-slot': 'dropdown-menu-trigger' }, children)
  }
  if (React.isValidElement(children)) return children
  return <Button data-slot="dropdown-menu-trigger">{children}</Button>
}

type DropdownMenuContentProps = Omit<
  React.ComponentProps<typeof MenuPrimitive<object>>,
  'className' | 'children'
> & {
  className?: string
  children?: React.ReactNode
  placement?: React.ComponentProps<typeof PopoverPrimitive>['placement']
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
  alignOffset?: number
  offset?: number
  crossOffset?: number
  'data-slot'?: string
}

function DropdownMenuContent({
  className,
  children,
  placement,
  side = 'bottom',
  align = 'start',
  sideOffset,
  alignOffset,
  offset = 6,
  crossOffset = 0,
  'data-slot': dataSlot = 'dropdown-menu-content',
  ...props
}: DropdownMenuContentProps) {
  const resolvedPlacement = placement ?? (`${side}${align === 'center' ? '' : ` ${align}`}` as DropdownMenuContentProps['placement'])

  return (
    <PopoverPrimitive
      data-slot={dataSlot}
      placement={resolvedPlacement}
      offset={sideOffset ?? offset}
      crossOffset={alignOffset ?? crossOffset}
      className={cn('pzhown-ui pzhown-dropdown-content tw:z-50 tw:min-w-44 tw:overflow-x-hidden tw:overflow-y-auto tw:p-1.5 tw:outline-none', className)}
    >
      <MenuPrimitive className="tw:max-h-[inherit] tw:overflow-x-hidden tw:overflow-y-auto tw:outline-none" {...props}>
        {children}
      </MenuPrimitive>
    </PopoverPrimitive>
  )
}

function DropdownMenuGroup({ ...props }: Omit<MenuSectionPrimitiveProps<object>, 'children'> & { children?: React.ReactNode }) {
  return <MenuSectionPrimitive data-slot="dropdown-menu-group" {...props} />
}

function DropdownMenuLabel({ className, inset, ...props }: React.ComponentProps<typeof HeaderPrimitive> & { inset?: boolean }) {
  return (
    <HeaderPrimitive
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn('pzhown-dropdown-label tw:px-2 tw:py-1.5 tw:text-xs tw:font-medium tw:data-[inset=true]:pl-8', className)}
      {...props}
    />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = 'default',
  children,
  ...props
}: MenuItemPrimitiveProps<object> & { inset?: boolean; variant?: 'default' | 'destructive' }) {
  return (
    <MenuItemPrimitive
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      textValue={typeof children === 'string' ? children : props.textValue}
      className={cn(
        'pzhown-dropdown-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-2 tw:px-2 tw:py-1.5 tw:outline-none tw:select-none tw:data-[inset=true]:pl-8 tw:[&_svg]:pointer-events-none tw:[&_svg]:size-4 tw:[&_svg]:shrink-0',
        className,
      )}
      {...props}
    >
      {children}
    </MenuItemPrimitive>
  )
}

function DropdownMenuSub(props: React.ComponentProps<typeof SubmenuTriggerPrimitive>) {
  return <SubmenuTriggerPrimitive data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuItemPrimitiveProps<object> & { inset?: boolean }) {
  return (
    <MenuItemPrimitive
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      textValue={typeof children === 'string' ? children : props.textValue}
      className={cn('pzhown-dropdown-item tw:flex tw:cursor-default tw:items-center tw:gap-2 tw:px-2 tw:py-1.5 tw:outline-none tw:select-none', className)}
      {...props}
      children={composeRenderProps(children, (resolvedChildren) => (
        <>
          {resolvedChildren}
          <ChevronRightIcon className="tw:ml-auto" />
        </>
      ))}
    />
  )
}

function DropdownMenuSubContent({ className, ...props }: DropdownMenuContentProps) {
  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      placement="end top"
      offset={0}
      crossOffset={-3}
      className={cn('tw:min-w-40', className)}
      {...props}
    />
  )
}

type CheckboxItemProps = MenuItemPrimitiveProps<object> & {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  inset?: boolean
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  onCheckedChange,
  inset,
  onAction,
  ...props
}: CheckboxItemProps) {
  return (
    <MenuItemPrimitive
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn('pzhown-dropdown-item tw:relative tw:flex tw:cursor-default tw:items-center tw:py-1.5 tw:pr-2 tw:pl-8 tw:outline-none tw:select-none', className)}
      onAction={() => {
        ;(onAction as (() => void) | undefined)?.()
        onCheckedChange?.(!checked)
      }}
      {...props}
      children={composeRenderProps(children, (resolvedChildren) => (
        <>
          <span className="tw:pointer-events-none tw:absolute tw:left-2 tw:flex tw:size-4 tw:items-center tw:justify-center">
            {checked ? <CheckIcon className="tw:size-4" /> : null}
          </span>
          {resolvedChildren}
        </>
      ))}
    />
  )
}

const DropdownMenuRadioContext = React.createContext<{ value?: string; onValueChange?: (value: string) => void }>({})

function DropdownMenuRadioGroup({ value, onValueChange, children }: { value?: string; onValueChange?: (value: string) => void; children?: React.ReactNode }) {
  return <DropdownMenuRadioContext.Provider value={{ value, onValueChange }}>{children}</DropdownMenuRadioContext.Provider>
}

function DropdownMenuRadioItem({
  className,
  children,
  value,
  onAction,
  ...props
}: Omit<MenuItemPrimitiveProps<object>, 'id'> & { value: string }) {
  const group = React.useContext(DropdownMenuRadioContext)
  const selected = group.value === value

  return (
    <MenuItemPrimitive
      id={value}
      data-slot="dropdown-menu-radio-item"
      className={cn('pzhown-dropdown-item tw:relative tw:flex tw:cursor-default tw:items-center tw:py-1.5 tw:pr-2 tw:pl-8 tw:outline-none tw:select-none', className)}
      onAction={() => {
        ;(onAction as (() => void) | undefined)?.()
        group.onValueChange?.(value)
      }}
      {...props}
      children={composeRenderProps(children, (resolvedChildren) => (
        <>
          <span className="tw:pointer-events-none tw:absolute tw:left-2 tw:flex tw:size-4 tw:items-center tw:justify-center">
            {selected ? <CheckIcon className="tw:size-4" /> : null}
          </span>
          {resolvedChildren}
        </>
      ))}
    />
  )
}

function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<typeof SeparatorPrimitive>) {
  return <SeparatorPrimitive data-slot="dropdown-menu-separator" className={cn('pzhown-dropdown-separator tw:-mx-1 tw:my-1 tw:h-px', className)} {...props} />
}

function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<'span'>) {
  return <span data-slot="dropdown-menu-shortcut" className={cn('pzhown-dropdown-shortcut tw:ml-auto tw:text-xs tw:tracking-widest', className)} {...props} />
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
