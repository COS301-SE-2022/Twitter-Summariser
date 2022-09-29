module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				"twitter-color": "#00ACDF",
				"twitter-color-hover": "#11C2F7",
				"midnight-blue": "#03045E",
				"dark-cornflower-blue": "#023E8A",
				"star-command-blue": "#0077B6",
				"blue-green": "#0096C7",
				"pacific-blue": "#00B4D8",
				"sky-blue-crayola": "#48CAE4",
				"middle-blue": "#90E0EF",
				"blizzard-blue": "#ADE8F4",
				"light-cyan1": "#CAF0F8",
				"light-cyan2": "#D5F3F9",
				crimson: "#D62839",
				neutral: "#C4BDB7",
				positive: "##00B500",
				negative: "#B50000",
				mixed: "#964B00"
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
