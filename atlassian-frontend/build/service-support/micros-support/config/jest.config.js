/* eslint-disable no-console */

const path = require('path');

const config = {
  rootDir: process.cwd(),
  testMatch: [`./**/service-integration/**/*.(js|tsx|ts)`],
  // NOTE: all options with 'pattern' in the name are javascript regex's that will match if they match
  // anywhere in the string. Where-ever there are an array of patterns, jest simply 'or's all of them
  // i.e /\/__tests__\/_.*?|\/__tests__\/.*?\/_.*?|\/__tests__\/integration\//
  testPathIgnorePatterns: [],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  modulePathIgnorePatterns: ['/__fixtures__/', './node_modules', '/dist/'],
  resolver: path.resolve(
    `${__dirname}/../node_modules/@atlaskit/resolvers/jest-resolver.js`,
  ),
  globals: {},
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  globalSetup: `${__dirname}/jest-startup-nanos`,
  testResultsProcessor: 'jest-junit',
  testEnvironmentOptions: {
    // Need this to have jsdom loading images.
    resources: 'usable',
  },
  coverageReporters: ['lcov', 'html', 'text-summary'],
  collectCoverage: false,
  collectCoverageFrom: [],
  coverageThreshold: {},
  globalTeardown: undefined,
  // The modules below cause problems when automocking.
  unmockedModulePathPatterns: [
    'node_modules/tslib/',
    'node_modules/babel-runtime/',
    'node_modules/@babel/runtime/',
    'node_modules/es-abstract/',
    'node_modules/graceful-fs/',
    'node_modules/any-promise/',
    'node_modules/globby/',
    'node_modules/chalk/',
    'node_modules/fs-extra/',
    'node_modules/meow/',
    'node_modules/colors/',
  ],
};

module.exports = config;
