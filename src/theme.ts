import { createTheme } from '@mui/material'

const theme = createTheme({
  // "md" en 768 px (MUI usa 900) para que la vista móvil empiece donde indica el diseño
  breakpoints: {
    values: { xs: 0, sm: 600, md: 768, lg: 1200, xl: 1536 },
  },
  palette: {
    mode: 'dark',
    primary: { main: '#5FD3A6' },
    success: { main: '#5FD3A6' },
    background: {
      default: '#0F1216',
      paper: '#171B21',
    },
    text: {
      primary: '#E6E9EE',
      secondary: '#8B93A1',
    },
    divider: '#262C35',
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: 'Roboto, system-ui, sans-serif',
  },
})

export default theme
