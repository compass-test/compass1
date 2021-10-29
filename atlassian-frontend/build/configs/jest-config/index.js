/**
 * The main jest config. Required at the project root.
 */
/* eslint-disable no-console */
const fs = require('fs');

const { lookpath } = require('lookpath');

const WATCHMAN_MESSAGE =
  'no watchman binary found - this will slow down test execution. https://facebook.github.io/watchman/docs/install.html';

lookpath('watchman').then(bin => {
  if (!bin && !process.env.CI) {
    console.warn(WATCHMAN_MESSAGE);
  }
});

const { CHANGED_PACKAGES = '' } = process.env;
const { INTEGRATION_TESTS } = process.env;
const { INTEGRATION_WEBVIEW_TESTS } = process.env;
const { VISUAL_REGRESSION } = process.env;
const { PARALLELIZE_TESTS } = process.env;
const { PARALLELIZE_TESTS_FILE } = process.env;

const COVERAGE_PACKAGES = (process.env.COVERAGE_PACKAGES || '')
  .split(' ')
  .filter(pkg => CHANGED_PACKAGES.includes(pkg))
  .join(' ');

// These are set by Pipelines if you are running in a parallel steps
const STEP_IDX = Number(process.env.STEP_IDX);
const STEPS = Number(process.env.STEPS);

// We don't transform any files under node_modules except those defined in transformNodeModules
// This array is joined to form the regex that defines the transformIgnorePatterns
const transformNodeModules = [
  '@atlaskit',
  'react-syntax-highlighter', // uses dynamic imports which are not valid in node
  '(@atlassian/mpkit-*)',
  'ts-is-defined', // exports ESM in the package.json browser field
  'ts-tiny-invariant', // exports ESM in the package.json browser field
];

/**
 * USAGE for parallelizing: setting PARALLELIZE_TESTS to an array of globs or an array of test files when you
 * have the STEPS and STEP_IDX vars set will automatically distribute them evenly.
 * It is important that **ALL** parallel steps are running the same command with the same number of tests and that **ALL**
 * parallel steps are running the command (i.e you can have 3 steps running jest and one running linting) as this will throw
 * the calculations off
 *
 * Run all the tests, but in parallel
 * PARALLELIZE_TESTS="$(yarn --silent jest --listTests)" yarn jest --listTests
 *
 * Run only tests for changed packages (in parallel)
 * PARALLELIZE_TESTS="$(CHANGED_PACKAGES=$(node build/legacy/ci-scripts/get.changed.packages.since.base.branch.js) yarn --silent jest --listTests)" yarn jest --listTests
 *
 * If the number of tests to run is too long for bash, you can pass a file containing the tests instead
 * TMPFILE="$(mktemp /tmp/jest.XXXXX)"
 * yarn --silent jest --listTests > $TMPFILE
 * PARALLELIZE_TESTS_FILE="$TMPFILE" yarn jest --listTests
 */

