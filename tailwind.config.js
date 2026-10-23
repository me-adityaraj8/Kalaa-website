/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#151515',
        wall: '#EEEFF1',
        haldi: { DEFAULT: '#FFC629', deep: '#F2A900', soft: '#FFF3C9' },
        sindoor: { DEFAULT: '#E23A22', deep: '#B4261A' },
        // Teal comes from the two-tone lotus; used only for Kalaa Saathi (AI).
        neon: { DEFAULT: '#2FA58E', glow: '#8BF0DA', deep: '#0E4F44' },
        patta: '#128C4A',
      },
      fontFamily: {
        display: ['Khand', 'Mukta', 'system-ui', 'sans-serif'],
        body: ['Mukta', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'board-sm': '3px 3px 0 0 #151515',
        board: '5px 5px 0 0 #151515',
        'board-lg': '8px 8px 0 0 #151515',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '8%': { opacity: '0.35' },
          '10%': { opacity: '1' },
          '12%': { opacity: '0.5' },
          '14%': { opacity: '1' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-1.2deg)' },
          '50%': { transform: 'rotate(1.2deg)' },
        },
        blink: {
          '0%, 100%': { opacity: '0.25' },
          '50%': { opacity: '1' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        flicker: 'flicker 4s steps(1) infinite',
        sway: 'sway 5s ease-in-out infinite',
        blink: 'blink 1.2s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
};
