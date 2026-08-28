'use client'

import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../lib/utils'

function Tabs({ className, orientation = 'horizontal', ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn('pzhown-ui tw:flex tw:data-[orientation=horizontal]:flex-col', className)}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  'tw:inline-flex tw:w-fit tw:items-center tw:justify-center tw:gap-1 tw:rounded-xl tw:p-1 tw:text-[var(--pzhown-ui-muted-foreground)]',
  {
    variants: {
      variant: {
        default: 'tw:bg-[var(--pzhown-ui-muted)]',
        line: 'tw:rounded-none tw:bg-transparent tw:p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function TabsList({
  className,
  variant = 'default',
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        'pzhown-tabs-trigger tw:relative tw:inline-flex tw:h-8 tw:flex-1 tw:items-center tw:justify-center tw:gap-1.5 tw:whitespace-nowrap tw:rounded-lg tw:px-3 tw:text-sm tw:font-medium tw:text-[var(--pzhown-ui-muted-foreground)] tw:outline-none tw:transition-[color,background-color,box-shadow] tw:hover:text-[var(--pzhown-ui-foreground)] tw:focus-visible:ring-3 tw:focus-visible:ring-[var(--pzhown-ui-ring)] tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:size-4 tw:[&_svg]:shrink-0',
        className,
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return <TabsPrimitive.Panel data-slot="tabs-content" className={cn('tw:flex-1 tw:outline-none', className)} {...props} />
}

export { Tabs, TabsContent, TabsList, TabsTrigger, tabsListVariants }
