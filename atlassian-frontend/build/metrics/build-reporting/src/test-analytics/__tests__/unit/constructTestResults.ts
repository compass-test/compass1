import {
  constructTestResults,
  ConstructTestResultsParams,
} from '../../__fixtures__/mock-test-results';

// Validates the mocking functions, used later in this test file
describe('constructTestResults', () => {
  it('should generate passing results for a single file', () => {
    const input: ConstructTestResultsParams = {
      totalTestSuites: 1,
      totalTestCasesPerSuite: 2,
    };
    const results = constructTestResults(input);
    expect(results).toMatchObject(
      expect.objectContaining({
        numTotalTestSuites: 1,
        numTotalTests: 2,
        numPassedTestSuites: 1,
        numPassedTests: 2,
        numFailedTestSuites: 0,
        numFailedTests: 0,
        testResults: [
          expect.objectContaining({
            numFailingTests: 0,
            numPassingTests: 2,
            testFilePath: 'path/to/file-a.ts',
          }),
        ],
      }),
    );
  });

  it('should generate passing results for multiple files', () => {
    const input: ConstructTestResultsParams = {
      totalTestSuites: 2,
      totalTestCasesPerSuite: 3,
    };
    const results = constructTestResults(input);
    expect(results).toMatchObject(
      expect.objectContaining({
        numTotalTestSuites: 2,
        numTotalTests: 6,
        numPassedTestSuites: 2,
        numPassedTests: 6,
        numFailedTestSuites: 0,
        numFailedTests: 0,
        testResults: [
          expect.objectContaining({
            numFailingTests: 0,
            numPassingTests: 3,
            testFilePath: 'path/to/file-a.ts',
          }),
          expect.objectContaining({
            numFailingTests: 0,
            numPassingTests: 3,
            testFilePath: 'path/to/file-b.ts',
          }),
        ],
      }),
    );
  });

  it('should generate failed results for a single file', () => {
    const input: ConstructTestResultsParams = {
      totalTestSuites: 1,
      totalTestCasesPerSuite: 2,
      failOnNth: [{ index: 0, failures: 1 }],
    };
    const results = constructTestResults(input);
    expect(results).toMatchObject(
      expect.objectContaining({
        numTotalTestSuites: 1,
        numTotalTests: 2,
        numPassedTestSuites: 0,
        numPassedTests: 1,
        numFailedTestSuites: 1,
        numFailedTests: 1,
        testResults: [
          expect.objectContaining({
            numFailingTests: 1,
            numPassingTests: 1,
            testFilePath: 'path/to/file-a.ts',
          }),
        ],
      }),
    );
  });

  it('should generate failures only for specified nth indicies', () => {
    const input: ConstructTestResultsParams = {
      totalTestSuites: 4,
      totalTestCasesPerSuite: 4,
      failOnNth: [
        { index: 0, failures: 2 },
        { index: 2, failures: 1 },
      ],
    };
    const results = constructTestResults(input);
    expect(results).toMatchObject(
      expect.objectContaining({
        numTotalTests: 16,
        numTotalTestSuites: 4,
        numPassedTests: 13,
        numPassedTestSuites: 2,
        numFailedTests: 3,
        numFailedTestSuites: 2,
        testResults: [
          expect.objectContaining({
            numFailingTests: 2,
            numPassingTests: 2,
            testFilePath: 'path/to/file-a.ts',
            failureMessage: expect.any(String),
            testResults: [
              expect.objectContaining({
                numPassingAsserts: 0,
                status: 'failed',
                title: 'should do A-1',
              }),
              expect.objectContaining({
                numPassingAsserts: 0,
                status: 'failed',
                title: 'should do A-2',
              }),
              expect.objectContaining({
                numPassingAsserts: 1,
                status: 'passed',
                title: 'should do A-3',
              }),
              expect.objectContaining({
                numPassingAsserts: 1,
                status: 'passed',
                title: 'should do A-4',
              }),
            ],
          }),
          expect.objectContaining({
            numFailingTests: 0,
            numPassingTests: 4,
            testFilePath: 'path/to/file-b.ts',
            failureMessage: null,
            testResults: [
              expect.objectContaining({
                numPassingAsserts: 1,
                status: 'passed',
                title: 'should do B-1',
              }),
              expect.objectContaining({
                numPassingAsserts: 1,
                status: 'passed',
                title: 'should do B-2',
              }),
              expect.objectContaining({
                numPassingAsserts: 1,
                status: 'passed',
                title: 'should do B-3',
              }),
              expect.objectContaining({
                numPassingAsserts: 1,
                status: 'passed',
                title: 'should do B-4',
              }),
            ],
          }),
          expect.objectContaining({
            numFailingTests: 1,
            numPassingTests: 3,
            failureMessage: expect.any(String),
            testResults: [
              expect.objectContaining({
                numPassingAsserts: 0,
                status: 'failed',
                title: 'should do C-1',
              }),
              expect.objectContaining({
                numPassingAsserts: 1,
                status: 'passed',
                title: 'should do C-2',
              }),
              expect.objectContaining({
                numPassingAsserts: 1,
                status: 'passed',
                title: 'should do C-3',
              }),
              expect.objectContaining({
                numPassingAsserts: 1,
                status: 'passed',
                title: 'should do C-4',
              }),
            ],
          }),
          expect.objectContaining({
            numFailingTests: 0,
            numPassingTests: 4,
            testFilePath: 'path/to/file-d.ts',
            failureMessage: null,
            testResults: [
              expect.objectContaining({
                numPassingAsserts: 1,
                status: 'passed',
                title: 'should do D-1',
              }),
              expect.objectContaining({
                numPassingAsserts: 1,
                status: 'passed',
                title: 'should do D-2',
              }),
              expect.objectContaining({
                numPassingAsserts: 1,
                status: 'passed',
                title: 'should do D-3',
              }),
              expect.objectContaining({
                numPassingAsserts: 1,
                status: 'passed',
                title: 'should do D-4',
              }),
            ],
          }),
        ],
      }),
    );
  });
});
