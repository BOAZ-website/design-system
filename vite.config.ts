import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: { entry: 'src/index.ts', formats: ['es'], fileName: 'index', cssFileName: 'styles' },
    // dist/ 의 토큰 생성물(build/build.mjs)을 지우지 않는다. 토큰 빌드가 먼저 돈다.
    emptyOutDir: false,
    rollupOptions: { external: ['react', 'react-dom', 'react/jsx-runtime'] },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/test/setup.ts'],
    css: { modules: { classNameStrategy: 'non-scoped' } },
  },
});
