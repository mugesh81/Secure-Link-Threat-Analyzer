/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#0a0e27',
          darker: '#060918',
          blue: '#00d4ff',
          purple: '#8b5cf6',
          green: '#10b981',
          yellow: '#fbbf24',
          red: '#ef4444',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 2s ease-in-out infinite',
        'scan-line': 'scanLine 2s linear infinite',
      },
      keyframes: {
        scan: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(100%)' },
        },
        scanLine: {
          '0%': { top: '10%', opacity: '1' },
          '50%': { opacity: '0.6' },
          '100%': { top: '90%', opacity: '1' },
        },
      }
    },
  },
  plugins: [],
}