"use client"

import {
  Checkbox as CheckboxPrimitive,
  composeRenderProps,
  type CheckboxProps,
} from "react-aria-components"

import { cn } from "@pzhown/ui/lib/utils"
import { CheckIcon } from "lucide-react"

function Checkbox({ className, children, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive
      data-slot="checkbox"
      className={cn(
        "tw:peer tw:relative tw:flex tw:size-4 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-[4px] tw:border tw:border-input tw:transition-colors tw:outline-none tw:group-has-disabled/field:opacity-50 tw:group-has-[:focus-visible]/field-label:ring-0 tw:group-has-[:focus-visible]/field-label:not-data-checked:border-input tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:data-focus-visible:border-ring tw:data-focus-visible:ring-3 tw:data-focus-visible:ring-ring/50 tw:data-invalid:border-destructive tw:data-invalid:ring-3 tw:data-invalid:ring-destructive/20 tw:data-[disabled]:cursor-not-allowed tw:data-[disabled]:opacity-50 tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:dark:data-invalid:border-destructive/50 tw:dark:data-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:group-has-[:focus-visible]/field-label:data-checked:border-primary tw:dark:data-checked:bg-primary tw:data-selected:border-primary tw:data-selected:bg-primary tw:data-selected:text-primary-foreground tw:data-invalid:data-selected:border-primary tw:dark:data-selected:bg-primary",
        className
      )}
      {...props}
    >
      {composeRenderProps(
        children,
        (children, { isSelected, isIndeterminate }) => (
          <>
            <span
              data-slot="checkbox-indicator"
              className="tw:grid tw:place-content-center tw:text-current tw:transition-none tw:[&>svg]:size-3.5"
            >
              {(isSelected || isIndeterminate) && (
                <CheckIcon
                />
              )}
            </span>
            {children}
          </>
        )
      )}
    </CheckboxPrimitive>
  )
}

export { Checkbox }
