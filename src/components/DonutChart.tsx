import { Box, Typography } from '@mui/material'
import { PieChart } from '@mui/x-charts/PieChart'
import type { StateShare } from '../utils/chartData'

interface DonutChartProps {
  data: StateShare[]
  size?: number
}

// Dona con el porcentaje de ventas por estado y su leyenda al lado
function DonutChart({ data, size = 150 }: DonutChartProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      <Box sx={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
        <PieChart
          width={size}
          height={size}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          hideLegend
          series={[
            {
              data: data.map((d, i) => ({ id: i, value: d.percentage, label: d.state, color: d.color })),
              innerRadius: size * 0.34,
              outerRadius: size / 2,
              paddingAngle: 1.5,
              cornerRadius: 3,
              valueFormatter: (item) => `${item.value.toFixed(1)}%`,
            },
          ]}
        />
        {/* Texto en el centro de la dona */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1 }}>
            100%
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            de ventas
          </Typography>
        </Box>
      </Box>

      {/* Leyenda */}
      <Box sx={{ flex: 1, minWidth: 0, display: 'grid', gap: 0.75 }}>
        {data.map((d) => (
          <Box key={d.state} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '2px', bgcolor: d.color, flexShrink: 0 }} />
            <Typography variant="caption" sx={{ flex: 1, minWidth: 0 }} noWrap>
              {d.state}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {Math.round(d.percentage)}%
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default DonutChart
