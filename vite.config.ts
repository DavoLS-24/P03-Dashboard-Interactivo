import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages publica la app en /<nombre-del-repositorio>/
  base: '/P03-Dashboard-Interactivo/',
})
