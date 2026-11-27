import { BarChart as MuiBarChart } from '@mui/x-charts/BarChart'
import { ACCENT, GREYS, formatCompactMoney } from '../utils/chartData'
import type { NamedValue } from '../utils/chartData'

interface BarChartProps {
  data: NamedValue[]
  limit?: number
  height?: number
}

function BarChart({ data, limit = 6, height = 230 }: BarChartProps) {
  const top = data.slice(0, limit)
  const names = top.map((d) => d.name)

  return (
    <MuiBarChart
      height={height}
      layout="horizontal"
      margin={{ left: 0, right: 24, top: 0, bottom: 0 }}
      hideLegend
      grid={{ vertical: true }}
      yAxis={[
        {
          scaleType: 'band',
          data: names,
          width: 92,
          // La barra mayor en verde, el resto en gris
          colorMap: { type: 'ordinal', values: names, colors: [ACCENT, ...names.slice(1).map(() => GREYS[1])] },
        },
      ]}
      xAxis={[{ valueFormatter: (v: number) => formatCompactMoney(v) }]}
      series={[
        {
          data: top.map((d) => d.value),
          label: 'Ventas',
          valueFormatter: (v) => (v == null ? '' : formatCompactMoney(v)),
        },
      ]}
      borderRadius={3}
    />
  )
}

export default BarChart
