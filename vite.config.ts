import { defineConfig } from 'vite';
import { resolve } from 'path';

// base must match the GitHub Pages project path: https://<user>.github.io/crewdesk/
export default defineConfig({
  base: '/crewdesk/',
  build: {
    target: 'es2019',
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        terms: resolve(__dirname, 'terms.html')
      },
      output: {
        manualChunks: {
          gsap: ['gsap', 'gsap/ScrollTrigger']
        }
      }
    }
  },
  server: {
    port: 5173,
    open: true
  }
});
