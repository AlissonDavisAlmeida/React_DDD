
import type { Config } from 'jest';

const config: Config = {
  roots: [
    '<rootDir>/src'
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts, tsx}'
  ],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
  ],
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': '@swc/jest'
  },
  transformIgnorePatterns: [
    '/node_modules/'
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/"
  ],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  testRegex: [
    ".*\\..*test\\.ts?$",
    ".*\\..*spec\\.ts?$",
  ],
  watchPathIgnorePatterns: [
    "/node_modules/",
    "/dist/"
  ],
  
};

export default config;
