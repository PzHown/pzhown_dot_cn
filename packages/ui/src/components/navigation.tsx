'use client'

import * as React from 'react'
import { cx, useControllableState } from './shared'

export interface PageProps extends React.HTMLAttributes<HTMLElement> {
  title?: React.ReactNode
  subtitle?: React.ReactNode
  actions?: React.ReactNode
  largeTitle?: boolean
}

export function Page({ title, subtitle, actions, largeTitle = true, className, children, ...props }: PageProps) {
  return (
    <main {...props} className={cx('ios27-page', className)}>
      {(title || subtitle || actions) ? (
        <header className={cx('ios27-page__header', largeTitle && 'is-large')}>
          <div>
            {title ? <h1>{title}</h1> : null}
            {subtitle ? <p>{subtitle}</p> : null}
          </div>
          {actions ? <div className="ios27-page__actions">{actions}</div> : null}
        </header>
      ) : null}
      <div className="ios27-page__content">{children}</div>
    </main>
  )
}

export interface ToolbarProps extends React.HTMLAttributes<HTMLElement> {
  placement?: 'top' | 'bottom'
}

export function Toolbar({ placement = 'top', className, children, ...props }: ToolbarProps) {
  return <nav {...props} data-placement={placement} className={cx('ios27-toolbar', `ios27-toolbar--${placement}`, className)}>{children}</nav>
}

export function ToolbarGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cx('ios27-toolbar__group', className)} />
}

export function ToolbarTitle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cx('ios27-toolbar__title', className)} />
}

export interface ListSectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: React.ReactNode
  footer?: React.ReactNode
}

export function ListSection({ title, footer, className, children, ...props }: ListSectionProps) {
  return (
    <section {...props} className={cx('ios27-list-section', className)}>
      {title ? <header className="ios27-list-section__title">{title}</header> : null}
      <div className="ios27-list-section__body">{children}</div>
      {footer ? <footer className="ios27-list-section__footer">{footer}</footer> : null}
    </section>
  )
}

export interface ListRowProps extends React.HTMLAttributes<HTMLElement> {
  leading?: React.ReactNode
  trailing?: React.ReactNode
  detail?: React.ReactNode
  href?: string
  disabled?: boolean
  disclosure?: boolean
}

export function ListRow({ leading, trailing, detail, href, disabled, disclosure, className, children, onClick, ...props }: ListRowProps) {
  const content = (
    <>
      {leading ? <span className="ios27-list-row__leading">{leading}</span> : null}
      <span className="ios27-list-row__copy"><span className="ios27-list-row__label">{children}</span>{detail ? <span className="ios27-list-row__detail">{detail}</span> : null}</span>
      {trailing ? <span className="ios27-list-row__trailing">{trailing}</span> : null}
      {disclosure ? <span className="ios27-list-row__disclosure" aria-hidden="true">›</span> : null}
    </>
  )
  const classes = cx('ios27-list-row', disabled && 'is-disabled', (href || onClick) && 'is-interactive', className)
  if (href) {
    return <a {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)} href={href} aria-disabled={disabled || undefined} className={classes} onClick={disabled ? (event) => event.preventDefault() : undefined}>{content}</a>
  }
  if (onClick) {
    return <button {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)} type="button" disabled={disabled} className={classes} onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}>{content}</button>
  }
  return <div {...(props as React.HTMLAttributes<HTMLDivElement>)} className={classes}>{content}</div>
}

type TabBarContextValue = { value: string; setValue: (value: string) => void }
const TabBarContext = React.createContext<TabBarContextValue | null>(null)

export interface TabBarProps extends React.HTMLAttributes<HTMLElement> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  minimized?: boolean
  ariaLabel?: string
}

export function TabBar({ value, defaultValue = '', onValueChange, minimized = false, ariaLabel = '标签栏', className, children, ...props }: TabBarProps) {
  const [selected, setSelected] = useControllableState({ value, defaultValue, onChange: onValueChange })
  return (
    <TabBarContext.Provider value={{ value: selected, setValue: setSelected }}>
      <nav {...props} aria-label={ariaLabel} data-minimized={minimized || undefined} className={cx('ios27-tabbar', className)}>
        <div className="ios27-tabbar__platter">{children}</div>
      </nav>
    </TabBarContext.Provider>
  )
}

export interface TabBarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  icon?: React.ReactNode
  badge?: React.ReactNode
}

export function TabBarItem({ value, icon, badge, className, children, ...props }: TabBarItemProps) {
  const context = React.useContext(TabBarContext)
  if (!context) throw new Error('TabBarItem must be used inside TabBar')
  const selected = context.value === value
  return (
    <button
      {...props}
      type="button"
      role="tab"
      aria-selected={selected}
      data-selected={selected || undefined}
      className={cx('ios27-tabbar__item', className)}
      onClick={(event) => {
        props.onClick?.(event)
        if (!event.defaultPrevented) context.setValue(value)
      }}
    >
      <span className="ios27-tabbar__icon">{icon}{badge ? <span className="ios27-tabbar__badge">{badge}</span> : null}</span>
      {children ? <span className="ios27-tabbar__label">{children}</span> : null}
    </button>
  )
}
