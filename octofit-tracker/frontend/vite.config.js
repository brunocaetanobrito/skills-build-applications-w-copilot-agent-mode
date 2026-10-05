import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const allowedHosts = process.env.CODESPACE_NAME
  ? [`${process.env.CODESPACE_NAME}-5173.app.github.dev`]
  : []

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts,
    proxy: {
      '/api': 'http://127.0.0.1:8000',
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts,
  },
})
