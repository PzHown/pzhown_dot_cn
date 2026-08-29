'use client'

import * as React from 'react'
import { cx, useControllableState } from './shared'

// Form field

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode
  description?: React.ReactNode
  error?: React.ReactNode
  required?: boolean
  controlId?: string
  children: React.ReactElement<{
    id?: string
    required?: boolean
    'aria-invalid'?: boolean
    'aria-describedby'?: string
  }>
}

export function FormField({ label, description, error, required, controlId, className, children, ...props }: FormFieldProps) {
  const generated = React.useId()
  const id = controlId ?? generated
  const descriptionId = description ? `${id}-description` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined
  const child = React.Children.only(children)
  return (
    <div {...props} className={cx('ios27-form-field', className)} data-invalid={error ? true : undefined}>
      {label ? <label htmlFor={id} className="ios27-form-field__label">{label}{required ? <span aria-hidden="true"> *</span> : null}</label> : null}
      {React.cloneElement(child, {
        id,
        required: required ?? child.props.required,
        'aria-invalid': error ? true : child.props['aria-invalid'],
        'aria-describedby': describedBy ?? child.props['aria-describedby'],
      })}
      {description ? <div id={descriptionId} className="ios27-form-field__description">{description}</div> : null}
      {error ? <div id={errorId} className="ios27-form-field__error" role="alert">{error}</div> : null}
    </div>
  )
}

// Combobox

export interface ComboboxOption {
  value: string
  label: string
  description?: string
  keywords?: string[]
  disabled?: boolean
}

export interface ComboboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'size'> {
  options: ComboboxOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  emptyText?: React.ReactNode
  clearable?: boolean
  onClear?: () => void
}

export const Combobox = React.forwardRef<HTMLInputElement, ComboboxProps>(function Combobox(
  {
    options,
    value,
    defaultValue = '',
    onValueChange,
    placeholder = '搜索或选择',
    emptyText = '没有匹配项',
    clearable = false,
    onClear,
    className,
    disabled,
    onFocus,
    onKeyDown,
    ...props
  },
  forwardedRef,
) {
  const [selected, setSelected] = useControllableState({ value, defaultValue, onChange: onValueChange })
  const selectedOption = options.find((option) => option.value === selected)
  const [query, setQuery] = React.useState(selectedOption?.label ?? '')
  const [open, setOpen] = React.useState(false)
  const [active, setActive] = React.useState(0)
  const rootRef = React.useRef<HTMLDivElement>(null)
  const localInputRef = React.useRef<HTMLInputElement>(null)
  const listId = React.useId()
  React.useImperativeHandle(forwardedRef, () => localInputRef.current as HTMLInputElement)
  React.useEffect(() => {
    if (!open) setQuery(selectedOption?.label ?? '')
  }, [open, selectedOption?.label])
  const filtered = React.useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized || normalized === selectedOption?.label.toLowerCase()) return options
    return options.filter((option) => [option.label, option.description ?? '', ...(option.keywords ?? [])].join(' ').toLowerCase().includes(normalized))
  }, [options, query, selectedOption?.label])
  React.useEffect(() => {
    if (!open) return
    const close = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [open])
  React.useEffect(() => setActive((index) => Math.min(index, Math.max(0, filtered.length - 1))), [filtered.length])
  const select = (option: ComboboxOption | undefined) => {
    if (!option || option.disabled) return
    setSelected(option.value)
    setQuery(option.label)
    setOpen(false)
  }
  return (
    <div ref={rootRef} className={cx('ios27-combobox', className)} data-open={open || undefined} data-disabled={disabled || undefined}>
      <div className="ios27-combobox__field">
        <span className="ios27-combobox__search" aria-hidden="true">⌕</span>
        <input
          {...props}
          ref={localInputRef}
          value={query}
          disabled={disabled}
          placeholder={placeholder}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={open && filtered[active] ? `${listId}-${active}` : undefined}
          onFocus={(event) => { onFocus?.(event); if (!event.defaultPrevented) setOpen(true) }}
          onChange={(event) => { setQuery(event.target.value); setOpen(true); setActive(0) }}
          onKeyDown={(event) => {
            onKeyDown?.(event)
            if (event.defaultPrevented) return
            if (event.key === 'ArrowDown') { event.preventDefault(); setOpen(true); setActive((index) => filtered.length ? (index + 1) % filtered.length : 0) }
            if (event.key === 'ArrowUp') { event.preventDefault(); setOpen(true); setActive((index) => filtered.length ? (index - 1 + filtered.length) % filtered.length : 0) }
            if (event.key === 'Enter' && open) { event.preventDefault(); select(filtered[active]) }
            if (event.key === 'Escape') { event.preventDefault(); setOpen(false); setQuery(selectedOption?.label ?? '') }
          }}
        />
        {clearable && (selected || query) ? (
          <button type="button" className="ios27-combobox__clear" aria-label="清除选择" disabled={disabled} onClick={() => { setSelected(''); setQuery(''); onClear?.(); localInputRef.current?.focus() }}>×</button>
        ) : <span className="ios27-combobox__chevron" aria-hidden="true">⌄</span>}
      </div>
      {open ? (
        <div id={listId} role="listbox" className="ios27-combobox__list">
          {filtered.length ? filtered.map((option, index) => (
            <button
              key={option.value}
              type="button"
              id={`${listId}-${index}`}
              role="option"
              aria-selected={selected === option.value}
              disabled={option.disabled}
              data-active={active === index || undefined}
              className="ios27-combobox__option"
              onMouseEnter={() => setActive(index)}
              onClick={() => select(option)}
            >
              <span className="ios27-combobox__option-copy"><strong>{option.label}</strong>{option.description ? <small>{option.description}</small> : null}</span>
              {selected === option.value ? <span className="ios27-combobox__check" aria-hidden="true">✓</span> : null}
            </button>
          )) : <div className="ios27-combobox__empty">{emptyText}</div>}
        </div>
      ) : null}
    </div>
  )
})

