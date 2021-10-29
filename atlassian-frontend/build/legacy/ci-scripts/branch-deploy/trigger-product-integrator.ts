import { triggerPipeline } from '@atlaskit/build-utils/bitbucket';
import { containsBranchPrefix } from '@atlaskit/build-utils/branchPrefixes';
import { getChangedPackagesFromChangesets, fixSoxPkgName } from './index';
import { checkProductIntegratorFlag } from './utils';

const BRANCH_PREFIX_OPTOUTS = ['skip-product/'];
const BRANCH_EXACT_OPTOUTS = ['master'];

async function returnChangedPackagesFromChangesets() {
  const cwd = process.cwd();

  const changedPackagesWithChangesets = await getChangedPackagesFromChangesets(
    cwd,
    undefined,
    false,
  );

  return changedPackagesWithChangesets;
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
    BRANCH_EXACT_OPTOUTS.some(name => branch === name)
  ) {
    console.log(
      'Skipping product integrator due to branch prefix escape-hatch',
    );
    return;
  }

  const changedPackagesWithChangesets = await returnChangedPackagesFromChangesets();

  if (changedPackagesWithChangesets.length === 0) {
    console.log('There are no packages to be branch deployed!');
    return;
  }

  const shouldSkipProductIntegrator = await checkProductIntegratorFlag(
    changedPackagesWithChangesets,
  );

  if (shouldSkipProductIntegrator) {
    console.log(
      'Skipping product integrator as all branch deployed packages are on continuous release and have opted out of product integration.',
    );
    return;
  }

  // By design, build-eng would never allow anyone to publish to atlassiansox from a non-sox branch.
  // The workaround is to publish them as `@atlassian-not-sox`, hence the change below.
  const changedPackagesToBranchDeploy = changedPackagesWithChangesets
    .map(pkg => fixSoxPkgName(pkg.name))
    .join(',');

  const { skipped } = await triggerPipeline({
    pipeline: 'product-integrator-build',
    variables: [
      {
        key: 'PACKAGES',
        value: changedPackagesToBranchDeploy,
      },
    ],
    onlyLatest: true,
  });
  if (skipped) {
    return;
  }
}

if (require.main === module) {
  main().catch(e => {
    console.error(e);
    process.exit(1);
  });
}
