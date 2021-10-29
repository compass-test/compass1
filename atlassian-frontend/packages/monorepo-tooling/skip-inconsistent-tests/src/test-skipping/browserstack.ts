import axios from 'axios';

import type { BrowserStackSessionDetails } from '@atlaskit/webdriver-runner/lib/reporting/browserstack-reporter';

import {
  INTEGRATION_BROWSERSTACK_SESSION_FILE,
  MOBILE_BROWSERSTACK_SESSION_FILE,
} from '../constants';
import { loadReport } from '../io/reports';
import type { Test, TestType } from '../types';

export type BrowserStackTestSession = {
  automation_session: {
    browser: string;
    browser_version: string;
    browser_url: string;
    video_url: string;
    reason: string;
  };
};

export type BrowserStackSessionUrls = {
  sessionUrl: string;
  videoUrl: string;
};

export async function getTestSessions(buildId: string) {
  const { BROWSERSTACK_USERNAME, BROWSERSTACK_KEY } = process.env;
  const auth = Buffer.from(
    `${BROWSERSTACK_USERNAME}:${BROWSERSTACK_KEY}`,
  ).toString('base64');
  const url = `https://api.browserstack.com/automate/builds/${buildId}/sessions.json?status=failed`;
  const response = await axios.get<BrowserStackTestSession[]>(url, {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
  return response.data;
}

export function findSessionForTest(
  test: Test,
  sessions: BrowserStackTestSession[],
): BrowserStackSessionUrls | undefined {
  const match = sessions.find(session =>
    session.automation_session.reason.includes(test.testName),
  );
  if (match) {
    const {
      browser_url: sessionUrl,
      video_url: videoUrl,
    } = match.automation_session;
    return {
      sessionUrl,
      videoUrl,
    };
  }
}

type BrowserStackSessionInfo = {
  build: BrowserStackSessionDetails;
  tests: BrowserStackTestSession[];
};

export async function getBrowserStackSession(
  type: TestType,
): Promise<BrowserStackSessionInfo | undefined> {
  if (type === 'integration' || type === 'mobile') {
    const sessionFile =
      type === 'integration'
        ? INTEGRATION_BROWSERSTACK_SESSION_FILE
        : MOBILE_BROWSERSTACK_SESSION_FILE;
    try {
      const build = await loadReport<BrowserStackSessionDetails>(sessionFile);
      // Log the build session, but not the tests sessions to avoid overly verbose information.
      console.info(`BrowserStack ${type} session:`, build);
      if (build && build.buildId) {
        const tests = await getTestSessions(build.buildId);
        return {
          build,
          tests,
        };
      }
    } catch (error) {
      console.warn(`Failed to load BrowserStack session details`, error);
    }
  }
}

type BrowserStackSessionResources = {
  sessionUrl?: string;
  sessionVideoUrl?: string;
};

export async function getBrowserStackSessionResources(
  test: Test,
  session: BrowserStackSessionInfo,
): Promise<BrowserStackSessionResources> {
  let sessionUrl: string | undefined;
  let sessionVideoUrl: string | undefined;
  if (session) {
    sessionUrl = session.build.dashboardUrl.failed;
    const testSession = findSessionForTest(test, session.tests);
    if (testSession) {
      sessionUrl = testSession.sessionUrl;
      sessionVideoUrl = testSession.videoUrl;
    }
  }
  return {
    sessionUrl,
    sessionVideoUrl,
  };
}
