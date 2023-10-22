/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			gridTemplateColumns: {
				defaultLayout:
					"[full-start] minmax(60px,1fr) [center-start] repeat(8,[col-start] minmax(min-content,140px) [col-end]) [center-end] minmax(60px,1fr) [full-end]",
				smallLayout:
					"[full-start] minmax(30px,1fr)  [center-start] repeat(8,[col-start] minmax(min-content,140px) [col-end]) [center-end] minmax(30px,1fr) [full-end]",
				mobileLayout:
					"[full-start] minmax(15px,1fr)  [center-start] repeat(8,[col-start] minmax(min-content,140px) [col-end]) [center-end] minmax(15px,1fr) [full-end]",
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
				theme: {
					blue: {
						primary: "#0a092d",
						secondary: "#2e3856",
						tertiary: "#4255ff",
						light: "#edefff",
					},
					yellow: {
						primary: "#ffcd1f",
					},
				},
			},
		},
	},
	plugins: [],
};
