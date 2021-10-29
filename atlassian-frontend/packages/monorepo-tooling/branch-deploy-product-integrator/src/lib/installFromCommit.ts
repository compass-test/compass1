import { promises as fs } from 'fs';
import getReleasePlan from '@changesets/get-release-plan';
import { AFPackageJson } from '@atlaskit/build-utils/types';
import spawndamnit from 'spawndamnit';

import { convertSoxToNotSox, convertNotSoxToSox } from './util';

export class ValidationError extends Error {}

const defaultOptions = {
  cmd: 'add',
  dryRun: false,
  engine: 'yarn',
  extraArgs: [],
  packages: 'all',
  s3: false,
  installFromRegistry: false,
};

type Options = {
  cmd: string;
  dryRun: boolean;
  engine: string;
  extraArgs: string[];
  packages: string;
  s3: boolean;
  installFromRegistry?: boolean;
};

type Default<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type UserOptions = Default<Options, keyof typeof defaultOptions>;

function flattenDeep<T>(arr1: Array<T | T[]>): T[] {
  return arr1.reduce(
    (acc: T[], val: T | T[]) =>
      Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
    [],
  );
}

/**
 * Get release information to `packages` that have changesets
 */
async function getReleaseInfo(
  packageNames: string[],
  commitHash: string,
  cwd: string,
) {
  const releasePlan = await getReleasePlan(cwd);
  return releasePlan.releases
    .filter(({ name }) => packageNames.includes(name))
    .map(release => ({
      ...release,
      // TODO: Ideally we restructure the branch deploy code so we can re-use this logic across installing and deploying
      newVersion: `${release.newVersion}-alpha-${commitHash}`,
    }));
}

/**
 * Get atlassian frontend packages installed in the product.
 */
async function getInstalledAtlassianFrontendDependencies(productPath: string) {
  let packageJSON: AFPackageJson;

  packageJSON = JSON.parse(
    (await fs.readFile(`${productPath}/package.json`, 'utf8')).toString(),
  );

  // Declare these with a const assertion so the type does not get widened to string[]
  // This allows us to access packageJson[depType] without it having a string index property
  const dependencyFields = [
    'dependencies',
    'devDependencies',
    'bundledDependencies',
    'optionalDependencies',
    'peerDependencies',
  ] as const;

  const afDependencies = flattenDeep(
    dependencyFields
      .filter(depType => typeof packageJSON[depType] === 'object')
      .map(depType => {
        return Object.entries(packageJSON[depType] as {})
          .filter(
            ([name]) =>
              name.startsWith('@atlaskit') || name.startsWith('@atlassian'),
          )
          .map(([name]) => name);
      }),
  );

  return afDependencies.filter((item, i) => afDependencies.indexOf(item) === i);
}

export const filteredPackagesPerProduct = (
  pkgs: string[],
  productPkgs: string[],
) => pkgs.filter(pkgName => productPkgs.includes(pkgName));

export function validateOptions(
  commitHash: string,
  options: UserOptions,
): options is Options {
  const errors: string[] = [];
  const { engine, cmd } = options;

  if (!commitHash || commitHash.length < 12) {
    errors.push('Commit hash is required and must be at least 12 characters');
  }
  if (!engine || !['yarn', 'bolt'].includes(engine)) {
    errors.push('engine must be one of [yarn, bolt]');
  }
  if (!cmd || !['add', 'upgrade'].includes(cmd)) {
    errors.push('cmd must be one of [add, upgrade]');
  }
  if (errors.length > 0) {
    throw new ValidationError(`Validation error: ${errors.join('\n')}`);
  }

  return true;
}

const independentUpgradesRegex = /--next$/;

const specialAsoxAliasPackagesRegex = new RegExp(
  '^(@atlassiansox/)(.*?)(--next)?$',
);

export const getRealPackageName = (installedPackageName: string) => {
  if (installedPackageName.startsWith('@atlassiansox')) {
    return installedPackageName.replace(
      specialAsoxAliasPackagesRegex,
      '@atlassian/not-sox-$2',
    );
  }

  return installedPackageName.replace(independentUpgradesRegex, '');
};

export const getNpmPackageInstallLine = (
  installedPackageName: string, // Name of how the package is installed in the target repo
  fullCommitHash: string,
) => {
  const realPackageName = getRealPackageName(installedPackageName);
  if (realPackageName !== installedPackageName) {
    return `${installedPackageName}@npm:${getRealPackageName(
      installedPackageName,
    )}@${fullCommitHash}`;
  }
  return `${installedPackageName}@${fullCommitHash}`;
};

/**
 * Returns the number of packages that have been installed
 */
export async function installFromCommit(
  versionQuery = '',
  afPath: string,
  productPath: string,
  options: UserOptions = {},
): Promise<number> {
  const commitHash = versionQuery.substr(0, 12);
  if (!validateOptions(versionQuery, options)) {
    return 0;
  }

  console.info('Running with options:');
  console.info({ ...options, commitHash });

  const { engine, cmd, extraArgs } = options;

  const afDependencies = await getInstalledAtlassianFrontendDependencies(
    productPath,
  );

  const afDependenciesNotSox = convertSoxToNotSox(afDependencies);

  const changedPackages = options.packages.split(',');

  const filteredPackages = filteredPackagesPerProduct(
    changedPackages,
    afDependenciesNotSox,
  );

  if (filteredPackages.length === 0) {
    console.log('No packages to install.');
    return 0;
  }

  const packagesToInstall = (
    await getReleaseInfo(
      convertNotSoxToSox(filteredPackages),
      commitHash,
      afPath,
    )
  ) // In order to find the release plan for sox packages, we need to tansform packages back to sox.
    .map(({ name, newVersion }) => ({
      packageName: name,
      versionQuery: newVersion,
    }));

  const commands = [packagesToInstall].map(pkgs => {
    const packageVersions = pkgs.map(({ packageName, versionQuery }) => {
      console.log(`Notice: Installing ${packageName}@${versionQuery}`);
      return getNpmPackageInstallLine(packageName, versionQuery);
    });
    return [cmd, ...extraArgs, ...packageVersions];
  });

  if (options.dryRun) {
    console.log('[Dry run] would have run command(s):');
    commands.forEach(command => {
      console.log(`${engine} ${command.join(' ')}`);
    });
    return 0;
  }
  console.log('Running command(s):');
  commands.forEach(command => {
    console.log(`${engine} ${command.join(' ')}`);
  });

  for (const cmd of commands) {
    try {
      await spawndamnit(engine, cmd, {
        stdio: 'inherit',
        shell: process.stdout.isTTY,
      });
    } catch (err) {
      console.log(err.toString());
      throw err;
    }
  }

  return packagesToInstall.length;
}
