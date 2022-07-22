import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    root: 'src/vue3',
    plugins: [vue()],
    build: {
        lib: {
            entry: path.resolve(__dirname, '../components/index.ts'),
            name: 'VueSimpleRangeSlider',
            fileName: (format) => `index.${format}.js`
        },
        rollupOptions: {
            external: ['vue'],
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
