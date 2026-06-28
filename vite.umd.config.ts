import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "MenuAdmin",
      formats: ["umd"],
      fileName: () => "menu-admin.umd.js",
    },
    rollupOptions: {
      // UMD bundles React inside
      external: [],
    },
  },
});