// Date inputs use the platform picker for semantics, locale and mobile ergonomics.

export interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: React.ReactNode
  description?: React.ReactNode
  error?: React.ReactNode
}

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(function DatePicker(
  { label, description, error, className, required, ...props },
  ref,
) {
  const input = <input {...props} ref={ref} type="date" required={required} className={cx('ios27-date-input', className)} />
  return label || description || error ? <FormField label={label} description={description} error={error} required={required}>{input}</FormField> : input
})

export interface DateRangeValue { start: string; end: string }
export interface DateRangePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: DateRangeValue
  defaultValue?: DateRangeValue
  onValueChange?: (value: DateRangeValue) => void
  min?: string
  max?: string
  disabled?: boolean
  startLabel?: React.ReactNode
  endLabel?: React.ReactNode
}

export function DateRangePicker({
  value,
  defaultValue = { start: '', end: '' },
  onValueChange,
  min,
  max,
  disabled,
  startLabel = '开始日期',
  endLabel = '结束日期',
  className,
  ...props
}: DateRangePickerProps) {
  const [current, setCurrent] = useControllableState({ value, defaultValue, onChange: onValueChange })
  return (
    <div {...props} className={cx('ios27-date-range', className)}>
      <FormField label={startLabel}>
        <input type="date" className="ios27-date-input" value={current.start} min={min} max={current.end || max} disabled={disabled} onChange={(event) => setCurrent({ ...current, start: event.target.value })} />
      </FormField>
      <span className="ios27-date-range__separator" aria-hidden="true">–</span>
      <FormField label={endLabel}>
        <input type="date" className="ios27-date-input" value={current.end} min={current.start || min} max={max} disabled={disabled} onChange={(event) => setCurrent({ ...current, end: event.target.value })} />
      </FormField>
    </div>
  )
}
