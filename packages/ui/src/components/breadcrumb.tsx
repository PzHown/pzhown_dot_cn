"use client"

import * as React from "react"
import {
  Breadcrumb as BreadcrumbPrimitive,
  Breadcrumbs as BreadcrumbsPrimitive,
  composeRenderProps,
  Link as LinkPrimitive,
  type BreadcrumbProps,
  type BreadcrumbsProps,
  type LinkProps,
} from "react-aria-components"

import { cn } from "@pzhown/ui/lib/utils"
import { ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"

function Breadcrumb({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      className={cn(className)}
      {...props}
    />
  )
}

function BreadcrumbList<T extends object>({
  className,
  ...props
}: BreadcrumbsProps<T>) {
  return (
    <BreadcrumbsPrimitive
      data-slot="breadcrumb-list"
      className={cn(
        "tw:flex tw:flex-wrap tw:items-center tw:gap-1.5 tw:text-sm tw:wrap-break-word tw:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({
  className,
  children,
  separatorClassName,
  ...props
}: BreadcrumbProps & { separatorClassName?: string }) {
  return (
    <BreadcrumbPrimitive
      data-slot="breadcrumb-item"
      className={cn("tw:inline-flex tw:items-center tw:gap-1", className)}
      {...props}
    >
      {composeRenderProps(children, (children, { isCurrent }) => (
        <>
          {children}
          {!isCurrent && (
            <span
              data-slot="breadcrumb-separator"
              role="presentation"
              aria-hidden="true"
              className={cn("tw:[&>svg]:size-3.5", separatorClassName)}
            >
              <ChevronRightIcon />
            </span>
          )}
        </>
      ))}
    </BreadcrumbPrimitive>
  )
}

function BreadcrumbLink({ className, render, ...props }: LinkProps) {
  return (
    <LinkPrimitive
      data-slot="breadcrumb-link"
      className={cn("tw:transition-colors tw:hover:text-foreground", className)}
      render={render}
      {...props}
    />
  )
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("tw:font-normal tw:text-foreground", className)}
      {...props}
    />
  )
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn(
        "tw:flex tw:size-5 tw:items-center tw:justify-center tw:[&>svg]:size-4",
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon
      />
      <span className="tw:sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbEllipsis,
}
