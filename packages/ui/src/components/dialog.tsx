'use client'

import * as React from 'react'
import {
  Dialog as DialogPrimitive,
  DialogTrigger as DialogTriggerPrimitive,
  Heading,
  Modal as ModalPrimitive,
  ModalOverlay as ModalOverlayPrimitive,
  Text,
  type DialogTriggerProps as DialogTriggerPrimitiveProps,
} from 'react-aria-components'
import { XIcon } from 'lucide-react'

import { cn } from '../lib/utils'
import { Button } from './button'

type LegacyRenderProps = {
  render?: React.ReactElement
  children?: React.ReactNode
}

function renderControl(render: React.ReactElement | undefined, children: React.ReactNode, extra: Record<string, unknown> = {}) {
  if (render) {
    return React.cloneElement(render as React.ReactElement<any>, extra, children)
  }

  if (React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, extra)
  }

  return <Button {...(extra as any)}>{children}</Button>
}

type DialogProps = Omit<DialogTriggerPrimitiveProps, 'isOpen'> & {
  open?: boolean
}

function Dialog({ open, ...props }: DialogProps) {
  return <DialogTriggerPrimitive data-slot="dialog-root" isOpen={open} {...props} />
}

function DialogTrigger({ render, children }: LegacyRenderProps) {
  return renderControl(render, children, { 'data-slot': 'dialog-trigger' })
}

function DialogPortal({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}

type DialogOverlayProps = Omit<React.ComponentProps<typeof ModalOverlayPrimitive>, 'className'> & {
  className?: string
}

function DialogOverlay({ className, ...props }: DialogOverlayProps) {
  return (
    <ModalOverlayPrimitive
      data-slot="dialog-overlay"
      className={cn('pzhown-ui pzhown-dialog-overlay tw:fixed tw:inset-0 tw:isolate tw:z-50', className)}
      {...props}
    />
  )
}

function DialogClose({
  render,
  children,
  variant = 'outline',
  size = 'default',
  ...props
}: Omit<React.ComponentProps<typeof Button>, 'children' | 'render'> & { render?: React.ReactElement; children?: React.ReactNode }) {
  if (render) {
    return renderControl(render, children, { slot: 'close', 'data-slot': 'dialog-close', ...props })
  }

  return (
    <Button slot="close" data-slot="dialog-close" variant={variant} size={size} {...props}>
      {children}
    </Button>
  )
}

type DialogContentProps = Omit<React.ComponentProps<typeof ModalOverlayPrimitive>, 'className' | 'children'> & {
  className?: string
  children?: React.ReactNode
  showCloseButton?: boolean
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  isDismissable = true,
  ...props
}: DialogContentProps) {
  return (
    <DialogOverlay isDismissable={isDismissable} {...props}>
      <ModalPrimitive
        data-slot="dialog-content"
        className={cn(
          'pzhown-ui pzhown-dialog-content tw:fixed tw:top-1/2 tw:left-1/2 tw:z-50 tw:w-[calc(100vw_-_2rem)] tw:max-w-lg tw:-translate-x-1/2 tw:-translate-y-1/2 tw:p-5 tw:outline-none',
          className,
        )}
      >
        <DialogPrimitive data-slot="dialog" className="tw:outline-none">
          {children}
          {showCloseButton && (
            <DialogClose
              variant="secondary"
              size="icon-sm"
              className="tw:absolute tw:top-2 tw:right-2 tw:size-11 tw:rounded-full"
              aria-label="Close"
            >
              <XIcon className="tw:size-[18px]" />
            </DialogClose>
          )}
        </DialogPrimitive>
      </ModalPrimitive>
    </DialogOverlay>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn('tw:flex tw:flex-col tw:gap-1.5 tw:pr-16', className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn('tw:mt-5 tw:flex tw:flex-col-reverse tw:gap-2 tw:sm:flex-row tw:sm:justify-end', className)}
      {...props}
    />
  )
}

function DialogTitle({ className, ...props }: Omit<React.ComponentProps<typeof Heading>, 'slot'>) {
  return <Heading slot="title" data-slot="dialog-title" className={cn('pzhown-dialog-title', className)} {...props} />
}

function DialogDescription({ className, ...props }: Omit<React.ComponentProps<typeof Text>, 'slot'>) {
  return <Text slot="description" data-slot="dialog-description" className={cn('pzhown-dialog-description', className)} {...props} />
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
