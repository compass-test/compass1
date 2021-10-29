import { constructTestResults } from '@atlaskit/build-reporting';

import * as snapshots from './snapshots';
import {
  runTests,
  returnFailingTestPaths,
  renameJunitReport,
} from './jest-runner';
import { Flags, getDefaultFlags } from './flags';
import { mockTestResults } from './__fixtures__/mock-test-results';

describe('runTests', () => {
  let jestSpy: jest.SpyInstance;
  let consoleInfoSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;
  let flags: Flags;

  const testPaths = ['packages/design-system/button'];
  const options = {
    directory: 'visual-regression',
    maxWorkers: 1,
  };

  beforeAll(() => {
    // Avoid slow test performance by avoiding the glob
    jest
      .spyOn(snapshots, 'moveScreenshotsFromLastRun')
      .mockImplementation(() => {});
    // Silence rerun logs
    consoleInfoSpy = jest
      .spyOn(console, 'info')
      .mockImplementation((_msg: string) => {});
    // Silence flag override warnings
    consoleWarnSpy = jest
      .spyOn(console, 'warn')
      .mockImplementation((_msg: string) => {});
  });

  beforeEach(() => {
    flags = getDefaultFlags();
    jestSpy = mockTestResults();
    consoleInfoSpy.mockReset();
    consoleWarnSpy.mockReset();
  });
  afterEach(() => {
    jestSpy.mockReset();
    jest.resetAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('renameJunitReport', () => {
    it('should update junit report filename & restore original when invoked', () => {
      const { JEST_JUNIT_OUTPUT } = process.env;

      const restoreFilename = renameJunitReport('foo.json', './');
      expect(process.env.JEST_JUNIT_OUTPUT).toBe('test-reports/foo.json');
      restoreFilename();
      expect(process.env.JEST_JUNIT_OUTPUT).toBe(JEST_JUNIT_OUTPUT);

      if (JEST_JUNIT_OUTPUT) {
        process.env.JEST_JUNIT_OUTPUT = JEST_JUNIT_OUTPUT;
      } else {
        delete process.env.JEST_JUNIT_OUTPUT;
      }
    });
  });

  describe('test failures', () => {
    it('should return test file path on test failures', async () => {
      jestSpy.mockReset();
      jestSpy = mockTestResults(
        constructTestResults({
          totalTestSuites: 1,
          totalTestCasesPerSuite: 2,
          failOnNth: [
            {
              index: 0,
              failures: 1,
            },
          ],
        }),
      );
      flags.retry = 0;

      const { results } = await runTests(flags, testPaths, options);
      const testResults = results[0].aggregatedResult;
      const failingtestPath = returnFailingTestPaths(testResults);
      expect(failingtestPath).toHaveLength(1);
      expect(failingtestPath[0]).toBe('path/to/file-a.ts');
    });

    it('should not return test file path on test passing', async () => {
      jestSpy.mockReset();
      jestSpy = mockTestResults(
        constructTestResults({
          totalTestSuites: 1,
          totalTestCasesPerSuite: 2,
          failOnNth: [
            {
              index: 0,
              failures: 0,
            },
          ],
        }),
      );
      flags.retry = 0;

      const { results } = await runTests(flags, testPaths, options);
      const testResults = results[0].aggregatedResult;
      const failingtestPath = returnFailingTestPaths(testResults);
      expect(failingtestPath).toHaveLength(0);
    });

    describe('when in CI', () => {
      let CI: string | undefined;
      beforeAll(() => {
        ({ CI } = process.env);
      });
      beforeEach(() => {
        process.env.CI = 'true';
      });
      afterEach(() => {
        if (CI) {
          process.env.CI = CI;
        } else {
          delete process.env.CI;
        }
      });

      it('should fail if snapshots were written in CI', async () => {
        jestSpy.mockReset();
        const mockedResults = constructTestResults({
          totalTestSuites: 1,
          totalTestCasesPerSuite: 1,
        });
        mockedResults.testResults![0].failureMessage =
          'New snapshot was not written';
        jestSpy = mockTestResults(mockedResults);
        const consoleErrorSpy = jest
          .spyOn(console, 'error')
          .mockImplementation((_msg: string) => {});

        const { exitCode } = await runTests(flags, testPaths, options);
        expect(exitCode).toBe(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          "New snapshots were written. `flags.retry` is ignored until they're checked in.",
        );

        consoleErrorSpy.mockRestore();
      });
    });
  });

  describe('exit code', () => {
    it('should have exit code 0 when no test failures', async () => {
      const { exitCode, results } = await runTests(flags, testPaths, options);
      expect(exitCode).toBe(0);
      expect(results.length).toBe(1);
      expect(results[0].aggregatedResult.success).toBe(true);
    });

    it('should have exit code 1 when includes test failures', async () => {
      jestSpy.mockReset();
      jestSpy = mockTestResults(
        constructTestResults({
          totalTestSuites: 1,
          totalTestCasesPerSuite: 2,
          failOnNth: [
            {
              index: 0,
              failures: 1,
            },
          ],
        }),
      );
      flags.retry = 0;

      const { exitCode, results } = await runTests(flags, testPaths, options);
      expect(exitCode).toBe(1);
      expect(results.length).toBe(1);
      expect(results[0].aggregatedResult.success).toBe(false);
    });

    it('should have exit code 0 when includes test failures if flags.gracefulExit is true', async () => {
      jestSpy.mockReset();
      jestSpy = mockTestResults(
        constructTestResults({
          totalTestSuites: 1,
          totalTestCasesPerSuite: 2,
          failOnNth: [
            {
              index: 0,
              failures: 1,
            },
          ],
        }),
      );
      flags.retry = 0;
      flags.gracefulExit = true;

      const testPaths = ['packages/design-system/button'];
      const options = {
        directory: 'visual-regression',
        maxWorkers: 1,
      };
      const { exitCode, results } = await runTests(flags, testPaths, options);
      expect(exitCode).toBe(0);
      expect(results.length).toBe(1);
      expect(results[0].aggregatedResult.success).toBe(false);
    });
  });

  describe('retries', () => {
    let isCI: string | undefined;
    beforeAll(() => {
      isCI = process.env.CI;
    });
    beforeEach(() => {
      process.env.CI = 'true';
    });
    afterEach(() => {
      if (isCI) {
        process.env.CI = isCI;
      } else {
        delete process.env.CI;
      }
    });

    it('should not retry if not in CI', async () => {
      jestSpy.mockReset();
      jestSpy = mockTestResults([
        constructTestResults({
          totalTestSuites: 1,
          totalTestCasesPerSuite: 1,
          failOnNth: [
            {
              index: 0,
              failures: 1,
            },
          ],
        }),
      ]);
      flags.retry = 1;
      // Opt out of CI for this test
      delete process.env.CI;

      const { exitCode, results } = await runTests(flags, testPaths, options);
      expect(exitCode).toBe(1);
      expect(results.length).toBe(1);
      expect(results[0].aggregatedResult).toMatchObject(
        expect.objectContaining({
          success: false,
          numTotalTests: 1,
          numFailedTests: 1,
          numPassedTests: 0,
        }),
      );
      expect(process.env.CI).not.toBe('true');
    });

    it('should fail=>pass when flags.retry=1 and a failure occurs on first run but passes on rerun', async () => {
      jestSpy.mockReset();
      jestSpy = mockTestResults([
        // Mock initial full suite
        constructTestResults({
          totalTestSuites: 4,
          totalTestCasesPerSuite: 2,
          failOnNth: [
            {
              index: 1,
              failures: 1,
            },
            {
              index: 3,
              failures: 2,
            },
          ],
        }),
        // Mock subset of failures from previous run/suite
        constructTestResults({
          totalTestSuites: 2,
          totalTestCasesPerSuite: 2,
        }),
      ]);
      flags.retry = 1;

      const { exitCode, results } = await runTests(flags, testPaths, options);
      expect(exitCode).toBe(0);
      expect(results.length).toBe(2);
      const [initial, retry] = results;
      const { aggregatedResult: initialResults } = initial;
      const { aggregatedResult: rerunResults } = retry;
      expect(initialResults).toMatchObject(
        expect.objectContaining({
          success: false,
          numTotalTests: 8,
          numFailedTests: 3,
          numPassedTests: 5,
        }),
      );
      expect(rerunResults).toMatchObject(
        expect.objectContaining({
          success: true,
          numTotalTests: 4,
          numPassedTests: 4,
          numFailedTests: 0,
        }),
      );
    });

    it('should fail=>fail when flags.retry=1 and a failure occurs on both runs', async () => {
      jestSpy.mockReset();
      const mockResults = {
        totalTestSuites: 1,
        totalTestCasesPerSuite: 2,
        failOnNth: [
          {
            index: 0,
            failures: 1,
          },
        ],
      };
      jestSpy = mockTestResults([
        // Mock initial full suite
        constructTestResults(mockResults),
        // Mock failures from previous run/suite
        constructTestResults(mockResults),
      ]);
      flags.retry = 1;

      const { exitCode, results } = await runTests(flags, testPaths, options);
      expect(exitCode).toBe(1);
      expect(results.length).toBe(2);
      const [initial, retry] = results;
      const { aggregatedResult: initialResults } = initial;
      const { aggregatedResult: rerunResults } = retry;
      const expectedResults = expect.objectContaining({
        success: false,
        numTotalTests: 2,
        numFailedTests: 1,
        numPassedTests: 1,
      });
      expect(initialResults).toMatchObject(expectedResults);
      expect(rerunResults).toMatchObject(expectedResults);
    });

    it('should not retry more than once even if flags.retry > 1', async () => {
      jestSpy.mockReset();
      const mockResults = {
        totalTestSuites: 1,
        totalTestCasesPerSuite: 2,
        failOnNth: [
          {
            index: 0,
            failures: 1,
          },
        ],
      };
      jestSpy = mockTestResults([
        // Mock initial full suite
        constructTestResults(mockResults),
        // Mock failures from previous run/suite
        constructTestResults(mockResults),
      ]);
      flags.retry = 2;

      const { exitCode, results } = await runTests(flags, testPaths, options);
      expect(exitCode).toBe(1);
      expect(results.length).toBe(2);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        `Warning. flags.retry = 2, however we only support a single rerun.\n\tFailures will be rerun once.`,
      );
    });
  });

  describe('repeat', () => {
    it('should run tests 2 times when flags.repeat=1 and have exitCode 0 if all runs pass', async () => {
      jestSpy.mockReset();
      const mockResultsPass = {
        totalTestSuites: 1,
        totalTestCasesPerSuite: 2,
      };
      jestSpy = mockTestResults([
        constructTestResults(mockResultsPass),
        constructTestResults(mockResultsPass),
      ]);
      flags.retry = 0;
      flags.repeat = 1;

      const { exitCode, results } = await runTests(flags, testPaths, options);
      expect(exitCode).toBe(0);
      expect(results.length).toBe(2);
      const [
        { aggregatedResult: rep1Results },
        { aggregatedResult: rep2Results },
      ] = results;
      const expectedResults = expect.objectContaining({
        success: true,
        numTotalTests: 2,
        numFailedTests: 0,
        numPassedTests: 2,
      });
      expect(rep1Results).toMatchObject(expectedResults);
      expect(rep2Results).toMatchObject(expectedResults);
    });

    it('should run tests 2 times when flags.repeat=1 and have exitCode 1 if any run fails', async () => {
      jestSpy.mockReset();
      const mockResultsPass = {
        totalTestSuites: 1,
        totalTestCasesPerSuite: 2,
      };
      const mockResultsFail = {
        ...mockResultsPass,
        failOnNth: [
          {
            index: 0,
            failures: 1,
          },
        ],
      };
      jestSpy = mockTestResults([
        constructTestResults(mockResultsFail),
        constructTestResults(mockResultsPass),
      ]);
      flags.retry = 0;
      flags.repeat = 1;

      const { exitCode, results } = await runTests(flags, testPaths, options);
      expect(exitCode).toBe(1);
      expect(results.length).toBe(2);
      const [
        { aggregatedResult: rep1Results },
        { aggregatedResult: rep2Results },
      ] = results;
      const expectedResults1 = expect.objectContaining({
        success: false,
        numTotalTests: 2,
        numFailedTests: 1,
        numPassedTests: 1,
      });
      const expectedResults2 = expect.objectContaining({
        success: true,
        numTotalTests: 2,
        numFailedTests: 0,
        numPassedTests: 2,
      });
      expect(rep1Results).toMatchObject(expectedResults1);
      expect(rep2Results).toMatchObject(expectedResults2);
    });

    it('should allow repeating more than twice', async () => {
      jestSpy.mockReset();
      const mockResultsPass = {
        totalTestSuites: 1,
        totalTestCasesPerSuite: 2,
      };
      jestSpy = mockTestResults([
        constructTestResults(mockResultsPass),
        constructTestResults(mockResultsPass),
        constructTestResults(mockResultsPass),
      ]);
      flags.retry = 0;
      flags.repeat = 2;

      const { exitCode, results } = await runTests(flags, testPaths, options);
      expect(exitCode).toBe(0);
      expect(results.length).toBe(3);

      const [
        { aggregatedResult: rep1Results },
        { aggregatedResult: rep2Results },
      ] = results;
      const expectedResults = expect.objectContaining({
        success: true,
        numTotalTests: 2,
        numFailedTests: 0,
        numPassedTests: 2,
      });
      expect(rep1Results).toMatchObject(expectedResults);
      expect(rep2Results).toMatchObject(expectedResults);
      expect(rep2Results).toMatchObject(expectedResults);
    });
  });
});
