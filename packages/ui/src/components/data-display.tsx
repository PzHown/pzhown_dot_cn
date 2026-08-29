'use client'

import * as React from 'react'
import { cx } from './shared'

// Empty state

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  secondaryAction?: React.ReactNode
}

export function EmptyState({ icon, title, description, action, secondaryAction, className, ...props }: EmptyStateProps) {
  return (
    <div {...props} className={cx('ios27-empty-state', className)}>
      {icon ? <div className="ios27-empty-state__icon" aria-hidden="true">{icon}</div> : null}
      <div className="ios27-empty-state__copy">
        <h3>{title}</h3>
        {description ? <p>{description}</p> : null}
      </div>
      {action || secondaryAction ? <div className="ios27-empty-state__actions">{action}{secondaryAction}</div> : null}
    </div>
  )
}

// Pagination

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  siblingCount?: number
  previousLabel?: React.ReactNode
  nextLabel?: React.ReactNode
}

type PaginationToken = number | 'ellipsis-left' | 'ellipsis-right'

function paginationTokens(page: number, totalPages: number, siblingCount: number): PaginationToken[] {
  if (totalPages <= 7 + siblingCount * 2) return Array.from({ length: totalPages }, (_, index) => index + 1)
  const start = Math.max(2, page - siblingCount)
  const end = Math.min(totalPages - 1, page + siblingCount)
  const tokens: PaginationToken[] = [1]
  if (start > 2) tokens.push('ellipsis-left')
  for (let value = start; value <= end; value += 1) tokens.push(value)
  if (end < totalPages - 1) tokens.push('ellipsis-right')
  tokens.push(totalPages)
  return tokens
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
  previousLabel = '上一页',
  nextLabel = '下一页',
  className,
  ...props
}: PaginationProps) {
  const safeTotal = Math.max(1, totalPages)
  const safePage = Math.min(Math.max(1, page), safeTotal)
  const tokens = paginationTokens(safePage, safeTotal, siblingCount)
  return (
    <nav {...props} aria-label={props['aria-label'] ?? '分页'} className={cx('ios27-pagination', className)}>
      <button type="button" className="ios27-pagination__previous" disabled={safePage <= 1} onClick={() => onPageChange(safePage - 1)}>{previousLabel}</button>
      <div className="ios27-pagination__pages">
        {tokens.map((token) => typeof token === 'number' ? (
          <button
            key={token}
            type="button"
            aria-current={token === safePage ? 'page' : undefined}
            data-current={token === safePage || undefined}
            className="ios27-pagination__page"
            onClick={() => onPageChange(token)}
          >{token}</button>
        ) : <span key={token} className="ios27-pagination__ellipsis" aria-hidden="true">…</span>)}
      </div>
      <button type="button" className="ios27-pagination__next" disabled={safePage >= safeTotal} onClick={() => onPageChange(safePage + 1)}>{nextLabel}</button>
    </nav>
  )
}

// Data table

export type DataTableSortDirection = 'asc' | 'desc' | false

export interface DataTableColumn<T> {
  id: string
  header: React.ReactNode
  cell: (row: T, index: number) => React.ReactNode
  align?: 'start' | 'center' | 'end'
  width?: string | number
  sortable?: boolean
  sortDirection?: DataTableSortDirection
  onSort?: (direction: Exclude<DataTableSortDirection, false>) => void
  className?: string
}

export interface DataTableProps<T> extends Omit<React.TableHTMLAttributes<HTMLTableElement>, 'children'> {
  columns: DataTableColumn<T>[]
  data: T[]
  getRowKey: (row: T, index: number) => React.Key
  caption?: React.ReactNode
  loading?: boolean
  loadingLabel?: React.ReactNode
  empty?: React.ReactNode
  selectionMode?: 'none' | 'multiple'
  selectedKeys?: Set<React.Key>
  onSelectedKeysChange?: (keys: Set<React.Key>) => void
  rowDisabled?: (row: T) => boolean
  onRowClick?: (row: T, index: number) => void
  stickyHeader?: boolean
}

