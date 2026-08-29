"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Group, type GroupProps } from "react-aria-components"

import { cn } from "@pzhown/ui/lib/utils"
import { Button } from "@pzhown/ui/components/button"
import { Input } from "@pzhown/ui/components/input"
import { Textarea } from "@pzhown/ui/components/textarea"

function InputGroup({ className, ...props }: GroupProps) {
  return (
    <Group
      data-slot="input-group"
      className={cn(
        "tw:group/input-group tw:relative tw:flex tw:h-11 tw:w-full tw:min-w-0 tw:items-center tw:outline-none tw:has-[>[data-align=block-end]]:h-auto tw:has-[>[data-align=block-end]]:flex-col tw:has-[>[data-align=block-start]]:h-auto tw:has-[>[data-align=block-start]]:flex-col tw:has-[>textarea]:h-auto tw:has-[>[data-align=block-end]]:[&>input]:pt-3 tw:has-[>[data-align=block-start]]:[&>input]:pb-3 tw:has-[>[data-align=inline-end]]:[&>input]:pr-2 tw:has-[>[data-align=inline-start]]:[&>input]:pl-2",
        className
      )}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  "tw:flex tw:h-auto tw:cursor-text tw:items-center tw:justify-center tw:gap-2 tw:py-2 tw:text-sm tw:font-medium tw:text-muted-foreground tw:select-none tw:group-data-[disabled=true]/input-group:opacity-50 tw:[&>kbd]:rounded-[calc(var(--radius)-4px)] tw:[&>svg:not([class*=size-])]:size-4",
  {
    variants: {
      align: {
        "inline-start": "tw:order-first tw:pl-3 tw:has-[>button]:pl-1",
        "inline-end": "tw:order-last tw:pr-3 tw:has-[>button]:pr-1",
        "block-start":
          "tw:order-first tw:w-full tw:justify-start tw:px-3 tw:pt-3 tw:group-has-[>input]/input-group:pt-3 tw:[.border-b]:pb-3",
        "block-end":
          "tw:order-last tw:w-full tw:justify-start tw:px-3 tw:pb-3 tw:group-has-[>input]/input-group:pb-3 tw:[.border-t]:pt-3",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return
        }
        e.currentTarget.parentElement?.querySelector<HTMLElement>("input, textarea")?.focus()
      }}
      {...props}
    />
  )
}

const inputGroupButtonVariants = cva(
  "tw:flex tw:items-center tw:gap-2 tw:text-sm tw:shadow-none",
  {
    variants: {
      size: {
        xs: "tw:h-9 tw:gap-1 tw:rounded-[calc(var(--radius)-4px)] tw:px-2 tw:[&>svg:not([class*=size-])]:size-4",
        sm: "tw:h-10 tw:px-3",
        "icon-xs":
          "tw:size-9 tw:rounded-[calc(var(--radius)-4px)] tw:p-0 tw:has-[>svg]:p-0",
        "icon-sm": "tw:size-10 tw:p-0 tw:has-[>svg]:p-0",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  }
)

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size" | "type"> &
  VariantProps<typeof inputGroupButtonVariants> & {
    type?: "button" | "submit" | "reset"
  }) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "tw:flex tw:items-center tw:gap-2 tw:text-sm tw:text-muted-foreground tw:[&_svg]:pointer-events-none tw:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "tw:h-full tw:flex-1 tw:rounded-none tw:border-0 tw:bg-transparent tw:shadow-none tw:ring-0 tw:focus-visible:ring-0 tw:disabled:bg-transparent tw:aria-invalid:ring-0 tw:dark:bg-transparent tw:dark:disabled:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "tw:flex-1 tw:resize-none tw:rounded-none tw:border-0 tw:bg-transparent tw:shadow-none tw:ring-0 tw:focus-visible:ring-0 tw:disabled:bg-transparent tw:aria-invalid:ring-0 tw:dark:bg-transparent tw:dark:disabled:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}
