import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/',
  build: {
    outDir: 'dist',
    target: "esnext",
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 8080,
    host: '0.0.0.0', 
    allowedHosts: ["dosirak-apps-ltsly.ondigitalocean.app"],
    hmr: {
      protocol: "wss",
      host: "dosirak-apps-ltsly.ondigitalocean.app", 
      port: 8080, 
    },
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
});
