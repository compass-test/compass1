import {
  INTEGRATION_STEP_ID_FILE,
  INTEGRATION_TESTS_REPORT_FILE,
  MOBILE_INTEGRATION_TESTS_REPORT_FILE,
  MOBILE_STEP_ID_FILE,
  TEST_REPORT_DIR,
  VR_STEP_ID_FILE,
  VR_TESTS_REPORT_FILE,
} from '../constants';
import { fileExists } from '../io/io';
import { loadReport } from '../io/reports';
import { determinePublishedPackageNameForFilePath } from '../package-metadata/json-parsing';
import {
  PackageAggregatedSkippedTests,
  PackageSkippedTests,
  Test,
  TestType,
} from '../types';

/**
 * Parse the test reports to obtain tests grouped by package
 */
export const getParsedTests = async (
  reportsPath: string,
): Promise<PackageAggregatedSkippedTests> => {
  const data: PackageAggregatedSkippedTests = {};
  console.log(`Load JSON reports for all test types...`);
  await Promise.all([
    loadAndMergeData(data, 'vr', reportsPath),
    loadAndMergeData(data, 'integration', reportsPath),
    loadAndMergeData(data, 'mobile', reportsPath),
  ]);
  return data;
};

/**
 * Mutate the data object to group skipped tests by test type per package.
 */
export function mergePackageTests(
  data: PackageAggregatedSkippedTests,
  type: TestType,
  tests: PackageSkippedTests,
) {
  for (let pkgName of Object.keys(tests)) {
    if (!data[pkgName]) {
      data[pkgName] = { total: 0 };
    }
    data[pkgName][type] = tests[pkgName];
    data[pkgName].total += tests[pkgName].length;
  }
}

/**
 * Load the report file and group the data by package name
 */
export async function loadAndMergeData(
  data: PackageAggregatedSkippedTests,
  type: TestType,
  baseDir: string,
) {
  let stepIdFilename: string;
  let reportFilename: string;
  switch (type) {
    case 'vr':
      stepIdFilename = VR_STEP_ID_FILE;
      reportFilename = VR_TESTS_REPORT_FILE;
      break;
    case 'integration':
      stepIdFilename = INTEGRATION_STEP_ID_FILE;
      reportFilename = INTEGRATION_TESTS_REPORT_FILE;
      break;
    case 'mobile':
      stepIdFilename = MOBILE_STEP_ID_FILE;
      reportFilename = MOBILE_INTEGRATION_TESTS_REPORT_FILE;
      break;
  }
  const pipelineStepId = await loadPipelineStepId(baseDir, stepIdFilename);
  const tests = await parseReportAndExtactTests(
    pipelineStepId,
    reportFilename,
    baseDir,
  );
  mergePackageTests(data, type, tests);
}

/**
 * Load the Pipeline Step ID from the supplied CI artifact
 */
export async function loadPipelineStepId(
  filePath: string,
  stepFilename: string,
) {
  let pipelineStepId = '';
  if (filePath.endsWith('/')) {
    filePath = filePath.substr(0, filePath.length - 1);
  }
  try {
    pipelineStepId =
      (await loadReport<string>(
        filePath.replace('/test-reports', `/${stepFilename}`),
      )) || '';
  } catch (error) {
    console.warn(`Failed to find stepid via ${stepFilename}`, error.message);
  }
  return pipelineStepId;
}

/**
 * Parse Junit report and extract tests into our mutable structure.
 */
export async function parseReportAndExtactTests(
  pipelineStepId: string,
  reportFile: string,
  basePath = TEST_REPORT_DIR,
): Promise<PackageSkippedTests> {
  const filePath = `${basePath}/${reportFile}`;
  if (!fileExists(filePath)) {
    console.warn(`No report found for ${filePath}`);
    return {};
  }

  const packageTests: PackageSkippedTests = {};
  const skippedTests = await loadReport<Test[]>(filePath);
  if (skippedTests) {
    for (const test of skippedTests) {
      // Store pipeline step ID for later use
      test.pipelineStepId = pipelineStepId;

      const packageName = await determinePublishedPackageNameForFilePath(test);
      if (packageName) {
        if (!packageTests[packageName]) {
          packageTests[packageName] = [];
        }
        packageTests[packageName].push(test);
      }
    }
  }
  return packageTests;
}
