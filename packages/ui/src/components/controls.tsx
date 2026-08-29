'use client'

import * as React from 'react'
import { cx, useControllableState } from './shared'

export type ButtonVariant = 'filled' | 'gray' | 'tinted' | 'plain' | 'glass' | 'destructive'
export type ButtonSize = 'small' | 'medium' | 'large'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  iconOnly?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'filled', size = 'medium', iconOnly = false, type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cx(
        'ios27-btn',
        `ios27-btn--${variant}`,
        `ios27-btn--${size}`,
        iconOnly && 'ios27-btn--icon-only',
        className,
      )}
      {...props}
    />
  )
})

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: React.ReactNode
  description?: React.ReactNode
  error?: React.ReactNode
  leading?: React.ReactNode
  trailing?: React.ReactNode
  clearable?: boolean
  onClear?: () => void
  containerClassName?: string
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { id, label, description, error, leading, trailing, clearable, onClear, className, containerClassName, value, disabled, ...props },
  ref,
) {
  const generated = React.useId()
  const inputId = id ?? generated
  const hasValue = value !== undefined && String(value).length > 0
  return (
    <label className={cx('ios27-textfield', containerClassName)} data-disabled={disabled || undefined}>
      {label ? <span className="ios27-textfield__label ios27-type-subheadline">{label}</span> : null}
      <span className={cx('ios27-textfield__field', error && 'is-invalid')}>
        {leading ? <span className="ios27-textfield__leading">{leading}</span> : null}
        <input
          {...props}
          ref={ref}
          id={inputId}
          value={value}
          disabled={disabled}
          aria-invalid={error ? true : props['aria-invalid']}
          className={cx('ios27-textfield__input', leading && 'has-leading', (trailing || clearable) && 'has-trailing', className)}
        />
        {clearable && hasValue ? (
          <button
            type="button"
            className="ios27-textfield__clear"
            aria-label="清除"
            disabled={disabled}
            onClick={onClear}
          >
            ×
          </button>
        ) : trailing ? (
          <span className="ios27-textfield__trailing">{trailing}</span>
        ) : null}
      </span>
      {error ? <span className="ios27-textfield__message is-error">{error}</span> : description ? <span className="ios27-textfield__message">{description}</span> : null}
    </label>
  )
})

export interface SearchBarProps extends Omit<TextFieldProps, 'type' | 'leading'> {
  onCancel?: () => void
  cancelLabel?: string
}

export function SearchBar({ className, containerClassName, onCancel, cancelLabel = '取消', ...props }: SearchBarProps) {
  return (
    <div className={cx('ios27-searchbar', containerClassName)} data-slot="search-bar">
      <TextField
        {...props}
        type="search"
        className={cx('ios27-searchbar__input', className)}
        containerClassName="ios27-searchbar__field"
        leading={
          <svg viewBox="0 0 20 20" aria-hidden="true" className="ios27-searchbar__icon">
            <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="m12.6 12.6 4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        }
      />
      {onCancel ? <button type="button" className="ios27-searchbar__cancel" onClick={onCancel}>{cancelLabel}</button> : null}
    </div>
  )
}

export interface ToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  pressed?: boolean
  defaultPressed?: boolean
  onPressedChange?: (pressed: boolean) => void
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
  { pressed, defaultPressed = false, onPressedChange, className, onClick, type = 'button', ...props },
  ref,
) {
  const [selected, setSelected] = useControllableState({ value: pressed, defaultValue: defaultPressed, onChange: onPressedChange })
  return (
    <button
      {...props}
      ref={ref}
      type={type}
      aria-pressed={selected}
      data-selected={selected || undefined}
      data-slot="toggle"
      className={cx('ios27-toggle', className)}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) setSelected(!selected)
      }}
    />
  )
})

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  label?: React.ReactNode
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  { checked, defaultChecked = false, onCheckedChange, label, className, disabled, onClick, type = 'button', ...props },
  ref,
) {
  const [selected, setSelected] = useControllableState({ value: checked, defaultValue: defaultChecked, onChange: onCheckedChange })
  const control = (
    <button
      {...props}
      ref={ref}
      type={type}
      role="switch"
      aria-checked={selected}
      disabled={disabled}
      data-selected={selected || undefined}
      data-slot="switch"
      className={cx('ios27-switch', className)}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) setSelected(!selected)
      }}
    >
      <span className="ios27-switch__thumb" />
    </button>
  )
  return label ? <label className="ios27-labeled-control"><span>{label}</span>{control}</label> : control
})

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: React.ReactNode
  description?: React.ReactNode
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { className, label, description, checked, defaultChecked, disabled, ...props }, ref,
) {
  return (
    <label className={cx('ios27-checkbox', disabled && 'is-disabled', className)}>
      <input {...props} ref={ref} type="checkbox" checked={checked} defaultChecked={defaultChecked} disabled={disabled} />
      <span className="ios27-checkbox__box" aria-hidden="true">
        <svg viewBox="0 0 16 16"><path d="m3.2 8.2 3 3 6.6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
      {label || description ? <span className="ios27-checkbox__copy"><span className="ios27-checkbox__label">{label}</span>{description ? <span className="ios27-checkbox__description">{description}</span> : null}</span> : null}
    </label>
  )
})

