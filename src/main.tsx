import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'

// Fuente Roboto (la tipografía que usa Material UI)
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import App from './App.tsx'

// =====================================================================
// PERSONA A: Tema de Material UI
// ---------------------------------------------------------------------
// Ajustar los colores al prototipo de Figma (fondo oscuro, verde de
// acento, tarjetas gris oscuro). Se puede mover a src/theme.ts.
// =====================================================================
const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      {/* CssBaseline normaliza los estilos del navegador y aplica el fondo del tema */}
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
