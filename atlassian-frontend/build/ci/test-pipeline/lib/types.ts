import { AggregatedResult } from '@jest/test-result';

import { PackageInfo } from '@atlaskit/build-utils/tools';

export type Test = 'unit' | 'vr' | 'webdriver';

export function getTestType(testType?: string): Test {
  const type = testType || 'unit';

  if (!['unit', 'vr', 'webdriver'].includes(type)) {
    throw new Error(`Invalid test type "${testType}"`);
  }

  return type as Test;
}

type TestSuiteResult = {
  aggregatedResult: AggregatedResult;
};

export type TestStatus = {
  exitCode: number;
  results: TestSuiteResult[];
};

export type Public<T> = { [P in keyof T]: T[P] };

export type TestablePackage = PackageInfo & { hash: string };
export type SkippedPackage = PackageInfo & {
  metadata: { [key: string]: string };
};

export type PackageCacheInfo = {
  testablePackages: TestablePackage[];
  skippedPackages: SkippedPackage[];
  packagesWithTests: PackageInfo[];
};
