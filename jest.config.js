/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "\\.(css)$": "identity-obj-proxy",
    },
    testPathIgnorePatterns: ["!*.d.ts"],
    setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
};
