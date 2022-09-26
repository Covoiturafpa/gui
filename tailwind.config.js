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
    },
  },
  plugins: [],
}
