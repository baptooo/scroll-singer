import { defineConfig, ProxyOptions } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

const proxy: Record<string, string | ProxyOptions> = {
  "/lyrics": {
    target: "https://genius.com",
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/lyrics/, ""),
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  server: {
    proxy,
  },
  preview: {
    proxy,
  },
});
