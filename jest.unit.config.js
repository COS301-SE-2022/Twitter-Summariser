module.exports = {
    clearMocks: false,
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",

    testEnvironment: "node",
    roots: ["<rootDir>/src"],
    testMatch: ["**/*.spec.ts", "**/unit/**/*.test.ts"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
};