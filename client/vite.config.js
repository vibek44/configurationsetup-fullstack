import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3003',
        changeOrigin: true
      }
    }
  },
  test:{
    environment: 'jsdom',
    globals: true,            //with globals true keywords describe,test,expect  dont need to import from vite
    setupFiles: './testSetup.js'
  }
})