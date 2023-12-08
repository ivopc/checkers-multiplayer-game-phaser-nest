import swc from 'unplugin-swc';
import tsConfigPath from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    root: './',
    include: ['./tests/e2e/**/*.spec.ts'],
    setupFiles: ['./tests/setup-e2e.ts'],
  },

  plugins: [
    tsConfigPath(),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
});
