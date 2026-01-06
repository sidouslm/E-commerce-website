import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Add jsx runtime import
      jsxRuntime: 'automatic',
    }),
  ],
  server: {
    port: 5174,
    host: true, // Allow external access
  },
  build: {
    rollupOptions: {
      // Explicitly externalize React
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react/jsx-runtime'],
        }
      }
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['@tailwindcss/vite'] // Remove if using Tailwind v3
  }
})