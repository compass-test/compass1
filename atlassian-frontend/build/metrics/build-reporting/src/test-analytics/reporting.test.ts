import {
  reportFailingTest,
  reportInconsistentTest,
  reportBlockingTest,
  reportPassingTest,
  reportTestTimeExecution,
} from './reporting';
import type {
  AggregatedResult,
  AssertionResult,
  TestResult,
} from '@jest/test-result';
import * as analytics from '@atlassiansox/analytics-node-client';
import type { AnalyticsClient } from '@atlassiansox/analytics-node-client/src/client';

jest.mock('@atlassiansox/analytics-node-client');

// Simplified Jest types to avoid verbosity within our mock payloads.
type SimplifiedAssertionResult = Omit<
  AssertionResult,
  'failureDetails' | 'failureMessages' | 'numPassingAsserts'
> &
  Partial<Pick<AssertionResult, 'failureDetails' | 'failureMessages'>>;
type SimplifiedTestResult = Pick<
  TestResult,
  'numFailingTests' | 'numPassingTests' | 'testFilePath' | 'failureMessage'
> &
  Partial<Pick<TestResult, 'perfStats'>> & {
    testResults: SimplifiedAssertionResult[];
  };
type SimplifiedAggregatedResult = Pick<
  AggregatedResult,
  | 'numFailedTestSuites'
  | 'numFailedTests'
  | 'numPassedTestSuites'
  | 'numPassedTests'
  | 'numTotalTestSuites'
  | 'numTotalTests'
  | 'success'
> & {
  testResults: SimplifiedTestResult[];
};

/**
 * These analytics methods are test type agnostic.
 *
 * For simplicity, these tests are only using integration test data,
 * but it could equally work for VR or unit tests.
 *
 * The only differences between test types are `testFilePath`,
 * `ancestorTitles`, and the `actionSubject`, which are all inconsequential
 * to the analytics logic.
 */
