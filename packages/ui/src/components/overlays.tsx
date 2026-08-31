'use client'

import * as React from 'react'
import { ExternalLiquidGlassBackdrop } from './materials'
import { Portal, composeHandlers, cx, useControllableState, useEscape } from './shared'

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'destructive'
  icon?: React.ReactNode
}

export function Alert({ title, variant = 'default', icon, className, children, ...props }: AlertProps) {
  return (
    <div {...props} role={variant === 'destructive' ? 'alert' : 'status'} data-variant={variant} className={cx('ios27-alert', className)}>
      {icon ? <div className="ios27-alert__icon">{icon}</div> : null}
      <div className="ios27-alert__copy">{title ? <strong>{title}</strong> : null}{children ? <div>{children}</div> : null}</div>
    </div>
  )
}

type OverlayState = { open: boolean; setOpen: (open: boolean) => void }
const DialogContext = React.createContext<OverlayState | null>(null)

export interface DialogProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

export function Dialog({ open, defaultOpen = false, onOpenChange, children }: DialogProps) {
  const [current, setCurrent] = useControllableState({ value: open, defaultValue: defaultOpen, onChange: onOpenChange })
  return <DialogContext.Provider value={{ open: current, setOpen: setCurrent }}>{children}</DialogContext.Provider>
}

export function DialogTrigger({ children }: { children: React.ReactElement }) {
  const context = React.useContext(DialogContext)
  if (!context) throw new Error('DialogTrigger must be used inside Dialog')
  const child = React.Children.only(children) as React.ReactElement<{ onClick?: React.MouseEventHandler }>
  return React.cloneElement(child, { onClick: composeHandlers(child.props.onClick, () => context.setOpen(true)) })
}

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  closeOnOverlay?: boolean
  glass?: boolean
}

export function DialogContent({ className, children, closeOnOverlay = true, glass = true, ...props }: DialogContentProps) {
  const context = React.useContext(DialogContext)
  if (!context) throw new Error('DialogContent must be used inside Dialog')
  useEscape(context.open, () => context.setOpen(false))
  const contentRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if (!context.open) return
    const previous = document.activeElement as HTMLElement | null
    queueMicrotask(() => contentRef.current?.focus())
    return () => previous?.focus?.()
  }, [context.open])
  if (!context.open) return null
  return (
    <Portal>
      <div className="ios27-overlay" data-slot="dialog-overlay" onMouseDown={(event) => {
        if (closeOnOverlay && event.target === event.currentTarget) context.setOpen(false)
      }}>
        <div
          {...props}
          ref={contentRef}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          data-slot="dialog-content"
          data-glass={glass ? 'large' : 'off'}
          className={cx('ios27-dialog', 'ios27-optical-host', className)}
        >
          {glass ? <ExternalLiquidGlassBackdrop material="large" /> : null}
          <div className="ios27-dialog__body ios27-optical-content">{children}</div>
        </div>
      </div>
    </Portal>
  )
}

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div {...props} className={cx('ios27-dialog__header', className)} /> }
export function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) { return <h2 {...props} className={cx('ios27-dialog__title', className)} /> }
export function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) { return <p {...props} className={cx('ios27-dialog__description', className)} /> }
export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div {...props} className={cx('ios27-dialog__footer', className)} /> }

export function DialogClose({ children }: { children: React.ReactElement }) {
  const context = React.useContext(DialogContext)
  if (!context) throw new Error('DialogClose must be used inside Dialog')
  const child = React.Children.only(children) as React.ReactElement<{ onClick?: React.MouseEventHandler }>
  return React.cloneElement(child, { onClick: composeHandlers(child.props.onClick, () => context.setOpen(false)) })
}

const SheetContext = React.createContext<OverlayState | null>(null)
export interface SheetProps extends DialogProps {}
export function Sheet({ open, defaultOpen = false, onOpenChange, children }: SheetProps) {
  const [current, setCurrent] = useControllableState({ value: open, defaultValue: defaultOpen, onChange: onOpenChange })
  return <SheetContext.Provider value={{ open: current, setOpen: setCurrent }}>{children}</SheetContext.Provider>
}
export function SheetTrigger({ children }: { children: React.ReactElement }) {
  const context = React.useContext(SheetContext)
  if (!context) throw new Error('SheetTrigger must be used inside Sheet')
  const child = React.Children.only(children) as React.ReactElement<{ onClick?: React.MouseEventHandler }>
  return React.cloneElement(child, { onClick: composeHandlers(child.props.onClick, () => context.setOpen(true)) })
}
export interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> { side?: 'bottom' | 'left' | 'right'; glass?: boolean }
export function SheetContent({ side = 'bottom', glass = true, className, children, ...props }: SheetContentProps) {
  const context = React.useContext(SheetContext)
  if (!context) throw new Error('SheetContent must be used inside Sheet')
  useEscape(context.open, () => context.setOpen(false))
  if (!context.open) return null
  return (
    <Portal>
      <div className="ios27-overlay ios27-sheet-overlay" data-slot="sheet-overlay" onMouseDown={(event) => event.target === event.currentTarget && context.setOpen(false)}>
        <div
          {...props}
          role="dialog"
          aria-modal="true"
          data-side={side}
          data-slot="sheet-content"
          data-glass={glass ? 'large' : 'off'}
          className={cx('ios27-sheet', 'ios27-optical-host', className)}
        >
          {glass ? <ExternalLiquidGlassBackdrop material="large" radius={side === 'bottom' ? 34 : 24} /> : null}
          <div className="ios27-sheet__body ios27-optical-content">
            {side === 'bottom' ? <div className="ios27-sheet__grabber" aria-hidden="true" /> : null}
            {children}
          </div>
        </div>
      </div>
    </Portal>
  )
}
export function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div {...props} className={cx('ios27-sheet__header', className)} /> }
export function SheetTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) { return <h2 {...props} className={cx('ios27-sheet__title', className)} /> }
export function SheetDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) { return <p {...props} className={cx('ios27-sheet__description', className)} /> }
export function SheetFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div {...props} className={cx('ios27-sheet__footer', className)} /> }
export function SheetClose({ children }: { children: React.ReactElement }) {
  const context = React.useContext(SheetContext)
  if (!context) throw new Error('SheetClose must be used inside Sheet')
  const child = React.Children.only(children) as React.ReactElement<{ onClick?: React.MouseEventHandler }>
  return React.cloneElement(child, { onClick: composeHandlers(child.props.onClick, () => context.setOpen(false)) })
}

