import { defineConfig } from 'vite'

export default defineConfig({
  root: './src',  // Point to your source files
  build: {
    outDir: '../dist',  // Output directory for production build
    emptyOutDir: true,
  },
})
