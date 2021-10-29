import fs from 'fs';
import path from 'path';
import git from './git';
import { getBuildInfo } from './build-info';
import { RepoPackage } from './types';

export type ChangedPackagesInfo = {
  changedFiles: Array<string>;
  changedPackages: Array<RepoPackage>;
};

/**
 * Takes an array of files and returns a list of packages they belong to
 */
export async function getChangedPackagesFromFiles(files: string[]) {
  const { packages } = await getBuildInfo();
  const fileNameToPackage = (fileName: string) =>
    packages.find(pkg => fileName.startsWith(pkg.relativeDir + path.sep));

  const changedPackages = files
    .map(fileName => fileNameToPackage(fileName))
    // remove nulls (files that weren't in a pkg)
    .filter(Boolean)
    // remove duplicates
    .filter((pkg, idx, allPkgs) => allPkgs.indexOf(pkg) === idx);

  // explicit typing here is because filter(Boolean) doesn't change the type
  return changedPackages as Array<RepoPackage>;
}

/**
 * Returns a list of packages that have changed since a git ref
 */
export async function getChangedPackagesSinceRef(ref: string) {
  const { rootDir } = await getBuildInfo();
  const changedFiles = await git(rootDir).getChangedFilesSinceRef(ref);
  return getChangedPackagesFromFiles(changedFiles);
}

/**
 * Returns a list of changed files and packages between your branch and
 * your base branch. This should be what you need 99% of the time, if you're
 * certain you need something more specific, use getChangedPackagesSinceRef
 * or git.getChangedFilesSinceRef and getChangedPackagesFromFiles together
 * if you need both files and packages.
 */
export async function getChangedPackagesInfo() {
  const { rootDir } = await getBuildInfo();
  const changedFiles = await git(rootDir).getChangedFilesSinceBaseBranch();

  const changedPackagesInfo: ChangedPackagesInfo = {
    changedFiles,
    changedPackages: await getChangedPackagesFromFiles(changedFiles),
  };
  return changedPackagesInfo;
}

/**
 * A synchronous method for getting the changedPackages / files in CI.
 * You should only need to call this if you need changed packages / files info in a
 * non-async environment (i.e jest.config.js), otherwise, use the getChangedPackagesInfoSync() fn
 * instead
 * Assumptions:
 *    Must run after `yarn ci write-changed-packages-info` has been called
 */
export function getChangedPackagesInfoSync() {
  const changedPackagesInfoPath = path.join(
    __dirname,
    '..',
    '..',
    'changed-packages-info.json',
  );
  if (!fs.existsSync(changedPackagesInfoPath)) {
    throw new Error(
      'changed-packages-info.json not found, have you run `yarn ci write-changed-packages-info` first?',
    );
  }

  const buildInfoFileStr = fs.readFileSync(changedPackagesInfoPath, 'utf-8');

  return JSON.parse(buildInfoFileStr) as ChangedPackagesInfo;
}
