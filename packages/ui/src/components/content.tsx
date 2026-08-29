'use client'

import * as React from 'react'
import { cx } from './shared'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode
  description?: React.ReactNode
  error?: React.ReactNode
  containerClassName?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, description, error, className, containerClassName, disabled, ...props },
  ref,
) {
  return (
    <label className={cx('ios27-textarea', containerClassName)} data-disabled={disabled || undefined}>
      {label ? <span className="ios27-textarea__label ios27-type-subheadline">{label}</span> : null}
      <textarea
        {...props}
        ref={ref}
        disabled={disabled}
        aria-invalid={error ? true : props['aria-invalid']}
        className={cx('ios27-textarea__control', error && 'is-invalid', className)}
      />
      {error ? <span className="ios27-textarea__message is-error">{error}</span> : description ? <span className="ios27-textarea__message">{description}</span> : null}
    </label>
  )
})

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: React.ReactNode
  description?: React.ReactNode
  error?: React.ReactNode
  containerClassName?: string
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, description, error, className, containerClassName, disabled, children, ...props },
  ref,
) {
  return (
    <label className={cx('ios27-select', containerClassName)} data-disabled={disabled || undefined}>
      {label ? <span className="ios27-select__label ios27-type-subheadline">{label}</span> : null}
      <span className={cx('ios27-select__field', error && 'is-invalid')}>
        <select
          {...props}
          ref={ref}
          disabled={disabled}
          aria-invalid={error ? true : props['aria-invalid']}
          className={cx('ios27-select__control', className)}
        >
          {children}
        </select>
        <svg className="ios27-select__chevron" viewBox="0 0 16 16" aria-hidden="true">
          <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {error ? <span className="ios27-select__message is-error">{error}</span> : description ? <span className="ios27-select__message">{description}</span> : null}
    </label>
  )
})

export type BadgeVariant = 'gray' | 'blue' | 'green' | 'orange' | 'red' | 'purple'
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

export function Badge({ variant = 'gray', className, ...props }: BadgeProps) {
  return <span {...props} data-variant={variant} className={cx('ios27-badge', className)} />
}

export type AvatarSize = 'small' | 'medium' | 'large'
export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string
  alt?: string
  fallback?: React.ReactNode
  size?: AvatarSize
}

export function Avatar({ src, alt = '', fallback, size = 'medium', className, ...props }: AvatarProps) {
  const [failed, setFailed] = React.useState(false)
  return (
    <span {...props} data-size={size} className={cx('ios27-avatar', className)}>
      {src && !failed ? <img src={src} alt={alt} onError={() => setFailed(true)} /> : <span className="ios27-avatar__fallback" aria-hidden={alt ? undefined : true}>{fallback ?? alt.slice(0, 1).toUpperCase()}</span>}
    </span>
  )
}

export interface ProgressProps extends Omit<React.ProgressHTMLAttributes<HTMLProgressElement>, 'children'> {
  label?: React.ReactNode
  valueLabel?: React.ReactNode
}

export function Progress({ label, valueLabel, value = 0, max = 100, className, ...props }: ProgressProps) {
  const percent = Math.max(0, Math.min(100, (Number(value) / Math.max(1, Number(max))) * 100))
  return (
    <div className={cx('ios27-progress', className)}>
      {label || valueLabel ? <div className="ios27-progress__header"><span>{label}</span><span>{valueLabel}</span></div> : null}
      <progress {...props} value={value} max={max} aria-label={typeof label === 'string' ? label : props['aria-label']} />
      <span className="ios27-progress__track" aria-hidden="true"><span style={{ width: `${percent}%` }} /></span>
    </div>
  )
}

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'small' | 'medium' | 'large'
  label?: string
}

export function Spinner({ size = 'medium', label = '正在加载', className, ...props }: SpinnerProps) {
  return <span {...props} role="status" aria-label={label} data-size={size} className={cx('ios27-spinner', className)}><span aria-hidden="true" /></span>
}

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: 'text' | 'rect' | 'circle'
}

export function Skeleton({ shape = 'rect', className, ...props }: SkeletonProps) {
  return <div {...props} aria-hidden="true" data-shape={shape} className={cx('ios27-skeleton', className)} />
}
