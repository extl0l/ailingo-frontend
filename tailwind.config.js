/** @type {import('tailwindcss').Config} */

import tailwindcss3d from "tailwindcss-3d";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        defaultLayout:
          "[full-start] minmax(50px,1fr) [center-start] repeat(8,[col-start] minmax(min-content,152px) [col-end]) [center-end] minmax(50px,1fr) [full-end]",
        smallLayout:
          "[full-start] minmax(30px,1fr)  [center-start] repeat(8,[col-start] minmax(min-content,152px) [col-end]) [center-end] minmax(30px,1fr) [full-end]",
        mobileLayout:
          "[full-start] minmax(15px,1fr)  [center-start] repeat(8,[col-start] minmax(min-content,152px) [col-end]) [center-end] minmax(15px,1fr) [full-end]",
      },

      colors: {
        "steel-blue": {
          50: "#f4f9fb",
          100: "#e9f3f6",
          200: "#cce4eb",
          300: "#a0cada",
          400: "#6ca9c6",
          500: "#4786ae",
          600: "#366591",
          700: "#2d4d76",
          800: "#273d62",
          900: "#263354",
          950: "#192038",
        },
        "black-rock": {
          50: "#eaf1ff",
          100: "#dae4ff",
          200: "#bccdff",
          300: "#93acff",
          400: "#687dff",
          500: "#4550ff",
          600: "#2a25ff",
          700: "#221ae8",
          800: "#1c18bb",
          900: "#1d1d92",
          950: "#0a092d",
        },

        theme: {
          font: {
            light: "#f6f7fb",
            dark: "#282e3e",
          },
          blue: {
            primary: "#0a092d",
            secondary: "#2e3856",
            tertiary: "#4255ff",
            light: "#edefff",
            pitch: "#a8b1ff",
            ghost: "#586380",
          },
          yellow: {
            primary: "#ffcd1f",
          },
          red: {
            primary: "#d05700",
          },
          // NEW THEME
          ai: {
            light: "hsl(252,79%,69%)",
            "light-variant": "hsl(252,10%,86%)",
          },
          brown: {
            light: "hsla(23, 22%, 27%, 1)",
            lighter: "hsla(23, 22%, 27%, .35)",
          },
          green: {
            primary: "#18ae79", // TODO: Remove after the revamp is finished
            light: "hsla(159, 39%, 55%, 1)",
          },
          lime: {
            light: "hsla(58, 63%, 53%, 1)",
          },
          orange: {
            light: "hsla(24, 93%, 56%, 1)",
          },
          background: {
            light: "hsla(57,76%,95%,1)",
            "light-variant": "hsla(58, 73%, 90%, 1)",
          },
        },
      },
    },
  },
  plugins: [tailwindcss3d],
};
