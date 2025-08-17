import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    build: {
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
            external: ['@stripe/stripe-js', '@stripe/react-stripe-js', 'react', 'react-dom', '@inertiajs/react'],
        },
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
    },
});
