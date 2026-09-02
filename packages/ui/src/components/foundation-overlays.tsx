'use client'

import * as React from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { LiquidGlassBackdrop } from './materials'
import { Portal, composeHandlers, cx, useControllableState, useEscape } from './shared'

// Tooltip

type TooltipContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  contentId: string
}

const TooltipContext = React.createContext<TooltipContextValue | null>(null)

export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Tooltip({ open, defaultOpen = false, onOpenChange, className, children, ...props }: TooltipProps) {
  const [current, setCurrent] = useControllableState({ value: open, defaultValue: defaultOpen, onChange: onOpenChange })
  const contentId = React.useId()
  return (
    <TooltipContext.Provider value={{ open: current, setOpen: setCurrent, contentId }}>
      <span {...props} className={cx('ios27-tooltip-root', className)}>{children}</span>
    </TooltipContext.Provider>
  )
}

export function TooltipTrigger({ children }: { children: React.ReactElement }) {
  const context = React.useContext(TooltipContext)
  if (!context) throw new Error('TooltipTrigger must be used inside Tooltip')
  const child = React.Children.only(children) as React.ReactElement<{
    onPointerEnter?: React.PointerEventHandler
    onPointerLeave?: React.PointerEventHandler
    onFocus?: React.FocusEventHandler
    onBlur?: React.FocusEventHandler
    'aria-describedby'?: string
  }>
  return React.cloneElement(child, {
    'aria-describedby': context.open ? context.contentId : child.props['aria-describedby'],
    onPointerEnter: composeHandlers(child.props.onPointerEnter, () => context.setOpen(true)),
    onPointerLeave: composeHandlers(child.props.onPointerLeave, () => context.setOpen(false)),
    onFocus: composeHandlers(child.props.onFocus, () => context.setOpen(true)),
    onBlur: composeHandlers(child.props.onBlur, () => context.setOpen(false)),
  })
}

export function TooltipContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(TooltipContext)
  if (!context) throw new Error('TooltipContent must be used inside Tooltip')
  const reduceMotion = useReducedMotion()
  return (
    <AnimatePresence initial={false}>
      {context.open ? (
        <motion.div
          {...props}
          id={context.contentId}
          role="tooltip"
          className={cx('ios27-tooltip', 'ios27-optical-host', className)}
          initial={reduceMotion ? false : { opacity: 0, y: 3, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 2, scale: 0.985 }}
          transition={reduceMotion ? { duration: 0.08 } : { type: 'spring', stiffness: 560, damping: 40, mass: 0.65 }}
        >
          <LiquidGlassBackdrop material="small" />
          <div className="ios27-tooltip__content ios27-optical-content">{children}</div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

// Dropdown menu

type DropdownMenuContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  rootRef: React.RefObject<HTMLDivElement | null>
}

const DropdownMenuContext = React.createContext<DropdownMenuContextValue | null>(null)

export interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function DropdownMenu({ open, defaultOpen = false, onOpenChange, className, children, ...props }: DropdownMenuProps) {
  const [current, setCurrent] = useControllableState({ value: open, defaultValue: defaultOpen, onChange: onOpenChange })
  const rootRef = React.useRef<HTMLDivElement>(null)
  return (
    <DropdownMenuContext.Provider value={{ open: current, setOpen: setCurrent, rootRef }}>
      <div {...props} ref={rootRef} className={cx('ios27-dropdown-root', className)}>{children}</div>
    </DropdownMenuContext.Provider>
  )
}

export function DropdownMenuTrigger({ children }: { children: React.ReactElement }) {
  const context = React.useContext(DropdownMenuContext)
  if (!context) throw new Error('DropdownMenuTrigger must be used inside DropdownMenu')
  const child = React.Children.only(children) as React.ReactElement<{
    onClick?: React.MouseEventHandler
    'aria-haspopup'?: boolean | 'menu'
    'aria-expanded'?: boolean
  }>
  return React.cloneElement(child, {
    'aria-haspopup': 'menu',
    'aria-expanded': context.open,
    onClick: composeHandlers(child.props.onClick, () => context.setOpen(!context.open)),
  })
}

export function DropdownMenuContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(DropdownMenuContext)
  if (!context) throw new Error('DropdownMenuContent must be used inside DropdownMenu')
  const contentRef = React.useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  useEscape(context.open, () => context.setOpen(false))
  React.useEffect(() => {
    if (!context.open) return
    const handlePointerDown = (event: PointerEvent) => {
      if (context.rootRef.current && !context.rootRef.current.contains(event.target as Node)) context.setOpen(false)
    }
    const handleKey = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
      const items = Array.from(contentRef.current?.querySelectorAll<HTMLElement>('[role^="menuitem"]:not([disabled])') ?? [])
      if (!items.length) return
      event.preventDefault()
      const index = items.indexOf(document.activeElement as HTMLElement)
      const next = event.key === 'ArrowDown' ? (index + 1 + items.length) % items.length : (index - 1 + items.length) % items.length
      items[next]?.focus()
    }
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKey)
    queueMicrotask(() => contentRef.current?.querySelector<HTMLElement>('[role^="menuitem"]:not([disabled])')?.focus())
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKey)
    }
  }, [context])
  return (
    <AnimatePresence initial={false}>
      {context.open ? (
        <motion.div
          {...props}
          ref={contentRef}
          role="menu"
          className={cx('ios27-dropdown', 'ios27-optical-host', className)}
          initial={reduceMotion ? false : { opacity: 0, y: -4, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -2, scale: 0.985 }}
          transition={reduceMotion ? { duration: 0.08 } : { type: 'spring', stiffness: 540, damping: 40, mass: 0.68 }}
        >
          <LiquidGlassBackdrop material="medium" />
          <div className="ios27-dropdown__content ios27-optical-content">{children}</div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export function DropdownMenuLabel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cx('ios27-dropdown__label', className)} />
}

export function DropdownMenuSeparator({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) {
  return <hr {...props} className={cx('ios27-dropdown__separator', className)} />
}

export interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  destructive?: boolean
  shortcut?: React.ReactNode
  inset?: boolean
  onSelect?: () => void
}

export function DropdownMenuItem({ destructive, shortcut, inset, onSelect, className, children, onClick, ...props }: DropdownMenuItemProps) {
  const context = React.useContext(DropdownMenuContext)
  if (!context) throw new Error('DropdownMenuItem must be used inside DropdownMenu')
  return (
    <button
      {...props}
      type="button"
      role="menuitem"
      data-destructive={destructive || undefined}
      data-inset={inset || undefined}
      className={cx('ios27-dropdown__item', className)}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        onSelect?.()
        context.setOpen(false)
      }}
    >
      <span className="ios27-dropdown__item-label">{children}</span>
      {shortcut ? <span className="ios27-dropdown__shortcut">{shortcut}</span> : null}
    </button>
  )
}

