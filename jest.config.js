export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.ts"],
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/tests_mocks/styleMock.js",
    "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/tests_mocks/imageMock.js",
  },
  transformIgnorePatterns: ["node_modules/(?!@firebase)"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
  },
};
