import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',  // Ensures assets like JS, CSS, and images go into the "assets" folder in the "dist" directory
  },
  publicDir: 'public', // Ensures Vite includes files from "public"
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
