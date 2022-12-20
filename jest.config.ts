export default {
  transform: {
    '^.+.(t|j)sx?$': ['@swc/jest'],
  },
  clearMocks: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/main/**/*',
    '!<rootDir>/src/**/index.ts',
    '!**/*.d.ts'
  ],
  coverageProvider: 'babel',
  coverageDirectory: 'coverage',
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1',
  }
};
