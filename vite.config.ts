import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    minify: 'terser', // or 'terser'
    sourcemap: false, // Optional
  }
})