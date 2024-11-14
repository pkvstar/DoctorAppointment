/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      'Poppins':["Poppins"],
      'Outfit':["Outfit"]
    },
    extend: {
      colors:{
        'skyBlue':"#4cabe5",
        'darkBlue': "#150f73",
        'brightYellow': "#fea177" 
      },
      gridTemplateColumns:{
        'auto':'repeat(auto-fill,minmax(200px,1fr))'
      }
    },
  },
  plugins: [],
}

