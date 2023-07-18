module.exports = {
  testRunner: 'jest-jasmine2',
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/setupJest.ts'],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/demo/', '<rootDir>/src/test.ts', '<rootDir>/dist/'],
  coveragePathIgnorePatterns: ['/node_modules/', '/src/jestGlobalMocks.ts', '/src/setupJest.ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