export function DataTable<T>({
  columns,
  data,
  getRowKey,
  caption,
  loading = false,
  loadingLabel = '正在加载…',
  empty,
  selectionMode = 'none',
  selectedKeys = new Set<React.Key>(),
  onSelectedKeysChange,
  rowDisabled,
  onRowClick,
  stickyHeader = false,
  className,
  ...props
}: DataTableProps<T>) {
  const selectable = selectionMode === 'multiple'
  const enabledRows = data.map((row, index) => ({ row, index, key: getRowKey(row, index) })).filter(({ row }) => !rowDisabled?.(row))
  const allSelected = enabledRows.length > 0 && enabledRows.every(({ key }) => selectedKeys.has(key))
  const someSelected = enabledRows.some(({ key }) => selectedKeys.has(key)) && !allSelected
  const toggleAll = () => {
    if (!onSelectedKeysChange) return
    const next = new Set(selectedKeys)
    if (allSelected) enabledRows.forEach(({ key }) => next.delete(key))
    else enabledRows.forEach(({ key }) => next.add(key))
    onSelectedKeysChange(next)
  }
  return (
    <div className="ios27-data-table-wrap" data-loading={loading || undefined}>
      <table {...props} className={cx('ios27-data-table', stickyHeader && 'is-sticky', className)}>
        {caption ? <caption>{caption}</caption> : null}
        <thead>
          <tr>
            {selectable ? (
              <th className="ios27-data-table__select" scope="col">
                <input
                  type="checkbox"
                  aria-label="选择当前页全部项目"
                  checked={allSelected}
                  ref={(node) => { if (node) node.indeterminate = someSelected }}
                  onChange={toggleAll}
                />
              </th>
            ) : null}
            {columns.map((column) => (
              <th key={column.id} scope="col" data-align={column.align ?? 'start'} className={column.className} style={{ width: column.width }}>
                {column.sortable ? (
                  <button
                    type="button"
                    className="ios27-data-table__sort"
                    aria-label={`按${String(column.header)}排序`}
                    data-direction={column.sortDirection || undefined}
                    onClick={() => column.onSort?.(column.sortDirection === 'asc' ? 'desc' : 'asc')}
                  >
                    <span>{column.header}</span>
                    <span className="ios27-data-table__sort-icon" aria-hidden="true">{column.sortDirection === 'asc' ? '↑' : column.sortDirection === 'desc' ? '↓' : '↕'}</span>
                  </button>
                ) : column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={columns.length + (selectable ? 1 : 0)} className="ios27-data-table__state"><span className="ios27-data-table__loading-dot" aria-hidden="true" />{loadingLabel}</td></tr>
          ) : data.length ? data.map((row, index) => {
            const key = getRowKey(row, index)
            const disabled = rowDisabled?.(row) ?? false
            const selected = selectedKeys.has(key)
            return (
              <tr
                key={key}
                data-selected={selected || undefined}
                data-disabled={disabled || undefined}
                data-interactive={onRowClick ? true : undefined}
                onClick={() => { if (!disabled) onRowClick?.(row, index) }}
              >
                {selectable ? (
                  <td className="ios27-data-table__select" onClick={(event) => event.stopPropagation()}>
                    <input
                      type="checkbox"
                      aria-label={`选择第 ${index + 1} 行`}
                      checked={selected}
                      disabled={disabled}
                      onChange={() => {
                        if (!onSelectedKeysChange) return
                        const next = new Set(selectedKeys)
                        if (selected) next.delete(key)
                        else next.add(key)
                        onSelectedKeysChange(next)
                      }}
                    />
                  </td>
                ) : null}
                {columns.map((column) => <td key={column.id} data-align={column.align ?? 'start'} className={column.className}>{column.cell(row, index)}</td>)}
              </tr>
            )
          }) : (
            <tr><td colSpan={columns.length + (selectable ? 1 : 0)} className="ios27-data-table__state">{empty ?? '暂无数据'}</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
