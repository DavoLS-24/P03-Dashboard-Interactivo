import { Box, Card, CardContent, Typography } from '@mui/material'
import NorthEastIcon from '@mui/icons-material/NorthEast'

interface KpiCardProps {
  title: string
  value: number
  variation: number
  description: string
  featured?: boolean
  format?: 'currency' | 'number'
}

function formatValue(value: number, format: 'currency' | 'number'): string {
  if (format === 'number') {
    return value.toLocaleString('en-US')
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`
  }
  return `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
}

function Variation({ variation }: { variation: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
      <NorthEastIcon sx={{ fontSize: 12, mr: 0.5 }} />
      <Typography variant="caption" sx={{ fontWeight: 600 }}>
        {variation}%
      </Typography>
    </Box>
  )
}

function KpiCard({
  title,
  value,
  variation,
  description,
  featured = false,
  format = 'currency',
}: KpiCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        minWidth: 0,
        borderRadius: 2,
        bgcolor: 'background.paper',
        gridColumn: { xs: featured ? '1 / -1' : 'auto', md: 'auto' },
      }}
    >
      <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 1.5,
            mb: 1,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 600, fontSize: { xs: 28, md: 34 } }}>
            {formatValue(value, format)}
          </Typography>

          <Box
            sx={{
              display: { xs: featured ? 'flex' : 'none', md: 'flex' },
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            <Variation variation={variation} />
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {description}
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: { xs: featured ? 'none' : 'block', md: 'block' } }}
        >
          {description}
        </Typography>

        <Box sx={{ display: { xs: featured ? 'none' : 'block', md: 'none' }, mt: 0.5 }}>
          <Variation variation={variation} />
        </Box>
      </CardContent>
    </Card>
  )
}

export default KpiCard