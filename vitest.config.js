import { defineConfig } from 'vitest/config';

// Separate from vite.config.js so the production build never pulls in vitest.
// The analytics core is plain JS (no JSX), so no React plugin is needed here.
export default defineConfig({
  test: {
    environment: 'jsdom',
  },
});
