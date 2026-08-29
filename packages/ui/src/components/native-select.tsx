import * as React from "react"

import { cn } from "@pzhown/ui/lib/utils"
import { ChevronDownIcon } from "lucide-react"

type NativeSelectProps = Omit<React.ComponentProps<"select">, "size"> & {
  size?: "sm" | "default"
}

function NativeSelect({
  className,
  size = "default",
  ...props
}: NativeSelectProps) {
  return (
    <div
      className={cn(
        "tw:group/native-select tw:relative tw:w-fit",
        className
      )}
      data-slot="native-select-wrapper"
      data-size={size}
    >
      <select
        data-slot="native-select"
        data-size={size}
        className="tw:h-11 tw:w-full tw:min-w-0 tw:appearance-none tw:pr-10 tw:pl-3 tw:text-sm tw:outline-none tw:select-none tw:selection:bg-primary tw:selection:text-primary-foreground tw:data-[size=sm]:h-10"
        {...props}
      />
      <ChevronDownIcon
        className="tw:pointer-events-none tw:absolute tw:top-1/2 tw:right-3 tw:size-4 tw:-translate-y-1/2 tw:text-muted-foreground tw:select-none"
        aria-hidden="true"
        data-slot="native-select-icon"
      />
    </div>
  )
}

function NativeSelectOption({
  className,
  ...props
}: React.ComponentProps<"option">) {
  return (
    <option
      data-slot="native-select-option"
      className={cn("tw:bg-[Canvas] tw:text-[CanvasText]", className)}
      {...props}
    />
  )
}

function NativeSelectOptGroup({
  className,
  ...props
}: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn("tw:bg-[Canvas] tw:text-[CanvasText]", className)}
      {...props}
    />
  )
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }
