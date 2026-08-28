import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../lib/utils'

const buttonVariants = cva(
  'pzhown-ui pzhown-button tw:inline-flex tw:shrink-0 tw:items-center tw:justify-center tw:gap-1.5 tw:whitespace-nowrap tw:rounded-xl tw:border tw:border-transparent tw:text-sm tw:font-medium tw:outline-none tw:transition-[color,background-color,border-color,box-shadow,transform] tw:duration-150 tw:select-none tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:focus-visible:ring-3 tw:focus-visible:ring-[var(--pzhown-ui-ring)] tw:active:translate-y-px tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4',
  {
    variants: {
      variant: {
        default: '',
        outline: '',
        secondary: '',
        ghost: '',
        destructive: '',
        link: 'tw:underline-offset-4',
      },
      size: {
        default: 'tw:h-9 tw:px-3.5',
        xs: 'tw:h-7 tw:rounded-lg tw:px-2.5 tw:text-xs',
        sm: 'tw:h-8 tw:px-3 tw:text-[0.8rem]',
        lg: 'tw:h-10 tw:px-4',
        icon: 'tw:size-9',
        'icon-xs': 'tw:size-7 tw:rounded-lg',
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
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
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

export { Button, buttonVariants }
