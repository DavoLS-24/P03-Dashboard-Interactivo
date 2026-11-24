import type { ReactNode } from 'react'
import { Card, CardContent, Typography } from '@mui/material'

interface ChartCardProps {
  title: string
  subtitle: string
  children: ReactNode
}

function ChartCard({ title, subtitle, children }: ChartCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{ width: '100%', minWidth: 0, height: '100%', bgcolor: 'background.paper', borderRadius: 2 }}
    >
      <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{title}</Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25, mb: 2 }}>
          {subtitle}
        </Typography>
        {children}
      </CardContent>
    </Card>
  )
}
