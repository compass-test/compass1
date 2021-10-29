import type { AggregatedResult, TestResult } from '@jest/test-result';

export function isSnapshotAddedFailure(
  testResult: Pick<TestResult, 'failureMessage'>,
): boolean {
  if (!testResult.failureMessage) {
    return false;
  }
  // When updating Jest, check that this message is still correct
  return testResult.failureMessage.indexOf('New snapshot was not written') > -1;
}

/**
 * We don't want tests to generate new snapshots in CI
 */
export function hasAddedSnapshotsInCI(
  results: Pick<AggregatedResult, 'testResults'>,
): boolean {
  if (!results || !results.testResults) {
    return false;
  }
  return results.testResults.some(isSnapshotAddedFailure) && !!process.env.CI;
}
