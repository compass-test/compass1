import {
  log,
  reportTestTimeExecution,
  reportPassingTest,
  reportInconsistentTest,
  reportBlockingTest,
  reportFailingTest,
} from './reporting';

import { constructTestResults } from './__fixtures__/mock-test-results';

import type {
  ActionSubject,
  AnalyticsModifier,
  TimedTestSuiteResult,
} from './types';

export { constructTestResults };

export async function processAnalyticsForTestResults(
  results: TimedTestSuiteResult[],
  actionSubject: ActionSubject,
  modifiers: AnalyticsModifier[] = [],
) {
  const { CI } = process.env;

  if (!results || !CI) {
    // We don't need to send analytics when we don't have a result e.g. when `--listTests` from jest is used.
    return;
  }

  for (let [index, result] of results.entries()) {
    const { startTime, aggregatedResult } = result;
    let logging: PromiseSettledResult<string>[] = [];

    logging = logging.concat(
      await Promise.allSettled([
        // Track failing tests
        reportFailingTest(
          aggregatedResult,
          startTime,
          actionSubject,
          index,
          modifiers,
        ),
        // Track test suite performance
        reportTestTimeExecution(
          aggregatedResult,
          actionSubject,
          index,
          modifiers,
        ),
        // Track passing tests
        reportPassingTest(aggregatedResult, actionSubject, index, modifiers),
      ]),
    );

    if (index > 0) {
      const numTestCases = aggregatedResult.numTotalTests;
      const firstRunNumTestCases = results[0].aggregatedResult.numTotalTests;
      const subsetRerun = numTestCases < firstRunNumTestCases;
      const isLastRun = index === results.length - 1;

      logging = logging.concat(
        await Promise.allSettled([
          subsetRerun
            ? // Track tests that failed, but passed on retry
              reportInconsistentTest(
                aggregatedResult,
                startTime,
                actionSubject,
                index,
                modifiers,
              )
            : Promise.resolve(''),
          isLastRun
            ? // Track tests that failed again on retry which resulted in blocking the pipeline
              reportBlockingTest(
                aggregatedResult,
                startTime,
                actionSubject,
                index,
                modifiers,
              )
            : Promise.resolve(''),
        ]),
      );
    }

    const filtered = logging
      .filter(log => log.status === 'fulfilled' && !!log.value)
      .map(log => log.status === 'fulfilled' && log.value);
    log(
      `Process analytics for test results${
        results.length > 1 ? ` (run ${index + 1} of ${results.length}):` : ':'
      }\n\t${filtered.join('\n\t')}`,
    );
  }
}
