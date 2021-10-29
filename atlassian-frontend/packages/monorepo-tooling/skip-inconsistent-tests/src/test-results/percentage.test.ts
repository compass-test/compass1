import { getFailurePercentage, humanReadablePercentage } from './percentage';
import { TestResults } from './types';

describe('humanReadablePercentage', () => {
  it('should return percentage string trimmed to 3 decimal places', () => {
    expect(humanReadablePercentage(0.123456789)).toStrictEqual('12.346%');
    expect(humanReadablePercentage(0.333333333)).toStrictEqual('33.333%');
  });

  it('should return percentage string without surplus zeros', () => {
    expect(humanReadablePercentage(0.12)).toStrictEqual('12%');
    expect(humanReadablePercentage(0.89)).toStrictEqual('89%');
    expect(humanReadablePercentage(0)).toStrictEqual('0%');
    expect(humanReadablePercentage(1)).toStrictEqual('100%');
  });
});

describe('getFailurePercentage', () => {
  let consoleSpy: jest.SpyInstance;
  beforeEach(() => {
    // Silence warning log for the abort early test case
    consoleSpy = jest
      .spyOn(console, 'warn')
      .mockImplementation((_msg: string) => {});
  });
  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should return 0% when no tests failed', () => {
    const results: TestResults = {
      totalFiles: 0,
      totalTestCases: 0,
      totalFailedTestCases: 0,
      numSkippableFiles: 0,
      numSkippableTestCases: 0,
      numExemptTestCases: 0,
      skippableTestCases: [],
      exemptTestCases: [],
    };
    expect(getFailurePercentage('report.xml', results, true)).toBe('0%');
  });

  it(`should return 0% when half the tests failed and environmental protection enabled`, () => {
    const results: TestResults = {
      totalFiles: 10,
      totalTestCases: 30,
      totalFailedTestCases: 10,
      numSkippableFiles: 5,
      numSkippableTestCases: 10,
      numExemptTestCases: 0,
      skippableTestCases: [],
      exemptTestCases: [],
    };
    expect(getFailurePercentage('report.xml', results, true)).toBe('0%');
    expect(consoleSpy).toBeCalledWith(
      `50% of test cases failed.\n\tIgnoring report.xml.\n\tAborting under the assumption this may be an environmental issue.`,
    );
  });

  it(`should return 50% when half the tests failed and environmental protection disabled`, () => {
    const results: TestResults = {
      totalFiles: 10,
      totalTestCases: 30,
      totalFailedTestCases: 10,
      numSkippableFiles: 5,
      numSkippableTestCases: 10,
      numExemptTestCases: 0,
      skippableTestCases: [],
      exemptTestCases: [],
    };
    expect(getFailurePercentage('report.xml', results, false)).toBe('50%');
    expect(consoleSpy).toBeCalledWith(
      `50% of test cases failed.\n\tProcessing report.xml.\n\tEnvironmental threshold exceeded, however threshold protection is explicitly disabled so tests will still be skipped.`,
    );
  });

  it(`should only enforce environmental protection when the percentage exceeds 10%`, () => {
    const useThresholdProtection = true;
    const results1: TestResults = {
      totalFiles: 100,
      totalTestCases: 1234,
      totalFailedTestCases: 123,
      numSkippableFiles: 10,
      numSkippableTestCases: 123,
      numExemptTestCases: 0,
      skippableTestCases: [],
      exemptTestCases: [],
    };
    expect(
      getFailurePercentage('report.xml', results1, useThresholdProtection),
    ).toBe('10%');
    const results2: TestResults = {
      totalFiles: 100,
      totalTestCases: 1234,
      totalFailedTestCases: 123,
      numSkippableFiles: 11,
      numSkippableTestCases: 123,
      numExemptTestCases: 0,
      skippableTestCases: [],
      exemptTestCases: [],
    };
    expect(
      getFailurePercentage('report.xml', results2, useThresholdProtection),
    ).toBe('0%');
  });
});
