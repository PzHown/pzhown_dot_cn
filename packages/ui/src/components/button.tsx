'use client'

import type * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import {
  Button as ButtonPrimitive,
  Link as LinkPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
  type LinkProps as LinkPrimitiveProps,
} from 'react-aria-components'

import { cn } from '../lib/utils'

const buttonVariants = cva(
  'pzhown-ui pzhown-button tw:inline-flex tw:shrink-0 tw:items-center tw:justify-center tw:gap-1.5 tw:whitespace-nowrap tw:border tw:border-transparent tw:text-sm tw:font-medium tw:outline-none tw:select-none tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4',
  {
    variants: {
      variant: {
        default: '',
        outline: '',
        secondary: '',
        ghost: '',
        destructive: '',
        link: '',
      },
      size: {
        default: 'tw:h-9 tw:px-3.5',
        xs: 'tw:h-7 tw:px-2.5 tw:text-xs',
        sm: 'tw:h-8 tw:px-3 tw:text-[0.8rem]',
        lg: 'tw:h-10 tw:px-4',
        icon: 'tw:size-9',
        'icon-xs': 'tw:size-7',
        'icon-sm': 'tw:size-8',
        'icon-lg': 'tw:size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: Omit<ButtonPrimitiveProps, 'className'> &
  React.RefAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    className?: string
  }) {
  return (
    <ButtonPrimitive
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

function LinkButton({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: Omit<LinkPrimitiveProps, 'className'> &
  VariantProps<typeof buttonVariants> & {
    className?: string
  }) {
  return (
    <LinkPrimitive
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, LinkButton, buttonVariants }
