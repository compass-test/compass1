import { getWorkspacesSync } from '@atlaskit/build-utils/getWorkspacesSync';
import { AFPackage } from '@atlaskit/build-utils/types';

export function toPackagePaths(pkg: AFPackage) {
  return pkg.dir.substr(pkg.dir.indexOf('packages/'));
}

export function isScheduledRelease(pkg: AFPackage) {
  return pkg.config.atlassian?.releaseModel === 'scheduled';
}

export function isContinuousRelease(pkg: AFPackage) {
  return pkg.config.atlassian?.releaseModel === 'continuous';
}

export function isPackage(pkg: AFPackage) {
  return pkg.dir.includes('/packages/') && !!pkg.config.atlassian;
}

export function getPackages() {
  return getWorkspacesSync();
}

/**
 * Note: Be careful when adjusting console logs in this file
 * as they're including in the stdout from this file which
 * gets written to disk. Additions will need to adjust the
 * truncation line number within the below file:
 *
 * `packages/monorepo-tooling/skip-inconsistent-tests/src/ci/generate-packages.sh`
 *
 * `| sed -n '4 p' \` where 4 is the line number we truncate from
 * to get package paths and discard additional logs.
 */
export function getPackagesForBranch() {
  const packages = getPackages().filter(isPackage);

  const { DESTINATION_BRANCH, BITBUCKET_BRANCH } = process.env;
  const branch: string = DESTINATION_BRANCH || BITBUCKET_BRANCH || 'unknown';
  let pkgs: AFPackage[];
  let releaseModel: 'continuous' | 'scheduled';

  if (branch === 'master') {
    pkgs = packages.filter(isContinuousRelease);
    releaseModel = 'continuous';
  } else if (branch === 'develop' || branch.startsWith('release-candidate/')) {
    pkgs = packages.filter(isScheduledRelease);
    releaseModel = 'scheduled';
  } else {
    // Unfiltered for other branches
    console.log(`Branch is '${branch}'. Tests will run for all packages.`);
    return '';
  }

  // Filtered for mainline branches
  console.log(
    `Branch is '${branch}'. Tests will only run for ${releaseModel} release packages (${pkgs.length} of ${packages.length}):`,
  );
  const packagePaths = pkgs.map(toPackagePaths);

  // Return space separated list for use with test runner CLI params.
  return packagePaths.join(' ');
}

if (require.main === module) {
  try {
    // Output to stdout
    console.log(getPackagesForBranch());
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
