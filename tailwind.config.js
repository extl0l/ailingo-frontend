/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
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
			},
		},
	},
	plugins: [],
};
