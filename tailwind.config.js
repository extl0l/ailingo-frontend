/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"web-dark": "#1b1d21",
				app: {
					dark: "#16181d",
				},
			},
		},
	},
	plugins: [],
};
