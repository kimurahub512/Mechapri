import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                noto: ['"Noto Sans JP"', 'sans-serif'],
                general: ['"General Sans"', 'sans-serif'],
                mplus: ['"M PLUS 1p"', 'sans-serif'],
            },
        },
    },

    plugins: [forms],
};
