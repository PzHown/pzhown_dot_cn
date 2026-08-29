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
  'pzhown-ui pzhown-button tw:inline-flex tw:shrink-0 tw:items-center tw:justify-center tw:gap-2 tw:whitespace-nowrap tw:border tw:border-transparent tw:text-sm tw:font-medium tw:outline-none tw:select-none tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4',
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
        default: 'tw:h-11 tw:px-4',
        xs: 'tw:h-9 tw:px-3 tw:text-xs',
        sm: 'tw:h-10 tw:px-3 tw:text-[0.8rem]',
        lg: 'tw:h-12 tw:px-5',
        icon: 'tw:size-11',
        'icon-xs': 'tw:size-9',
        'icon-sm': 'tw:size-10',
        'icon-lg': 'tw:size-12',
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
