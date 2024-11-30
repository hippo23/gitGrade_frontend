import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  server: {
    mimeTypes: {
      "application/javascript": ["jsx"],
    },
  },
  plugins: [react(), svgr()],
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "#root": path.resolve(__dirname),
    },
  },
});
