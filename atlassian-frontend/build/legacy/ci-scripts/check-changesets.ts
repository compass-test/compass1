/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import chalk from 'chalk';
import git from '@atlaskit/build-utils/git';
import getReleasePlan from '@changesets/get-release-plan';
import { getChangedPackagesWithMandatoryChangesetSinceCommit } from '@atlaskit/build-utils/packages';
import { containsBranchPrefix } from '@atlaskit/build-utils/branchPrefixes';
import { AFPackageWithRelativeDir } from '@atlaskit/build-utils/types';

const BRANCH_PREFIX_OPTOUTS = [
  'no-changeset/',
  'renovate/no-changeset/',
  'merge-branch/',
  'release-candidate/',
];

const BRANCH_EXACT_OPTOUTS = ['develop', 'master'];

const missingChangesetsMessage = (missingChangesets: string[]) => chalk`
{bold.red The following packages have changes that probably need a changeset:}
  ${missingChangesets.join('\n  ')}

{bold Use the command {yellow "bolt changeset"} to add a changeset for your changes.}
The changesets are used to determine what needs to be published to npm.
For more info: https://developer.atlassian.com/cloud/framework/atlassian-frontend/development/07-versioning/

{bold Does your change not need to be released? Either:}
  {blue 1. [PREFERRED]} Create a none changeset for the package(s) with {yellow "bolt changeset --none"}
  2. Opt-out entirely using the {yellow "no-changeset/"} branch prefix
`;

const { BITBUCKET_BRANCH, BITBUCKET_PR_DESTINATION_BRANCH } = process.env;

async function main() {
  const branch = BITBUCKET_BRANCH || (await git.getBranchName());

  let sinceRef;
  // `BITBUCKET_PR_DESTINATION_BRANCH` is only defined in `pull-request` build.
  // We need to fetch to make sure the `release-candidate/*` exists in the tree.
  if (BITBUCKET_PR_DESTINATION_BRANCH) {
    await git.fetchOrigin(BITBUCKET_PR_DESTINATION_BRANCH);
    sinceRef = `origin/${BITBUCKET_PR_DESTINATION_BRANCH}`;
  } else {
    sinceRef = git.getOriginBranchName(
      await git.getTargetBranch(branch, undefined, true),
    );
  }

  if (
    containsBranchPrefix(branch, BRANCH_PREFIX_OPTOUTS) ||
    BRANCH_EXACT_OPTOUTS.some(name => branch === name)
  ) {
    console.log(`Changesets escape-hatch detected, skipping changesets check`);
    process.exit(0);
  }

  const [releasePlan, changedPackages] = await Promise.all([
    getReleasePlan(process.cwd(), sinceRef),
    getChangedPackagesWithMandatoryChangesetSinceCommit(sinceRef),
  ]);

  const packagesWithChangesets = releasePlan.releases
    .filter(release => release.changesets.length)
    .map(release => release.name);

  const missingChangesets = changedPackages
    .filter(
      (pkg: AFPackageWithRelativeDir) =>
        !packagesWithChangesets.includes(pkg.name) && !pkg.config.private,
    )
    .map(({ name }: AFPackageWithRelativeDir) => name);

  if (missingChangesets.length > 0) {
    throw missingChangesetsMessage(missingChangesets);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
