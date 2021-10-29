/**
 * Known environmental errors
 */
export const exemptionStackTraces = new Map<string, string>([
  // BrowserStack errors
  [
    'Session not started or terminated',
    `Error: Caught error after test environment was torn down
Session not started or terminated
    at getErrorFromResponseBody (/opt/atlassian/pipelines/agent/build/node_modules/webdriver/build/utils.js:121:10)`,
  ],
  [
    'Failed to create session',
    `Error: Failed to create session.
    Timeout awaiting 'request' for 120000ms
        at startWebDriverSession (/opt/atlassian/pipelines/agent/build/node_modules/webdriver/build/utils.js:45:11)`,
  ],
  [
    'socket hang up',
    `RequestError: socket hang up
    at ClientRequest.<anonymous> (/opt/atlassian/pipelines/agent/build/node_modules/webdriver/node_modules/got/dist/source/core/index.js:792:25)`,
  ],
  [
    `PageLoadError: failed to load url for test`,
    `Error: PageLoadError: failed to load url for test.
    Page loading exceeded timeout set for pageLoad
        at Page._callee4$ (/atlassian-frontend/build/webdriver-runner/lib/wrapper/wd-wrapper.ts:231:13)`,
  ],
  // Puppeteer errors
  [
    'Error running image diff: spawnSync /usr/local/bin/node ENOBUFS',
    // This one is typically caused when generating an image diff that exceeds the max buffer size.
    // This is ideally protected against by enforcing a maximum canvas size for screenshots.
    `Error: Error running image diff: spawnSync /usr/local/bin/node ENOBUFS
    at runDiffImageToSnapshot (/opt/atlassian/pipelines/agent/build/node_modules/jest-image-snapshot/src/diff-snapshot.js:346:11)
    at Object.toMatchImageSnapshot (/opt/atlassian/pipelines/agent/build/node_modules/jest-image-snapshot/src/index.js:208:7)`,
  ],
  // Generic errors
  [
    'Network Error',
    // Tests shouldn't rely on external resources, but if they do, and they're intermittently unavailable, then
    // we shouldn't unfairly flag a test as inconsistent because of it.
    // This is controvserial, as if the external resource is permanently removed, then the test becomes broken
    // rather than inconsistent, and needs manual intervention to skip it to unblock others.
    `Error: Network Error
    at createError (/opt/atlassian/pipelines/agent/build/node_modules/axios/lib/core/createError.js:16:15)`,
  ],
]);

// Substring exemptions used for matching the failure reason
export const EXEMPTIONS = Array.from(exemptionStackTraces.keys());

/**
 * Determine whether the failure reason is a known environmental error
 * that's outside the control of the running test (e.g. is exempt).
 */
export function getErrorExemption(
  filename: string,
  failureReason: string[],
  verbose = false,
): string | undefined {
  const primaryErrorMessage = failureReason[0];
  const exempt = EXEMPTIONS.find(reason =>
    primaryErrorMessage.includes(reason),
  );
  if (verbose && exempt) {
    console.warn(`Ignoring '${exempt}' failure for\n\t${filename}`);
  }
  return exempt;
}
