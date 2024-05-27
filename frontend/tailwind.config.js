/** @type {import('tailwindcss').Config} */

import { nextui } from "@nextui-org/react";
export default {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /*
        primary: {
          light: "#6C63FF",
          DEFAULT: "#3F3D56",
          dark: "#000000",
        },
        secondary: {
          light: "#FFD700",
          DEFAULT: "#FFA500",
          dark: "#FF4500",
        },*/
        default: {
          light: "#C7E2FF",
          DEFAULT: "#C7E2FF",
          dark: "#C7E2FF",
        },
        // Altri colori personalizzati
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
