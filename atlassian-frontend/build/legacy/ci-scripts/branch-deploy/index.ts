/**
 * Branch deploys Atlassian Frontend packages to a private registry,
 * making them available to be installed by branch-deploy-product-integrator.
 * Except - Editor mobile bridge that still uses the s3 public bucket.
 */
import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import getReleasePlan from '@changesets/get-release-plan';
import * as bolt from 'bolt';
import cloneDeep from 'lodash/cloneDeep';
import meow from 'meow';

import { AFPackage, BranchDeployManifest } from '@atlaskit/build-utils/types';

import {
  arrayToGlob,
  hasDependencies,
  publishPackage,
  resetLatestTagInArtifactory,
  EnrichedPackage,
} from './utils';
// @ts-ignore - required to pass typechecking since allowJs isn't set there
import uploadBuildArtefactForCommit from '../upload.build.artefact.for.commit';

const exceptionPackages = ['@atlaskit/editor-mobile-bridge'];

/**
 * Branch deploys packages with changesets on the current commit specified by `commitHash`.
 *
 * Flags:
 *   --packages             Comma separated list of packages to branch deploy instead of inferring from changesets
 *   --s3                   Use the previous S3 CDN to branch deploy (only for editor mobile bridge)
 *   --dryRun               Makes npm publish dry-run
 *
 * Required Environment variables:
 *  BITBUCKET_COMMIT
 *
 * Pre-requisites: Changed packages must be built, i.e. `yarn build`
 *
 * Must be run from the root project directory
 */
export default async function main(
  commitHash: string,
  opts: {
    packages?: string;
    s3?: boolean;
    dryRun?: boolean;
  } = {},
) {
  const cwd = process.cwd();
  if (!commitHash) {
    throw new Error('Missing bitbucket commit hash!');
  }

  const changedPackagesFromChangesets = await getChangedPackagesFromChangesets(
    cwd,
    opts.packages,
    opts.s3,
  );

  console.log(
    `Changed packages from changesets: ${changedPackagesFromChangesets.map(
      pkg => pkg.name,
    )}`,
  );

  const shortCommitHash = opts.s3 ? commitHash : commitHash.substr(0, 12);

  const packages = await bolt.getWorkspaces({
    cwd,
    onlyFs: arrayToGlob(
      changedPackagesFromChangesets.map(pkg => pkg.relativeDir),
    ),
  });

  // This step is only for editor mobile bridge.
  if (opts.s3) {
    const outputPath = 'dists';

    const exceptionsPkgsFromChangesets = changedPackagesFromChangesets.filter(
      pkg => exceptionPackages.includes(pkg.name),
    );

    const exceptionsPkgs = await bundleEditorMobileBridge(
      outputPath,
      exceptionsPkgsFromChangesets,
    );

    const publicUrl = await uploadBuildArtefactForCommit({
      artefactPath: outputPath,
      s3PathPrefix: '',
      isDir: true,
    });

    console.log(`Manifest: ${publicUrl}/manifest.json`);
    exceptionsPkgs.forEach(pkg => {
      const urlPath = path.relative(outputPath, pkg.targetPath);
      console.log(`${pkg.name}: ${publicUrl}/${urlPath}`);
    });
    process.exit(0);
  }

  updatePackageJsons(shortCommitHash, changedPackagesFromChangesets);

  await Promise.all(
    packages.map(async ({ name, dir }) => {
      await publishPackage(commitHash, dir, name, opts.dryRun);
      await resetLatestTagInArtifactory(fixSoxPkgName(name), dir);
    }),
  );

  console.log('Success');
}

const BRANCH_DEPLOY_SUPPORTED_SCOPES = [
  '@atlassian',
  '@atlassiansox', //Asox gets it's scope changed before publishing
  '@atlaskit',
];

export async function getChangedPackagesFromChangesets(
  cwd: string,
  explicitPackages?: string,
  s3?: boolean,
): Promise<EnrichedPackage[]> {
  const packages: AFPackage[] = await bolt.getWorkspaces({ cwd });
  const enrichedPackages = await addReleaseInfo(packages, cwd);
  let changedPackagesFromChangesets;
  if (explicitPackages) {
    const packagesArr = explicitPackages.split(',');
    changedPackagesFromChangesets = enrichedPackages.filter(pkg =>
      packagesArr.includes(pkg.name),
    );
  } else {
    changedPackagesFromChangesets = enrichedPackages.filter(
      pkg => pkg.release && pkg.release.type !== 'none',
    );
  }

  // Only branch deploy public packages if s3 (editor mobile bridge)
  if (s3) {
    return changedPackagesFromChangesets.filter(
      pkg => pkg.name.startsWith('@atlaskit/') && pkg.config.private !== true,
    );
  }

  return changedPackagesFromChangesets.filter(
    pkg =>
      BRANCH_DEPLOY_SUPPORTED_SCOPES.find(scope =>
        pkg.name.startsWith(`${scope}/`),
      ) && pkg.config.private !== true,
  );
}

export const fixSoxPkgName = (name: string) =>
  name.replace(
    '@atlassiansox/',
    '@atlassian/not-sox-', // Adding a not-sox prefix to make it super obvious and to prevent name clashes
  );

/* Updates each `packages` package.json in the following ways:
 * - Bumps `version` corresponding to the package's changeset(s)
 *   This is required so that transitive dependencies point to the latest version. This replicates what happens in a release
 *   when packages are released together.
 */
