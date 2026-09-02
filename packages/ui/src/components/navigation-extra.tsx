'use client'

import * as React from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { LiquidGlassBackdrop } from './materials'
import { Portal, cx, useControllableState, useEscape } from './shared'

// Tabs

type TabsContextValue = { value: string; setValue: (value: string) => void; baseId: string }
const TabsContext = React.createContext<TabsContextValue | null>(null)

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

export function Tabs({ value, defaultValue = '', onValueChange, className, children, ...props }: TabsProps) {
  const [current, setCurrent] = useControllableState({ value, defaultValue, onChange: onValueChange })
  const baseId = React.useId().replace(/:/g, '')
  return (
    <TabsContext.Provider value={{ value: current, setValue: setCurrent, baseId }}>
      <div {...props} className={cx('ios27-tabs', className)}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ className, onKeyDown, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      role="tablist"
      className={cx('ios27-tabs__list', className)}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if (event.defaultPrevented || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
        const tabs = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'))
        if (!tabs.length) return
        event.preventDefault()
        const current = tabs.indexOf(document.activeElement as HTMLButtonElement)
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : event.key === 'ArrowRight' ? (current + 1 + tabs.length) % tabs.length : (current - 1 + tabs.length) % tabs.length
        tabs[next]?.focus()
        tabs[next]?.click()
      }}
    />
  )
}

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { value: string }
export function TabsTrigger({ value, className, children, onClick, ...props }: TabsTriggerProps) {
  const context = React.useContext(TabsContext)
  if (!context) throw new Error('TabsTrigger must be used inside Tabs')
  const selected = context.value === value
  const tabId = `${context.baseId}-tab-${value}`
  const panelId = `${context.baseId}-panel-${value}`
  return (
    <button
      {...props}
      type="button"
      id={tabId}
      role="tab"
      aria-selected={selected}
      aria-controls={panelId}
      tabIndex={selected ? 0 : -1}
      data-selected={selected || undefined}
      className={cx('ios27-tabs__trigger', className)}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) context.setValue(value)
      }}
    >
      {children}
    </button>
  )
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> { value: string; forceMount?: boolean }
export function TabsContent({ value, forceMount = false, className, ...props }: TabsContentProps) {
  const context = React.useContext(TabsContext)
  if (!context) throw new Error('TabsContent must be used inside Tabs')
  const selected = context.value === value
  if (!selected && !forceMount) return null
  return (
    <div
      {...props}
      id={`${context.baseId}-panel-${value}`}
      role="tabpanel"
      aria-labelledby={`${context.baseId}-tab-${value}`}
      hidden={!selected}
      className={cx('ios27-tabs__content', className)}
    />
  )
}

// Breadcrumb

export function Breadcrumb({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <nav {...props} aria-label={props['aria-label'] ?? '面包屑'} className={cx('ios27-breadcrumb', className)} />
}

export function BreadcrumbList({ className, ...props }: React.OlHTMLAttributes<HTMLOListElement>) {
  return <ol {...props} className={cx('ios27-breadcrumb__list', className)} />
}

export function BreadcrumbItem({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) {
  return <li {...props} className={cx('ios27-breadcrumb__item', className)} />
}

export function BreadcrumbLink({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a {...props} className={cx('ios27-breadcrumb__link', className)} />
}

export function BreadcrumbPage({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span {...props} aria-current="page" className={cx('ios27-breadcrumb__page', className)} />
}

export function BreadcrumbSeparator({ children = '›', className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span {...props} aria-hidden="true" className={cx('ios27-breadcrumb__separator', className)}>{children}</span>
}

// Sidebar

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  compact?: boolean
}

export function Sidebar({ compact = false, className, children, ...props }: SidebarProps) {
  return (
    <aside {...props} data-compact={compact || undefined} className={cx('ios27-sidebar', className)}>
      {children}
    </aside>
  )
}

export function SidebarHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cx('ios27-sidebar__header', className)} />
}

export function SidebarContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cx('ios27-sidebar__content', className)} />
}

export function SidebarFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cx('ios27-sidebar__footer', className)} />
}

export interface SidebarSectionProps extends React.HTMLAttributes<HTMLElement> { title?: React.ReactNode }
export function SidebarSection({ title, className, children, ...props }: SidebarSectionProps) {
  return (
    <section {...props} className={cx('ios27-sidebar__section', className)}>
      {title ? <div className="ios27-sidebar__section-title">{title}</div> : null}
      <div className="ios27-sidebar__section-items">{children}</div>
    </section>
  )
}

export interface SidebarItemProps extends React.HTMLAttributes<HTMLElement> {
  href?: string
  icon?: React.ReactNode
  trailing?: React.ReactNode
  current?: boolean
  disabled?: boolean
}

