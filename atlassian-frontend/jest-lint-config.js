/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const { lookpath } = require('lookpath');

const WATCHMAN_MESSAGE =
  'no watchman binary found - this will slow down test execution. https://facebook.github.io/watchman/docs/install.html';

lookpath('watchman').then((bin) => {
  if (!bin && !process.env.CI) {
    console.warn(WATCHMAN_MESSAGE);
  }
});

/**
 * We are using jest-runner-eslint to execute eslint rules in parallel, resulting in faster builds.
 */
const config = {
  runner: 'jest-runner-eslint',
  testMatch: ['<rootDir>/**/*.(js|json|tsx|ts)'],
  modulePathIgnorePatterns: ['/__fixtures__/'],
  watchPlugins: ['jest-runner-eslint/watch-fix'],
};

module.exports = config;
