import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: "/",
  // Only VITE_-prefixed variables reach the browser bundle (the EmailJS settings). Anything
  // else in .env stays on the machine that builds the site.
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
});
