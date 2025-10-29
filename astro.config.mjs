// @ts-check
import { defineConfig } from 'astro/config';

import path from 'path';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://www.mathewmariani.com/',
  base: '/',
  vite: {
    resolve: {
      preserveSymlinks: true,
      alias: {
        '@': path.resolve('./src'),
      },
    },
  },
});
