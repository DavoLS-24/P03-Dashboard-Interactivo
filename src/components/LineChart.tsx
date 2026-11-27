import { Box, Typography } from '@mui/material'
import { LineChart as MuiLineChart, lineClasses } from '@mui/x-charts/LineChart'
import { ACCENT, formatCompactMoney } from '../utils/chartData'
import type { MonthlySales, YearTotal } from '../utils/chartData'

interface LineChartProps {
  data: MonthlySales[]
  yearTotals: YearTotal[]
  height?: number
}

const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

function LineChart({ data, yearTotals, height = 300 }: LineChartProps) {
  const singleYear = yearTotals.length === 1

  return (
    <Box>
      <MuiLineChart
        height={height}
        margin={{ left: 0, right: 20, top: 8, bottom: 0 }}
        grid={{ horizontal: true }}
        hideLegend
        xAxis={[
          {
            scaleType: 'point',
            data: data.map((d) => d.month),
            // Un año: una marca por mes. Varios años: solo enero de cada año
            tickInterval: (d: Date) => singleYear || d.getMonth() === 0,
            valueFormatter: (d: Date, context) =>
              context.location === 'tick'
                ? singleYear
                  ? MONTHS[d.getMonth()]
                  : String(d.getFullYear())
                : `${MONTHS[d.getMonth()]} ${d.getFullYear()}`,
          },
        ]}
        yAxis={[{ valueFormatter: (v: number) => formatCompactMoney(v), width: 56 }]}
        series={[
          {
            data: data.map((d) => d.sales),
            label: 'Ventas (USD)',
            color: ACCENT,
            area: true,
            showMark: false,
            valueFormatter: (v) => (v == null ? '' : formatCompactMoney(v)),
          },
        ]}
        sx={{ [`& .${lineClasses.area}`]: { fillOpacity: 0.12 } }}
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.max(yearTotals.length, 1)}, 1fr)`,
          gap: 1,
          mt: 1,
          pt: 1.5,
          borderTop: 1,
          borderColor: 'divider',
        }}
      >
        {yearTotals.map(({ year, total }) => (
          <Box key={year}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {year}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {formatCompactMoney(total)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default LineChart
