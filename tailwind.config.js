/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryDark: '#1A0E00', // Dark Text / Footer bg
        secondaryDark: '#1A0E00',
        saffronAccent: '#E8621A', // Primary Saffron
        brightSaffron: '#F47B30', // Saffron Light
        goldText: '#C97D10', // Gold Accent
        offWhite: '#FFFBF7', // Page Background
        textPrimary: '#1A0E00', // Dark Text
        textSecondary: '#6B4423', // Muted Text
        sectionAltBg: '#FFF5EC', // Section Alt Background
        darkSectionBg: '#1A0E00',
        whatsapp: '#25D366',

        // Explicit new colors
        primarySaffron: '#E8621A',
        saffronLight: '#F47B30',
        saffronPale: '#FFF0E6',
        saffronBorder: 'rgba(232, 98, 26, 0.2)',
        goldAccent: '#C97D10',
        darkText: '#1A0E00',
        mutedText: '#6B4423',
        pageBg: '#FFFBF7',
        cardBg: '#FFFFFF',
        cardBorder: 'rgba(232, 98, 26, 0.15)',
        cardHoverBorder: 'rgba(232, 98, 26, 0.5)',
        footerBg: '#1A0E00',
        footerText: 'rgba(255, 255, 255, 0.7)',
      },
      fontFamily: {
        tiro: ['"Tiro Devanagari Hindi"', 'serif'],
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
