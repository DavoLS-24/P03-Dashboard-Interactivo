import { useState } from 'react'
import { Box, Container, Grid, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'

import Header from './components/Header'
import FilterBar from './components/FilterBar'
import KpiCard from './components/KpiCard'
import { filterOptions, kpis, transactions } from './data/sampleData'
import type { Filters } from './types'

// =====================================================================
// PENDIENTE (Víctor): reemplazar cada Placeholder por su componente.
//   ChartCard.tsx         -> title, subtitle, children
//   TransactionsTable.tsx -> columns, rows (Transaction[]), pageSize   [escritorio]
//   TransactionCard.tsx   -> transaction (Transaction)                 [móvil]
//   Pagination.tsx        -> currentPage, totalItems, onPageChange, compact
// Los datos ya están listos: usar visibleTransactions e isMobile.
// =====================================================================

// Caja provisional para marcar dónde irá un componente que aún no existe.
function Placeholder({ label, minHeight = 120 }: { label: string; minHeight?: number }) {
  return (
    <Box
      sx={{
        p: 2,
        height: '100%',
        minHeight,
        border: '1px dashed',
        borderColor: 'divider',
        borderRadius: 2,
        color: 'text.secondary',
        fontSize: 14,
      }}
    >
      {label}
    </Box>
  )
}


function describeFilters(filters: Filters): string {
  const { years } = filterOptions
  const period =
    filters.year === 'all'
      ? `${Math.min(...years)} - ${Math.max(...years)}`
      : `Año ${filters.year}`
  const region = filters.region === 'all' ? 'Todas las regiones' : `Región ${filters.region}`
  return `Resumen comercial · ${period} · ${region}`
}

function App() {

  const [filters, setFilters] = useState<Filters>({ year: 'all', region: 'all' })

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const visibleTransactions = transactions.filter((t) => {
    const matchesYear = filters.year === 'all' || t.orderDate.startsWith(String(filters.year))
    const matchesRegion = filters.region === 'all' || t.region === filters.region
    return matchesYear && matchesRegion
  })

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {/* 1-2. Encabezado con los filtros a la derecha (debajo del título en móvil) */}
      <Header
        title="Dashboard de Ventas - Superstore"
        subtitle={describeFilters(filters)}
        actions={
          <FilterBar filters={filters} options={filterOptions} onFilterChange={setFilters} />
        }
      />

      {/* 3. KPIs: grilla CSS. Escritorio: 3 columnas. Móvil: 2 columnas y la
             primera tarjeta (featured) ocupa todo el ancho. */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 2,
          mb: 2,
        }}
      >
        {kpis.map((kpi, index) => (
          <KpiCard key={kpi.title} {...kpi} featured={index === 0} />
        ))}
      </Box>

      {/* 4-7. Gráficos. Escritorio: serie temporal a la izquierda; barras y dona
               apiladas a la derecha. Móvil: uno debajo de otro. */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Placeholder label="ChartCard: Serie Temporal de Ventas Mensuales" minHeight={isMobile ? 260 : 400} />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Stack spacing={2} sx={{ height: '100%' }}>
            <Placeholder label="ChartCard: Ventas por Subcategoría" minHeight={190} />
            <Placeholder label="ChartCard: Porcentaje de Ventas por Estado" minHeight={190} />
          </Stack>
        </Grid>
      </Grid>

      {/* 8-10. Pedidos: tabla en escritorio, tarjetas en móvil */}
      <Placeholder
        label={
          isMobile
            ? `TransactionCard × ${visibleTransactions.length} (vista móvil) + Pagination compacta`
            : `TransactionsTable: ${visibleTransactions.length} pedidos (vista escritorio) + Pagination`
        }
        minHeight={isMobile ? 200 : 260}
      />

      {/* Pie de página */}
      <Box
        component="footer"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 3,
          color: 'text.secondary',
        }}
      >
        <Typography variant="caption">Superstore Sales · Datos ilustrativos</Typography>
        <Typography variant="caption" sx={{ display: { xs: 'none', md: 'block' } }}>
          Importes en USD
        </Typography>
      </Box>
    </Container>
  )
}

export default App
