import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import oxlint from 'vite-plugin-oxlint';
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [react(), oxlint(), checker({ typescript: true })],
  server: {
    open: true,
    port: 3000,
  },
  preview: {
    open: true,
    port: 3001,
  },
});
