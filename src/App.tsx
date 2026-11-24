import { useState } from 'react'
import { Box, Container, Grid, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'

import Header from './components/Header'
import FilterBar from './components/FilterBar'
import KpiCard from './components/KpiCard'
import ChartCard from './components/ChartCard'
import TransactionsTable from './components/TransactionsTable'
import { filterOptions, kpis, transactions } from './data/sampleData'
import type { Filters } from './types'

// Columnas de la tabla de pedidos (versión escritorio)
const tableColumns = ['Order ID', 'Order Date', 'Customer Name', 'Category', 'Sub-Category', 'Sales']

// Espacio reservado dentro de ChartCard: los gráficos se implementan en el siguiente sprint
function ChartPlaceholder({ height }: { height: number }) {
  return (
    <Box
      sx={{
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px dashed',
        borderColor: 'divider',
        borderRadius: 2,
        color: 'text.secondary',
        fontSize: 13,
      }}
    >
      Gráfico próximamente
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
          <ChartCard
            title="Serie Temporal de Ventas Mensuales"
            subtitle="Evolución mensual de las ventas"
          >
            <ChartPlaceholder height={isMobile ? 200 : 320} />
          </ChartCard>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Stack spacing={2} sx={{ height: '100%' }}>
            <ChartCard title="Ventas por Subcategoría" subtitle="Principales subcategorías · Ventas en USD">
              <ChartPlaceholder height={110} />
            </ChartCard>
            <ChartCard title="Porcentaje de Ventas por Estado" subtitle="Distribución sobre el total de ventas">
              <ChartPlaceholder height={110} />
            </ChartCard>
          </Stack>
        </Grid>
      </Grid>

      {/* 8-10. Pedidos: tabla en escritorio y tarjetas (TransactionCard) en móvil.
               Se filtran según el estado "filters". */}
      <ChartCard title="Últimos Registros de Pedidos" subtitle="Vista detallada de los pedidos más recientes">
        <TransactionsTable columns={tableColumns} rows={visibleTransactions} pageSize={5} />
      </ChartCard>

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
