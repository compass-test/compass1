import type { Test } from '../types';

import { getImageSnapshotFilePath } from './snapshots';

describe('getErrorExemption', () => {
  it(`should return undefined if test did fail due to a VR snapshot mismatch`, () => {
    const test: Test = {
      path: 'path/to/test.ts',
      testName: 'should do a thing',
      ancestorLabels: '',
      errors: ['You always pass failure on your way to success'],
    };
    expect(getImageSnapshotFilePath(test)).toBe(undefined);
  });

  it(`should return image snapshot filename if test did fail due to a VR snapshot mismatch`, () => {
    const bbCloneDir = process.env.BITBUCKET_CLONE_DIR;
    process.env.BITBUCKET_CLONE_DIR = '/foo';
    const snapshotFilename = 'test-ts-should-do-a-thing-1-diff.png';
    const test: Test = {
      path: 'path/to/test.ts',
      testName: 'should do a thing',
      ancestorLabels: '',
      errors: [
        `Error: Expected image to match or be a close match to snapshot but was 41.028842175432146% different from snapshot (1713522 differing pixels).
				See diff for details: /opt/atlassian/pipelines/agent/build/packages/foo/src/__tests__/visual-regression/__image_snapshots__/__diff_output__/${snapshotFilename}
					at _callee2$ (/opt/atlassian/pipelines/agent/build/build/test-utils/visual-regression/helper/screenshot.ts:38:22)
					at tryCatch (/opt/atlassian/pipelines/agent/build/node_modules/@babel/runtime/node_modules/regenerator-runtime/runtime.js:63:40)
					at Generator.invoke [as _invoke] (/opt/atlassian/pipelines/agent/build/node_modules/@babel/runtime/node_modules/regenerator-runtime/runtime.js:293:22)
					at Generator.next (/opt/atlassian/pipelines/agent/build/node_modules/@babel/runtime/node_modules/regenerator-runtime/runtime.js:118:21)
					at asyncGeneratorStep (/opt/atlassian/pipelines/agent/build/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:24)
					at _next (/opt/atlassian/pipelines/agent/build/node_modules/@babel/runtime/helpers/asyncToGenerator.js:25:9)
					at /opt/atlassian/pipelines/agent/build/node_modules/@babel/runtime/helpers/asyncToGenerator.js:32:7
					at new Promise (&lt;anonymous&gt;)
					at /opt/atlassian/pipelines/agent/build/node_modules/@babel/runtime/helpers/asyncToGenerator.js:21:12
					at compareScreenshot (/opt/atlassian/pipelines/agent/build/build/test-utils/visual-regression/helper/screenshot.ts:59:29)
					at _callee5$ (/opt/atlassian/pipelines/agent/build/packages/editor/renderer/src/__tests__/visual-regression/_utils.ts:147:10)
					at tryCatch (/opt/atlassian/pipelines/agent/build/node_modules/@babel/runtime/node_modules/regenerator-runtime/runtime.js:63:40)
					at Generator.invoke [as _invoke] (/opt/atlassian/pipelines/agent/build/node_modules/@babel/runtime/node_modules/regenerator-runtime/runtime.js:293:22)
					at Generator.next (/opt/atlassian/pipelines/agent/build/node_modules/@babel/runtime/node_modules/regenerator-runtime/runtime.js:118:21)
					at asyncGeneratorStep (/opt/atlassian/pipelines/agent/build/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:24)
					at _next (/opt/atlassian/pipelines/agent/build/node_modules/@babel/runtime/helpers/asyncToGenerator.js:25:9)
					at runMicrotasks (&lt;anonymous&gt;)
					at processTicksAndRejections (internal/process/task_queues.js:97:5)`,
      ],
    };
    expect(getImageSnapshotFilePath(test)).toBe(
      `/foo/imageSnapshotFailures/${snapshotFilename}`,
    );
    process.env.BITBUCKET_CLONE_DIR = bbCloneDir;
  });
});
