'use client'

import * as React from 'react'
import { createPortal } from 'react-dom'

export function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ')
}

export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: {
  value?: T
  defaultValue: T
  onChange?: (value: T) => void
}) {
  const [internal, setInternal] = React.useState(defaultValue)
  const current = value === undefined ? internal : value
  const set = React.useCallback(
    (next: T | ((previous: T) => T)) => {
      const resolved = typeof next === 'function' ? (next as (previous: T) => T)(current) : next
      if (value === undefined) setInternal(resolved)
      onChange?.(resolved)
    },
    [current, onChange, value],
  )
  return [current, set] as const
}

export function Portal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  if (!mounted || typeof document === 'undefined') return null
  return createPortal(children, document.body)
}

export function useEscape(enabled: boolean, onEscape: () => void) {
  React.useEffect(() => {
    if (!enabled) return
    const handle = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onEscape()
    }
    document.addEventListener('keydown', handle)
    return () => document.removeEventListener('keydown', handle)
  }, [enabled, onEscape])
}

export function composeHandlers<E>(
  first?: (event: E) => void,
  second?: (event: E) => void,
) {
  return (event: E) => {
    first?.(event)
    if (!(event as { defaultPrevented?: boolean }).defaultPrevented) second?.(event)
  }
}
