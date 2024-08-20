import { defineConfig, UserConfig, defaultExclude } from 'vitest/config';
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
    coverage: {
      exclude: [
        ...defaultExclude,
        '**/.next/**',
        '**/*.{interface,enum,test}.ts?(x)',
        '**/test-utils/**',
        'next-env.d.ts',
        'postcss.config.mjs',
        'tailwind.config.ts',
        'next.config.mjs',
        'theme.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname),
    },
  },
});
