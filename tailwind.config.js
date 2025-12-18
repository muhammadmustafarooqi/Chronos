/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'luxury-black': '#0a0a0a',
        'luxury-charcoal': '#1a1a1a',
        'luxury-gold': '#D4AF37',
        'luxury-gold-light': '#F4D03F',
        'luxury-gold-dark': '#AA8C2C',
        'luxury-white': '#FFFFFF',
        'luxury-gray': '#F5F5F5',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  safelist: [
    { pattern: /bg-luxury-.*/ },
    { pattern: /text-luxury-.*/ },
    { pattern: /border-luxury-.*/ },
  ],
  plugins: [],
};
