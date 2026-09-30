import base44 from "@base44/vite-plugin"
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const isDev = process.env.NODE_ENV !== 'production';

// https://vite.dev/config/
export default defineConfig({
  logLevel: 'error', // Suppress warnings, only show errors
  server: {
    port: 8723,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5200',
        changeOrigin: true
      },
      '/uploads': {
        target: 'http://localhost:5200',
        changeOrigin: true
      }
    }
  },
  plugins: [
    base44({
      // Support for legacy code that imports the base44 SDK with @/integrations, @/entities, etc.
      legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === 'true',
      hmrNotifier: isDev,
      navigationNotifier: isDev,
      analyticsTracker: isDev,
      visualEditAgent: isDev
    }),
    react(),
  ]
});
