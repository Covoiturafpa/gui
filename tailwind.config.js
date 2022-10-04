/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        sm: '480px',
        md: '768px',
        lg: '770px',
      },
      height: {
        sm: '480px',
        md: '768px',
        lg: '380px',
      },
      backgroundImage : {
        'header_footer' : "url('/src/assets/background_img.jpg')"
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-300px * 6))' },
        }
      },
      animation: {
        scroll : 'scroll 15s linear infinite',
      },
      colors : {
        'green-afpa' : '#58a03a', 
      }

    },
  },
  plugins: [],
}
