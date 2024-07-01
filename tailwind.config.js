/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    backdropFilter: {
      none: 'none',
      blur: 'blur(30px)', // Adjust blur value as needed
    },
    extend: {
      fontFamily: {
        anta: ["Anta", "sans-serif"],
        VT323: ["VT323", "sans-serif"],
        "kode-mono": ["Kode Mono", "monospace"],
        Sixtyfour: ["Sixtyfour", "sans-serif"],
        "Oleo-Script": ["Oleo Script", "system-ui"],
        Mansalva: ["Mansalva", "sans-serif"],
        Genos: ["Genos", "sans-serif"],
        Orbitron: ["Orbitron", "sans-serif"],
        Cinzel: ["Cinzel", "sans-serif"],
        "Exo-2": ["Exo 2", "sans-serif"],
        Roboto: ["Roboto", "sans-serif"],
        Sanchez: ["Sanchez", "serif"],
        "DM-Serif-Text" :["DM Serif Text","serif"],
        "Zen-Tokyo-Zoo":["Zen Tokyo Zoo","serif"],
        "Poppins":["Poppins","sans-serif"],

      },
      
    },
  },
  plugins: [],
};
