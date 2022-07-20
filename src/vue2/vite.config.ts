import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";

// https://vitejs.dev/config/
export default defineConfig({
  server: {},
  root: "src/vue2",
  resolve: {
    alias: [
      { find: 'vue', replacement: path.resolve(__dirname, './node_modules/vue') },
    ],
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {},
        transformAssetUrls: {},
      },
    }),
  ],
});
