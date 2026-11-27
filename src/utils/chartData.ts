import type { Transaction } from '../types'

export const ACCENT = '#5FD3A6'
export const GREYS = ['#7C8AA0', '#5B6676', '#46505E', '#2E3540']

// Formato corto de dinero: 330000 -> "$330k", 2261536 -> "$2.26M"
export function formatCompactMoney(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`
  if (value >= 1_000) return `$${Math.round(value / 1_000)}k`
  return `$${Math.round(value)}`
}

function sumBy(rows: Transaction[], keyOf: (t: Transaction) => string): Map<string, number> {
  const totals = new Map<string, number>()
  for (const t of rows) {
    const key = keyOf(t)
    totals.set(key, (totals.get(key) ?? 0) + t.sales)
  }
  return totals
}

export interface MonthlySales {
  month: Date
  sales: number
}

export interface YearTotal {
  year: number
  total: number
}

// Ventas de cada mes (incluye los meses sin ventas con 0)
export function monthlySales(rows: Transaction[]): MonthlySales[] {
  const totals = sumBy(rows, (t) => t.orderDate.slice(0, 7)) // "2017-11"
  const months = [...totals.keys()].sort()
  if (!months.length) return []

  const [firstYear, firstMonth] = months[0].split('-').map(Number)
  const [lastYear, lastMonth] = months[months.length - 1].split('-').map(Number)
  const result: MonthlySales[] = []
  let y = firstYear
  let m = firstMonth
  while (y < lastYear || (y === lastYear && m <= lastMonth)) {
    const key = `${y}-${String(m).padStart(2, '0')}`
    result.push({ month: new Date(y, m - 1, 1), sales: totals.get(key) ?? 0 })
    if (m === 12) {
      y++
      m = 1
    } else {
      m++
    }
  }
  return result
}

export function yearTotals(rows: Transaction[]): YearTotal[] {
  const totals = sumBy(rows, (t) => t.orderDate.slice(0, 4))
  return [...totals.entries()]
    .map(([year, total]) => ({ year: Number(year), total }))
    .sort((a, b) => a.year - b.year)
}

export interface NamedValue {
  name: string
  value: number
}

export function salesBySubCategory(rows: Transaction[]): NamedValue[] {
  return [...sumBy(rows, (t) => t.subCategory).entries()]
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
}

export interface StateShare {
  state: string
  percentage: number
  color: string
}

// Los estados que no están entre los principales se agrupan en "Otros estados"
export function salesByState(rows: Transaction[], top = 4): StateShare[] {
  const total = rows.reduce((sum, t) => sum + t.sales, 0)
  if (!total) return []

  const sorted = [...sumBy(rows, (t) => t.state).entries()].sort((a, b) => b[1] - a[1])
  const colors = [ACCENT, ...GREYS]
  const shares: StateShare[] = sorted.slice(0, top).map(([state, value], i) => ({
    state,
    percentage: (value / total) * 100,
    color: colors[i],
  }))

  const others = sorted.slice(top).reduce((sum, [, value]) => sum + value, 0)
  if (others > 0) {
    shares.push({ state: 'Otros estados', percentage: (others / total) * 100, color: GREYS[GREYS.length - 1] })
  }
  return shares
}
