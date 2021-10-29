const jestDefaultConfig = require('./jest.config');

const { USER_AGENT } = process.env;
const { CHANGED_PACKAGES } = process.env;

const config = {
  ...jestDefaultConfig,
  testMatch: [
    `${__dirname}/packages/editor/editor-mobile-bridge/src/__tests__/**/*.(js|tsx|ts)`,
  ],
  testPathIgnorePatterns: [
    // ignore files under __tests__ that start with "one" underscore
    '/__tests__\\/.*?\\/_[^_].*?',
    // ignore files inder __third-party__ folders
    '/__tests__\\/.*?\\/__third-party__.*?',
    // ignore tests under __tests__/integration (we override this if the INTEGRATION_TESTS flag is set)
    '/__tests__\\/integration/',
    // ignore tests under __tests__/integration-webview (we override this if the INTEGRATION_WEBVIEW_TESTS flag is set)
    '/__tests__\\/integration-webview/',
    // ignore tests under __tests__/vr (we override this if the VISUAL_REGRESSION flag is set)
    '/__tests__\\/visual-regression/',
    // ignore .mock.ts files that are used to group mocks for a test file
    '/.*\\.mock\\.ts',
  ],
  // This script allows "resourceLoaderOptions" object (passed into "testEnvironmentOptions") to initialize a JSDOM's ResourceLoader.
  testEnvironment: `${__dirname}/build/configs/jest-config/setup/setup-jsdom-environment.js`,
  testEnvironmentOptions: {
    // Using JSDOM's ResourceLoader:
    // - to load images (https://github.com/jsdom/jsdom/issues/2345)
    // - to inject a custom user-agent
    // - created using "resourceLoaderOptions" to solve a classloading problem (similar to https://github.com/facebook/jest/issues/2549)
    resourceLoaderOptions: {
      userAgent: USER_AGENT,
    },
  },
};

if (USER_AGENT) {
  if (/Android \d/.test(USER_AGENT)) {
    config.testPathIgnorePatterns.push('/__tests__\\/.*?\\/__ios__.*?');
  } else if (/AppleWebKit/.test(USER_AGENT) && /Mobile\/\w+/.test(USER_AGENT)) {
    config.testPathIgnorePatterns.push('/__tests__\\/.*?\\/__android__.*?');
  }
}

/**
 * This relies on `CHANGED_PACKAGES` utilising the `--dependents='direct'` flag.
 *
 * Changes to packages which impact the mobile editor experience end up pulling in
 * one of these primary packages. We use this to decide whether or not mobile testing
 * is applicable.
 *
 * Skipping mobile tests when appropriate frees up CI resources for others to utilise.
 */
function impactsMobileEditor(changedPackages) {
  if (!Array.isArray(changedPackages) || !changedPackages.length) return false;
  return (
    changedPackages.includes('packages/editor/editor-mobile-bridge') ||
    changedPackages.includes('packages/editor/editor-core') ||
    changedPackages.includes('packages/editor/renderer')
  );
}

// If the CHANGED_PACKAGES variable is set, we parse it to get an array of changed packages
// e.g. CHANGED_PACKAGES=$(node build/legacy/ci-scripts/get.changed.packages.since.base.branch.js --dependents='direct')
if (CHANGED_PACKAGES) {
  const shouldRunMobileTests = impactsMobileEditor(
    JSON.parse(CHANGED_PACKAGES),
  );
  if (!shouldRunMobileTests) {
    config.testMatch = ['DONT-RUN-ANYTHING'];
  }
}

module.exports = config;
