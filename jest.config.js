const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  collectCoverageFrom: [
    "<rootDir>/pages/api/auth/*.js",
    "<rootDir>/proxy.js",
    "<rootDir>/utils/FormFlattenAndRevert.ts",
    "<rootDir>/utils/sanitizeData.tsx",
    "<rootDir>/utils/stringifyIdsAndDates.ts",
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
};

module.exports = createJestConfig(customJestConfig);
