/** @type {import('tailwindcss').Config} */
export default {
    corePlugins: {
        preflight: false
    },
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#FF555B',
                textGray: '#64748B',
                secondary: '#F9F1F1'
            }
        }
    },
    plugins: []
}
