import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    build: {
        minify: true,
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'VueSimpleRangeSlider',
            fileName: (format) => `index.${format}.js`
        },
        rollupOptions: {
            external: ['vue', 'vue-demi'],
            output: {
                // Provide global variables to use in the UMD build
                // Add external deps here
                globals: {
                    vue: 'Vue'
                }
            }
        }
    }
});
