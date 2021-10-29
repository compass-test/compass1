/* eslint-disable global-require */
import path from 'path';
import { AggregatedResult } from '@jest/test-result';
import type { TimedTestSuiteResult } from '@atlaskit/build-reporting';
import { runJest } from '../cli/jest-cli';
import { getExitCode } from './exit-code';
import { hasAddedSnapshotsInCI, isSnapshotAddedFailure } from './snapshots';
import type { Flags } from './flags';

export interface RetryOptions {
  directory: string;
  maxWorkers: string | number;
}

export type TestSuiteResponse = {
  exitCode: number;
  results: TimedTestSuiteResult[];
};

export function returnFailingTestPaths(results: AggregatedResult) {
  if (!results || results.testResults.length === 0) {
    return [];
  }
  return (
    results.testResults
      // If a test **suite** fails (where no tests are executed), we should check to see if
      // failureMessage is truthy, as no tests have actually run in this scenario.
      // If a test suite has failed because only because snapshots were added
      // there is no point in re-running the tests as we know they will fail.
      .filter(testResult => {
        return (
          (testResult.numFailingTests > 0 ||
            (testResult.failureMessage && results.numFailedTestSuites > 0)) &&
          !isSnapshotAddedFailure(testResult)
        );
      })
      .map(testResult => testResult.testFilePath)
  );
}

/**
 * Rename the report to avoid replacing the initial run's file for reruns
 *
 * This is achieved by specifying an optional environmental variable.
 * @see https://github.com/jest-community/jest-junit#configuration
 *
 * Note: we typically don't have a value set by default, and instead
 * rely on the filename/path from the configuration. e.g.
 *
 * ```
 * "jest-junit": {
 *   "outputDirectory": "test-reports",
 *   "outputName": "junit.xml"
 * }
 * ```
 *
 * @param reportFilename Alternate filename to use
 * @param testDir Base directory
 *
 * @returns A function to restore the original junit filename
 */
export function renameJunitReport(reportFilename: string, testDir: string) {
  const original = process.env.JEST_JUNIT_OUTPUT;
  process.env.JEST_JUNIT_OUTPUT = path.join(
    testDir,
    `test-reports/${reportFilename}`,
  );
  return () => {
    if (!original) {
      // `undefined` gets cast as a string once assigned so we delete it instead
      delete process.env.JEST_JUNIT_OUTPUT;
    } else {
      process.env.JEST_JUNIT_OUTPUT = original;
    }
  };
}

/**
 * Run jest and return the results including a timestamp for
 * performance measuring purposes
 */
async function runTestsWithTiming(
  flags: Flags,
  testPaths: string[],
  retryOptions: RetryOptions,
  startTime = Date.now(),
): Promise<TimedTestSuiteResult> {
  const results = await runJest(flags, testPaths, retryOptions);
  return { startTime, aggregatedResult: results };
}

/**
 * Rerun a subset of failed tests from a given test run result
 */
async function rerunFailedTests(
  results: TimedTestSuiteResult,
  flags: Flags,
  retryOptions: RetryOptions,
): Promise<TimedTestSuiteResult> {
  // Start the rerun timer from now
  const startTime = Date.now();

  const { aggregatedResult } = results;
  const failingTestPaths = returnFailingTestPaths(aggregatedResult);
  if (!aggregatedResult.testResults || !failingTestPaths.length) {
    return results;
  }

  console.info(
    `Re-running ${
      failingTestPaths.length
    } failed test suite(s).\n${failingTestPaths.join('\n')}`,
  );

  // Rename the report to avoid replacing the first run's file.
  const restoreJunitOutput = renameJunitReport(
    'junit-rerun.xml',
    flags.testDir,
  );

  // Rerun failed tests
  const timedResult = await runTestsWithTiming(
    flags,
    failingTestPaths,
    retryOptions,
    startTime,
  );

  // Restore original filename for future runs
  restoreJunitOutput();

  return timedResult;
}

export async function runTestsWithRetry(
  flags: Flags,
  testPaths: string[],
  retryOptions: RetryOptions,
): Promise<TestSuiteResponse> {
  let aggregatedResults: TimedTestSuiteResult[] = [];
  let timedResult: TimedTestSuiteResult;
  let results: AggregatedResult;
  let exitCode = 0;

  const isCI = process.env.CI === 'true';

  if (flags.retry >= 1) {
    if (!isCI) {
      // We only support retrying in CI. Failures won't be rerun.
      flags.retry = 0;
    }
    if (flags.retry > 1) {
      console.warn(
        `Warning. flags.retry = ${flags.retry}, however we only support a single rerun.\n\tFailures will be rerun once.`,
      );
      flags.retry = 1;
    }
  }

  try {
    timedResult = await runTestsWithTiming(flags, testPaths, retryOptions);
    aggregatedResults.push(timedResult);
    ({ aggregatedResult: results } = timedResult);
    exitCode = getExitCode(results);

    if (hasAddedSnapshotsInCI(results)) {
      console.error(
        "New snapshots were written. `flags.retry` is ignored until they're checked in.",
      );
      // Force a failure and avoid retries
      exitCode = 1;
      flags.retry = 0;
    }

    // Rerun if necessary
    if (exitCode !== 0 && flags.retry > 0) {
      timedResult = await rerunFailedTests(timedResult, flags, retryOptions);
      aggregatedResults.push(timedResult);
      ({ aggregatedResult: results } = timedResult);
      exitCode = getExitCode(results);
    }
  } catch (err) {
    console.error(err);
    exitCode = 1;
  }

  return {
    exitCode: flags.gracefulExit ? 0 : exitCode,
    results: aggregatedResults,
  };
}
