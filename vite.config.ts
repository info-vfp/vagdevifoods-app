import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: "/",
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
    build: {
      // Routes are pre-rendered, so the browser gets markup before the bundle parses.
      // Raising the warning limit just avoids noise on an already-known single chunk.
      chunkSizeWarningLimit: 600,
    },
    // Vite externalises dependencies for SSR by default. These render during the
    // pre-render pass, so they must be bundled into the server build instead.
    ssr: {
      noExternal: ['framer-motion'],
    },
  };
});
