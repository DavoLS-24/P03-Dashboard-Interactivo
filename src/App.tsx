import { useMemo, useState } from 'react'
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import Header from './components/Header'
import FilterBar from './components/FilterBar'
import KpiCard from './components/KpiCard'
import ChartCard from './components/ChartCard'
import TransactionsTable from './components/TransactionsTable'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import DonutChart from './components/DonutChart'
import useFetchData from './hooks/useFetchData'
import { monthlySales, salesBySubCategory, salesByState, yearTotals } from './utils/chartData'
import type { FilterOptions, Filters, Kpi, Region, Transaction } from './types'

const tableColumns = ['Order ID', 'Order Date', 'Customer Name', 'Category', 'Sub-Category', 'Sales']
const REGION_ORDER: Region[] = ['West', 'East', 'Central', 'South']

const yearOf = (t: Transaction) => Number(t.orderDate.slice(0, 4))

function getFilterOptions(data: Transaction[]): FilterOptions {
  const years = [...new Set(data.map(yearOf))].sort((a, b) => a - b)
  const regions = REGION_ORDER.filter((r) => data.some((t) => t.region === r))
  return { years, regions }
}

function matches(t: Transaction, year: number | 'all', region: Region | 'all') {
  return (year === 'all' || yearOf(t) === year) && (region === 'all' || t.region === region)
}

function summarize(rows: Transaction[]) {
  const sales = rows.reduce((sum, t) => sum + t.sales, 0)
  const orders = new Set(rows.map((t) => t.orderId)).size
  return { sales, orders, ticket: orders ? sales / orders : 0 }
}

function variation(current: number, previous: number) {
  return previous ? Math.round(((current - previous) / previous) * 1000) / 10 : 0
}

function buildKpis(data: Transaction[], filters: Filters, years: number[]): Kpi[] {
  const current = summarize(data.filter((t) => matches(t, filters.year, filters.region)))

  // La variación compara el año elegido (o el último) con el anterior
  const lastYear = years[years.length - 1]
  const compareYear = filters.year === 'all' ? lastYear : filters.year
  const hasPrevious = years.includes(compareYear - 1)
  const thisYear = summarize(data.filter((t) => matches(t, compareYear, filters.region)))
  const prevYear = summarize(data.filter((t) => matches(t, compareYear - 1, filters.region)))
  const description = hasPrevious ? `${compareYear} vs. ${compareYear - 1}` : 'sin año anterior'

  return [
    {
      title: 'Ventas Totales',
      value: current.sales,
      variation: hasPrevious ? variation(thisYear.sales, prevYear.sales) : 0,
      description,
      format: 'currency',
    },
    {
      title: 'Cantidad de Pedidos',
      value: current.orders,
      variation: hasPrevious ? variation(thisYear.orders, prevYear.orders) : 0,
      description,
      format: 'number',
    },
    {
      title: 'Ticket Promedio',
      value: current.ticket,
      variation: hasPrevious ? variation(thisYear.ticket, prevYear.ticket) : 0,
      description,
      format: 'currency',
    },
  ]
}

function describeFilters(filters: Filters, years: number[]): string {
  const period =
    filters.year === 'all'
      ? `${Math.min(...years)} - ${Math.max(...years)}`
      : `Año ${filters.year}`
  const region = filters.region === 'all' ? 'Todas las regiones' : `Región ${filters.region}`
  return `Resumen comercial · ${period} · ${region}`
}

function App() {

  const { data, loading, error } = useFetchData()

  const [filters, setFilters] = useState<Filters>({ year: 'all', region: 'all' })

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const options = useMemo(() => getFilterOptions(data), [data])

  const kpis = useMemo(
    () => (data.length ? buildKpis(data, filters, options.years) : []),
    [data, filters, options.years],
  )

  const visibleTransactions = useMemo(
    () =>
      data
        .filter((t) => matches(t, filters.year, filters.region))
        .sort((a, b) => b.orderDate.localeCompare(a.orderDate) || b.rowId - a.rowId),
    [data, filters],
  )

  const charts = useMemo(
    () => ({
      monthly: monthlySales(visibleTransactions),
      years: yearTotals(visibleTransactions),
      subCategories: salesBySubCategory(visibleTransactions),
      states: salesByState(visibleTransactions),
    }),
    [visibleTransactions],
  )
  const period =
    filters.year !== 'all'
      ? `Año ${filters.year}`
      : options.years.length
        ? `${options.years[0]} - ${options.years[options.years.length - 1]}`
        : ''
  const regionText = filters.region === 'all' ? 'Todas las regiones' : `Región ${filters.region}`

  const ready = !loading && !error && data.length > 0

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Header
        title="Dashboard de Ventas - Superstore"
        subtitle={ready ? describeFilters(filters, options.years) : 'Resumen comercial'}
        actions={
          ready ? (
            <FilterBar filters={filters} options={options} onFilterChange={setFilters} />
          ) : undefined
        }
      />

      {loading && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, py: 10 }}>
          <CircularProgress size={28} />
          <Typography sx={{ color: 'text.secondary' }}>Cargando datos desde Firebase…</Typography>
        </Box>
      )}

      {!loading && error && (
        <Alert severity="error" sx={{ my: 4 }}>
          No se pudieron cargar los datos: {error}
        </Alert>
      )}

      {!loading && !error && data.length === 0 && (
        <Alert severity="info" sx={{ my: 4 }}>
          La base de datos no tiene registros.
        </Alert>
      )}

      {ready && (
        <>
          {/* Grilla CSS: en móvil la primera tarjeta (featured) ocupa todo el ancho */}
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

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <ChartCard
                title="Serie Temporal de Ventas Mensuales"
                subtitle={`Evolución mensual · ${period} · ${regionText}`}
              >
                <LineChart data={charts.monthly} yearTotals={charts.years} height={isMobile ? 220 : 380} />
              </ChartCard>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Stack spacing={2} sx={{ height: '100%' }}>
                <ChartCard title="Ventas por Subcategoría" subtitle="6 principales subcategorías · Ventas en USD">
                  <BarChart data={charts.subCategories} limit={6} height={isMobile ? 210 : 190} />
                </ChartCard>
                <ChartCard title="Porcentaje de Ventas por Estado" subtitle="Distribución sobre el total de ventas">
                  <DonutChart data={charts.states} size={isMobile ? 130 : 140} />
                </ChartCard>
              </Stack>
            </Grid>
          </Grid>

          <ChartCard title="Últimos Registros de Pedidos" subtitle="Del pedido más reciente al más antiguo">
            <TransactionsTable columns={tableColumns} rows={visibleTransactions} pageSize={5} />
          </ChartCard>
        </>
      )}

      <Box
        component="footer"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 3,
          color: 'text.secondary',
        }}
      >
        <Typography variant="caption">Superstore Sales · Datos de Firebase Realtime Database</Typography>
        <Typography variant="caption" sx={{ display: { xs: 'none', md: 'block' } }}>
          Importes en USD
        </Typography>
      </Box>
    </Container>
  )
}

export default App
