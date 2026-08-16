import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Não cacheia a chamada ao SheetDB no service worker — o cache em
      // localStorage (src/services/cache.js) já resolve staleness, e ter
      // duas camadas de cache só complicaria debug sem ganho real.
      manifest: {
        name: 'Diário Botânico do Amor',
        short_name: 'Diário Botânico',
        description: 'Um bilhete e uma flor por dia, até completarmos um ano juntas.',
        lang: 'pt-BR',
        start_url: '/',
        display: 'standalone',
        background_color: '#f6ecd9',
        theme_color: '#e3cfa3',
        icons: [
          { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
          { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
})
