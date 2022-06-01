module.export = {
    testEnvironment: "node",
    roots: ["<rootDir>/src"],
    testMatch: ["**/*.init.ts"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
};