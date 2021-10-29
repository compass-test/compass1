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
    ancestorTitles: ['filename.ts', 'Windows 10 chrome 91.0', 'cat'],
    buildNumber: '1234',
    branch: 'feature/foo',
    buildType: 'faux',
    duration: 30,
    packageName: '@atlaskit/foo',
    testFullName: 'Windows 10 chrome 91.0 › cat › should meow when hungry',
    testName: 'should meow when hungry',
    ...override,
  };
}

describe('modifyBranchName', () => {
  let BITBUCKET_BRANCH: string | undefined;
  let BITBUCKET_PARALLEL_STEP: string | undefined;
  let TEST_ENV: string | undefined;
  let LANDKID: string | undefined;
  let USER: string | undefined;

  beforeAll(() => {
    // Store original values
    ({
      BITBUCKET_BRANCH,
      BITBUCKET_PARALLEL_STEP,
      TEST_ENV,
      LANDKID,
      USER,
    } = process.env);
  });
  beforeEach(() => {
    // Unset all values ready for test case manipulation
    process.env.BITBUCKET_BRANCH = '';
    process.env.BITBUCKET_PARALLEL_STEP = '';
    process.env.TEST_ENV = '';
    process.env.LANDKID = '';
    process.env.USER = '';
  });
  afterAll(() => {
    // Restore original values after the test file is finished
    process.env.BITBUCKET_BRANCH = BITBUCKET_BRANCH;
    process.env.BITBUCKET_PARALLEL_STEP = BITBUCKET_PARALLEL_STEP;
    process.env.TEST_ENV = TEST_ENV;
    process.env.LANDKID = LANDKID;
    process.env.USER = USER;
  });

  it('should not modify the branch if not on browserstack', async () => {
    process.env.TEST_ENV = 'test';
    const event = getMockAnalyticsEvent();
    const didModify = await modifiers.modifyBranchName(event);
    expect(didModify).toBe(false);
    expect(event.branch).toEqual('feature/foo');
  });

  describe('when on browserstack', () => {
    let CI: string | undefined;
    beforeAll(() => {
      CI = process.env.CI;
    });
    beforeEach(() => {
      // Opt into browserstack environment for nested tests
      process.env.TEST_ENV = 'browserstack';
    });
    afterEach(() => {
      // Restore original value
      if (CI) {
        process.env.CI = CI;
      } else {
        delete process.env.CI;
      }
    });

    it('should modify the branch for landkid', async () => {
      process.env.LANDKID = 'true';
      const event = getMockAnalyticsEvent();
      const didModify = await modifiers.modifyBranchName(event);
      expect(didModify).toBe(true);
      // In CI, we append the pipeline uuid to the branch name.
      expect(event.branch).toContain('Landkid');
    });

    it('should modify the branch for local', async () => {
      process.env.BITBUCKET_BRANCH = '';
      process.env.USER = 'neo';
      process.env.CI = '';
      const event = getMockAnalyticsEvent();
      const didModify = await modifiers.modifyBranchName(event);
      expect(didModify).toBe(true);
      expect(event.branch).toEqual('neo_local_run');
    });

    it('should modify the branch for paralell step', async () => {
      process.env.BITBUCKET_BRANCH = 'feature/parallel';
      process.env.BITBUCKET_PARALLEL_STEP = '1';
      const event = getMockAnalyticsEvent();
      const didModify = await modifiers.modifyBranchName(event);
      expect(didModify).toBe(true);
      // In CI, we append the pipeline uuid to the branch name.
      expect(event.branch).toContain('feature/parallel_1');
    });
  });
});

describe('modifyBrowserName', () => {
  it('should modify the browser name for chrome', async () => {
    const event = getMockAnalyticsEvent({
      ancestorTitles: ['foo.ts', 'Windows 10 chrome 91.0', 'cat'],
    });
    const didModify = await modifiers.modifyBrowserName(event);
    expect(didModify).toBe(true);
    expect(event.browser).toEqual('chrome');
  });

  it('should modify the browser name for safari', async () => {
    const event = getMockAnalyticsEvent({
      ancestorTitles: ['foo.ts', 'OS X Big Sur Safari 14.0', 'cat'],
    });
    const didModify = await modifiers.modifyBrowserName(event);
    expect(didModify).toBe(true);
    expect(event.browser).toEqual('safari');
  });

  it('should modify the browser name for firefox', async () => {
    const event = getMockAnalyticsEvent({
      ancestorTitles: ['foo.ts', 'Windows 10 firefox 89.0', 'cat'],
    });
    const didModify = await modifiers.modifyBrowserName(event);
    expect(didModify).toBe(true);
    expect(event.browser).toEqual('firefox');
  });

  it('should modify the browser name for edge', async () => {
    const event = getMockAnalyticsEvent({
      ancestorTitles: ['foo.ts', 'Windows 10 edge 91.0', 'cat'],
    });
    const didModify = await modifiers.modifyBrowserName(event);
    expect(didModify).toBe(true);
    expect(event.browser).toEqual('edge');
  });

  it('should modify the browser name for unknown browsers', async () => {
    const event = getMockAnalyticsEvent({
      ancestorTitles: ['foo.ts', 'Foobar', 'cat'],
    });
    const didModify = await modifiers.modifyBrowserName(event);
    expect(didModify).toBe(true);
    expect(event.browser).toEqual('browser not found');
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
    const modifyBranchSpy = jest.spyOn(modifiers, 'modifyBranchName');
    const modifyBrowserSpy = jest.spyOn(modifiers, 'modifyBrowserName');
    await processAnalyticsForTestResults(mockedResults, 'integration_test', [
      modifiers.modifyBranchName,
      modifiers.modifyBrowserName,
    ]);
    expect(modifyBranchSpy).toHaveBeenCalled();
    expect(modifyBrowserSpy).toHaveBeenCalled();
  });
});
