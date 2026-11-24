import { useState } from 'react'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery, useTheme } from '@mui/material'
import type { Transaction } from '../types'
import TransactionCard from './TransactionCard'
import Pagination from './Pagination'

interface TransactionsTableProps {
  columns: string[]
  rows: Transaction[]
  pageSize: number
}

const defaultColumns = ['Order ID', 'Order Date', 'Customer Name', 'Category', 'Sub-Category', 'Sales']
const columnValues: Record<string, (row: Transaction) => string | number> = {
  'Order ID': (row) => row.orderId,
  'Order Date': (row) => row.orderDate,
  'Customer Name': (row) => row.customerName,
  Category: (row) => row.category,
  'Sub-Category': (row) => row.subCategory,
  Sales: (row) => row.sales,
}
const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

function TransactionsTable({ columns, rows, pageSize }: TransactionsTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))
  const safePageSize = Math.max(1, pageSize)
  const pageCount = Math.ceil(rows.length / safePageSize)
  const page = Math.min(currentPage, Math.max(1, pageCount))
  const visibleRows = rows.slice((page - 1) * safePageSize, page * safePageSize)
  const shownColumns = columns.length ? columns : defaultColumns

  return (
    <Box sx={{ width: '100%', minWidth: 0 }}>
      {mobile ? (
        <Box sx={{ display: 'grid', gap: 1 }}>
          {visibleRows.map((row) => <TransactionCard key={`${row.rowId}-${row.orderId}`} transaction={row} />)}
        </Box>
      ) : (
        <TableContainer sx={{ width: '100%', overflowX: 'auto' }}>
          <Table size="small" aria-label="Últimos registros de pedidos" sx={{ minWidth: 600 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: 'action.hover' }}>
                {shownColumns.map((column) => (
                  <TableCell key={column} sx={{ color: 'text.secondary', fontSize: 12, whiteSpace: 'nowrap', borderColor: 'divider' }}>{column}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row) => (
                <TableRow key={`${row.rowId}-${row.orderId}`} hover>
                  {shownColumns.map((column) => {
                    const value = columnValues[column]?.(row) ?? ''
                    return (
                      <TableCell key={column} sx={{ fontSize: 12, borderColor: 'divider', whiteSpace: column === 'Sales' ? 'nowrap' : 'normal', textAlign: column === 'Sales' ? 'right' : 'left' }}>
                        {column === 'Sales' ? money.format(Number(value)) : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
              {!visibleRows.length && <TableRow><TableCell colSpan={shownColumns.length} align="center"><Typography variant="body2" color="text.secondary">No hay pedidos para mostrar.</Typography></TableCell></TableRow>}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1.5, gap: 1 }}>
        <Typography variant="caption" color="text.secondary">
          {rows.length ? `${(page - 1) * safePageSize + 1}–${Math.min(page * safePageSize, rows.length)} de ${rows.length} pedidos` : '0 pedidos'}
        </Typography>
        <Pagination currentPage={page} totalItems={rows.length} pageSize={safePageSize} compact={mobile} onPageChange={setCurrentPage} />
      </Box>
    </Box>
  )
}