export type EslintViolation = {
  column: number;
  endColumn: number;
  endLine: number;
  line: number;
  message: string;
  nodeType: string;
  ruleId: string;
  severity: number;
};

export type EslintResult = {
  errorCount: number;
  filePath: string;
  fixableErrorCount: number;
  fixableWarningCount: number;
  messages: Array<EslintViolation>;
  source: string;
  warningCount: number;
};

export type JestTestResult = {
  // don't care about this type at the moment
  assertionResults: any;
  endTime: number;
  // contains the eslint error messages
  message: string;
  // filename
  name: string;
  // unix timestamp
  startTime: number;
  status: 'passed' | 'failed';
  summary: string;
};

export type JestResultSummary = {
  numFailedTestSuites: number;
  numFailedTests: number;
  numPassedTestSuites: number;
  numPassedTests: number;
  numPendingTestSuites: number;
  numPendingTests: number;
  numRuntimeErrorTestSuites: number;
  numTodoTests: number;
  numTotalTestSuites: number;
  numTotalTests: number;
  startTime: number;
  success: boolean;
  testResults: Array<JestTestResult>;
  wasInterrupted: boolean;
};
