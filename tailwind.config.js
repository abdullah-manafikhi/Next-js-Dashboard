/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#223564",    
        "secondary": "#8DD0BA",
        "tertiary": "#e7b008",
        "neutral": "#ffffff",
        "base-100": "#212121",
        "info": "#0092D6",
        "success": "#6CB288",
        "warning": "#DAAD58",
        "error": "#AB3D30",
      },
    },
  },
  plugins: [require("daisyui")],
}