describe('reporting', () => {
  let mockedSendTrackEvent: jest.Mock<string>;
  let consoleSpy: jest.SpyInstance;

  let ANALYTICS_DEBUG: string | undefined;
  let BITBUCKET_BRANCH: string | undefined;
  let BITBUCKET_BUILD_NUMBER: string | undefined;
  let BITBUCKET_COMMIT: string | undefined;
  let BITBUCKET_PIPELINE_UUID: string | undefined;

  beforeAll(() => {
    ({
      ANALYTICS_DEBUG,
      BITBUCKET_BRANCH,
      BITBUCKET_BUILD_NUMBER,
      BITBUCKET_COMMIT,
      BITBUCKET_PIPELINE_UUID,
    } = process.env);
    // Opt into console logs for test analytics summaries
    process.env.ANALYTICS_DEBUG = 'true';
  });

  afterAll(() => {
    process.env.ANALYTICS_DEBUG = ANALYTICS_DEBUG;
  });

  beforeEach(() => {
    process.env.BITBUCKET_BRANCH = 'BRANCH/branch-name';
    process.env.BITBUCKET_BUILD_NUMBER = '123';
    process.env.BITBUCKET_COMMIT = '123a123';
    process.env.BITBUCKET_PIPELINE_UUID = '{123a123-a123-a}';

    // Mock the event sending for all test cases
    mockedSendTrackEvent = jest.fn().mockResolvedValue('sent!');
    jest.spyOn(analytics, 'analyticsClient').mockImplementation(
      () =>
        (({
          sendTrackEvent: mockedSendTrackEvent,
        } as unknown) as AnalyticsClient),
    );

    // Silence logs
    consoleSpy = jest
      .spyOn(console, 'log')
      .mockImplementation((_msg: string) => {});
  });

  afterEach(() => {
    process.env.BITBUCKET_BRANCH = BITBUCKET_BRANCH;
    process.env.BITBUCKET_BUILD_NUMBER = BITBUCKET_BUILD_NUMBER;
    process.env.BITBUCKET_COMMIT = BITBUCKET_COMMIT;
    process.env.BITBUCKET_PIPELINE_UUID = BITBUCKET_PIPELINE_UUID;
    consoleSpy.mockReset();
  });

  it('should report tests that fail on the first try as failing tests', async () => {
    const inputData: SimplifiedAggregatedResult = {
      numFailedTestSuites: 1,
      numFailedTests: 1,
      numPassedTestSuites: 0,
      numPassedTests: 2,
      numTotalTestSuites: 1,
      numTotalTests: 3,
      success: false,
      testResults: [
        {
          numFailingTests: 1,
          numPassingTests: 2,
          testFilePath:
            'packages/design-system/calendar/src/__tests__/integration/calendar.ts',
          testResults: [
            {
              ancestorTitles: ['calendar.ts', 'Windows 10 chrome 90.0'],
              fullName:
                'calendar.ts Windows 10 chrome 90.0 A user is able to select a date',
              status: 'passed',
              title: 'A user is able to select a date',
            },
            {
              ancestorTitles: ['calendar.ts', 'Windows 10 chrome 90.0'],
              failureMessages: ['failure message'],
              fullName:
                'calendar.ts Windows 10 chrome 90.0 Failing test for reporting.test',
              status: 'failed',
              title: 'Failing test for reporting.test',
            },
            {
              ancestorTitles: ['calendar.ts', 'Windows 10 chrome 90.0'],
              fullName:
                'calendar.ts Windows 10 chrome 90.0 A user is able to navigate between months',
              status: 'passed',
              title: 'A user is able to navigate between months',
            },
          ],
          failureMessage: 'failure message',
        },
      ],
    };

    const expectedData = {
      anonymousId: 'unknown',
      trackEvent: expect.objectContaining({
        action: 'failure',
        actionSubject: 'integration_test',
        attributes: expect.objectContaining({
          testFullName:
            'calendar.ts Windows 10 chrome 90.0 Failing test for reporting.test',
          testName: 'Failing test for reporting.test',
        }),
      }),
    };

    const log = await reportFailingTest(
      inputData as AggregatedResult,
      1000,
      'integration_test',
    );

    expect(mockedSendTrackEvent).toBeCalledWith(
      expect.objectContaining(expectedData),
    );
    expect(log).toBe('Sent 1 failure integration test event');
  });

  it('should report tests that fail then succeed as inconsistent', async () => {
    // Note: this test case is using a single test result which is assumed to be
    // the final result after rerunning a subset of failed tests from an intial run.
    const inputData: SimplifiedAggregatedResult = {
      numFailedTestSuites: 0,
      numFailedTests: 0,
      numPassedTestSuites: 1,
      numPassedTests: 2,
      numTotalTestSuites: 1,
      numTotalTests: 2,
      success: true,
      testResults: [
        {
          numFailingTests: 0,
          numPassingTests: 2,
          testFilePath:
            'packages/design-system/calendar/src/__tests__/integration/calendar.ts',
          testResults: [
            {
              ancestorTitles: ['calendar.ts', 'Windows 10 chrome 90.0'],
              fullName:
                'calendar.ts Windows 10 chrome 90.0 A user is able to select a date',
              status: 'passed',
              title: 'A user is able to select a date',
            },
            {
              ancestorTitles: ['calendar.ts', 'Windows 10 chrome 90.0'],
              fullName:
                'calendar.ts Windows 10 chrome 90.0 A user is able to navigate between months',
              status: 'passed',
              title: 'A user is able to navigate between months',
            },
          ],
          failureMessage: 'failure message',
        },
      ],
    };

    const expectedData1 = expect.objectContaining({
      trackEvent: expect.objectContaining({
        action: 'inconsistency',
        actionSubject: 'integration_test',
        attributes: expect.objectContaining({
          inconsistentTests: 1,
          testFullName:
            'calendar.ts Windows 10 chrome 90.0 A user is able to select a date',
          testName: 'A user is able to select a date',
        }),
      }),
    });
    const expectedData2 = expect.objectContaining({
      trackEvent: expect.objectContaining({
        action: 'inconsistency',
        actionSubject: 'integration_test',
        attributes: expect.objectContaining({
          inconsistentTests: 1,
          testFullName:
            'calendar.ts Windows 10 chrome 90.0 A user is able to navigate between months',
          testName: 'A user is able to navigate between months',
        }),
      }),
    });

    const log = await reportInconsistentTest(
      inputData as AggregatedResult,
      1000,
      'integration_test',
    );

    expect(mockedSendTrackEvent).toHaveBeenCalledTimes(2);
    expect(mockedSendTrackEvent).toBeCalledWith(expectedData1);
    expect(mockedSendTrackEvent).toBeCalledWith(expectedData2);
    expect(log).toBe('Sent 2 inconsistent integration test events');
  });

  describe('reporting blocking tests when a test fails twice in a row', () => {
    const inputData: SimplifiedAggregatedResult = {
      numFailedTestSuites: 1,
      numFailedTests: 1,
      numPassedTestSuites: 0,
      numPassedTests: 1,
      numTotalTestSuites: 1,
      numTotalTests: 2,
      success: false,
      testResults: [
        {
          numFailingTests: 1,
          numPassingTests: 1,
          testFilePath:
            'packages/design-system/calendar/src/__tests__/integration/calendar.ts',
          testResults: [
            {
              ancestorTitles: ['calendar.ts', 'Windows 10 chrome 90.0'],
              fullName:
                'calendar.ts Windows 10 chrome 90.0 A user is able to select a date',
              status: 'passed',
              title: 'A user is able to select a date',
            },
            {
              ancestorTitles: ['calendar.ts', 'Windows 10 chrome 90.0'],
              failureMessages: ['failure message'],
              fullName:
                'calendar.ts Windows 10 chrome 90.0 Failing test for reporting.test',
              status: 'failed',
              title: 'Failing test for reporting.test',
            },
          ],
        },
      ],
    };

    const expectedData = {
      anonymousId: 'unknown',
      trackEvent: expect.objectContaining({
        action: 'blocking',
        actionSubject: 'integration_test',
        attributes: expect.objectContaining({
          testFullName:
            'calendar.ts Windows 10 chrome 90.0 Failing test for reporting.test',
          testName: 'Failing test for reporting.test',
        }),
      }),
    };

    it('should fire event when reportBlockingTest called on master branch', async () => {
      process.env.BITBUCKET_BRANCH = 'master';

      const log = await reportBlockingTest(
        inputData as AggregatedResult,
        1000,
        'integration_test',
      );

      expect(mockedSendTrackEvent).toBeCalledWith(expectedData);
      expect(log).toBe('Sent 1 blocking integration test event');
    });

    it('should fire event when reportBlockingTest called on develop branch', async () => {
      process.env.BITBUCKET_BRANCH = 'develop';

      const log = await reportBlockingTest(
        inputData as AggregatedResult,
        1000,
        'integration_test',
      );

      expect(mockedSendTrackEvent).toBeCalledWith(expectedData);
      expect(log).toBe('Sent 1 blocking integration test event');
    });

    it('should not fire event when reportBlockingTest called on any other branch', async () => {
      process.env.BITBUCKET_BRANCH = 'other';

      const log = await reportBlockingTest(
        inputData as AggregatedResult,
        1000,
        'integration_test',
      );

      expect(mockedSendTrackEvent).not.toHaveBeenCalled();
      expect(log).toBe('');
    });
  });

  it('should report passing tests', async () => {
    const inputData: SimplifiedAggregatedResult = {
      numFailedTestSuites: 1,
      numFailedTests: 1,
      numPassedTestSuites: 0,
      numPassedTests: 2,
      numTotalTestSuites: 1,
      numTotalTests: 3,
      success: false,
      testResults: [
        {
          numFailingTests: 1,
          numPassingTests: 2,
          testFilePath:
            'packages/design-system/calendar/src/__tests__/integration/calendar.ts',
          testResults: [
            {
              ancestorTitles: ['calendar.ts', 'Windows 10 chrome 90.0'],
              fullName:
                'calendar.ts Windows 10 chrome 90.0 A user is able to select a date',
              status: 'passed',
              title: 'A user is able to select a date',
            },
            {
              ancestorTitles: ['calendar.ts', 'Windows 10 chrome 90.0'],
              failureMessages: ['failure message'],
              fullName:
                'calendar.ts Windows 10 chrome 90.0 Failing test for reporting.test',
              status: 'failed',
              title: 'Failing test for reporting.test',
            },
            {
              ancestorTitles: ['calendar.ts', 'Windows 10 chrome 90.0'],
              fullName:
                'calendar.ts Windows 10 chrome 90.0 A user is able to navigate between months',
              status: 'passed',
              title: 'A user is able to navigate between months',
            },
          ],
        },
      ],
    };

    const expectedData1 = expect.objectContaining({
      trackEvent: expect.objectContaining({
        action: 'success',
        actionSubject: 'integration_test',
        attributes: expect.objectContaining({
          successTests: 1,
          testFullName:
            'calendar.ts Windows 10 chrome 90.0 A user is able to select a date',
          testName: 'A user is able to select a date',
        }),
      }),
    });
    const expectedData2 = expect.objectContaining({
      trackEvent: expect.objectContaining({
        action: 'success',
        actionSubject: 'integration_test',
        attributes: expect.objectContaining({
          successTests: 1,
          testFullName:
            'calendar.ts Windows 10 chrome 90.0 A user is able to navigate between months',
          testName: 'A user is able to navigate between months',
        }),
      }),
    });

    const log = await reportPassingTest(
      inputData as AggregatedResult,
      'integration_test',
    );

    expect(mockedSendTrackEvent).toHaveBeenCalledTimes(2);
    expect(mockedSendTrackEvent).toBeCalledWith(expectedData1);
    expect(mockedSendTrackEvent).toBeCalledWith(expectedData2);
    expect(log).toBe('Sent 2 success integration test events');
  });

  it('should report testtime correctly', async () => {
    const inputData: SimplifiedAggregatedResult = {
      numFailedTestSuites: 1,
      numFailedTests: 1,
      numPassedTestSuites: 0,
      numPassedTests: 2,
      numTotalTestSuites: 1,
      numTotalTests: 3,
      success: false,
      testResults: [
        {
          numFailingTests: 1,
          numPassingTests: 2,
          perfStats: {
            end: 1619417055839,
            runtime: 2937,
            slow: false,
            start: 1619417052902,
          },
          testFilePath:
            'packages/design-system/calendar/src/__tests__/integration/calendar.ts',
          testResults: [
            {
              ancestorTitles: ['calendar.ts', 'Windows 10 chrome 90.0'],
              fullName:
                'calendar.ts Windows 10 chrome 90.0 A user is able to select a date',
              status: 'passed',
              title: 'A user is able to select a date',
            },
            {
              ancestorTitles: ['calendar.ts', 'Windows 10 chrome 90.0'],
              failureMessages: ['failure message'],
              fullName:
                'calendar.ts Windows 10 chrome 90.0 Failing test for reporting.test',
              status: 'failed',
              title: 'Failing test for reporting.test',
            },
            {
              ancestorTitles: ['calendar.ts', 'Windows 10 chrome 90.0'],
              fullName:
                'calendar.ts Windows 10 chrome 90.0 A user is able to navigate between months',
              status: 'passed',
              title: 'A user is able to navigate between months',
            },
          ],
        },
      ],
    };

    const expectedData1 = expect.objectContaining({
      trackEvent: expect.objectContaining({
        action: 'testtimes',
        actionSubject: 'integration_test',
        attributes: expect.objectContaining({
          testFullName:
            'calendar.ts Windows 10 chrome 90.0 A user is able to select a date',
          testName: 'A user is able to select a date',
          timeTaken: 0.82,
        }),
      }),
    });
    const expectedData2 = expect.objectContaining({
      trackEvent: expect.objectContaining({
        action: 'testtimes',
        actionSubject: 'integration_test',
        attributes: expect.objectContaining({
          testFullName:
            'calendar.ts Windows 10 chrome 90.0 Failing test for reporting.test',
          testName: 'Failing test for reporting.test',
          timeTaken: 0.82,
        }),
      }),
    });
    const expectedData3 = expect.objectContaining({
      trackEvent: expect.objectContaining({
        action: 'testtimes',
        actionSubject: 'integration_test',
        attributes: expect.objectContaining({
          testFullName:
            'calendar.ts Windows 10 chrome 90.0 A user is able to navigate between months',
          testName: 'A user is able to navigate between months',
          timeTaken: 0.82,
        }),
      }),
    });

    const log = await reportTestTimeExecution(
      inputData as AggregatedResult,
      'integration_test',
    );

    expect(mockedSendTrackEvent).toHaveBeenCalledTimes(3);
    expect(mockedSendTrackEvent).toBeCalledWith(expectedData1);
    expect(mockedSendTrackEvent).toBeCalledWith(expectedData2);
    expect(mockedSendTrackEvent).toBeCalledWith(expectedData3);
    expect(log).toBe('Sent 3 execution time integration test events');
  });
});
