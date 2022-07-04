module.exports = {
	clearMocks: false,
	collectCoverage: true,
	coverageDirectory: "coverage",
	coverageProvider: "v8",

	testEnvironment: "node",
	roots: ["<rootDir>/src"],
	testMatch: ["**/*.spec.ts", "**/*.int.ts"],
	transform: {
		"^.+\\.tsx?$": "ts-jest"
	}
};