const config = {
  // Override default babel-jest transform configuration to pass in rootMode so we can run jest from subdirectories.run
  transform: { '\\.[jt]sx?$': ['babel-jest', { rootMode: 'upward' }] },
  testMatch: [
    `<rootDir>/**/__tests__/**/*.(js|tsx|ts)`,
    `<rootDir>/**/test.(js|tsx|ts)`,
    `<rootDir>/**/*.test.(js|tsx|ts)`,
  ],
  // NOTE: all options with 'pattern' in the name are javascript regex's that will match if they match
  // anywhere in the string. Where-ever there are an array of patterns, jest simply 'or's all of them
  // i.e /\/__tests__\/_.*?|\/__tests__\/.*?\/_.*?|\/__tests__\/integration\//
  testPathIgnorePatterns: [
    // ignore files that are under a directory starting with "_" at the root of __tests__
    '/__tests__\\/_.*?',
    // ignore files under __tests__ that start with an underscore
    '/__tests__\\/.*?\\/_.*?',
    // ignore tests under __tests__/integration (we override this if the INTEGRATION_TESTS flag is set)
    '/__tests__\\/integration/',
    // ignore tests under __tests__/integration-webview (we override this if the INTEGRATION_WEBVIEW_TESTS flag is set)
    '/__tests__\\/integration-webview/',
    // ignore tests under __tests__/vr (we override this if the VISUAL_REGRESSION flag is set)
    '/__tests__\\/visual-regression/',
    // ignore tests in gatsby generated .cache folder
    '/.cache/',
    // ignore .mock.ts files that are used to group mocks for a test file
    '/.*\\.mock\\.ts',
    // custom babelrc's in test directories
    '/.babelrc.js',

    // ignore Cypress tests in in-product-testing-sample package
    '/in-product-testing-sample\\/',
  ],
  // NOTE: This ignored list is required because the script is bundling `@atlaskit/navigation-next`
  // which causes infinite loop if run tests in watch mode
  watchPathIgnorePatterns: [
    '\\/packages\\/design-system\\/navigation-next\\/[^\\/]*\\.js$',
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  modulePathIgnorePatterns: ['/__fixtures__/', './node_modules', '/dist/'],
  coveragePathIgnorePatterns: ['/__tests__/visual-regression/'],
  // don't transform any files under node_modules except those defined in transformNodeModules
  transformIgnorePatterns: [
    `\\/node_modules\\/(?!${transformNodeModules.join('|')})`,
  ],
  resolver: `<rootDir>/build/monorepo-utils/resolvers/jest-resolver`,
  globals: {
    __BASEURL__: 'http://localhost:9000',
    synchronyUrl: '',
  },
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/fileMock.js',
    // Force @compiled/react to run through the main bundle instead of the browser bundle.
    '^@compiled/react/runtime$':
      '<rootDir>/node_modules/@compiled/react/dist/cjs/runtime/index.js',
    '^type$': 'component-type',
    '^unserialize$': 'yields-unserialize',
    '^each$': 'component-each',
  },
  prettierPath: './node_modules/prettier',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFiles: [`${__dirname}/setup`, 'jest-canvas-mock'],
  setupFilesAfterEnv: [`${__dirname}/jestFrameworkSetup.js`],
  testResultsProcessor: 'jest-junit',
  testEnvironmentOptions: {
    // Need this to have jsdom loading images.
    resources: 'usable',
  },
  coverageReporters: ['lcov', 'html', 'text-summary'],
  collectCoverage: false,
  collectCoverageFrom: [],
  coverageThreshold: {},
  globalSetup: `${__dirname}/globalSetup.js`,
  globalTeardown: undefined,
  // Jest 25's default test environment 'jsdom' uses JSDom 15.
  testEnvironment: 'jest-environment-jsdom-sixteen',
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
    'node_modules/inquirer-checkbox-plus-prompt/',
    'node_modules/lodash/',
    'node_modules/wrappy/',
    'node_modules/@auth0/s3',
  ],
};

// If the CHANGED_PACKAGES variable is set, we parse it to get an array of changed packages and only
// run the tests for those packages
if (CHANGED_PACKAGES) {
  const changedPackages = JSON.parse(CHANGED_PACKAGES);
  const changedPackagesTestGlobs = changedPackages.flatMap(pkgPath => [
    `<rootDir>/${pkgPath}/**/__tests__/**/*.(js|tsx|ts)`,
    `<rootDir>/${pkgPath}/**/test.(js|tsx|ts)`,
    `<rootDir>/${pkgPath}/**/*.test.(js|tsx|ts)`,
  ]);
  config.testMatch = changedPackagesTestGlobs;
}

