import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';

// GitHub Pages serves 404.html for any unknown path. Shipping a copy of the
// built index.html as 404.html turns Pages into an SPA host, so real routes
// like /docs and /reference deep-link correctly instead of 404-ing.
function spaFallback() {
  return {
    name: 'spa-404-fallback',
    closeBundle() {
      const dist = resolve(process.cwd(), 'dist');
      try {
        copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'));
      } catch {
        /* dist/index.html absent (e.g. non-build command) — nothing to copy */
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), spaFallback()],
  base: '/',
});
