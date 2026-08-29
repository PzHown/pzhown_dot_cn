'use client'

import * as React from 'react'
import { Input as InputPrimitive } from 'react-aria-components'

import { cn } from '../lib/utils'

type InputProps = Omit<React.ComponentProps<typeof InputPrimitive>, 'className'> & {
  className?: string
}

function Input({ className, type, ...props }: InputProps) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        'pzhown-ui pzhown-input tw:h-11 tw:w-full tw:min-w-0 tw:px-4 tw:text-sm tw:outline-none tw:file:inline-flex tw:file:border-0 tw:file:bg-transparent tw:file:text-[var(--pzhown-ui-foreground)]',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
