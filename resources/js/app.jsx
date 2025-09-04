import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { NotificationProvider } from './Contexts/NotificationContext';

// const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
const appName = 'めちゃプリ';

createInertiaApp({
    title: (title) => title || appName,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const initialUnreadCount = props.initialPage?.props?.unreadNotificationCount || 0;
        
        if (import.meta.env.SSR) {
            hydrateRoot(el, <NotificationProvider initialUnreadCount={initialUnreadCount}><App {...props} /></NotificationProvider>);
            return;
        }

        createRoot(el).render(<NotificationProvider initialUnreadCount={initialUnreadCount}><App {...props} /></NotificationProvider>);
    },
    progress: {
        color: '#4B5563',
    },
});
