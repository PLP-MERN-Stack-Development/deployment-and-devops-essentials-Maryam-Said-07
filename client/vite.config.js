import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration for React app
export default defineConfig({
  plugins: [react()],
  
  // Server configuration for development
  server: {
    port: 3000,
    // Proxy API requests to backend during development
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  
  // Build configuration for production
  build: {
    outDir: 'dist',
    sourcemap: false, // disable source maps in production for security
    // Code splitting for better performance
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          vendor: ['react', 'react-dom', 'react-router-dom'],
          axios: ['axios']
        }
      }
    }
  },
  
  // Define global constants
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }
})