function updatePackageJsons(
  commitHash: string,
  enrichedPackages: EnrichedPackage[],
) {
  const normalisedCommit = commitHash.substr(0, 12);
  // Clone package.json and update version field
  const updatedVersionPkgs = enrichedPackages.map(pkg => {
    const pkgJson = cloneDeep(pkg.config);
    if (!pkgJson.version) {
      throw new Error(`Missing version field for ${pkg.name}: ${pkgJson}`);
    }
    if (pkg.release) {
      pkgJson.version = pkg.release.newVersion;
      pkgJson.version += `-alpha-${normalisedCommit}`;
    }
    return { name: pkg.name, dir: pkg.dir, pkgJson };
  });
  // Update dependencies field
  updatedVersionPkgs.forEach(({ dir, pkgJson }) => {
    pkgJson.publishConfig = {
      registry: 'https://packages.atlassian.com/api/npm/npm-private-snapshot/',
    };

    if (pkgJson.name.startsWith('@atlassiansox/')) {
      pkgJson.name = fixSoxPkgName(pkgJson.name);
    }

    if (hasDependencies(pkgJson)) {
      Object.keys(pkgJson.dependencies).forEach(depName => {
        const changedDep = updatedVersionPkgs.find(p => p.name === depName);
        if (changedDep) {
          const depVersion = changedDep.pkgJson.version;
          if (!depVersion) {
            throw new Error(`Missing version field for ${changedDep.name}`);
          }

          let newDependencyVersionPath = pkgJson.dependencies[depName];
          if (depName.startsWith('@atlassiansox/')) {
            newDependencyVersionPath = `npm:${fixSoxPkgName(
              depName,
            )}@${depVersion}`;
          } else {
            newDependencyVersionPath = depVersion;
          }

          pkgJson.dependencies[depName] = newDependencyVersionPath;
          console.log(
            `Updating dep of ${pkgJson.name}: ${changedDep.name} - ${newDependencyVersionPath}`,
          );
        }
      });
    }
    const pkgJsonPath = path.join(dir, 'package.json');
    const pkgJsonStr = JSON.stringify(pkgJson, null, 2);
    console.log(`Updating package.json at ${pkgJsonPath}`);
    fs.writeFileSync(pkgJsonPath, pkgJsonStr);
  });
}
// We now bundle only Editor mobile bridge.
async function bundleEditorMobileBridge(
  outputDir: string,
  exceptionsPackages: EnrichedPackage[],
) {
  await bolt.workspacesExec({
    command: 'npm',
    commandArgs: ['pack'],
    spawnOpts: {},
    filterOpts: {
      onlyFs: arrayToGlob(exceptionsPackages.map(pkg => pkg.relativeDir)),
    },
  });
  fs.mkdirSync(outputDir);
  const manifest: BranchDeployManifest = {};
  // Copy the tgz's
  exceptionsPackages.forEach(pkg => {
    const tarFiles = fs
      .readdirSync(pkg.dir)
      .filter(file => file.endsWith('.tgz'));

    if (tarFiles.length !== 1) {
      console.log(tarFiles);
      throw new Error(
        `Expected exactly 1 .tgz file, found: ${tarFiles.length}`,
      );
    }

    const tarFile = tarFiles[0];
    const fromFile = path.join(pkg.dir, tarFile);
    const toFile = path.join(outputDir, tarFile);
    console.log('Copying tgz file: ', fromFile, toFile);
    fs.copyFileSync(fromFile, toFile);

    manifest[pkg.name] = {
      tarFile,
    };
  });

  // Write manifest.json file
  const metaDataFilePath = path.join(outputDir, 'manifest.json');
  console.log('Writing manifest.json file', metaDataFilePath);
  fs.writeFileSync(metaDataFilePath, JSON.stringify(manifest, null, 2));

  // Handle Editor mobile bridge.
  return handleExceptionPackages(outputDir, exceptionsPackages);
}

/**
 * This handles the processing of any exception packages that aren't sufficiently handled by `bundlePackages`.
 *
 * Currently, the only package is @atlaskit/editor-mobile-bridge which is prebundled before publishing to npm.
 * MobileKit currently rely on an unarchived version of packages to easily switch between different versions at runtime. For packages uploaded to npm they utilise unpkg as it is unarchived. Therefore to provide a similar experience for branch deploys, we upload the unarchived dist folder.
 */
async function handleExceptionPackages(
  outputDir: string,
  packages: EnrichedPackage[],
) {
  const foundExceptionPackages = packages
    .filter(pkg => exceptionPackages.includes(pkg.name))
    .map(pkg => ({
      ...pkg,
      distPath: path.join(pkg.dir, 'dist'),
      targetPath: path.join(
        outputDir,
        pkg.name.replace('/', '-').replace('@', ''),
        'dist',
      ),
    }));
  for (const pkg of foundExceptionPackages) {
    console.log(
      `Copying ${pkg.name} dist folder from ${path.relative(
        process.cwd(),
        pkg.distPath,
      )} to ${pkg.targetPath}`,
    );
    // FIXME: Temp workaround for AFP-2852 where mobile bridge isn't built when it should be
    await fse.mkdirp(pkg.distPath);
    await fse.copy(pkg.distPath, pkg.targetPath);
  }
  return foundExceptionPackages;
}

/**
 * Adds any release information to `packages` that have changesets
 */
async function addReleaseInfo(packages: AFPackage[], cwd: string) {
  const releasePlan = await getReleasePlan(cwd);
  return packages.map(pkg => {
    const release = releasePlan.releases.find(
      release => release.name === pkg.name,
    );
    return {
      ...pkg,
      relativeDir: path.relative(cwd, pkg.dir),
      release,
    };
  });
}

if (require.main === module) {
  const cli = meow('', {
    description: 'Branch deploys packages that would be released',
    flags: {
      packages: {
        type: 'string',
      },
      s3: {
        type: 'boolean',
        default: false,
      },
    },
  });
  main(cli.input[0], cli.flags).catch(e => {
    console.error(e);
    process.exit(1);
  });
}
