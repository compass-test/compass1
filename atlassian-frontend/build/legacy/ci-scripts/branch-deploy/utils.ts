/**
 * Utility functions
 */
import spawn from 'projector-spawn';
import * as bolt from 'bolt';
import { writeJSON } from 'fs-extra';
import { join } from 'path';
import { ComprehensiveRelease } from '@changesets/types';
import { isDefined } from '@atlaskit/build-utils/guards';
import { AFPackage, AtlassianConfig } from '@atlaskit/build-utils/types';

type PackageJSONWithDeps = Exclude<bolt.PackageJSON, 'dependencies'> &
  Required<Pick<bolt.PackageJSON, 'dependencies'>>;

export type EnrichedPackage = AFPackage & {
  relativeDir: string;
  release?: ComprehensiveRelease;
};

export function getOriginBranchName(branchName: string) {
  return branchName.startsWith('origin/') ? branchName : `origin/${branchName}`;
}

export function arrayToGlob(arr: string[]): string {
  // Remove brackets, spaces and quotes
  const glob = arr.toString().replace(/[\[\]" ]/g, '');

  // Add extra braces and trailing comma to support arrays of length one
  return `{${glob},}`;
}

export function hasDependencies(pkgJson: {
  [key: string]: any;
}): pkgJson is PackageJSONWithDeps {
  return Boolean(pkgJson.dependencies);
}

export type PackageDistTags = {
  [version: string]: string;
};

async function getDistTags(packageName: string): Promise<PackageDistTags> {
  const result = await spawn('npm', ['info', packageName, '--json']);
  if (result.stderr) {
    throw new Error(result.stderr);
  }
  try {
    const json = JSON.parse(result.stdout)['dist-tags'];
    return json;
  } catch (e) {
    throw new Error(`Error parsing JSON output: ${e}`);
  }
}

const checkIfPublished = async (packageName: string, npmTag: string) => {
  let distTags;
  try {
    distTags = await getDistTags(packageName);
  } catch (e) {
    console.error(`Could not fetch dist tags for ${packageName}: ${e}`);
    return false;
  }
  return Object.keys(distTags).includes(npmTag);
};

export async function publishPackage(
  npmTag: string,
  cwd: string,
  packageName: string,
  dryRun?: boolean,
) {
  const publishArgs = ['publish', `--tag="${npmTag}"`];

  if (dryRun) {
    publishArgs.push('--dry-run');
  }
  try {
    /* We must use the default pipe option for stdio so we can capture subprocess output
     * to detect error messages. Using inherit does not allow us to do this and causes err.message
     * to be empty */
    const result = await spawn('npm', publishArgs, {
      cwd,
    });
    /* Console.log the output now that the subprocess isn't inheriting stdio from its parent */
    console.log('stdout', result.stdout);
    console.log('stderr', result.stderr);
  } catch (err) {
    /*
    We want to swallow the errors in the following scenarios:
      - re-runs (so package is already published)
      - 0.0.0-alpha-dummy is published as latest
    Everything else should rethrow and fail the build
    */
    const is403Error = err.message.includes('403 Forbidden');
    const isPublished =
      npmTag === 'latest' || (await checkIfPublished(packageName, npmTag));

    if (is403Error && isPublished) {
      console.log(
        `Detected a 403 for an already published package ${packageName}@${npmTag}`,
      );
      return;
    } else {
      console.log({ is403Error, isPublished });
    }
    throw err;
  }
}

async function publishDummyVersion(name: string, cwd: string) {
  const packageJsonPath = join(cwd, './package.json');
  /*
    For the dummy version, we set the files array to just package.json
    This makes sure we don't cause anyone headaches if for whatever reason someone ends up
    trying to use the dummy version.
   */
  await writeJSON(packageJsonPath, {
    name,
    version: '0.0.0-alpha-dummy',
    description:
      'This version should not be used, it exists to prevent the latest tag from being set to an alpha in the registry. Please ask #atlassian-frontend for help',
    files: ['./package.json'],
    publishConfig: {
      registry: 'https://packages.atlassian.com/api/npm/npm-private-snapshot/',
    },
  });

  return publishPackage('latest', cwd, name);
}

/*
  Artifactory currently has 2 bugs that require us to fiddle around with the latest tag.

  Bug #1 https://www.jfrog.com/jira/browse/RTFACT-18574
  Artifactory automatically sets the latest tag to a prerelease

  Even though we pass in a different tag for the prerelease, artifactory sets the "latest" tag to this version too.
  This wouldn't be much of an issue if it wasn't also for:

  Bug #2 ???
  When comparing the 2 latest versions between registries, prerelease is picked as newer

  Artifactory compares the latest tag returned by the normal registry and the prerelease registry.
  It then picks the highest version ignoring the prerelease status of that version.
  As a result when registry 1 return 0.2.3 and registry returns 0.2.4-alpha, the alpha version is returned.

  Fixing just bug #1 should be sufficient for us to remove this extra code again. I didn't report #2
  because it would probably just attract a philosophical discussion around how prereleases should be handled.
*/
export async function resetLatestTagInArtifactory(name: string, cwd: string) {
  try {
    // Build-eng prefers us to overwrite, because it makes cleaning up the registry easier
    await publishDummyVersion(name, cwd);
  } catch (err) {
    // If this publish fails, we'll assume the dummy version has been created already
    console.info(
      'Detected failed dummy package publish, most likely it already existed',
    );
  }

  return spawn(
    'npm',
    [
      'dist-tag',
      'add',
      '--registry=https://packages.atlassian.com/api/npm/npm-private-snapshot/',
      `${name}@0.0.0-alpha-dummy`,
      'latest',
    ],
    {
      cwd,
      stdio: 'inherit',
    },
  );
}

/** This function will enable to opt-out of triggering the product integrator and later on prevent running products CI builds.
    The opt-out logic is as follow:
     - if a package is on scheduled release, it will ignore the opt-out flag and still trigger the product inegrator & products CI builds.
     - if a package is on continuous release and all packages have the opt-out flag set to `true`, it will not trigger the product inegrator & products CI builds.
    Please note that the opt-out flag `disableProductCI` is located in the `atlassian:` metadata of the package.json.
 */
export async function checkProductIntegratorFlag(
  changedPkgsWithChangesets: EnrichedPackage[],
): Promise<boolean> {
  const pkgsJsonAtlassianConfig = changedPkgsWithChangesets
    .map(pkg => pkg.config.atlassian)
    .filter<AtlassianConfig>(isDefined);

  const isPkgOnContinuous = pkgsJsonAtlassianConfig.every(
    ({ releaseModel }) => releaseModel === 'continuous',
  );

  const isProductCiOptOut = pkgsJsonAtlassianConfig.every(
    ({ disableProductCI }) => disableProductCI === true,
  );

  return isPkgOnContinuous && isProductCiOptOut;
}
