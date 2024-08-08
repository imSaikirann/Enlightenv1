/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
       
        primary : "#09090b",
        secodary:"#171716",
        textColor:'#F6F6F7',
        back:'#09090b'
      },
      fontFamily: {
        logo: ['"Space Grotesk"', 'sans-serif'],
        create: ['"Outfit"', 'sans-serif'],
        buttons:['"Oswald']
      },
      fontSize: {
        basic: '16px',
        huge: '3rem',
      },
      padding: {
        small: '0.5rem',    
        bsmall:'0.6rem',
        large: '2rem',      
      },
    },
  },
  plugins: [],
}
