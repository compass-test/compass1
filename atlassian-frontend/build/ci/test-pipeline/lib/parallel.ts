import { RepoMetricsStore } from '@atlaskit/build-reporting';
import triggerPipeline from '@atlaskit/build-utils/bitbucket/trigger-pipeline';
import { PackageInfo } from '@atlaskit/build-utils/tools';

import {
  parallelTestConfig,
  TestConfig,
  INLINE_BUCKET,
} from '../parallel.config';

import { getTestPackageInfo } from './cache';
import { Test } from './types';

function getTestPipeline(
  testConfig: TestConfig,
  numTests: number,
  testType: Test,
) {
  const { pipelineName, buckets } = testConfig;

  const bucketEntry = Object.entries(buckets).find(
    ([, [min, max]]) => numTests >= min && numTests < max,
  );

  if (!bucketEntry) {
    throw new Error(
      `Cannot find valid bucket for running ${numTests} ${testType} tests `,
    );
  }

  const size = bucketEntry[0];

  const repoMetricsStore = new RepoMetricsStore();
  repoMetricsStore.set({
    numTestFiles: numTests,
    parallelBucketSize: size,
  });

  return {
    name: `${pipelineName}-${size}`,
    size: size,
  };
}

function getPipelineVariables(packages: PackageInfo[]) {
  // If we are in a landkid build we _must_ have a TARGET_BRANCH
  if (process.env.IS_LANDKID_BUILD && !process.env.TARGET_BRANCH) {
    throw new Error('Missing $TARGET_BRANCH env variable');
  }

  return [
    {
      key: 'CHANGED_PACKAGES',
      value: JSON.stringify(packages.map(pkg => pkg.relativeDir)),
    },
    {
      key: 'TARGET_BRANCH',
      value: process.env.TARGET_BRANCH || '',
    },
    {
      key: 'LANDKID_DEPENDENCY_COMMITS',
      value: process.env.LANDKID_DEPENDENCY_COMMITS || '',
    },
    {
      key: 'IS_LANDKID_BUILD',
      value: process.env.IS_LANDKID_BUILD || '',
    },
  ];
}

export async function runParallelTests(
  testType: Test,
  packages: PackageInfo[],
): Promise<{ success: boolean; runInline?: boolean }> {
  const testConfig = parallelTestConfig[testType];
  if (!testConfig) {
    throw new Error(
      `Missing or unsupported test config for test type "${testType}"`,
    );
  }
  const packageTestInfo = packages.map(pkg =>
    getTestPackageInfo(pkg, testType),
  );
  const numTests = packageTestInfo.reduce(
    (acc, cur) => acc + cur.files.length,
    0,
  );
  const pipeline = getTestPipeline(testConfig, numTests, testType);
  if (pipeline.size === INLINE_BUCKET) {
    console.log(
      `Running ${testType} tests from ${numTests} files of ${packages.length} packages inline`,
    );
    return { success: true, runInline: true };
  }
  const variables = getPipelineVariables(packages);
  console.log(
    `Triggering a "${pipeline.name}" pipeline to run ${testType} tests from ${numTests} files of ${packages.length} packages`,
  );
  const { success, duration } = await triggerPipeline({
    pipeline: pipeline.name,
    poll: true,
    variables,
  });
  if (duration) {
    console.log(`Pipeline duration: ${(duration / 1000).toFixed(2)}s`);
  }

  return { success };
}