// Adding code coverage thresold configuration for unit test only
// This should add only the packages with code coverage threshold available
// If not it will keep the same flow without code coverage check
if (COVERAGE_PACKAGES) {
  const coveragePackages = JSON.parse(COVERAGE_PACKAGES);

  if (CHANGED_PACKAGES) {
    const changedPackages = JSON.parse(CHANGED_PACKAGES);
    coveragePackages.collectCoverageFrom = coveragePackages.collectCoverageFrom.filter(
      pkg => changedPackages.includes(pkg),
    );
  }

  if (coveragePackages.collectCoverageFrom.length > 0) {
    config.collectCoverage = true;
    config.collectCoverageFrom = coveragePackages.collectCoverageFrom;
    config.coverageThreshold = coveragePackages.coverageThreshold;
  }
}

// If the INTEGRATION_TESTS / VISUAL_REGRESSION flag is set we need to
if (INTEGRATION_TESTS || VISUAL_REGRESSION) {
  const testPattern = process.env.VISUAL_REGRESSION
    ? 'visual-regression'
    : `integration${INTEGRATION_WEBVIEW_TESTS ? '-webview' : ''}`;
  const testPathIgnorePatterns /*: string[] */ = config.testPathIgnorePatterns.filter(
    pattern => pattern !== `/__tests__\\/${testPattern}/`,
  );
  config.testPathIgnorePatterns = testPathIgnorePatterns;
  // If the CHANGED_PACKAGES variable is set, only integration tests from changed packages will run
  if (CHANGED_PACKAGES) {
    const changedPackages = JSON.parse(CHANGED_PACKAGES);
    const changedPackagesTestGlobs = changedPackages.map(
      pkgPath =>
        `<rootDir>/${pkgPath}/**/__tests__/${testPattern}/**/*.(js|tsx|ts)`,
    );
    config.testMatch = changedPackagesTestGlobs;
  } else {
    config.testMatch = [`**/__tests__/${testPattern}/**/*.(js|tsx|ts)`];
  }
}

/**
 * Batching.
 * In CI we want to be able to split out tests into multiple parallel steps that can be run concurrently.
 * We do this by passing in a list of test files (PARALLELIZE_TESTS), the number of a parallel steps (STEPS)
 * and the (0 indexed) index of the current step (STEP_IDX). Using these we can split the test up evenly
 */
if (PARALLELIZE_TESTS || PARALLELIZE_TESTS_FILE) {
  const testStr = PARALLELIZE_TESTS_FILE
    ? fs.readFileSync(PARALLELIZE_TESTS_FILE, 'utf8')
    : PARALLELIZE_TESTS;
  if (!testStr) {
    throw new Error('Cannot read parallelized tests');
  }
  const allTests = JSON.parse(testStr).sort();
  config.testMatch = allTests.filter((_, i) => (i % STEPS) - STEP_IDX === 0);

  console.log('Parallelising jest tests.');
  console.log(`Parallel step ${String(STEP_IDX + 1)} of ${String(STEPS)}`);
  console.log('Total test files', allTests.length);
  console.log('Number of test files in this step', config.testMatch.length);
}

// Annoyingly, if the array is empty, jest will fallback to its defaults and run everything
if (config.testMatch.length === 0) {
  config.testMatch = ['DONT-RUN-ANYTHING'];
  config.collectCoverage = false;
  // only log this message if we are running in an actual terminal (output not being piped to a file
  // or a subshell)
  if (process.stdout.isTTY) {
    console.log('No packages were changed, so no tests should be run.');
  }
}
if (process.env.VISUAL_REGRESSION) {
  config.globalSetup = `<rootDir>/build/test-utils/visual-regression/config/jest/globalSetup.ts`;
  config.globalTeardown = `<rootDir>/build/test-utils/visual-regression/config/jest/globalTeardown.ts`;
  config.testEnvironment = `<rootDir>/build/test-utils/visual-regression/config/jest/jsdomEnvironment.js`;

  if (!process.env.CI && !process.env.VR_DEBUG) {
    config.globals.__BASEURL__ = 'http://testing.local.com:9000';
  }

  if (process.env.SYNCHRONY_URL) {
    config.globals.synchronyUrl = process.env.SYNCHRONY_URL;
  }
}

module.exports = config;
