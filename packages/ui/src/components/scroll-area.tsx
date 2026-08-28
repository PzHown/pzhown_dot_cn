"use client"

import * as React from "react"

import { cn } from "@pzhown/ui/lib/utils"

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  // Use native scrollbar-width and scrollbar-color to customize the scrollbar.
  return (
    <div
      data-slot="scroll-area"
      className={cn(
        "tw:relative tw:[scrollbar-width:thin] tw:[scrollbar-color:var(--color-border)_transparent] tw:overflow-auto tw:outline-none tw:focus-visible:ring-[3px] tw:focus-visible:ring-ring/50 tw:focus-visible:outline-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { ScrollArea }