export interface DropdownMenuCheckboxItemProps extends Omit<DropdownMenuItemProps, 'onSelect'> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export function DropdownMenuCheckboxItem({ checked = false, onCheckedChange, className, children, onClick, ...props }: DropdownMenuCheckboxItemProps) {
  const context = React.useContext(DropdownMenuContext)
  if (!context) throw new Error('DropdownMenuCheckboxItem must be used inside DropdownMenu')
  return (
    <button
      {...props}
      type="button"
      role="menuitemcheckbox"
      aria-checked={checked}
      className={cx('ios27-dropdown__item ios27-dropdown__check-item', className)}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) onCheckedChange?.(!checked)
      }}
    >
      <span className="ios27-dropdown__check" aria-hidden="true">{checked ? '✓' : ''}</span>
      <span className="ios27-dropdown__item-label">{children}</span>
    </button>
  )
}

// Toast

export type ToastVariant = 'default' | 'success' | 'warning' | 'destructive'

export interface ToastInput {
  title: React.ReactNode
  description?: React.ReactNode
  variant?: ToastVariant
  duration?: number
  actionLabel?: React.ReactNode
  onAction?: () => void
}

type ToastRecord = ToastInput & { id: number }
type ToastContextValue = { toast: (input: ToastInput) => number; dismiss: (id: number) => void }
const ToastContext = React.createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const nextId = React.useRef(1)
  const [toasts, setToasts] = React.useState<ToastRecord[]>([])
  const dismiss = React.useCallback((id: number) => setToasts((items) => items.filter((item) => item.id !== id)), [])
  const toast = React.useCallback((input: ToastInput) => {
    const id = nextId.current++
    setToasts((items) => [...items, { ...input, id }])
    return id
  }, [])
  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <ToastViewport toasts={toasts} dismiss={dismiss} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) throw new Error('useToast must be used inside ToastProvider')
  return context
}

function ToastViewport({ toasts, dismiss }: { toasts: ToastRecord[]; dismiss: (id: number) => void }) {
  return (
    <Portal>
      <div className="ios27-toast-viewport" aria-live="polite" aria-relevant="additions removals">
        <AnimatePresence initial={false}>
          {toasts.map((toast) => <ToastItem key={toast.id} toast={toast} dismiss={dismiss} />)}
        </AnimatePresence>
      </div>
    </Portal>
  )
}

