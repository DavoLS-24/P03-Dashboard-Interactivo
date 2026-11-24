import { Box, IconButton, Pagination as MuiPagination, Typography } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

interface PaginationProps {
  currentPage: number
  totalItems: number
  onPageChange: (page: number) => void
  compact?: boolean
  pageSize?: number
}

function Pagination({ currentPage, totalItems, onPageChange, compact = false, pageSize = 5 }: PaginationProps) {
  const pageCount = Math.ceil(Math.max(0, totalItems) / Math.max(1, pageSize))
  const page = Math.min(Math.max(1, currentPage), Math.max(1, pageCount))

  if (compact) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <IconButton aria-label="Página anterior" size="small" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
          <ChevronLeftIcon fontSize="small" />
        </IconButton>
        <Typography variant="caption" sx={{ minWidth: 24, textAlign: 'center' }}>{page}</Typography>
        <IconButton aria-label="Página siguiente" size="small" disabled={page >= pageCount} onClick={() => onPageChange(page + 1)}>
          <ChevronRightIcon fontSize="small" />
        </IconButton>
      </Box>
    )
  }

  return (
    <MuiPagination
      count={pageCount}
      page={page}
      onChange={(_, nextPage) => onPageChange(nextPage)}
      size="small"
      color="primary"
      siblingCount={1}
      boundaryCount={1}
      aria-label="Paginación de pedidos"
    />
  )
}
