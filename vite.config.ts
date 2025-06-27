import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    minify: 'esbuild', // or 'terser'
    sourcemap: false, // Optional
  }
})