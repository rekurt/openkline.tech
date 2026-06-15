import { defineConfig } from 'vitest/config';

// Separate from vite.config.js so the production build never pulls in vitest.
// The analytics layer is plain JS (no JSX), so no React plugin is needed here.
export default defineConfig({
  test: {
    environment: 'jsdom',
  },
});
