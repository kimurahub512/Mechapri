import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    build: {
        chunkSizeWarningLimit: 1000,
    },
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react(),
    ],

    server: {
        host: '172.16.5.41',
        port: 5173,
        strictPort: true,
        cors: true,
        hmr: {
            host: '172.16.5.41',
        },
        fs: {
            strict: false,
        },
    },

    optimizeDeps: {
        include: ['react', 'react-dom'],
    },

    clearScreen: false,
    logLevel: 'info',
});
