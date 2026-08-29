"use client"

import * as React from "react"
import {
  composeRenderProps,
  TextArea as TextareaPrimitive,
} from "react-aria-components"

import { cn } from "@pzhown/ui/lib/utils"

function Textarea({
  className,
  ...props
}: React.ComponentProps<typeof TextareaPrimitive>) {
  return (
    <TextareaPrimitive
      data-slot="textarea"
      className={composeRenderProps(className, (className) =>
        cn(
          "tw:flex tw:field-sizing-content tw:min-h-20 tw:w-full tw:px-3 tw:py-3 tw:text-sm tw:outline-none tw:selection:bg-primary tw:selection:text-primary-foreground",
          className
        )
      )}
      {...props}
    />
  )
}

export { Textarea }
