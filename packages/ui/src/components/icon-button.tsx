'use client'

import * as React from 'react'
import type { LucideIcon } from 'lucide-react'
import { Button, type ButtonProps, type ButtonSize } from './controls'
import { cx } from './shared'

const defaultIconSize: Record<ButtonSize, number> = {
  small: 15,
  medium: 18,
  large: 22,
}

export interface IconButtonProps extends Omit<ButtonProps, 'children' | 'iconOnly'> {
  icon: LucideIcon
  label: string
  iconSize?: number
  strokeWidth?: number
}

/**
 * iOS 26/27-style circular icon control.
 *
 * Geometry is always circular; visual sizes follow the shared Button scale:
 * 28px / 36px / 50px. Use `variant="glass"` for the Small Liquid Glass form.
 */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      icon: Icon,
      label,
      size = 'medium',
      iconSize = defaultIconSize[size],
      strokeWidth = 2,
      className,
      ...props
    },
    ref,
  ) {
    return (
      <Button
        {...props}
        ref={ref}
        size={size}
        iconOnly
        aria-label={label}
        className={cx('ios27-icon-button', className)}
      >
        <Icon
          aria-hidden="true"
          focusable="false"
          size={iconSize}
          strokeWidth={strokeWidth}
          className="ios27-icon-button__icon"
        />
      </Button>
    )
  },
)
