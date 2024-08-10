import { defineConfig, UserConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()] as UserConfig['plugins'],
  test: {
    environment: 'jsdom',
    exclude: ['e2e/**', 'node_modules/**'],
    mockReset: true,
    clearMocks: true,
    globals: true,
    setupFiles: './vitest.setup.mjs',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname),
    },
  },
});
