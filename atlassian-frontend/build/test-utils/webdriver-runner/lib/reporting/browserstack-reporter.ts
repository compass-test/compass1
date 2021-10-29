import chalk from 'chalk';
import { getBuildSession } from './browserstack-status';
import { getSessionIdentifier } from '../clients/desktop/browserstack';
import type { OperatingSystem, ProductBS } from '../../types';

const BS_SESSION_ID = getSessionIdentifier();

const isBrowserStack = process.env.TEST_ENV === 'browserstack';

type JasmineTestResult = {
  id: string;
  description: string;
  status: 'passed' | 'failed';
  testPath: string;
  fullName: string;
  failedExpectations?: any[];
  passedExpectations?: any[];
  pendingReason?: Promise<string>;
};

type Driver = {
  sessionId: string;
  capabilities: { browserName: string; os: string };
  executeScript: (command: string) => void;
};

export type BrowserStackSessionDetails = {
  buildId: string;
  dashboardUrl: {
    all: string;
    passed: string;
    failed: string;
    timedout: string;
  };
};

const { BS_PRODUCT } = process.env;

const product: ProductBS = (BS_PRODUCT as ProductBS) || 'automate';

function isOS(os: OperatingSystem): boolean {
  switch (os) {
    case 'Windows':
    case 'OS X':
    case 'android':
    case 'ios':
      return true;
    default:
      return false;
  }
}

// Update the test file's status for a BrowserStack session.
function setBrowserStackStatus(driver: Driver, failures: string[] = []) {
  const hasFailures = failures.length > 0;
  const status = hasFailures ? 'failed' : 'passed';
  let reason = `Everything passed.`;
  if (hasFailures) {
    reason =
      `${failures.length} failed: ` +
      failures.map(failure => `\`${failure}\``).join(', ');
  }
  driver.executeScript(
    `browserstack_executor: ${JSON.stringify({
      action: 'setSessionStatus',
      arguments: {
        status,
        reason,
      },
    })}`,
  );
}

/**
 * Custom Jasmine reporter responsible for updating the pass/fail status
 * of BrowserStack test sessions.
 */
export default function initBrowserStackReporter() {
  const drivers = new Map<String, Driver>();
  const failures = new Map<String, string[]>();
  return {
    addDriver: (browserLabel: string, driver: Driver) => {
      // Store the driver/session for each test for later retreival
      drivers.set(browserLabel, driver);
    },
    reporter: {
      // Invoked when an `it` and its associated `beforeEach` and `afterEach` functions have been run.
      specDone: (result: JasmineTestResult) => {
        const { fullName, description: testCase, status } = result;
        /**
         * specDone will run for every test case in a file.
         * We need to mark a file as failed if 1 or more test cases fail.
         *
         * We store the failures in an array to mark the file with all failures
         * at the end within `suiteDone`.
         */
        if (status === 'failed') {
          const testFilename = fullName.split(' ')[0];
          const platform = fullName
            .replace(testFilename, '')
            .replace(testCase, '')
            .trim();
          /**
           * Store the failed test case without the reason.
           *
           * The BrowserStack UI is limited. It truncates the result and doesn't support the new line
           * character. The full stack trace error isn't suitable for the status reason.
           *
           * Example result:
           * {
           *    "id":"spec0",
           *    "description":"Insert date via quick insert",
           *    "fullName":"quick-insert.ts Windows 10 chrome 89.0 Insert date via quick insert",
           *    "failedExpectations":[{"actual":"...","error": { ... }}]
           *    ...
           * }
           */
          const key = `${testFilename} ${platform}`;
          if (!failures.has(key)) {
            failures.set(key, []);
          }
          const failureReasons = failures.get(key)!;
          failureReasons.push(testCase);
        }
      },

      // Invoked for each `describe` after finishing all its nested tests.
      suiteDone: (result: JasmineTestResult) => {
        const { description: browserLabel, fullName } = result;
        /**
         * Abort for top level describe. We've already marked the nested describe by that point.
         *
         * The describe blocks are defined within `build/test-utils/webdriver-runner/runner.ts`.
         *
         * // Top level: File
         * describe(filename, () => {})
         *    Example result: {"id":"suite1", "description":"quick-insert.ts", "fullName":"quick-insert.ts", ... }
         *
         * // Nested level: Browser
         * describe(browserLabel, () => {})
         *    Example result: {"id":"suite2", "description":"Windows 10 chrome 89.0", "fullName":"quick-insert.ts Windows 10 chrome 89.0", ... }
         */
        if (browserLabel === fullName) {
          return;
        }

        /**
         * Abort for intermediate describes.
         *
         * This is rare in integration tests as most files use BrowserTestCase directly rather than nested.
         */
        let firstWord = browserLabel.split(' ')[0];
        // Currently, for MacOS, it returns 'OS X' and as 'OS' is too vague to differentiate, we override to 'OS X'.
        firstWord === 'OS' ? (firstWord = 'OS X') : firstWord;
        const isPlatformDescribe = isOS(firstWord as OperatingSystem);
        if (!isPlatformDescribe) {
          return;
        }

        // Find driver/session based for this test
        const driver = drivers.get(browserLabel);
        if (driver) {
          // Update the status with a pass or fail
          setBrowserStackStatus(driver, failures.get(fullName));
        } else {
          // Passive error logging
          const error = `browserStackReporter.ts. Failed to find driver for: "${browserLabel}". Were the describe labels changed within build/test-utils/webdriver-runner/runner.ts?`;
          console.error(error);
        }
      },
    },
  };
}

async function getBrowserStackBuildSession() {
  // We log the BrowserStack Dashboard url only when running on BrowserStack.
  if (!isBrowserStack) {
    return;
  }
  const buildId = await getBuildSession(BS_SESSION_ID, product);
  if (!buildId) {
    console.log(
      chalk.yellow(
        `\nUnable to lookup for build session. Missing buildId: "${buildId}", or product: "${product}".`,
      ),
    );
    return;
  }
  const browserStackUrl = `https://${product}.browserstack.com/dashboard/v2/builds/${buildId}`;
  return {
    buildId,
    dashboardUrl: {
      all: browserStackUrl,
      passed: `${browserStackUrl}?overallStatus=completed`,
      failed: `${browserStackUrl}?overallStatus=error`,
      timedout: `${browserStackUrl}?overallStatus=timedout`,
    },
  };
}

export async function logBrowserstackBuildSessionUrl(exitCode: number) {
  const session = await getBrowserStackBuildSession();
  if (session) {
    console.log(
      chalk.cyan(
        `\nBrowserstack Build Session URL:\n${session.dashboardUrl.all}\n`,
      ),
    );
    if (exitCode !== 0) {
      console.log(
        chalk.red(
          `Some tests failed. You can debug them here:\n${session.dashboardUrl.failed}\n`,
        ),
      );
    }
  }
  return session;
}
