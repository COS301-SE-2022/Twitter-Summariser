module.exports = {
    testEnvironment: "node",
    roots: ["<rootDir>/src"],
    testMatch: ["**/*.int.ts"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testTimeout: 60000
};