export function SidebarItem({ href, icon, trailing, current, disabled, className, children, onClick, ...props }: SidebarItemProps) {
  const content = (
    <>
      {icon ? <span className="ios27-sidebar__item-icon" aria-hidden="true">{icon}</span> : null}
      <span className="ios27-sidebar__item-label">{children}</span>
      {trailing ? <span className="ios27-sidebar__item-trailing">{trailing}</span> : null}
    </>
  )
  const classes = cx('ios27-sidebar__item', current && 'is-current', disabled && 'is-disabled', className)
  if (href) {
    return (
      <a
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        href={href}
        aria-current={current ? 'page' : undefined}
        aria-disabled={disabled || undefined}
        className={classes}
        onClick={(event) => {
          if (disabled) {
            event.preventDefault()
            return
          }
          ;(onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined)?.(event)
        }}
      >{content}</a>
    )
  }
  return (
    <button
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      type="button"
      disabled={disabled}
      aria-current={current ? 'page' : undefined}
      className={classes}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
    >{content}</button>
  )
}

// Command palette

export interface CommandPaletteItem {
  id: string
  label: string
  description?: string
  group?: string
  keywords?: string[]
  shortcut?: React.ReactNode
  disabled?: boolean
  icon?: React.ReactNode
  onSelect?: () => void
}

export interface CommandPaletteProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  items: CommandPaletteItem[]
  placeholder?: string
  emptyText?: React.ReactNode
  title?: string
}

export function CommandPalette({
  open,
  defaultOpen = false,
  onOpenChange,
  items,
  placeholder = '搜索命令或页面',
  emptyText = '没有匹配的命令',
  title = '命令面板',
}: CommandPaletteProps) {
  const [current, setCurrent] = useControllableState({ value: open, defaultValue: defaultOpen, onChange: onOpenChange })
  const [query, setQuery] = React.useState('')
  const [active, setActive] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const reduceMotion = useReducedMotion()
  useEscape(current, () => setCurrent(false))
  const filtered = React.useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return items
    return items.filter((item) => [item.label, item.description ?? '', ...(item.keywords ?? [])].join(' ').toLowerCase().includes(normalized))
  }, [items, query])
  React.useEffect(() => {
    if (!current) return
    setQuery('')
    setActive(0)
    queueMicrotask(() => inputRef.current?.focus())
  }, [current])
  React.useEffect(() => setActive((value) => Math.min(value, Math.max(0, filtered.length - 1))), [filtered.length])
  const select = (item: CommandPaletteItem | undefined) => {
    if (!item || item.disabled) return
    item.onSelect?.()
    setCurrent(false)
  }
  return (
    <Portal>
      <AnimatePresence initial={false}>
        {current ? (
          <motion.div
            className="ios27-command-overlay"
            onMouseDown={(event) => event.target === event.currentTarget && setCurrent(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.08 : 0.16, ease: 'easeOut' }}
          >
            <motion.div
              className="ios27-command ios27-optical-host"
              role="dialog"
              aria-modal="true"
              aria-label={title}
              initial={reduceMotion ? false : { opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.985 }}
              transition={reduceMotion ? { duration: 0.08 } : { type: 'spring', stiffness: 460, damping: 36, mass: 0.78 }}
            >
              <LiquidGlassBackdrop material="large" />
              <div className="ios27-command__content ios27-optical-content">
                <div className="ios27-command__search">
                  <span aria-hidden="true">⌕</span>
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(event) => { setQuery(event.target.value); setActive(0) }}
                    placeholder={placeholder}
                    aria-label={placeholder}
                    onKeyDown={(event) => {
                      if (event.key === 'ArrowDown') { event.preventDefault(); setActive((value) => filtered.length ? (value + 1) % filtered.length : 0) }
                      if (event.key === 'ArrowUp') { event.preventDefault(); setActive((value) => filtered.length ? (value - 1 + filtered.length) % filtered.length : 0) }
                      if (event.key === 'Enter') { event.preventDefault(); select(filtered[active]) }
                    }}
                  />
                  <kbd>Esc</kbd>
                </div>
                <div className="ios27-command__list" role="listbox" aria-label="命令">
                  {filtered.length ? filtered.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      role="option"
                      aria-selected={active === index}
                      disabled={item.disabled}
                      data-active={active === index || undefined}
                      className="ios27-command__item"
                      onMouseEnter={() => setActive(index)}
                      onClick={() => select(item)}
                    >
                      {item.icon ? <span className="ios27-command__icon" aria-hidden="true">{item.icon}</span> : null}
                      <span className="ios27-command__copy"><strong>{item.label}</strong>{item.description ? <small>{item.description}</small> : null}</span>
                      {item.shortcut ? <span className="ios27-command__shortcut">{item.shortcut}</span> : null}
                    </button>
                  )) : <div className="ios27-command__empty">{emptyText}</div>}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Portal>
  )
}
