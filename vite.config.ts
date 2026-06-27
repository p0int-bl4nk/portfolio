import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import oxlint from 'vite-plugin-oxlint';
import checker from 'vite-plugin-checker';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss(), oxlint(), checker({ typescript: true })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    open: true,
    port: 3000,
  },
  preview: {
    open: true,
    port: 3001,
  },
});
