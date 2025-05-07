import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// 读取 .env 配置
const port = Number(process.env.VITE_TAURI_DEV_PORT) || 1420;
const hmrPort = Number(process.env.VITE_TAURI_DEV_HMR_PORT) || 1421;
const host = process.env.VITE_TAURI_DEV_HOST || false;
const proxyUrl = process.env.VITE_SERVICE_PROXY_URL;

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port,
    strictPort: true,
    host,
    hmr: host
      ? {
          protocol: 'ws',
          host,
          port: hmrPort,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ['**/src-tauri/**'],
    },
    proxy: {
      '/api': {
        target: proxyUrl,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
}));
