import type { ReactNode } from 'react'
import { Box, Chip, Typography } from '@mui/material'
import BarChartIcon from '@mui/icons-material/BarChart'

interface HeaderProps {
  title: string
  subtitle: string
  actions?: ReactNode
}

function Header({ title, subtitle, actions }: HeaderProps) {
  return (
    <Box component="header" sx={{ mb: 3 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 1.5,
          mb: 3,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <BarChartIcon fontSize="small" />
          <Typography variant="subtitle2" sx={{ fontWeight: 700, letterSpacing: 1 }}>
            SUPERSTORE
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: { xs: 'none', md: 'block' } }}
          >
            / Analítica de ventas
          </Typography>
        </Box>
        <Chip label="DATOS DE EJEMPLO" size="small" variant="outlined" />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'stretch', md: 'flex-end' },
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 600, fontSize: { xs: 24, md: 30 } }}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        </Box>
        {actions}
      </Box>
    </Box>
  )
}

export default Header