/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Sora', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        ui: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        // Primary backgrounds
        background: '#FAF9F5',
        backgroundAlt: '#F5F3EE',
        surface: '#FFFFFF',
        surfaceHover: '#F0EDE6',
        
        // Text colors
        textPrimary: '#1F1F1F',
        textSecondary: '#6B6B6B',
        textTertiary: '#9B9B9B',
        textInverse: '#FFFFFF',
        
        // Accent colors (bronze theme)
        accentPrimary: '#CD7F32',
        accentSecondary: '#B86A28',
        accentTertiary: '#E09850',
        accentMuted: '#F4E4D3',
        
        // Border colors
        borderDefault: '#E5E3DD',
        borderLight: '#EFEDE7',
        borderMedium: '#D5D3CD',
        
        // Status colors
        success: '#10A37F',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6',
        
        // Input colors
        inputBg: '#FFFFFF',
        inputBorder: '#D5D3CD',
        inputBorderFocus: '#CD7F32',
        inputPlaceholder: '#9B9B9B',
        
        // Button colors
        btnPrimary: '#CD7F32',
        btnPrimaryHover: '#B86A28',
        btnSecondary: '#F5F3EE',
        btnSecondaryHover: '#E5E3DD',
      },
      animation: {
        'blob': 'blob 7s infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
