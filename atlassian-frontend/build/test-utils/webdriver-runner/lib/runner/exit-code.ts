import { AggregatedResult } from '@jest/test-result';

export function getExitCode(
  result?: Pick<AggregatedResult, 'numFailedTestSuites' | 'numFailedTests'>,
) {
  // we don't check result.success as this is false when there are obsolete
  // snapshots, which can legitimately happen with Webdriver tests on CI
  // as they are only run on Chrome in the Landkid build
  if (
    !result ||
    (result.numFailedTestSuites === 0 && result.numFailedTests === 0)
  ) {
    return 0;
  }
  return 1;
}
