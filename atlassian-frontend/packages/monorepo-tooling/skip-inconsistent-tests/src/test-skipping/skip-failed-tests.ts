import {
  INTEGRATION_TRANSFORMER_PATH,
  MOBILE_INTEGRATION_TRANSFORMER_PATH,
  VR_TRANSFORMER_PATH,
} from '../constants';
import { createUnskipJiraTicket } from '../jira-ticket';
import {
  getJiraAttachmentPath,
  JiraAttachmentConfig,
} from '../jira-ticket/attachment/attachments';
import type { Test, TestType, Verbosity } from '../types';

import {
  getBrowserStackSession,
  getBrowserStackSessionResources,
} from './browserstack';
import { getSkipLineComment } from './comment';
import executeCodemod from './execute-codemod';

/**
 * Skips tests via a codemod.
 *
 * Returns undefined when successful, or an array of any tests which failed to be skipped.
 */
export async function skipFailedTests(
  type: TestType,
  pullRequestUrl: string,
  tests?: Test[],
) {
  if (!tests || tests.length === 0) {
    console.log(`No ${type} tests to skip.`);
    return;
  }

  console.log(`Begin skipping ${type} tests...`);

  // Toggle between none, low, high during debugging
  const logging: Verbosity = 'low';
  // If the codemod fails to skip a test we store it for later use
  let unmodifiedTests: Test[] | undefined;

  const browserStackSession = await getBrowserStackSession(type);

  for (let test of tests) {
    // Store the url for convenience. It's needed during ticket description creation.
    test.pullRequestUrl = pullRequestUrl;

    const attachmentCfg: JiraAttachmentConfig = { test, type };

    if (browserStackSession) {
      const {
        sessionUrl,
        sessionVideoUrl,
      } = await getBrowserStackSessionResources(test, browserStackSession);
      // Store BrowserStack session info for use within Jira ticket
      attachmentCfg.sessionUrl = sessionUrl;
      attachmentCfg.sessionVideoUrl = sessionVideoUrl;
      attachmentCfg.sessionId = browserStackSession.build.buildId;
    }

    // Get optional path to file to attach (when applicable)
    const jiraAttachmentPath = await getJiraAttachmentPath(attachmentCfg);
    // Create the ticket (where possible) and generate a comment for use with the codemods
    const jiraTicketUrl = await createUnskipJiraTicket(
      test,
      jiraAttachmentPath,
      attachmentCfg.sessionUrl,
    );
    const comment = getSkipLineComment(jiraTicketUrl.browseUrl);

    // Skip the test via the appropriate codemod
    switch (type) {
      case 'vr':
        test.skipped = await executeCodemod(
          test,
          comment,
          VR_TRANSFORMER_PATH,
          logging,
        );
        break;
      case 'integration':
        test.skipped = await executeCodemod(
          test,
          comment,
          INTEGRATION_TRANSFORMER_PATH,
          logging,
        );
        break;
      case 'mobile':
        test.skipped = await executeCodemod(
          test,
          comment,
          MOBILE_INTEGRATION_TRANSFORMER_PATH,
          logging,
        );
        break;
    }
    if (!test.skipped) {
      if (!unmodifiedTests) {
        unmodifiedTests = [];
      }
      unmodifiedTests.push(test);
    }
  }

  return unmodifiedTests;
}
