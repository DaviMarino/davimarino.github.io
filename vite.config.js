import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['img/mach1_001.png'],
      manifest: {
        name: 'F1 English Tracker',
        short_name: 'F1 English',
        description: 'Treino de ingles com foco em Formula 1, com funcionamento offline.',
        theme_color: '#0b1220',
        background_color: '#05070d',
        display: 'standalone',
        start_url: '/#/f1-english',
        scope: '/',
        icons: [
          {
            src: '/img/mach1_001.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/img/mach1_001.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,mp3,ogg,json}']
      }
    })
  ],
  base: "/",
})