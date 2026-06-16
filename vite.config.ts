/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

function getBlogRoutes(): string[] {
  const contentDir = resolve(__dirname, 'src/content');
  return readdirSync(contentDir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const raw = readFileSync(resolve(contentDir, file), 'utf-8');
      const match = raw.match(/^slug:\s*(.+)$/m);
      return match ? `/blog/${match[1].trim()}` : null;
    })
    .filter((route): route is string => route !== null);
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    analog({
      content: {
        highlighter: 'shiki',
      },
      prerender: {
        routes: ['/', '/experience', '/blog', ...getBlogRoutes()],
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
