import { Test } from '../types';

import * as analytics from './analytics';

// Prevent scripts actually sending data
jest.mock('@atlassiansox/analytics-node-client');
jest.mock('axios');

describe('analytics', () => {
  let consoleSpy: jest.SpyInstance;
  let analyticsSpy: jest.SpyInstance;

  const {
    BITBUCKET_REPO_FULL_NAME,
    BITBUCKET_BUILD_NUMBER,
    BITBUCKET_BRANCH,
  } = process.env;

  afterAll(() => {
    process.env.BITBUCKET_REPO_FULL_NAME = BITBUCKET_REPO_FULL_NAME;
    process.env.BITBUCKET_BUILD_NUMBER = BITBUCKET_BUILD_NUMBER;
    process.env.BITBUCKET_BRANCH = BITBUCKET_BRANCH;
  });

  beforeEach(() => {
    consoleSpy = jest
      .spyOn(console, 'log')
      .mockImplementation((_msg: string) => {});
    analyticsSpy = jest.spyOn(analytics, 'getAnalyticsPayload');
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    analyticsSpy.mockRestore();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('analytics', () => {
    it('should send analytics event for codemod failed', async () => {
      process.env.BITBUCKET_REPO_FULL_NAME = '123';
      process.env.BITBUCKET_BUILD_NUMBER = '456';
      process.env.BITBUCKET_BRANCH = 'test-branch';

      const test: Test = {
        path: 'a/b/c',
        testName: 'testName',
        ancestorLabels: '',
        errors: ['I failed :('],
      };
      const expectedAnalyticsPayload: analytics.CodemodFailedEvent = {
        action: 'codemod_failed',
        actionSubject: 'skip_inconsistent_tests',
        attributes: {
          branchName: 'test-branch',
          testPath: test.path,
          testCase: test.testName,
          testAncestorLabels: test.ancestorLabels,
          errorReason: test.errors[0],
          pullRequestUrl: test.pullRequestUrl,
          pipelineUrl: `https://bitbucket.org/123/addon/pipelines/home#!/results/456`,
        },
        tags: ['atlaskit'],
        source: 'atlassian-frontend',
        origin: 'console',
        platform: 'bot',
      };

      const event = analytics.getAnalyticsPayload(test, 'codemod_failed');
      expect(analyticsSpy).toHaveBeenCalledWith(test, 'codemod_failed');
      expect(analyticsSpy).toHaveReturnedWith(expectedAnalyticsPayload);

      analytics.analyticsClient.sendEvent(event);
      expect(consoleSpy).toHaveBeenCalledWith(
        `Dispatch analytics (dry run): action = codemod_failed, test = ${test.path}`,
      );
    });

    it('should send analytics event for failed test exempted', async () => {
      process.env.BITBUCKET_REPO_FULL_NAME = '123';
      process.env.BITBUCKET_BUILD_NUMBER = '456';
      process.env.BITBUCKET_BRANCH = 'test-branch';

      const test: Test = {
        path: 'a/b/c',
        testName: 'testName',
        ancestorLabels: '',
        errors: ['I failed :('],
      };
      const expectedAnalyticsPayload: analytics.FailedTestExemptedEvent = {
        action: 'failed_test_exempted',
        actionSubject: 'skip_inconsistent_tests',
        attributes: {
          branchName: 'test-branch',
          testPath: test.path,
          testCase: test.testName,
          testAncestorLabels: test.ancestorLabels,
          errorReason: test.errors[0],
          pullRequestUrl: test.pullRequestUrl,
          pipelineUrl: `https://bitbucket.org/123/addon/pipelines/home#!/results/456`,
          exemption: '',
          testType: 'vr',
        },
        tags: ['atlaskit'],
        source: 'atlassian-frontend',
        origin: 'console',
        platform: 'bot',
      };

      const event = analytics.getAnalyticsPayload(test, 'failed_test_exempted');
      expect(analyticsSpy).toHaveBeenCalledWith(test, 'failed_test_exempted');
      expect(analyticsSpy).toHaveReturnedWith(expectedAnalyticsPayload);

      analytics.analyticsClient.sendEvent(event);
      expect(consoleSpy).toHaveBeenCalledWith(
        `Dispatch analytics (dry run): action = failed_test_exempted, test = ${test.path}`,
      );
    });

    it('should send analytics event for create ticket failed', async () => {
      process.env.BITBUCKET_REPO_FULL_NAME = '123';
      process.env.BITBUCKET_BUILD_NUMBER = '456';
      process.env.BITBUCKET_BRANCH = 'test-branch';

      const test: Test = {
        path: 'a/b/c',
        testName: 'testName',
        ancestorLabels: '',
        errors: ['I failed :('],
      };
      const expectedAnalyticsPayload: analytics.CreateTicketFailedEvent = {
        action: 'create_ticket_failed',
        actionSubject: 'skip_inconsistent_tests',
        attributes: {
          branchName: 'test-branch',
          testPath: test.path,
          testCase: test.testName,
          testAncestorLabels: test.ancestorLabels,
          errorReason: test.errors[0],
          pullRequestUrl: test.pullRequestUrl,
          pipelineUrl: `https://bitbucket.org/123/addon/pipelines/home#!/results/456`,
        },
        tags: ['atlaskit'],
        source: 'atlassian-frontend',
        origin: 'console',
        platform: 'bot',
      };

      const event = analytics.getAnalyticsPayload(test, 'create_ticket_failed');
      expect(analyticsSpy).toHaveBeenCalledWith(test, 'create_ticket_failed');
      expect(analyticsSpy).toHaveReturnedWith(expectedAnalyticsPayload);

      analytics.analyticsClient.sendEvent(event);
      expect(consoleSpy).toHaveBeenCalledWith(
        `Dispatch analytics (dry run): action = create_ticket_failed, test = ${test.path}`,
      );
    });
  });
});
