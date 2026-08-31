/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ocean: {
          950: '#020617', // Main deep slate background
          900: '#060d1f', // Deep maritime surface
          850: '#0b152d',
          800: '#0f1f3d',
          700: '#1e3054',
          600: '#2d4778',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
          electric: '#00F2FE',
        },
        hydrogen: {
          400: '#34d399',
          500: '#10b981',
          glow: '#00ffa3',
        },
        marine: {
          accent: '#0284c7',
          deep: '#0369a1',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(0, 242, 254, 0.3)',
        'glow-cyan-lg': '0 0 45px -10px rgba(0, 242, 254, 0.45)',
        'glow-hydrogen': '0 0 25px -5px rgba(16, 185, 129, 0.3)',
        'glow-hydrogen-lg': '0 0 45px -10px rgba(16, 185, 129, 0.45)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { opacity: '0.4', filter: 'blur(20px)' },
          '100%': { opacity: '0.8', filter: 'blur(30px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-pattern': "radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.08) 0%, transparent 60%)",
      }
    },
  },
  plugins: [],
}
