import fs from 'fs';
import glob from 'glob';
import rimraf from 'rimraf';

import type { TestResult, AggregatedResult } from '@jest/test-result';

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
 * Copy screenshots generated from first run into a different directory so we still
 * have access to these as artifacts when CI build is finished
 * Also prefix them with "first-run__" so user can differentiate them from the fails
 * when they download
 */
export function moveScreenshotsFromLastRun(runIndex = 1) {
  glob.sync('**/+(__diff_output__|__errors__)').forEach(dirPath => {
    const newDirPath = `${dirPath}{run-${runIndex}}`;
    rimraf.sync(newDirPath);
    fs.renameSync(dirPath, newDirPath);
    glob.sync(`${newDirPath}/!(run-*__)*.png`).forEach(file => {
      const dir = file.substring(0, file.lastIndexOf('/'));
      const fileName = file.substring(file.lastIndexOf('/') + 1);
      fs.renameSync(file, `${dir}/run-${runIndex}__${fileName}`);
    });
  });
}

/**
 * We don't want tests to generate new image snapshots in CI
 */
export function hasAddedSnapshotsInCI(
  results: Pick<AggregatedResult, 'testResults'>,
): boolean {
  if (!results || !results.testResults) {
    return false;
  }
  return results.testResults.some(isSnapshotAddedFailure) && !!process.env.CI;
}
