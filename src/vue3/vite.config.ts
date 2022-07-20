import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";


// https://vitejs.dev/config/
export default defineConfig({
  root: "src/vue3",
  build: {
    rollupOptions: {
    },
  },
  plugins: [,vue()],
});
