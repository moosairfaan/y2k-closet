/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bubble: ['"Fredoka"', '"Comic Sans MS"', 'cursive'],
        display: ['"Bubblegum Sans"', '"Fredoka"', 'cursive'],
      },
      colors: {
        y2k: {
          pink: '#ffb6c1',
          mint: '#98ff98',
          lavender: '#e6e6fa',
          peach: '#ffdab9',
          sky: '#87ceeb',
          butter: '#fffacd',
          holographic: 'linear-gradient(135deg, #ffb6c1 0%, #87ceeb 25%, #98ff98 50%, #e6e6fa 75%, #ffdab9 100%)',
        },
      },
      backgroundImage: {
        'pastel-gradient': 'linear-gradient(135deg, #ffb6c1 0%, #e6e6fa 33%, #98ff98 66%, #87ceeb 100%)',
        'holographic': 'linear-gradient(135deg, #ffb6c1 0%, #87ceeb 25%, #98ff98 50%, #e6e6fa 75%, #ffdab9 100%)',
        'mesh': 'radial-gradient(at 40% 20%, #ffb6c1 0px, transparent 50%), radial-gradient(at 80% 0%, #e6e6fa 0px, transparent 50%), radial-gradient(at 0% 50%, #98ff98 0px, transparent 50%), radial-gradient(at 80% 50%, #87ceeb 0px, transparent 50%)',
      },
      boxShadow: {
        'y2k': '0 4px 15px rgba(255, 182, 193, 0.4), 0 0 20px rgba(230, 230, 250, 0.3)',
        'holographic': '0 0 20px rgba(255, 182, 193, 0.5), 0 0 40px rgba(135, 206, 235, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.2)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'gradient': 'gradient 15s ease infinite',
      },
    },
  },
  plugins: [],
}
