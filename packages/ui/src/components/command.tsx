"use client"

import * as React from "react"
import {
  Autocomplete,
  Collection,
  composeRenderProps,
  Header,
  Menu,
  MenuItem,
  MenuSection,
  SearchField,
  Separator,
  useFilter,
  type AutocompleteProps,
  type InputProps,
  type MenuItemProps,
  type MenuProps,
  type MenuSectionProps,
  type SeparatorProps,
} from "react-aria-components"

import { cn } from "@pzhown/ui/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@pzhown/ui/components/dialog"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@pzhown/ui/components/input-group"
import { SearchIcon, CheckIcon } from "lucide-react"

function Command({
  className,
  dir,
  style,
  ...props
}: Omit<AutocompleteProps, "className" | "style"> & {
  className?: string
  dir?: React.HTMLAttributes<HTMLDivElement>["dir"]
  style?: React.CSSProperties
}) {
  const { contains } = useFilter({ sensitivity: "base" })
  return (
    <div
      data-slot="command"
      dir={dir}
      className={cn(
        "tw:flex tw:size-full tw:flex-col tw:overflow-hidden tw:rounded-xl! tw:bg-popover tw:p-1 tw:text-popover-foreground",
        className
      )}
      style={style}
    >
      <Autocomplete {...props} filter={props.filter || contains}>
        {props.children}
      </Autocomplete>
    </div>
  )
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  open,
  onOpenChange,
  className,
  showCloseButton = false,
  ...props
}: Omit<
  React.ComponentProps<typeof Dialog>,
  "children" | "className" | "open" | "onOpenChange"
> & {
  title?: string
  description?: string
  open?: boolean
  onOpenChange?: (isOpen: boolean) => void
  className?: string
  showCloseButton?: boolean
  children: React.ReactNode
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} {...props}>
      <DialogContent
        className={cn(
          "tw:top-1/3 tw:translate-y-0 tw:overflow-hidden tw:rounded-xl! tw:p-0",
          className
        )}
        showCloseButton={showCloseButton}
        isDismissable
      >
        <DialogHeader className="tw:sr-only">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({ className, ...props }: InputProps) {
  return (
    <SearchField
      autoFocus
      aria-label={props.placeholder || "Search"}
      data-slot="command-input-wrapper"
      className="tw:p-1 tw:pb-0"
    >
      <InputGroup className="tw:h-10 tw:shadow-none!">
        <InputGroupInput
          {...props}
          data-slot="input-group-control"
          className={cn(
            "tw:[&::-webkit-search-cancel-button]:hidden",
            className
          )}
        />
        <InputGroupAddon>
          <SearchIcon className="tw:size-4 tw:shrink-0 tw:opacity-50" />
        </InputGroupAddon>
      </InputGroup>
    </SearchField>
  )
}

function CommandList<T extends object>({ className, ...props }: MenuProps<T>) {
  return (
    <Menu
      {...props}
      data-slot="command-list"
      className={cn(
        "tw:no-scrollbar tw:max-h-72 tw:scroll-py-1 tw:overflow-x-hidden tw:overflow-y-auto tw:outline-none",
        className
      )}
    />
  )
}

function CommandEmpty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="command-empty"
      className={cn("tw:py-6 tw:text-center tw:text-sm", className)}
      {...props}
    />
  )
}

function CommandGroup<T extends object>({
  className,
  children,
  items,
  heading,
  ...props
}: MenuSectionProps<T> & { heading?: string }) {
  return (
    <MenuSection
      data-slot="command-group"
      className={cn(
        "tw:overflow-hidden tw:p-1 tw:text-foreground tw:**:[[cmdk-group-heading]]:px-2 tw:**:[[cmdk-group-heading]]:py-1.5 tw:**:[[cmdk-group-heading]]:text-xs tw:**:[[cmdk-group-heading]]:font-medium tw:**:[[cmdk-group-heading]]:text-muted-foreground",
        className
      )}
      {...props}
    >
      {heading && <Header cmdk-group-heading="">{heading}</Header>}
      <Collection items={items}>{children}</Collection>
    </MenuSection>
  )
}

function CommandSeparator({ className, ...props }: SeparatorProps) {
  return (
    <Separator
      data-slot="command-separator"
      className={cn("tw:-mx-1 tw:h-px tw:bg-border", className)}
      {...props}
    />
  )
}

function CommandItem<T extends object>({
  className,
  children,
  textValue,
  ...props
}: MenuItemProps<T>) {
  return (
    <MenuItem
      {...props}
      data-slot="command-item"
      className={cn(
        "tw:group/command-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-2 tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:in-data-[slot=dialog-content]:rounded-lg! tw:data-focused:bg-muted tw:data-focused:text-foreground tw:data-[disabled=true]:pointer-events-none tw:data-[disabled=true]:opacity-50 tw:data-selected:bg-muted tw:data-selected:text-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-focused:*:[svg]:text-foreground tw:data-selected:*:[svg]:text-foreground",
        className
      )}
      textValue={
        textValue || (typeof children === "string" ? children : undefined)
      }
    >
      {composeRenderProps(children, (children) => (
        <>
          {children}
          <CheckIcon className="tw:ml-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" />
        </>
      ))}
    </MenuItem>
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "tw:ml-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-data-focused/command-item:text-foreground tw:group-data-selected/command-item:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
