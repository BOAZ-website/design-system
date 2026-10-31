import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: { entry: 'src/index.ts', formats: ['es'], fileName: 'index', cssFileName: 'styles' },
    // build/build.mjs 가 outDir 을 임시 폴더로 바꿔 호출한다. 그 폴더의 토큰 생성물을 지우지 않는다.
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
