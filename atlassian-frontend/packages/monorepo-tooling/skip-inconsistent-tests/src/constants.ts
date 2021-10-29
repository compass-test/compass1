export const TEST_REPORT_DIR =
  'packages/monorepo-tooling/skip-inconsistent-tests/test-reports';
export const VR_TESTS_REPORT_FILE = 'VisualRegressionTestsJunit.json';
export const INTEGRATION_TESTS_REPORT_FILE = 'IntegrationTestsJunit.json';
export const MOBILE_INTEGRATION_TESTS_REPORT_FILE =
  'MobileIntegrationTestsJunit.json';

export const VR_STEP_ID_FILE = 'pipeline-stepid-vr.txt';
export const INTEGRATION_STEP_ID_FILE = 'pipeline-stepid-integration.txt';
export const MOBILE_STEP_ID_FILE = 'pipeline-stepid-mobile.txt';

export const INTEGRATION_BROWSERSTACK_SESSION_FILE =
  'browserstack-session.json';
export const MOBILE_BROWSERSTACK_SESSION_FILE =
  'browserstack-session-mobile.json';

export const TEAMS_JSON = require.resolve('../../../../teams.json');

export const VR_TRANSFORMER_PATH = require.resolve(
  './codemod/skip-spec-style-test-transformer',
);
export const INTEGRATION_TRANSFORMER_PATH = require.resolve(
  './codemod/skip-webdriver-test-transfomer',
);
export const MOBILE_INTEGRATION_TRANSFORMER_PATH = require.resolve(
  './codemod/skip-mobiledriver-test-transformer',
);
