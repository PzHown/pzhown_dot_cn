import * as React from "react"

import { cn } from "@pzhown/ui/lib/utils"

function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "tw:group/card tw:flex tw:flex-col tw:gap-(--card-gap) tw:overflow-hidden tw:rounded-xl tw:bg-card tw:py-(--card-inset) tw:text-sm tw:text-card-foreground tw:ring-1 tw:ring-foreground/10 tw:[--card-gap:--spacing(2)] tw:[--card-inset:--spacing(4)] tw:has-data-[slot=card-footer]:pb-0 tw:has-[>img:first-child]:pt-0 tw:data-[size=sm]:[--card-inset:--spacing(3)] tw:data-[size=sm]:has-data-[slot=card-footer]:pb-0 tw:*:[img:first-child]:rounded-t-xl tw:*:[img:last-child]:rounded-b-xl",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "tw:group/card-header tw:@container/card-header tw:grid tw:auto-rows-min tw:items-start tw:gap-1 tw:rounded-t-xl tw:px-(--card-inset) tw:has-data-[slot=card-action]:grid-cols-[1fr_auto] tw:has-data-[slot=card-action]:gap-x-3 tw:has-data-[slot=card-description]:grid-rows-[auto_auto] tw:[.border-b]:pb-(--card-inset)",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "tw:text-base tw:leading-snug tw:font-medium tw:group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("tw:text-sm tw:leading-relaxed tw:text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "tw:col-start-2 tw:row-span-2 tw:row-start-1 tw:self-start tw:justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("tw:px-(--card-inset)", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "tw:flex tw:items-center tw:gap-2 tw:rounded-b-xl tw:border-t tw:bg-muted/50 tw:px-(--card-inset) tw:py-3 tw:group-data-[size=sm]/card:py-2",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
