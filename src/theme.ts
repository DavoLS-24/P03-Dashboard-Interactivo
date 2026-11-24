import { createTheme } from '@mui/material'

// Tema global del dashboard, basado en el prototipo de Figma:
// fondo oscuro, tarjetas gris oscuro y verde como color de acento.
const theme = createTheme({
  // El diseño pasa a móvil por debajo de 768 px (ver informe).
  // Se cambia el punto "md" de MUI (900 px por defecto) a 768 px,
  // así todos los componentes que usan { xs, md } cambian en el mismo punto.
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
