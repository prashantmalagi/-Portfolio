/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  // Mirror the tailwind.config from the original inline <script>
  darkMode: 'class',
  corePlugins: {
    // Disable Tailwind's CSS reset — the project has its own reset in style.css
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0B1120',
          card: '#131C31',
          accent: '#8B5CF6',
          accentLight: '#A78BFA',
          pink: '#EC4899',
          cyan: '#06B6D4',
          border: 'rgba(255, 255, 255, 0.08)',
        },
      },
      animation: {
        'glow-pulse': 'glowPulse 4s infinite ease-in-out',
        'float-slow':  'floatSlow 6s infinite ease-in-out',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%':       { opacity: '0.6', transform: 'scale(1.05)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
