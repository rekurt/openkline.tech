import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// Separate from vite.config.js so the production build never pulls in vitest.
// The React plugin transforms JSX (automatic runtime) in the i18n/page tests.
// Mirror the engine alias from vite.config.js so tests can import the real core
// (vendored TS source) the same way the app does.
const CORE = resolve(process.cwd(), 'vendor/openkline/packages/core/src');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@rekurt/openkline-core/indicators', replacement: resolve(CORE, 'indicators/index.ts') },
      { find: '@rekurt/openkline-core', replacement: resolve(CORE, 'index.ts') },
    ],
  },
  test: {
    environment: 'jsdom',
    // Only our own suites — the vendored engine ships its own (large) test set
    // that we don't own and shouldn't gate our CI on.
    exclude: ['**/node_modules/**', '**/vendor/**'],
  },
});
