"use client"

import * as React from "react"
import {
  DisclosurePanel as AccordionContentPrimitive,
  Heading as AccordionHeaderPrimitive,
  Disclosure as AccordionItemPrimitive,
  DisclosureGroup as AccordionPrimitive,
  Button as AccordionTriggerPrimitive,
  type ButtonProps,
  type DisclosureGroupProps,
  type DisclosurePanelProps,
  type DisclosureProps,
} from "react-aria-components"

import { cn } from "@pzhown/ui/lib/utils"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

function Accordion({ className, ...props }: DisclosureGroupProps) {
  return (
    <AccordionPrimitive
      data-slot="accordion"
      className={cn("tw:flex tw:w-full tw:flex-col", className)}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: DisclosureProps) {
  return (
    <AccordionItemPrimitive
      data-slot="accordion-item"
      className={cn("tw:not-last:border-b", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: Omit<ButtonProps, "children"> & { children: React.ReactNode }) {
  return (
    <AccordionHeaderPrimitive className="tw:flex">
      <AccordionTriggerPrimitive
        slot="trigger"
        data-slot="accordion-trigger"
        className={cn(
          "tw:group/accordion-trigger tw:relative tw:flex tw:flex-1 tw:items-start tw:justify-between tw:rounded-lg tw:border tw:border-transparent tw:py-2.5 tw:text-left tw:text-sm tw:font-medium tw:transition-all tw:outline-none tw:hover:underline tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:focus-visible:after:border-ring tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:**:data-[slot=accordion-trigger-icon]:ml-auto tw:**:data-[slot=accordion-trigger-icon]:size-4 tw:**:data-[slot=accordion-trigger-icon]:text-muted-foreground",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon data-slot="accordion-trigger-icon" className="tw:pointer-events-none tw:shrink-0 tw:group-aria-expanded/accordion-trigger:hidden" />
        <ChevronUpIcon data-slot="accordion-trigger-icon" className="tw:pointer-events-none tw:hidden tw:shrink-0 tw:group-aria-expanded/accordion-trigger:inline" />
      </AccordionTriggerPrimitive>
    </AccordionHeaderPrimitive>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: DisclosurePanelProps) {
  return (
    <AccordionContentPrimitive
      data-slot="accordion-content"
      className="tw:h-(--disclosure-panel-height) tw:overflow-clip tw:text-sm tw:transition-[height] tw:data-open:animate-accordion-down tw:data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "tw:pt-0 tw:pb-2.5 tw:[&_a]:underline tw:[&_a]:underline-offset-3 tw:[&_a]:hover:text-foreground tw:[&_p:not(:last-child)]:mb-4",
          className
        )}
      >
        {children}
      </div>
    </AccordionContentPrimitive>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
