import { getImageSnapshotFilePath } from '../../test-results/snapshots';
import type { Test, TestType } from '../../types';

import { getSessionVideoFilePath } from './session-video';

export type JiraAttachmentConfig = {
  test: Test;
  type: TestType;
  sessionUrl?: string;
  sessionVideoUrl?: string;
  sessionId?: string;
};

// Optional attachments to the Jira ticket for debugging & analysis.
export async function getJiraAttachmentPath(config: JiraAttachmentConfig) {
  const { type, test } = config;
  if (type === 'vr') {
    // Image diff png
    return getImageSnapshotFilePath(test);
  }
  if (type === 'integration') {
    const { sessionVideoUrl, sessionId } = config;
    if (sessionVideoUrl && sessionId) {
      // Session recording mp4
      return getSessionVideoFilePath(sessionVideoUrl, sessionId);
    }
  }
}
