import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // Get rid of CORS errors
      '/api': {
        target: 'https://threads-backend-zeta.vercel.app',
        // changeOrigin: true,
        secure: false,
      },
    },
  },
});
