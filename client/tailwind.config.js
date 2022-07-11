module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				"twitter-color": "#00ACDF",
				"twitter-color-hover": "#11C2F7"
			}
		},
		screens: {
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
			"mini-tablet": "825px"
		}
	},
	plugins: []
};
