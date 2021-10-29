import { validateEnvVars } from '@atlaskit/build-utils/guards';
import { getChangedPackagesInfo } from '@af/utils/changed-packages';
import git from '@af/utils/git';

import { AnalyticsClient } from './lib/analytics';
import { PipelineClient } from './lib/pipeline';
import { RepoMetricsStore } from './lib/store';
import { RunFn, PipelinesStepAttributes } from './types';

type Env = {
  BITBUCKET_USER: string;
  BITBUCKET_PASSWORD: string;
  BITBUCKET_REPO_FULL_NAME: string;
  BITBUCKET_BUILD_NUMBER: string;
  BITBUCKET_COMMIT: string;
  BITBUCKET_EXIT_CODE: string;
};

const run: RunFn = async ({ options }) => {
  validateEnvVars<Env>(process.env, [
    'BITBUCKET_USER',
    'BITBUCKET_PASSWORD',
    'BITBUCKET_REPO_FULL_NAME',
    'BITBUCKET_BUILD_NUMBER',
    'BITBUCKET_COMMIT',
    'BITBUCKET_EXIT_CODE',
  ]);

  const {
    BITBUCKET_USER,
    BITBUCKET_PASSWORD,
    BITBUCKET_REPO_FULL_NAME,
    BITBUCKET_BUILD_NUMBER,
    BITBUCKET_BRANCH,
    BITBUCKET_COMMIT,
    BITBUCKET_EXIT_CODE,
    // The following are not always going to exist
    BITBUCKET_PARALLEL_STEP,
    TARGET_BRANCH,
    BITBUCKET_PR_DESTINATION_BRANCH,
  } = process.env;

  const currentStep = parseInt(BITBUCKET_PARALLEL_STEP || '0');

  const client = new AnalyticsClient({ dev: options.dev, dry: options.dryRun });

  const pipelineClient = new PipelineClient({
    auth: {
      username: BITBUCKET_USER,
      password: BITBUCKET_PASSWORD,
    },
    repoFullName: BITBUCKET_REPO_FULL_NAME,
  });

  const { changedPackages } = await getChangedPackagesInfo();
  const targetBranch =
    TARGET_BRANCH ||
    BITBUCKET_PR_DESTINATION_BRANCH ||
    (await git().getBaseBranch());

  // There is an edge case, when running a custom build on a commit where
  // - `BITBUCKET_BRANCH` will not be defined as per the implementation of BB env vars.
  // - `git().getBranchName()` will not be defined due to running on a detached `HEAD`.
  const branchName = BITBUCKET_BRANCH || (await git().getBranchName()) || '';

  const stepStore = new RepoMetricsStore();
  const {
    boltInstallStart,
    boltInstallEnd,
    boltCacheHit,
    testCacheHits,
    testCacheMisses,
    buildCacheHits,
    buildCacheMisses,
    numTestFiles,
    parallelBucketSize,
  } = stepStore.get();

  let boltInstallTime;
  if (boltInstallStart && boltInstallEnd) {
    boltInstallTime = boltInstallEnd - boltInstallStart;
  }

  const stepInfo = await pipelineClient.getStepInfo(
    BITBUCKET_BUILD_NUMBER,
    currentStep,
  );

  await client.sendEvent({
    type: 'pipelines-step',
    id: BITBUCKET_BUILD_NUMBER,
    buildType: stepInfo.type,
    branchName,
    commitHash: BITBUCKET_COMMIT,
    startedOn: stepInfo.startedOn,
    duration: stepInfo.time,
    status: BITBUCKET_EXIT_CODE === '0' ? 'success' : 'failure',
    changedPackages: changedPackages.map(pkg => pkg.name).join(','),
    numChangedPackages: changedPackages.length,
    targetBranch,
    stepName: stepInfo.name,
    stepNumber: currentStep,
    boltInstallTime,
    boltCacheHit: !!boltCacheHit,
    testCacheHits,
    testCacheMisses,
    buildCacheHits,
    buildCacheMisses,
    numTestFiles,
    parallelBucketSize,
    version: '3',
  } as PipelinesStepAttributes);
};

export default run;
