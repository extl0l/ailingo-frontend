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
				'black-rock': {
					'50': '#eaf1ff',
					'100': '#dae4ff',
					'200': '#bccdff',
					'300': '#93acff',
					'400': '#687dff',
					'500': '#4550ff',
					'600': '#2a25ff',
					'700': '#221ae8',
					'800': '#1c18bb',
					'900': '#1d1d92',
					'950': '#0a092d',
				},
				
				
			},
		},
	},
	plugins: [],
};
