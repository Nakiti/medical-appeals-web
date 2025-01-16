/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
         midnight: '#1C1C1C',
         silver: '#5A5A5A',
         emerald: '#787D5C',
         crimson: '#6E5343',
         cloud: '#E0E0E0',
         charcoal: '#3A3A3A',
         slateBlue: '#4A5568',
      },
    },
  },
  plugins: [],
};
