import { parseStringPromise } from 'xml2js';

import type { Test } from '../types';
import {
  analyticsClient,
  getAnalyticsPayload,
  getSummaryAnalyticsPayload,
} from '../utils/analytics';

import { getErrorExemption } from './exemptions';
import type { TestResults } from './types';

export const parseFailureTests = async (
  xmlString: string,
  verbose = false,
): Promise<TestResults> => {
  const result = await parseStringPromise(xmlString);

  if (!result.testsuites.testsuite) {
    // When running user specified packages sometimes we might have
    // an empty junit report if a package doesn't have any tests for
    // a particular test type
    return {
      totalFiles: 0,
      totalTestCases: 0,
      totalFailedTestCases: 0,
      numSkippableFiles: 0,
      numSkippableTestCases: 0,
      numExemptTestCases: 0,
      skippableTestCases: [],
      exemptTestCases: [],
    };
  }

  const totalFiles = result.testsuites.testsuite.length;
  let totalTestCases = 0;
  let totalFailedTestCases = 0;
  let numSkippableFiles = 0;
  let skippableTestCases: Test[] = [];
  let exemptTestCases: Test[] = [];

  result.testsuites.testsuite.forEach((testSuite: any) => {
    const { name: filePath, failures, tests } = testSuite['$'];
    totalTestCases += Number(tests);

    if (failures > 0) {
      totalFailedTestCases += Number(failures);
      let fileSkippable = false;

      testSuite.testcase.forEach(
        (testCase: {
          failure?: string[];
          $: { name: string; classname: string };
        }) => {
          const { failure: failureReason, $: details } = testCase;
          if (failureReason) {
            const { name: testName, classname: ancestorLabels } = details;
            const failedTestCase: Test = {
              path: filePath,
              testName,
              ancestorLabels,
              // Error messages containing double quotes would need to have them escaped when
              // we convert the XML to JSON (which requires all strings use double quotes).
              // To avoid having to unescape them later, we simply swap double quotes with
              // single quotes since the accuracy of the quote isn't relevant to our needs.
              errors: failureReason.map(reason => reason.split(`\"`).join(`'`)),
            };
            const exemption = getErrorExemption(
              filePath,
              failureReason,
              verbose,
            );
            if (exemption) {
              analyticsClient.sendEvent(
                getAnalyticsPayload(failedTestCase, 'failed_test_exempted', {
                  exemption,
                }),
              );
              // Ignore exempt (environmental) errors
              exemptTestCases.push(failedTestCase);
            } else {
              fileSkippable = true;
              skippableTestCases.push(failedTestCase);
            }
          }
        },
      );
      if (fileSkippable) {
        // Increase count
        ++numSkippableFiles;
      }
    }
  });

  console.info(`\tTotal (files: ${totalFiles}, test cases: ${totalTestCases})`);
  console.info(
    `\tSkippable (files: ${numSkippableFiles}, test cases: ${skippableTestCases.length})`,
  );
  console.info(`\tExemptions (test cases: ${exemptTestCases.length})`);

  const testResults = {
    totalFiles,
    totalTestCases,
    totalFailedTestCases,
    numSkippableFiles,
    numSkippableTestCases: skippableTestCases.length,
    numExemptTestCases: exemptTestCases.length,
    skippableTestCases: skippableTestCases,
    exemptTestCases: exemptTestCases,
  };
  analyticsClient.sendEvent(getSummaryAnalyticsPayload(testResults));
  return testResults;
};

export function shouldUseThresholdProtection(subsetOfPackages: boolean) {
  if (process.env.IGNORE_ENV_THRESHOLD === 'true') {
    return false;
  }
  return !subsetOfPackages;
}
