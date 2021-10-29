import type { Test } from '../types';

const VR_IMAGE_DIFF_MISMATCH =
  'Expected image to match or be a close match to snapshot';
const VR_FILE_PREFIX = 'See diff for details: ';
const VR_FILE_EXTENSION = '.png';

/**
 * Checks whether a test is for a visual regression mismatch and returns the filename
 * of the image snapshot if applicable.
 *
 * Example VR image error:
 * ```
 * Error: Expected image to match or be a close match to snapshot but was 11.372575% different from snapshot (454903 differing pixels).
 * See diff for details: /opt/atlassian/pipelines/agent/build/packages/foo/src/__tests__/visual-regression/__image_snapshots__/__diff_output__/foo-ts-should-do-a-thing-1-diff.png
 *   at _callee2$ (/opt/atlassian/pipelines/agent/build/build/test-utils/visual-regression/helper/screenshot.ts:38:22)
 *   at tryCatch (/opt/atlassian/pipelines/agent/build/node_modules/@babel/runtime/node_modules/regenerator-runtime/runtime.js:63:40)
 *   ...
 * ```
 */
export function getImageSnapshotFilePath(test: Test): string | undefined {
  if (!test.errors.length) {
    return;
  }
  const errorReason = test.errors[0];
  if (errorReason.includes(VR_IMAGE_DIFF_MISMATCH)) {
    const startIndex =
      errorReason.indexOf(VR_FILE_PREFIX) + VR_FILE_PREFIX.length;
    const endIndex =
      errorReason.indexOf(VR_FILE_EXTENSION) + VR_FILE_EXTENSION.length;
    // Extract the path to the `__diff_output__` folder containing the snapshot.
    // This is typically within the packages themselves.
    const filePath = errorReason.substring(startIndex, endIndex);
    const fileName = filePath.split('/').pop()!;
    // `imageSnapshotFailures` is the folder name used for our Pipelines artifacts
    // Return the file path relative to the Pipelines artifacts folder
    const cloneDir = process.env.BITBUCKET_CLONE_DIR;
    return `${cloneDir ? `${cloneDir}/` : ''}imageSnapshotFailures/${fileName}`;
  }
}
