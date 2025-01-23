/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [    
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors : {
      light: {
        sideBarBg: '#97A99E',
        sideBarText: '#EFF2F4',
        sideBarHover: '#C7D3CC',
        bodyText: '#000000',
        accent: '#409A91',
        background: '#FFFFFF',
        interaction: '#D9D9D9',
        accentHover: '#198D82'
      },
      dark: {
        sideBarBg: '#242424',
        sidebarHover: '#3e3e3e',
        sideBarText: '#EFF2F4',
        bodyText: '#000000',
        accent: '#409A91',
        background: '#393737',
        interaction: '#D9D9D9',
        accentHover: '#198D82'
      }
    }
  },
  plugins: [
    
  ],
  darkMode: 'class',
}

