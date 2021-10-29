import type { AggregatedResult } from '@jest/test-result';
import type {
  AnalyticsEventPayload,
  TimedTestSuiteResult,
} from '@atlaskit/build-reporting';
import {
  constructTestResults,
  processAnalyticsForTestResults,
} from '@atlaskit/build-reporting';
import * as modifiers from './modifiers';

function getMockAnalyticsEvent(
  override: Partial<AnalyticsEventPayload> = {},
): AnalyticsEventPayload {
  return {
    testFilePath: 'path/to/foo.ts',
    BITBUCKET_BUILD_NUMBER: '1234',
    BITBUCKET_BRANCH: 'feature/foo',
    BITBUCKET_COMMIT: 'abc123',
    BITBUCKET_PIPELINE_UUID: '{1234-5678}',
    BITBUCKET_PR_ID: '456',
    BITBUCKET_PR_DESTINATION_BRANCH: 'master',
    BITBUCKET_STEP_TRIGGERER_UUID: '{4567-8910}',
    BITBUCKET_STEP_UUID: '{2323-4545}',
    iteration: 0,
    ancestorTitles: ['filename.ts', 'describe', 'hello'],
    buildNumber: '1234',
    branch: 'feature/foo',
    buildType: 'faux',
    duration: 30,
    packageName: '@atlaskit/foo',
    testFullName: 'describe › hello › should meow when hungry',
    testName: 'should meow when hungry',
    ...override,
  };
}

describe('modifyBrowserName', () => {
  it('should modify the browser name for chrome', async () => {
    const event = getMockAnalyticsEvent({
      ancestorTitles: ['foo.ts', 'describe', 'cat'],
    });
    const didModify = await modifiers.modifyBrowserName(event);
    expect(didModify).toBe(true);
    expect(event.browser).toEqual('chrome');
  });
});

describe('processAnalyticsForTestResults', () => {
  let CI: string | undefined;
  let consoleSpy: jest.SpyInstance;

  beforeAll(() => {
    ({ CI } = process.env);
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });
  afterEach(() => {
    mockSendEvent.mockClear();
    consoleSpy.mockClear();
    if (CI) {
      process.env.CI = CI;
    } else {
      delete process.env.CI;
    }
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  const mockSendEvent = jest.fn(async function mockSendEvent(
    data: any,
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

  it('should call modifiers and adjust event payload', async () => {
    // We set the environment variable `CI` to `true` as we send analytics only in our CI pipeline.
    process.env.CI = 'true';
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
    const modifyBrowserSpy = jest.spyOn(modifiers, 'modifyBrowserName');
    await processAnalyticsForTestResults(mockedResults, 'vr_test', [
      modifiers.modifyBrowserName,
    ]);
    expect(modifyBrowserSpy).toHaveBeenCalled();
  });
});
