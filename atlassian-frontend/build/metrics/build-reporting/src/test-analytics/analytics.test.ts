import type { AggregatedResult } from '@jest/test-result';
import type { ActionSubject, TimedTestSuiteResult } from './types';
import { constructTestResults } from './__fixtures__/mock-test-results';
import { processAnalyticsForTestResults } from './analytics';

// For simplicity this test solely uses integration but it works for other test types too.
const actionSubject: ActionSubject = 'integration_test';

const mockSendEvent = jest.fn(async function mockSendEvent(
  _data: any,
): Promise<any> {
  return 'Sent!';
});

class MockAnalyticsClient {
  sendOperationalEvent = mockSendEvent;
  sendTrackEvent = mockSendEvent;
  sendTraitEvent = mockSendEvent;
  sendUIEvent = mockSendEvent;
  sendScreenEvent = mockSendEvent;
}

jest.mock('@atlassiansox/analytics-node-client', () => {
  const mockedClient = jest
    .fn()
    .mockImplementation(_args => new MockAnalyticsClient());
  return {
    __esModule: true,
    AnalyticsClient: mockedClient,
    analyticsClient: mockedClient,
  };
});

function createExpectedAnalyticsPayload(
  action: string,
  iteration?: number,
  testFilePath?: string,
  overrides: any = {},
) {
  let attributes: any = {
    testFilePath:
      typeof testFilePath === 'string' ? testFilePath : expect.any(String),
    testName: overrides.testName || expect.any(String),
    iteration: typeof iteration === 'number' ? iteration : expect.any(Number),
  };
  switch (action) {
    case 'failure':
      attributes.failingTests = overrides.failingTests || expect.any(Number);
      attributes.failureMessage =
        overrides.failureMessage || expect.any(String);
      break;
    case 'success':
      attributes.successTests = overrides.successTests || expect.any(Number);
      break;
    case 'testtimes':
      attributes.timeTaken = overrides.timeTaken || expect.any(Number);
      break;
    case 'blocking':
      attributes.failingTests = overrides.failingTests || expect.any(Number);
      break;
    case 'inconsistent':
      attributes.inconsistentTests =
        overrides.inconsistentTests || expect.any(Number);
      break;
  }
  return expect.objectContaining({
    trackEvent: expect.objectContaining({
      action,
      actionSubject,
      attributes: expect.objectContaining(attributes),
    }),
  });
}

