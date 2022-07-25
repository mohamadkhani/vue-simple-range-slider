import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';

// https://vitejs.dev/config/
export default defineConfig({
    server: {},
    root: 'src/vue2',
    resolve: {
        alias: [{ find: 'vue', replacement: path.resolve(__dirname, './node_modules/vue') }]
    },
    plugins: [
        vue({
            template: {
                compilerOptions: {},
                transformAssetUrls: {}
            }
        })
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, '/index.ts'),
            name: 'VueSimpleRangeSlider',
            fileName: (format) => `index.${format}.js`
        },
        rollupOptions: {
            external: ['vue', 'vue-tsc'],
            output: {
                // Provide global variables to use in the UMD build
                // Add external deps here
                globals: {
                    vue: 'Vue'
                }
            }
        },
        outDir: '../../dist/vue2'
    },

    define: {
        'process.env': { env: { ...process.env, ISVUE2: true } }
    }
});
