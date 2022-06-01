module.export = {
    testEnvironment: "node",
    roots: ["<rootDir>/src"],
    testMatch: ["**/*.spec.ts"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
};