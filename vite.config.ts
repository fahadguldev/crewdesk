import { defineConfig } from 'vite';

// base must match the GitHub Pages project path: https://<user>.github.io/crewdesk/
export default defineConfig({
  base: '/crewdesk/',
  build: {
    target: 'es2019',
    assetsInlineLimit: 0,
    rollupOptions: {
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
