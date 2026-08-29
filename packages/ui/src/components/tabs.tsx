'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import {
  TabList as TabListPrimitive,
  TabPanel as TabPanelPrimitive,
  Tab as TabPrimitive,
  Tabs as TabsPrimitive,
} from 'react-aria-components'

import { cn } from '../lib/utils'

type TabsProps = Omit<React.ComponentProps<typeof TabsPrimitive>, 'className'> & {
  className?: string
  defaultValue?: string | number
  value?: string | number
  onValueChange?: (value: string | number) => void
}

function Tabs({
  className,
  defaultValue,
  value,
  onValueChange,
  defaultSelectedKey,
  selectedKey,
  onSelectionChange,
  ...props
}: TabsProps) {
  return (
    <TabsPrimitive
      data-slot="tabs"
      defaultSelectedKey={defaultSelectedKey ?? defaultValue}
      selectedKey={selectedKey ?? value}
      onSelectionChange={(key) => {
        onSelectionChange?.(key)
        onValueChange?.(key)
      }}
      className={cn('pzhown-ui tw:flex tw:data-[orientation=horizontal]:flex-col', className)}
      {...props}
    />
  )
}

const tabsListVariants = cva('pzhown-tabs-list tw:inline-flex tw:w-fit tw:items-center tw:justify-center tw:gap-1', {
  variants: {
    variant: {
      default: '',
      line: 'pzhown-tabs-list-line',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

function TabsList({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof TabListPrimitive> & VariantProps<typeof tabsListVariants>) {
  return (
    <TabListPrimitive
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  value,
  id,
  ...props
}: React.ComponentProps<typeof TabPrimitive> & { value?: string | number }) {
  return (
    <TabPrimitive
      id={id ?? value}
      data-slot="tabs-trigger"
      className={cn(
        'pzhown-tabs-trigger tw:relative tw:inline-flex tw:h-10 tw:flex-1 tw:items-center tw:justify-center tw:gap-2 tw:whitespace-nowrap tw:px-4 tw:text-sm tw:font-medium tw:outline-none tw:[&_svg]:pointer-events-none tw:[&_svg]:size-4 tw:[&_svg]:shrink-0',
        className,
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  value,
  id,
  ...props
}: React.ComponentProps<typeof TabPanelPrimitive> & { value?: string | number }) {
  return (
    <TabPanelPrimitive
      id={id ?? value}
      data-slot="tabs-content"
      className={cn('pzhown-tabs-content tw:flex-1 tw:outline-none', className)}
      {...props}
    />
  )
}

export { Tabs, TabsContent, TabsList, TabsTrigger, tabsListVariants }
