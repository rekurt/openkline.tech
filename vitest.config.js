import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Separate from vite.config.js so the production build never pulls in vitest.
// The React plugin is needed so JSX (automatic runtime) in the i18n/page tests
// transforms without a manual `import React`.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
});
