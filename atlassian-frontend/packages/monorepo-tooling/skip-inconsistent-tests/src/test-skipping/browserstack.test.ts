import { Test } from '../types';

import { BrowserStackTestSession, findSessionForTest } from './browserstack';

const mockTest: Test = {
  path: 'foo.ts',
  testName: 'should do a thing',
  ancestorLabels: '',
  errors: ['failed'],
};

const mockSessions: BrowserStackTestSession[] = JSON.parse(
  `[
		{"automation_session":
			{
				"name":"${mockTest.path}",
				"browser_version":"93.0",
				"browser":"chrome",
				"status":"passed",
				"hashed_id":"SID-A",
				"reason":"Everything passed.",
				"build_hashed_id":"BID",
				"browser_url":"https://automate.browserstack.com/builds/BID/sessions/SID-A",
				"video_url":"https://automate.browserstack.com/sessions/SID-A/video?token=abc123"
			}
		},
		{"automation_session":
			{
				"name":"${mockTest.path}",
				"browser_version":"92.0",
				"browser":"firefox",
				"status":"failed",
				"hashed_id":"SID-B",
				"reason":"1 failed: \`${mockTest.testName}\`",
				"build_hashed_id":"BID",
				"browser_url":"https://automate.browserstack.com/builds/BID/sessions/SID-B",
				"video_url":"https://automate.browserstack.com/sessions/SID-B/video?token=abc123"
			}
		}
	]`,
);

describe('findSessionForTest', () => {
  it('should find BrowserStack session for failed test case', async () => {
    const session = findSessionForTest(mockTest, mockSessions);
    expect(session).toEqual({
      sessionUrl: 'https://automate.browserstack.com/builds/BID/sessions/SID-B',
      videoUrl:
        'https://automate.browserstack.com/sessions/SID-B/video?token=abc123',
    });
  });

  it('should return undefined when no match is found', async () => {
    const test: Test = { ...mockTest, testName: 'will not match' };
    const session = findSessionForTest(test, mockSessions);
    expect(session).toBeUndefined();
  });
});