describe('processAnalyticsForTestResults', () => {
  let consoleSpy: jest.SpyInstance;
  let BITBUCKET_BRANCH: string | undefined;
  let CI: string | undefined;
  beforeAll(() => {
    // Store original value ahead of manipulating the env var.
    ({ CI, BITBUCKET_BRANCH } = process.env);
    // Silence analytics logs such as 'Sent 1 inconsistent integration test event'
    consoleSpy = jest
      .spyOn(console, 'log')
      .mockImplementation((...logs: string[]) => {});
  });
  beforeEach(() => {
    // We set the environment variable `CI` to `true` as we send analytics only in our CI pipeline.
    process.env.CI = 'true';
  });
  afterEach(() => {
    mockSendEvent.mockClear();
    // Restore original value
    process.env.BITBUCKET_BRANCH = BITBUCKET_BRANCH;
    if (CI) {
      process.env.CI = CI;
    } else {
      delete process.env.CI;
    }
    // Reset console log counts
    consoleSpy.mockReset();
  });
  afterAll(() => {
    consoleSpy.mockRestore();
    jest.restoreAllMocks();
  });

  const event = {
    FAILURE: createExpectedAnalyticsPayload.bind(undefined, 'failure'),
    SUCCESS: createExpectedAnalyticsPayload.bind(undefined, 'success'),
    TEST_TIMES: createExpectedAnalyticsPayload.bind(undefined, 'testtimes'),
    BLOCKING: createExpectedAnalyticsPayload.bind(undefined, 'blocking'),
    INCONSISTENCY: createExpectedAnalyticsPayload.bind(
      undefined,
      'inconsistency',
    ),
  };

  describe('single run', () => {
    // 3 files each containing 2 test cases:
    // 6 total test cases. 3 failures, 3 passes.
    const mockedResults: TimedTestSuiteResult[] = [
      {
        aggregatedResult: constructTestResults({
          totalTestSuites: 3, // A, B, C
          totalTestCasesPerSuite: 2,
          failOnNth: [
            {
              index: 0, // 'path/to/file-a.ts'
              failures: 2, // 'should do A-1', 'should do A-2'
            },
            {
              index: 2, // 'path/to/file-c.ts'
              failures: 1, // 'should do C-1'
            },
          ],
        }) as AggregatedResult,
        startTime: 0,
      },
    ];

    it('should not track analytics if not in CI', async () => {
      process.env.CI = '';
      await processAnalyticsForTestResults(mockedResults, actionSubject);
      expect(mockSendEvent).toBeCalledTimes(0);
    });

    it('should invoke analytics modifiers when provided', async () => {
      const mockModifierA = jest.fn().mockResolvedValue(true);
      const mockModifierB = jest.fn().mockResolvedValue(true);
      await processAnalyticsForTestResults(mockedResults, actionSubject, [
        mockModifierA,
        mockModifierB,
      ]);
      expect(mockModifierA).toHaveBeenCalled();
      expect(mockModifierB).toHaveBeenCalled();
    });

    it(`should track success & failure when perfStats isn't enabled`, async () => {
      // Note: `mockedResults` hasn't included perfStates
      await processAnalyticsForTestResults(mockedResults, actionSubject);

      expect(mockSendEvent).toBeCalledTimes(6);
      // Fail on Nth at index 0 (a) and 2 (c)
      expect(mockSendEvent).toHaveBeenCalledWith(
        event.FAILURE(0, 'path/to/file-a.ts', {
          failingTests: 1,
          testName: 'should do A-1',
        }),
      );
      expect(mockSendEvent).toHaveBeenCalledWith(
        event.FAILURE(0, 'path/to/file-a.ts', {
          failingTests: 1,
          testName: 'should do A-2',
        }),
      );
      expect(mockSendEvent).toHaveBeenCalledWith(
        event.SUCCESS(0, 'path/to/file-b.ts', {
          failingTests: 0,
          testName: 'should do B-1',
        }),
      );
      expect(mockSendEvent).toHaveBeenCalledWith(
        event.SUCCESS(0, 'path/to/file-b.ts', {
          failingTests: 0,
          testName: 'should do B-2',
        }),
      );
      expect(mockSendEvent).toHaveBeenCalledWith(
        event.FAILURE(0, 'path/to/file-c.ts', {
          failingTests: 1,
          testName: 'should do C-1',
        }),
      );
      expect(mockSendEvent).toHaveBeenCalledWith(
        event.SUCCESS(0, 'path/to/file-c.ts', {
          failingTests: 0,
          testName: 'should do C-2',
        }),
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        `Process analytics for test results:
\tSent 3 failure integration test events
\tSent 3 success integration test events`,
      );
    });

    it('should track success, failure, and testtimes when perfStats is enabled', async () => {
      await processAnalyticsForTestResults(
        // 2 files each containing 2 test cases:
        // 4 total test cases. 1 failure, 3 passes.
        [
          {
            aggregatedResult: constructTestResults({
              // Note: We explicitly include performance statistics in this mocked data
              includePerfStats: true,
              totalTestSuites: 2, // A, B
              totalTestCasesPerSuite: 2,
              failOnNth: [
                {
                  index: 1, // 'path/to/file-b.ts'
                  failures: 1, // 'should do B-1'
                },
              ],
            }) as AggregatedResult,
            startTime: 0,
          },
        ],
        actionSubject,
      );

      expect(mockSendEvent).toBeCalledTimes(8);
      expect(mockSendEvent).toHaveBeenCalledWith(
        event.SUCCESS(0, 'path/to/file-a.ts', {
          failingTests: 0,
          testName: 'should do A-1',
        }),
      );
      expect(mockSendEvent).toHaveBeenCalledWith(
        event.SUCCESS(0, 'path/to/file-a.ts', {
          failingTests: 0,
          testName: 'should do A-2',
        }),
      );
      expect(mockSendEvent).toHaveBeenCalledWith(
        event.FAILURE(0, 'path/to/file-b.ts', {
          failingTests: 1,
          testName: 'should do B-1',
        }),
      );
      expect(mockSendEvent).toHaveBeenCalledWith(
        event.SUCCESS(0, 'path/to/file-b.ts', {
          failingTests: 0,
          testName: 'should do B-2',
        }),
      );
      // Test performance for all test cases
      expect(mockSendEvent).toHaveBeenCalledWith(
        event.TEST_TIMES(0, 'path/to/file-a.ts', {
          testName: 'should do A-1',
        }),
      );
      expect(mockSendEvent).toHaveBeenCalledWith(
        event.TEST_TIMES(0, 'path/to/file-a.ts', {
          testName: 'should do A-2',
        }),
      );
      expect(mockSendEvent).toHaveBeenCalledWith(
        event.TEST_TIMES(0, 'path/to/file-b.ts', {
          testName: 'should do B-1',
        }),
      );
      expect(mockSendEvent).toHaveBeenCalledWith(
        event.TEST_TIMES(0, 'path/to/file-b.ts', {
          testName: 'should do B-2',
        }),
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        `Process analytics for test results:
\tSent 1 failure integration test event
\tSent 4 execution time integration test events
\tSent 3 success integration test events`,
      );
    });
  });

  describe('repeat run', () => {
    describe('fail => pass', () => {
      it('should send inconsistent test events when retrying tests which failed then passed on rerun', async () => {
        // 2 files each containing 1 test case:
        // 2 total test cases. 1 failure, 1 pass.
        const mockedResults: TimedTestSuiteResult[] = [
          {
            aggregatedResult: constructTestResults({
              totalTestSuites: 2, // A, B
              totalTestCasesPerSuite: 1,
              failOnNth: [
                {
                  index: 0, // 'path/to/file-a.ts'
                  failures: 1, // 'should do A-1'
                },
              ],
            }) as AggregatedResult,
            startTime: 0,
          },
          // 1 file containing 1 test case (subset from previous run's failures):
          // 1 pass on rerun.
          {
            aggregatedResult: constructTestResults({
              totalTestSuites: 1, // A
              totalTestCasesPerSuite: 1,
            }) as AggregatedResult,
            startTime: 0,
          },
        ];

        await processAnalyticsForTestResults(mockedResults, actionSubject);
        expect(mockSendEvent).toBeCalledTimes(4);
        // Initial run
        expect(mockSendEvent).toHaveBeenCalledWith(
          event.FAILURE(0, 'path/to/file-a.ts', {
            failingTests: 1,
            testName: 'should do A-1',
          }),
        );
        expect(mockSendEvent).toHaveBeenCalledWith(
          event.SUCCESS(0, 'path/to/file-b.ts', {
            failingTests: 0,
            testName: 'should do B-1',
          }),
        );
        expect(consoleSpy).toHaveBeenCalledWith(
          `Process analytics for test results (run 1 of 2):
\tSent 1 failure integration test event
\tSent 1 success integration test event`,
        );
        // Retry run
        expect(mockSendEvent).toHaveBeenCalledWith(
          event.SUCCESS(1, 'path/to/file-a.ts', {
            failingTests: 0,
            testName: 'should do A-1',
          }),
        );
        expect(mockSendEvent).toHaveBeenCalledWith(
          event.INCONSISTENCY(1, 'path/to/file-a.ts', {
            failingTests: 0,
            testName: 'should do A-1',
          }),
        );
        expect(consoleSpy).toHaveBeenCalledWith(
          `Process analytics for test results (run 2 of 2):
\tSent 1 success integration test event
\tSent 1 inconsistent integration test event`,
        );
      });

      it('should not send inconsistent test events if repeating a run instead of rerunning a subset of failures', async () => {
        // 2 files each containing 1 test case:
        // 2 total test cases. 1 failure, 1 pass.
        const mockedResults: TimedTestSuiteResult[] = [
          {
            aggregatedResult: constructTestResults({
              totalTestSuites: 2, // A, B
              totalTestCasesPerSuite: 1,
              failOnNth: [
                {
                  index: 0, // 'path/to/file-a.ts'
                  failures: 1, // 'should do A-1'
                },
              ],
            }) as AggregatedResult,
            startTime: 0,
          },
          // Identical test count for both runs.
          // Represents repeat mode rather than rerunning of failures.
          {
            aggregatedResult: constructTestResults({
              totalTestSuites: 2, // A, B
              totalTestCasesPerSuite: 1,
            }) as AggregatedResult,
            startTime: 0,
          },
        ];

        await processAnalyticsForTestResults(mockedResults, actionSubject);
        // Initial run
        expect(mockSendEvent).toHaveBeenCalledWith(
          event.FAILURE(0, 'path/to/file-a.ts', {
            failingTests: 1,
            testName: 'should do A-1',
          }),
        );
        expect(mockSendEvent).toHaveBeenCalledWith(
          event.SUCCESS(0, 'path/to/file-b.ts', {
            failingTests: 0,
            testName: 'should do B-1',
          }),
        );
        expect(consoleSpy).toHaveBeenCalledWith(
          `Process analytics for test results (run 1 of 2):
\tSent 1 failure integration test event
\tSent 1 success integration test event`,
        );
        // Repeat run
        expect(mockSendEvent).toHaveBeenCalledWith(
          event.SUCCESS(1, 'path/to/file-a.ts', {
            failingTests: 0,
            testName: 'should do A-1',
          }),
        );
        expect(mockSendEvent).toHaveBeenCalledWith(
          event.SUCCESS(1, 'path/to/file-b.ts', {
            failingTests: 0,
            testName: 'should do B-1',
          }),
        );
        expect(mockSendEvent).not.toHaveBeenCalledWith(
          event.INCONSISTENCY(1, 'path/to/file-a.ts', {
            failingTests: 0,
            testName: 'should do A-1',
          }),
        );
        expect(consoleSpy).toHaveBeenCalledWith(
          `Process analytics for test results (run 2 of 2):
\tSent 2 success integration test events`,
        );

        // Total from both runs
        expect(mockSendEvent).toBeCalledTimes(4);
      });
    });

    describe('fail on final run', () => {
      // 2 files each containing 1 test case:
      // 2 total test cases. 1 failure, 1 pass.
      const mockedResults: TimedTestSuiteResult[] = [
        {
          aggregatedResult: constructTestResults({
            totalTestSuites: 2, // A, B
            totalTestCasesPerSuite: 1,
            failOnNth: [
              {
                index: 0, // 'path/to/file-a.ts'
                failures: 1, // 'should do A-1'
              },
            ],
          }) as AggregatedResult,
          startTime: 0,
        },
        // 1 file containing 2 test cases (subset from previous run's failures):
        // 1 failure on rerun.
        {
          aggregatedResult: constructTestResults({
            totalTestSuites: 1, // A
            totalTestCasesPerSuite: 1,
            failOnNth: [
              {
                index: 0, // 'path/to/file-a.ts'
                failures: 1, // 'should do A-1'
              },
            ],
          }) as AggregatedResult,
          startTime: 0,
        },
      ];

      it('should not send blocking events on non-mainline branches', async () => {
        process.env.BITBUCKET_BRANCH = 'foo';
        await processAnalyticsForTestResults(mockedResults, actionSubject);
        expect(mockSendEvent).toBeCalledTimes(3);
        // Initial run
        expect(mockSendEvent).toHaveBeenCalledWith(
          event.FAILURE(0, 'path/to/file-a.ts', {
            failingTests: 1,
            testName: 'should do A-1',
          }),
        );
        expect(mockSendEvent).toHaveBeenCalledWith(
          event.SUCCESS(0, 'path/to/file-b.ts', {
            failingTests: 0,
            testName: 'should do B-1',
          }),
        );
        expect(consoleSpy).toHaveBeenCalledWith(
          `Process analytics for test results (run 1 of 2):
\tSent 1 failure integration test event
\tSent 1 success integration test event`,
        );
        // Retry run
        expect(mockSendEvent).toHaveBeenCalledWith(
          event.FAILURE(1, 'path/to/file-a.ts', {
            failingTests: 1,
            testName: 'should do A-1',
          }),
        );
        expect(mockSendEvent).not.toHaveBeenCalledWith(
          event.BLOCKING(1, 'path/to/file-a.ts'),
        );
        expect(consoleSpy).toHaveBeenCalledWith(
          `Process analytics for test results (run 2 of 2):
\tSent 1 failure integration test event`,
        );
      });

      it('should send blocking events for master branch', async () => {
        process.env.BITBUCKET_BRANCH = 'master';
        await processAnalyticsForTestResults(mockedResults, actionSubject);
        expect(mockSendEvent).toBeCalledTimes(4);
        // Initial run
        expect(mockSendEvent).toHaveBeenCalledWith(
          event.FAILURE(0, 'path/to/file-a.ts', {
            failingTests: 1,
            testName: 'should do A-1',
          }),
        );
        expect(mockSendEvent).toHaveBeenCalledWith(
          event.SUCCESS(0, 'path/to/file-b.ts', {
            failingTests: 0,
            testName: 'should do B-1',
          }),
        );
        expect(consoleSpy).toHaveBeenCalledWith(
          `Process analytics for test results (run 1 of 2):
\tSent 1 failure integration test event
\tSent 1 success integration test event`,
        );
        // Retry run
        expect(mockSendEvent).toHaveBeenCalledWith(
          event.FAILURE(1, 'path/to/file-a.ts', {
            failingTests: 1,
            testName: 'should do A-1',
          }),
        );
        expect(mockSendEvent).toHaveBeenCalledWith(
          event.BLOCKING(1, 'path/to/file-a.ts', {
            failingTests: 0,
            testName: 'should do A-1',
          }),
        );
        expect(consoleSpy).toHaveBeenCalledWith(
          `Process analytics for test results (run 2 of 2):
\tSent 1 failure integration test event
\tSent 1 blocking integration test event`,
        );
      });

      it('should send blocking events for develop branch', async () => {
        process.env.BITBUCKET_BRANCH = 'develop';
        await processAnalyticsForTestResults(mockedResults, actionSubject);
        expect(mockSendEvent).toBeCalledTimes(4);
        // Initial run
        expect(mockSendEvent).toHaveBeenCalledWith(
          event.FAILURE(0, 'path/to/file-a.ts', {
            failingTests: 1,
            testName: 'should do A-1',
          }),
        );
        expect(mockSendEvent).toHaveBeenCalledWith(
          event.SUCCESS(0, 'path/to/file-b.ts', {
            failingTests: 0,
            testName: 'should do B-1',
          }),
        );
        expect(consoleSpy).toHaveBeenCalledWith(
          `Process analytics for test results (run 1 of 2):
\tSent 1 failure integration test event
\tSent 1 success integration test event`,
        );
        // Retry run
        expect(mockSendEvent).toHaveBeenCalledWith(
          event.FAILURE(1, 'path/to/file-a.ts', {
            failingTests: 1,
            testName: 'should do A-1',
          }),
        );
        expect(mockSendEvent).toHaveBeenCalledWith(
          event.BLOCKING(1, 'path/to/file-a.ts', {
            failingTests: 0,
            testName: 'should do A-1',
          }),
        );
        expect(consoleSpy).toHaveBeenCalledWith(
          `Process analytics for test results (run 2 of 2):
\tSent 1 failure integration test event
\tSent 1 blocking integration test event`,
        );
      });
    });
  });
});