type PopoverState = OverlayState & { rootRef: React.RefObject<HTMLDivElement | null> }
const PopoverContext = React.createContext<PopoverState | null>(null)
export interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}
export function Popover({ open, defaultOpen = false, onOpenChange, className, children, ...props }: PopoverProps) {
  const [current, setCurrent] = useControllableState({ value: open, defaultValue: defaultOpen, onChange: onOpenChange })
  const rootRef = React.useRef<HTMLDivElement>(null)
  return <PopoverContext.Provider value={{ open: current, setOpen: setCurrent, rootRef }}><div {...props} ref={rootRef} className={cx('ios27-popover-root', className)}>{children}</div></PopoverContext.Provider>
}
export function PopoverTrigger({ children }: { children: React.ReactElement }) {
  const context = React.useContext(PopoverContext)
  if (!context) throw new Error('PopoverTrigger must be used inside Popover')
  const child = React.Children.only(children) as React.ReactElement<{ onClick?: React.MouseEventHandler; 'aria-expanded'?: boolean }>
  return React.cloneElement(child, { 'aria-expanded': context.open, onClick: composeHandlers(child.props.onClick, () => context.setOpen(!context.open)) })
}
export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> { glass?: boolean }
export function PopoverContent({ className, children, glass = true, ...props }: PopoverContentProps) {
  const context = React.useContext(PopoverContext)
  if (!context) throw new Error('PopoverContent must be used inside Popover')
  useEscape(context.open, () => context.setOpen(false))
  React.useEffect(() => {
    if (!context.open) return
    const handle = (event: PointerEvent) => {
      if (context.rootRef.current && !context.rootRef.current.contains(event.target as Node)) context.setOpen(false)
    }
    document.addEventListener('pointerdown', handle)
    return () => document.removeEventListener('pointerdown', handle)
  }, [context])
  return context.open ? (
    <div {...props} role="dialog" data-slot="popover-content" data-glass={glass ? 'medium' : 'off'} className={cx('ios27-popover', 'ios27-optical-host', className)}>
      {glass ? <ExternalLiquidGlassBackdrop material="medium" /> : null}
      <div className="ios27-popover__body ios27-optical-content">{children}</div>
    </div>
  ) : null
}

type ContextMenuItem = { label: React.ReactNode; onSelect?: () => void; disabled?: boolean; destructive?: boolean; shortcut?: React.ReactNode }
export interface ContextMenuProps extends React.HTMLAttributes<HTMLDivElement> { items: ContextMenuItem[]; glass?: boolean }
export function ContextMenu({ items, children, glass = true, className, onContextMenu, ...props }: ContextMenuProps) {
  const [point, setPoint] = React.useState<{ x: number; y: number } | null>(null)
  useEscape(Boolean(point), () => setPoint(null))
  React.useEffect(() => {
    if (!point) return
    const close = () => setPoint(null)
    window.addEventListener('blur', close)
    document.addEventListener('pointerdown', close)
    return () => { window.removeEventListener('blur', close); document.removeEventListener('pointerdown', close) }
  }, [point])
  return (
    <>
      <div {...props} className={className} onContextMenu={(event) => {
        onContextMenu?.(event)
        if (event.defaultPrevented) return
        event.preventDefault()
        setPoint({ x: event.clientX, y: event.clientY })
      }}>{children}</div>
      {point ? (
        <Portal>
          <div
            className="ios27-context-menu ios27-optical-host"
            data-glass={glass ? 'medium' : 'off'}
            role="menu"
            style={{ left: point.x, top: point.y }}
            onPointerDown={(event) => event.stopPropagation()}
          >
            {glass ? <ExternalLiquidGlassBackdrop material="medium" /> : null}
            <div className="ios27-context-menu__content ios27-optical-content">
              {items.map((item, index) => <button key={index} type="button" role="menuitem" disabled={item.disabled} data-destructive={item.destructive || undefined} onClick={() => { item.onSelect?.(); setPoint(null) }}><span>{item.label}</span>{item.shortcut ? <span className="ios27-context-menu__shortcut">{item.shortcut}</span> : null}</button>)}
            </div>
          </div>
        </Portal>
      ) : null}
    </>
  )
}
