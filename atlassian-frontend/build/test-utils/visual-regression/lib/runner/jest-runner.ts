import chalk from 'chalk';
import path from 'path';

import { runJest } from '../cli/jest-cli';
import { getExitCode } from './exit-code';
import {
  isSnapshotAddedFailure,
  hasAddedSnapshotsInCI,
  moveScreenshotsFromLastRun,
} from './snapshots';

import type { TimedTestSuiteResult } from '@atlaskit/build-reporting';
import type { Flags } from './flags';
import { AggregatedResult } from '@jest/test-result';

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

export function returnTestPaths(results: AggregatedResult) {
  if (!results || results.testResults.length === 0) {
    return [];
  }
  return results.testResults.map(testResult => testResult.testFilePath);
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
 * Run visual regression tests via Jest.
 *
 * Note: updating image snapshots cannot be performed when using
 * debug mode. Snaphots are system specific and must be generated
 * within the Docker image to remain consistent between runs locally
 * as well as in CI.
 *
 * We support two rerun modes which are mutually exclusive.
 *
 * 1) `flags.retry` is the number of reruns for a subset of failed tests.
 *    If all tests pass on the first run then no rerun occurs.
 * 2) `flags.repeat` is the number of reruns of the entire test suite, regardless of each result.
 *    If all tests pass on the first run, it still runs them all again, 1+N times.
 *
 * The former is useful for mitigating against inconsistent test results in CI.
 * The latter is useful for validating a test's stability before introducing
 * it into the codebase (as test grinder, or gauntlet to be run). Both locally, and in CI.
 */
export async function runTests(
  flags: Flags,
  testPaths: string[],
  retryOptions: RetryOptions,
): Promise<TestSuiteResponse> {
  if (flags.debug && flags.updateSnapshot) {
    console.log(
      chalk.yellow('`--updateSnapshots` ignored due to `--debug`'),
      `\n`,
      chalk.dim('snapshots in debug mode are system-specific and inconsistent'),
    );
  }

  // The two rerun modes are mutually exclusive, so we disable retries
  // when using repetitions, since we check or that flag first
  const repetitions = flags.repeat;
  const retries = repetitions > 1 ? 0 : flags.retry;

  // Retries will only rerun failed tests
  if (retries > 0) {
    return runTestsWithRetry(flags, testPaths, retryOptions);
  }
  // Repetitions will rerun all tests, regardless of results.
  else if (repetitions > 0) {
    return runTestsWithRepeat(flags, testPaths, retryOptions);
  }
  // Single run
  const results = await runTestsWithTiming(flags, testPaths, retryOptions);
  const exitCode = getExitCode(results.aggregatedResult);
  return {
    exitCode: flags.gracefulExit ? 0 : exitCode,
    results: [results],
  };
}

/**
 * Rerun a subset of tests from a given test run result
 */
async function rerunTests(
  results: TimedTestSuiteResult,
  flags: Flags,
  retryOptions: RetryOptions,
  junitFilename: string,
  testPathsFilter: (results: AggregatedResult) => string[],
  iteration?: number,
): Promise<TimedTestSuiteResult> {
  // Start the rerun timer from now
  const startTime = Date.now();

  const { aggregatedResult } = results;
  const testPaths = testPathsFilter(aggregatedResult);

  if (!aggregatedResult.testResults || !testPaths.length) {
    return results;
  }
  moveScreenshotsFromLastRun(iteration);

  // Rename report file to avoid replacing previous runs
  const restoreJunitOutput = renameJunitReport(junitFilename, flags.testDir);

  if (flags.retry > 0) {
    console.info(
      `Re-running ${testPaths.length} failed test suite${
        testPaths.length > 1 ? 's' : ''
      }:\n${testPaths.join('\n')}`,
    );
  }
  if (flags.repeat > 0 && iteration) {
    console.info(
      `Repeating test${testPaths.length > 1 ? 's' : ''}. Run ${
        iteration + 1
      } of ${flags.repeat + 1}.`,
    );
  }

  const timedResult = await runTestsWithTiming(
    flags,
    testPaths,
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
      timedResult = await rerunTests(
        timedResult,
        flags,
        retryOptions,
        'junit-rerun.xml',
        returnFailingTestPaths,
      );
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

export async function runTestsWithRepeat(
  flags: Flags,
  testPaths: string[],
  retryOptions: RetryOptions,
): Promise<TestSuiteResponse> {
  let aggregatedResults: TimedTestSuiteResult[] = [];
  let timedResult: TimedTestSuiteResult;
  let results: AggregatedResult;
  let exitCode: number | undefined;

  try {
    timedResult = await runTestsWithTiming(flags, testPaths, retryOptions);
    aggregatedResults.push(timedResult);
    ({ aggregatedResult: results } = timedResult);

    if (hasAddedSnapshotsInCI(results)) {
      console.error(
        "New snapshots were written. `flags.repeat` is ignored until they're checked in.",
      );
      // Force a failure and avoid repeating
      exitCode = 1;
      flags.repeat = 0;
    }

    const reps: number[] = new Array(flags.repeat).fill(0);
    for (let [rep] of reps.entries()) {
      const iteration = rep + 1;
      timedResult = await rerunTests(
        timedResult,
        flags,
        retryOptions,
        `junit-repeat${iteration}.xml`,
        returnTestPaths,
        iteration,
      );
      aggregatedResults.push(timedResult);
      ({ aggregatedResult: results } = timedResult);
    }
  } catch (err) {
    console.error(err);
    exitCode = flags.gracefulExit ? 0 : 1;
  }

  if (exitCode === undefined) {
    if (flags.gracefulExit) {
      exitCode = 0;
    } else {
      // Determine final exit code by whether any runs failed
      const hasFailures = aggregatedResults
        .map(timedResult => timedResult.aggregatedResult)
        .some(result => getExitCode(result) === 1);
      exitCode = hasFailures ? 1 : 0;
    }
  }

  return {
    exitCode,
    results: aggregatedResults,
  };
}
