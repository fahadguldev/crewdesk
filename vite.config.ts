import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Base for custom domain: https://daftarhub.app/
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        terms: resolve(__dirname, 'terms.html'),
        compareClickup: resolve(__dirname, 'compare-clickup.html')
      }
    }
  },
  server: {
    port: 5173,
    open: true
  }
});
