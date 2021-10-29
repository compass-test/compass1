import { TestResults } from './types';

/**
 * Get the file (not test-case) failure percentage.
 *
 * Note: we ignore failed files that had exempt errors when calculating.
 */
export function getFailurePercentage(
  file: string,
  results: TestResults,
  useThresholdProtection = true,
) {
  const { numSkippableFiles, totalFiles } = results;
  if (numSkippableFiles) {
    const failingTestsPercentage = numSkippableFiles / totalFiles;
    const failurePercentage = humanReadablePercentage(failingTestsPercentage);
    // Environmental threshold protection.
    // We don't run this during subset packages mode as a reasonable percentage would be unique per package.
    // The assumption is, that if more than 10% of the tests have failed, then an environmental issue may have ocurred,
    // so we choose not to wipe out a significant portion of the test coverage.
    if (failingTestsPercentage > 0.1) {
      const message = `${failurePercentage} of test cases failed.`;
      if (useThresholdProtection) {
        console.warn(
          `${message}\n\tIgnoring ${file}.\n\tAborting under the assumption this may be an environmental issue.`,
        );
        // Pretend there aren't any failing tests
        return '0%';
      } else {
        console.warn(
          `${message}\n\tProcessing ${file}.\n\tEnvironmental threshold exceeded, however threshold protection is explicitly disabled so tests will still be skipped.`,
        );
      }
    }
    return failurePercentage;
  }
  // No failing tests
  return '0%';
}

export function humanReadablePercentage(percent: number) {
  return Number((percent * 100).toFixed(3)) + '%';
}
