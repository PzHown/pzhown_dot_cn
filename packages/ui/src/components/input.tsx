import * as React from 'react'
import { Input as InputPrimitive } from '@base-ui/react/input'

import { cn } from '../lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        'pzhown-ui tw:h-9 tw:w-full tw:min-w-0 tw:rounded-xl tw:border tw:border-[var(--pzhown-ui-border)] tw:bg-[var(--pzhown-ui-surface)] tw:px-3 tw:py-1 tw:text-sm tw:text-[var(--pzhown-ui-foreground)] tw:shadow-[0_1px_2px_rgb(0_0_0/0.03)] tw:outline-none tw:transition-[border-color,box-shadow,background-color] tw:placeholder:text-[var(--pzhown-ui-muted-foreground)] tw:focus-visible:border-[var(--pzhown-ui-ring)] tw:focus-visible:ring-3 tw:focus-visible:ring-[var(--pzhown-ui-ring)] tw:disabled:pointer-events-none tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:file:inline-flex tw:file:border-0 tw:file:bg-transparent tw:file:text-[var(--pzhown-ui-foreground)]',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
