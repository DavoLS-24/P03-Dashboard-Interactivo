import { Box, FormControl, MenuItem, Select, Typography } from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import type { Filters, FilterOptions, Region } from '../types'

interface FilterBarProps {
  filters: Filters
  options: FilterOptions
  onFilterChange: (filters: Filters) => void
}

function FilterBar({ filters, options, onFilterChange }: FilterBarProps) {
  const firstYear = Math.min(...options.years)
  const lastYear = Math.max(...options.years)

  const handleYear = (event: SelectChangeEvent<number | 'all'>) => {
    const value = event.target.value
    onFilterChange({ ...filters, year: value === 'all' ? 'all' : Number(value) })
  }

  const handleRegion = (event: SelectChangeEvent<Region | 'all'>) => {
    onFilterChange({ ...filters, region: event.target.value as Region | 'all' })
  }

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Box sx={{ flex: { xs: 1, md: 'none' } }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
          Año
        </Typography>
        <FormControl size="small" sx={{ minWidth: { xs: 0, md: 170 }, width: { xs: '100%', md: 'auto' } }}>
          <Select value={filters.year} onChange={handleYear} sx={{ bgcolor: 'background.paper' }}>
            <MenuItem value="all">{`${firstYear} - ${lastYear}`}</MenuItem>
            {options.years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ flex: { xs: 1, md: 'none' } }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
          Región
        </Typography>
        <FormControl size="small" sx={{ minWidth: { xs: 0, md: 190 }, width: { xs: '100%', md: 'auto' } }}>
          <Select value={filters.region} onChange={handleRegion} sx={{ bgcolor: 'background.paper' }}>
            <MenuItem value="all">Todas las regiones</MenuItem>
            {options.regions.map((region) => (
              <MenuItem key={region} value={region}>
                {region}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  )
}

export default FilterBar