type RadioContextValue = { name: string; value: string; setValue: (value: string) => void; disabled?: boolean }
const RadioContext = React.createContext<RadioContextValue | null>(null)

export interface RadioGroupProps extends Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
  name?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  legend?: React.ReactNode
}

export function RadioGroup({ name, value, defaultValue = '', onValueChange, legend, disabled, className, children, ...props }: RadioGroupProps) {
  const generated = React.useId()
  const [selected, setSelected] = useControllableState({ value, defaultValue, onChange: onValueChange })
  return (
    <RadioContext.Provider value={{ name: name ?? generated, value: selected, setValue: setSelected, disabled }}>
      <fieldset {...props} disabled={disabled} className={cx('ios27-radio-group', className)}>
        {legend ? <legend>{legend}</legend> : null}
        {children}
      </fieldset>
    </RadioContext.Provider>
  )
}

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'name' | 'value'> {
  value: string
  label?: React.ReactNode
  description?: React.ReactNode
}

export function Radio({ value, label, description, className, disabled, onChange, ...props }: RadioProps) {
  const context = React.useContext(RadioContext)
  if (!context) throw new Error('Radio must be used inside RadioGroup')
  const checked = context.value === value
  return (
    <label className={cx('ios27-radio', (disabled || context.disabled) && 'is-disabled', className)}>
      <input
        {...props}
        type="radio"
        name={context.name}
        value={value}
        checked={checked}
        disabled={disabled || context.disabled}
        onChange={(event) => {
          onChange?.(event)
          if (event.target.checked) context.setValue(value)
        }}
      />
      <span className="ios27-radio__circle" aria-hidden="true"><span /></span>
      {label || description ? <span className="ios27-radio__copy"><span>{label}</span>{description ? <small>{description}</small> : null}</span> : null}
    </label>
  )
}

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  onValueChange?: (value: number) => void
  label?: React.ReactNode
  valueLabel?: React.ReactNode
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(function Slider(
  { className, min = 0, max = 100, value, defaultValue, onValueChange, label, valueLabel, ...props },
  ref,
) {
  const numericValue = Number(value ?? defaultValue ?? min)
  const progress = ((numericValue - Number(min)) / Math.max(1, Number(max) - Number(min))) * 100
  return (
    <label className={cx('ios27-slider', className)}>
      {label || valueLabel ? <span className="ios27-slider__header"><span>{label}</span><span>{valueLabel}</span></span> : null}
      <input
        {...props}
        ref={ref}
        type="range"
        min={min}
        max={max}
        value={value}
        defaultValue={defaultValue}
        style={{ '--ios27-slider-progress': `${progress}%` } as React.CSSProperties}
        onChange={(event) => onValueChange?.(event.currentTarget.valueAsNumber)}
      />
    </label>
  )
})

type SegmentedContextValue = { value: string; setValue: (value: string) => void }
const SegmentedContext = React.createContext<SegmentedContextValue | null>(null)

export interface SegmentedControlProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  ariaLabel?: string
}

export function SegmentedControl({ value, defaultValue = '', onValueChange, ariaLabel = '分段控制', className, children, ...props }: SegmentedControlProps) {
  const [selected, setSelected] = useControllableState({ value, defaultValue, onChange: onValueChange })
  return (
    <SegmentedContext.Provider value={{ value: selected, setValue: setSelected }}>
      <div {...props} className={cx('ios27-segmented', className)} role="radiogroup" aria-label={ariaLabel}>{children}</div>
    </SegmentedContext.Provider>
  )
}

export interface SegmentedControlItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

export function SegmentedControlItem({ value, className, children, disabled, ...props }: SegmentedControlItemProps) {
  const context = React.useContext(SegmentedContext)
  if (!context) throw new Error('SegmentedControlItem must be used inside SegmentedControl')
  const selected = context.value === value
  return (
    <button
      {...props}
      type="button"
      role="radio"
      aria-checked={selected}
      disabled={disabled}
      data-selected={selected || undefined}
      className={cx('ios27-segmented__item', className)}
      onClick={(event) => {
        props.onClick?.(event)
        if (!event.defaultPrevented) context.setValue(value)
      }}
    >
      {children}
    </button>
  )
}
