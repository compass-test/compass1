import { Test } from '../types';

export type TestResults = {
  // Total physical files run
  totalFiles: number;
  // Total test cases run (can be several per file)
  totalTestCases: number;
  // Total test case failures (included exempt ones)
  totalFailedTestCases: number;
  // The count non-exempt files that failed
  numSkippableFiles: number;
  // The count of non-exempt test cases that failed
  numSkippableTestCases: number;
  // The count of exempt test cases that failed but weren't skipped
  numExemptTestCases: number;
  // Non exempt failures ready for skipping
  skippableTestCases: Test[];
  // Exempt errors that shouldn't be skipped
  exemptTestCases: Test[];
};
