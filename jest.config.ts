
import type { Config } from 'jest';

const config: Config = {
  roots: [
    '<rootDir>/src'
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts, tsx}',
    "!**/*.d.ts",
    "!<rootDir>/src/main/**/*",
  ],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
  ],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': '@swc/jest'
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
    '\\.scss$': 'identity-obj-proxy',
  },
  testRegex: [
    ".*\\..*test\\.tsx?$",
    ".*\\..*spec\\.tsx?$",
  ],
  watchPathIgnorePatterns: [
    "/node_modules/",
    "/dist/"
  ],
  setupFiles:[ 'whatwg-fetch'],
  setupFilesAfterEnv: ['<rootDir>/src/main/config/jest-setup.ts'],
};

export default config;
