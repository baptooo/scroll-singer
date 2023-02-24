import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  server: {
    proxy: {
      "/lyrics": {
        target: "https://genius.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/lyrics/, ""),
      },
    },
  },
});
