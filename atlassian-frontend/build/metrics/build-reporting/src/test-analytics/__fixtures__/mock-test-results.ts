import type {
  AggregatedResult,
  AssertionResult,
  TestResult,
} from '@jest/test-result';

function createTestAssertionResults(
  count: number,
  failureCount: number,
  letter: string,
): AssertionResult[] {
  const results = [];
  const hasFailures = failureCount > 0;

  // We fail up until we exceed the allocation, then we pass for subsequent ones.
  for (let i = 0; i < count; i++) {
    const shouldFail = hasFailures && i < failureCount;
    const status = shouldFail ? 'failed' : 'passed';
    const failure = hasFailures ? 'You had one job!' : undefined;
    const numPassingAsserts = shouldFail ? 0 : 1;
    results.push(
      createAssertionResult(i, letter, status, numPassingAsserts, failure),
    );
  }
  return results;
}

// Crude way of converting 1 to A, 26 to Z for labelling.
// `index` is zero based, so we increment by 1 to align.
function indexToAlphabet(index: number) {
  return String.fromCharCode(++index + 'A'.charCodeAt(0) - 1).toLowerCase();
}

function createAssertionResult(
  index: number,
  describeLabel: string,
  status: 'passed' | 'failed',
  numPassingAsserts: number,
  failure?: string,
): AssertionResult {
  const failureMessages: string[] = failure ? [failure] : [];
  const title = `should do ${describeLabel.toUpperCase()}-${index + 1}`;
  return {
    ancestorTitles: [describeLabel],
    duration: 100,
    failureDetails: [],
    failureMessages,
    fullName: `${describeLabel} › ${title}`,
    numPassingAsserts,
    status,
    title,
  };
}

function createTestResult(
  testFilePath: string,
  letter: string,
  numFailingTests: number,
  numPassingTests: number,
  includePerfStats: boolean,
): TestResult {
  const testResults = createTestAssertionResults(
    numFailingTests + numPassingTests,
    numFailingTests,
    letter,
  );
  const result = {
    failureMessage: numFailingTests > 0 ? 'Sink or swim. I sank.' : null,
    leaks: false,
    numFailingTests,
    numPassingTests,
    numPendingTests: 0,
    numTodoTests: 0,
    openHandles: [],
    perfStats: {
      start: includePerfStats ? Date.now() : 0,
      end: includePerfStats ? Date.now() + 123 : 0,
      runtime: 0,
      slow: false,
    },
    snapshot: {
      added: 0,
      fileDeleted: false,
      matched: 0,
      unchecked: 0,
      uncheckedKeys: [],
      unmatched: 0,
      updated: 0,
    },
    skipped: false,
    testFilePath,
    testResults,
  };
  return result;
}

function createAggegatedTestResult(
  tests: {
    path: string;
    numFailures: number;
    numTests: number;
    letter: string;
    includePerfStats: boolean;
  }[],
): Partial<AggregatedResult> {
  let numFailedTests = 0;
  let numFailedTestSuites = 0;
  let numPassedTests = 0;
  let numPassedTestSuites = 0;
  let numTotalTests = 0;
  let numTotalTestSuites = 0;
  const testResults: TestResult[] = tests.map(
    ({ path, letter, numFailures, numTests, includePerfStats }) => {
      const numPassed = numTests - numFailures;
      numTotalTestSuites++;
      numTotalTests += numTests;
      if (numFailures > 0) {
        numFailedTestSuites++;
        numFailedTests += numFailures;
      } else {
        numPassedTestSuites++;
      }
      numPassedTests += numPassed;
      const result = createTestResult(
        path,
        letter,
        numFailures,
        numPassed,
        includePerfStats,
      );
      return result;
    },
  );
  return {
    numFailedTests,
    numFailedTestSuites,
    numPassedTests,
    numPassedTestSuites,
    numPendingTests: 0,
    numTodoTests: 0,
    numPendingTestSuites: 0,
    numRuntimeErrorTestSuites: 0,
    numTotalTests,
    numTotalTestSuites,
    openHandles: [],
    snapshot: undefined,
    startTime: 0,
    success: numFailedTests === 0 ? true : false,
    testResults,
    wasInterrupted: false,
  };
}

type FailOnNth = {
  // Test suite to fail on within TestResult[]
  index: number;
  // Number of test cases to fail
  failures: number;
};

export type ConstructTestResultsParams = {
  // Number of files
  totalTestSuites: number;
  // Number of test cases within each file
  totalTestCasesPerSuite: number;
  // Array of indicies for which test files (suites) should contain failures
  failOnNth?: FailOnNth[];
  // Whether to include perfStats
  includePerfStats?: boolean;
};

export function constructTestResults(
  config: ConstructTestResultsParams = {
    totalTestSuites: 1,
    totalTestCasesPerSuite: 1,
    failOnNth: undefined,
    includePerfStats: false,
  },
): Partial<AggregatedResult> {
  const suites = [...Array(config.totalTestSuites)].map((_, index) => {
    let numFailures = 0;
    if (config.failOnNth) {
      const match = config.failOnNth.find(cfg => cfg.index === index);
      if (match) {
        numFailures = match.failures;
      }
    }
    const letter = indexToAlphabet(index);
    return {
      path: `path/to/file-${letter}.ts`,
      letter,
      numFailures,
      numTests: config.totalTestCasesPerSuite,
      includePerfStats: config.includePerfStats === true,
    };
  });
  const outOfBoundsNth = (config.failOnNth || []).find(
    cfg => cfg.index >= config.totalTestSuites,
  );
  if (outOfBoundsNth) {
    console.error(
      `Out of bounds: ${config.totalTestSuites} test suites. Unable to fail on index ${outOfBoundsNth.index} as it exceeds the total.`,
    );
  }
  return createAggegatedTestResult(suites);
}
