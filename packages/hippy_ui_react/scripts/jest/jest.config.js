const tsPreset = require('ts-jest/jest-preset');
const puppeteerPreset = require('jest-puppeteer/jest-preset');

module.exports = {
  ...tsPreset,
  ...puppeteerPreset,
  rootDir: '../../',
  roots: ['src/'],
  bail: true,
  transformIgnorePatterns: [],
  cacheDirectory: './.cache/jest/',
  testPathIgnorePatterns: ['node_modules/'],
  testRegex: '(/__tests__/.*|\\.test)\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  verbose: true,
  testTimeout: 60000,
  maxWorkers: 1,
};
