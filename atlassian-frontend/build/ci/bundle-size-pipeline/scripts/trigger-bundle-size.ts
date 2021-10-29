import { triggerPipeline } from '@atlaskit/build-utils/bitbucket';
import { getTargetBranch } from '@atlaskit/build-utils/git';
import {
  getChangedPackages,
  getChangedPackagesWithDependents,
} from '@atlaskit/build-utils/packages';
import { containsBranchPrefix } from '@atlaskit/build-utils/branchPrefixes';

const BRANCH_EXACT_OPTOUTS = ['master', 'develop'];
const BRANCH_PREFIX_OPTOUTS = ['merge-branch/'];

// The `bundle size` tool does not need to run against those packages as they are either private or helpers not shipped to customer.
const excludedPackages = [
  'monorepo-tooling',
  'service-support',
  'editor-test-helpers',
  'media-test-helpers',
];

async function getPackagesForBundleSizeRun(
  branch: string,
  excludedPackages: string[],
) {
  const targetBranch = await getTargetBranch();

  const changedPackages = await getChangedPackages(branch, targetBranch);

  const changedPackagesWithDependents = (
    await getChangedPackagesWithDependents(changedPackages, 'direct')
  ).filter(
    (pkgDir) =>
      pkgDir.includes('packages/') &&
      !excludedPackages.some((exPkg) => pkgDir.includes(exPkg)),
  );

  return {
    targetBranch,
    changedPackages: changedPackages.map((pkg) => pkg.relativeDir),
    changedPackagesWithDependents,
  };
}

async function main() {
  const branch = process.env.BITBUCKET_BRANCH;

  if (!branch) {
    throw new Error(
      '$BITBUCKET_BRANCH variable not set. Must run pipeline in a branch context',
    );
  }

  if (
    containsBranchPrefix(branch, BRANCH_PREFIX_OPTOUTS) ||
    BRANCH_EXACT_OPTOUTS.some((name) => branch === name)
  ) {
    console.log(`Skipping pipeline due to branch prefix.`);
    return;
  }

  const {
    targetBranch,
    changedPackages,
    changedPackagesWithDependents,
  } = await getPackagesForBundleSizeRun(branch, excludedPackages);

  const numChangedPackagesWithDeps = changedPackagesWithDependents.length;

  if (numChangedPackagesWithDeps === 0) {
    console.log('Skipping pipeline due to no changed packages.');
    return;
  }
  const pipeline =
    numChangedPackagesWithDeps >= 10
      ? 'run-bundle-size-large'
      : 'run-bundle-size-small';

  console.log(
    `Running "${pipeline}" pipeline for ${numChangedPackagesWithDeps} changed packages (including direct dependents)`,
  );
  const { skipped } = await triggerPipeline({
    pipeline,
    variables: [
      {
        key: 'TARGET_BRANCH',
        value: targetBranch,
      },
      {
        key: 'MAIN_PACKAGES',
        value: changedPackages.join(' '),
      },
      {
        key: 'CHANGED_PACKAGES',
        value: changedPackagesWithDependents.join(' '),
      },
    ],
    onlyLatest: true,
  });
  if (skipped) {
    return;
  }
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
