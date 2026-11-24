import { Box, Paper, Typography } from '@mui/material'
import type { Transaction } from '../types'

interface TransactionCardProps {
  transaction: Transaction
}

const fields = [
  ['Order Date', (t: Transaction) => t.orderDate],
  ['Customer Name', (t: Transaction) => t.customerName],
  ['Category', (t: Transaction) => t.category],
  ['Sub-Category', (t: Transaction) => t.subCategory],
] as const

function TransactionCard({ transaction }: TransactionCardProps) {
  const sales = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(transaction.sales)

  return (
    <Paper variant="outlined" sx={{ p: 1.5, bgcolor: 'background.paper', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1, mb: 1.5 }}>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="caption" color="text.secondary">Order ID</Typography>
          <Typography variant="body2" sx={{ overflowWrap: 'anywhere' }}>{transaction.orderId}</Typography>
        </Box>
        <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
          <Typography variant="caption" color="text.secondary">Sales</Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{sales}</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', columnGap: 2, rowGap: 1.25 }}>
        {fields.map(([label, getValue]) => (
          <Box key={label} sx={{ minWidth: 0 }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>{label}</Typography>
            <Typography variant="body2" sx={{ overflowWrap: 'anywhere' }}>{getValue(transaction)}</Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  )
}

export default TransactionCard
