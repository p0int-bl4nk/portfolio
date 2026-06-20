import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import oxlint from 'vite-plugin-oxlint';

export default defineConfig({
  plugins: [react(), oxlint()],
  server: {
    open: true,
    port: 3000,
  },
  preview: {
    open: true,
    port: 3001,
  },
});
