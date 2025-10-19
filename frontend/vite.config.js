import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwind()],
  server: {
    port: 5175,
    proxy: {
      "/api": {
        // Backend listens on localhost (IPv6 ::1). Using 'localhost' avoids IPv4-only 127.0.0.1 mismatch.
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
});
