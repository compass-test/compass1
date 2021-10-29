import type { Test } from '../../types';

import { getJiraAttachmentPath } from './attachments';
import * as sessionVideo from './session-video';

describe('getJiraAttachmentPath', () => {
  let BITBUCKET_CLONE_DIR: string | undefined;
  beforeAll(() => {
    // Store original value
    ({ BITBUCKET_CLONE_DIR } = process.env);
  });
  beforeEach(() => {
    // Mock a value to resemble CI
    process.env.BITBUCKET_CLONE_DIR = '/opt/atlassian/pipelines/agent/build';
  });
  afterAll(() => {
    // Restore original value
    process.env.BITBUCKET_CLONE_DIR = BITBUCKET_CLONE_DIR;
  });

  it('should resolve image diff path for VR test when available', async () => {
    const jiraAttachmentPath = await getJiraAttachmentPath({
      test: {
        testName: 'should do a thing',
        ancestorLabels: '',
        path: 'packages/foo/src/__tests__/visual-regression/foo.ts',
        errors: [
          `Error: Expected image to match or be a close match to snapshot but was 41.028842175432146% different from snapshot (1713522 differing pixels).
          See diff for details: /opt/atlassian/pipelines/agent/build/packages/foo/src/__tests__/visual-regression/__image_snapshots__/__diff_output__/foo-1-diff.png
            at _callee2$ (/opt/atlassian/pipelines/agent/build/build/visual-regression/helper/screenshot.ts:38:22)`,
        ],
      },
      type: 'vr',
    });
    expect(jiraAttachmentPath).toBe(
      '/opt/atlassian/pipelines/agent/build/imageSnapshotFailures/foo-1-diff.png',
    );
  });

  it(`should return undefined if image diff path couldn't be determined for VR test`, async () => {
    const jiraAttachmentPath = await getJiraAttachmentPath({
      test: {
        testName: 'should do a thing',
        ancestorLabels: '',
        path: 'packages/foo/src/__tests__/visual-regression/foo.ts',
        errors: ['Error: Unknown'],
      },
      type: 'vr',
    });
    expect(jiraAttachmentPath).toBeUndefined();
  });

  it('should resolve session video path for integration test when available', async () => {
    const mockSessionId = 'abc123';
    const expectedVideoFilename = `recording-${mockSessionId}.mp4`;
    // Prevent file download by mocking response
    jest
      .spyOn(sessionVideo, 'getSessionVideoFilePath')
      .mockResolvedValue(expectedVideoFilename);

    const test: Test = {
      testName: 'should do a thing',
      ancestorLabels: '',
      path: 'packages/editor/editor-core/src/__tests__/integration/foo.ts',
      errors: ['I fail, therefore I am'],
    };
    const jiraAttachmentPath = await getJiraAttachmentPath({
      test,
      type: 'integration',
      sessionId: mockSessionId,
      sessionVideoUrl: 'https://automate.browserstack.com/video?token',
    });
    expect(jiraAttachmentPath).toBe(expectedVideoFilename);
  });

  it(`should return undefined if session video couldn't be determined for integration test`, async () => {
    const test: Test = {
      testName: 'should do a thing',
      ancestorLabels: '',
      path: 'packages/editor/editor-core/src/__tests__/integration/foo.ts',
      errors: ['I fail, therefore I am'],
    };
    const jiraAttachmentPath = await getJiraAttachmentPath({
      test,
      type: 'integration',
      sessionUrl:
        'https://automate.browserstack.com/dashboard/v2/builds/abc123/sessions/xyz456',
      sessionVideoUrl: undefined,
    });
    expect(jiraAttachmentPath).toBeUndefined();
  });
});