function ToastItem({ toast, dismiss }: { toast: ToastRecord; dismiss: (id: number) => void }) {
  const reduceMotion = useReducedMotion()
  React.useEffect(() => {
    const duration = toast.duration ?? 4200
    if (duration <= 0) return
    const timer = window.setTimeout(() => dismiss(toast.id), duration)
    return () => window.clearTimeout(timer)
  }, [dismiss, toast.duration, toast.id])
  return (
    <motion.div
      role={toast.variant === 'destructive' ? 'alert' : 'status'}
      data-variant={toast.variant ?? 'default'}
      className="ios27-toast ios27-optical-host"
      layout={!reduceMotion}
      initial={reduceMotion ? false : { opacity: 0, y: -10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.985 }}
      transition={reduceMotion ? { duration: 0.08 } : { type: 'spring', stiffness: 460, damping: 36, mass: 0.78 }}
    >
      <LiquidGlassBackdrop material="medium" />
      <div className="ios27-toast__content ios27-optical-content">
        <div className="ios27-toast__copy">
          <strong>{toast.title}</strong>
          {toast.description ? <span>{toast.description}</span> : null}
        </div>
        {toast.actionLabel ? <button type="button" className="ios27-toast__action" onClick={() => { toast.onAction?.(); dismiss(toast.id) }}>{toast.actionLabel}</button> : null}
        <button type="button" className="ios27-toast__close" aria-label="关闭通知" onClick={() => dismiss(toast.id)}>×</button>
      </div>
    </motion.div>
  )
}

// Alert dialog

type AlertDialogState = { open: boolean; setOpen: (open: boolean) => void }
const AlertDialogContext = React.createContext<AlertDialogState | null>(null)

export interface AlertDialogProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

export function AlertDialog({ open, defaultOpen = false, onOpenChange, children }: AlertDialogProps) {
  const [current, setCurrent] = useControllableState({ value: open, defaultValue: defaultOpen, onChange: onOpenChange })
  return <AlertDialogContext.Provider value={{ open: current, setOpen: setCurrent }}>{children}</AlertDialogContext.Provider>
}

export function AlertDialogTrigger({ children }: { children: React.ReactElement }) {
  const context = React.useContext(AlertDialogContext)
  if (!context) throw new Error('AlertDialogTrigger must be used inside AlertDialog')
  const child = React.Children.only(children) as React.ReactElement<{ onClick?: React.MouseEventHandler }>
  return React.cloneElement(child, { onClick: composeHandlers(child.props.onClick, () => context.setOpen(true)) })
}

export interface AlertDialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  closeOnOverlay?: boolean
}

export function AlertDialogContent({ className, children, closeOnOverlay = false, ...props }: AlertDialogContentProps) {
  const context = React.useContext(AlertDialogContext)
  if (!context) throw new Error('AlertDialogContent must be used inside AlertDialog')
  const reduceMotion = useReducedMotion()
  useEscape(context.open, () => context.setOpen(false))
  const contentRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if (!context.open) return
    const previous = document.activeElement as HTMLElement | null
    queueMicrotask(() => contentRef.current?.focus())
    return () => previous?.focus?.()
  }, [context.open])
  return (
    <Portal>
      <AnimatePresence initial={false}>
        {context.open ? (
          <motion.div
            className="ios27-overlay"
            data-slot="alert-dialog-overlay"
            onMouseDown={(event) => {
              if (closeOnOverlay && event.target === event.currentTarget) context.setOpen(false)
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.08 : 0.16, ease: 'easeOut' }}
          >
            <motion.div
              {...props}
              ref={contentRef}
              role="alertdialog"
              aria-modal="true"
              tabIndex={-1}
              className={cx('ios27-alert-dialog', 'ios27-optical-host', className)}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.985, y: 4 }}
              transition={reduceMotion ? { duration: 0.08 } : { type: 'spring', stiffness: 430, damping: 34, mass: 0.8 }}
            >
              <LiquidGlassBackdrop material="large" />
              <div className="ios27-alert-dialog__body ios27-optical-content">{children}</div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Portal>
  )
}

export function AlertDialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div {...props} className={cx('ios27-alert-dialog__header', className)} /> }
export function AlertDialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) { return <h2 {...props} className={cx('ios27-alert-dialog__title', className)} /> }
export function AlertDialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) { return <p {...props} className={cx('ios27-alert-dialog__description', className)} /> }
export function AlertDialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div {...props} className={cx('ios27-alert-dialog__footer', className)} /> }

export function AlertDialogCancel({ children }: { children: React.ReactElement }) {
  const context = React.useContext(AlertDialogContext)
  if (!context) throw new Error('AlertDialogCancel must be used inside AlertDialog')
  const child = React.Children.only(children) as React.ReactElement<{ onClick?: React.MouseEventHandler }>
  return React.cloneElement(child, { onClick: composeHandlers(child.props.onClick, () => context.setOpen(false)) })
}

export function AlertDialogAction({ children, onAction }: { children: React.ReactElement; onAction?: () => void }) {
  const context = React.useContext(AlertDialogContext)
  if (!context) throw new Error('AlertDialogAction must be used inside AlertDialog')
  const child = React.Children.only(children) as React.ReactElement<{ onClick?: React.MouseEventHandler }>
  return React.cloneElement(child, { onClick: composeHandlers(child.props.onClick, () => { onAction?.(); context.setOpen(false) }) })
}
