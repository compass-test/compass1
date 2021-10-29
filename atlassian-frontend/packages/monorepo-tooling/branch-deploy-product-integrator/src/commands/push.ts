import { promises as fsp } from 'fs';
import * as fs from 'fs';
import chalk from 'chalk';
import path from 'path';
import gitP, { SimpleGit } from 'simple-git/promise';
import spawn from 'projector-spawn';
import util from 'util';
import childProcess from 'child_process';

import { ReleaseBranchPrefix } from '@atlaskit/scheduled-releases/constants';
import runCodemods, { NoTransformsExistError } from '@atlaskit/codemod-cli';
import {
  triggerProductBuild,
  getLatestBuildUrlInformation,
} from '@atlaskit/build-utils/bamboo';
import uploadBuildStatus from '@atlaskit/build-utils/bitbucket/upload-build-status';

import { installFromCommit } from '../lib/installFromCommit';
import { versionFileName, branchPrefix } from '../lib/constants';
import {
  checkoutOrCreate,
  commit,
  isBranchModified,
  merge,
  mergeBase,
  resetBranch,
  resetFiles,
  safePush,
} from '../lib/git';
import { deduplicate, getWorkspacePkgJsons } from '../lib/packageEngine';
import { Default } from '../lib/util';
import {
  convertSoxToNotSox,
  createBranchName,
  exportVariable,
} from '../lib/util';

import { ValidationError, ErrorType, BranchMetadata } from '../types';

import { getConfig } from '../config';

const exec = util.promisify(childProcess.exec);
const readdir = util.promisify(fs.readdir);

const { PRODUCT_CI_TOKEN } = process.env;

// prettier-ignore
export const HELP_MSG = `
  🚀 Atlassian Frontend branch deploy product integrator™ 🚀

  ${chalk.yellow('push <afBranchName> <afCommitHash>')} Installs an atlassian frontend branch deploy and pushes it to a product repo

  where ${chalk.yellow('<afBranchName>')} is the name of the Atlassian Frontend branch being installed and ${chalk.yellow('<afCommitHash>')} is the atlassian frontend commit hash of the branch deploy that needs to be installed.

   ${chalk.green('Options')}
     ${chalk.yellow('--branchModel')} Whether to merge or rebase against product master [default=rebase]
     ${chalk.yellow('--branchPrefix')} Prefix for the generated branch [default=atlassian-frontend-integration/]
     ${chalk.yellow('--ci')} Run the tool in CI mode
     ${chalk.yellow('--cmd')} the command to use can be add or upgrade [default=add]
     ${chalk.yellow('--dedupe')} run yarn deduplicate at the end to deduplicate the lock file
     ${chalk.yellow('--dedupeStrategy')} the strategy to run yarn deduplicate with [default=fewer]
     ${chalk.yellow('--dryRun')} Log out commands that would be run instead of running them
     ${chalk.yellow('--no-push')} Do not push any commits.
     ${chalk.yellow('--packageEngine')} The package manager to use, currently only tested with Bolt and yarn [default=yarn]
     ${chalk.yellow('--packages')} comma delimited list of packages to install branch deploy of
     ${chalk.yellow('--productCiPlanUrl')} Base URL of the product CI's plan rest endpoint, including build key.
     ${chalk.yellow('--')} Any arguments after -- will be appended to the upgrade command

  ${chalk.green('Environment Variables')}
    ${chalk.yellow('PRODUCT_CI_TOKEN')} Token to authenticate product CI API requests with, used in conjunction with --productCiPlanUrl

  ${chalk.green('Examples')}
    ${chalk.yellow('branch-deploy-product-integrator push foo abcdef123456 --productCiPlanUrl https://bamboo.atlassian.com/rest/api/latest/plan/ABC-DEF')}
`;

export class PushValidationError extends Error implements ValidationError {
  type: ErrorType = 'push';
}

const defaultFlags: Flags = {
  branchModel: 'rebase',
  branchPrefix,
  ci: false,
  // Need to tighten default string type to 'add'
  cmd: 'add',
  dedupe: false,
  dedupeStrategy: 'fewer',
  dryRun: false,
  packageEngine: 'yarn',
  packages: 'all',
  push: true,
};

type Flags = {
  branchModel: 'merge' | 'rebase';
  branchPrefix: string;
  ci: boolean;
  cmd: 'add' | 'upgrade';
  dedupe: boolean;
  dedupeStrategy: 'fewer' | 'highest';
  dryRun: boolean;
  packageEngine: string;
  packages: string;
  productCiPlanUrl?: string;
  push: boolean;
};

export type UserFlags = Default<Flags, keyof typeof defaultFlags>;

const extraArgs: string[] = [];

/* In product repo, they sometimes have patches for packages.
 ** When we branch deploy packages, we delete any corresponding patches to make sure there is no issue on post-install.
 */
async function deletePatchesToPackages(pathToFolder: string, packages: string) {
  const renamedPackages = packages.split(',').map(pkg => pkg.replace('/', '+'));
  try {
    await fsp.access(pathToFolder);
    const patchesPkgs = await readdir(pathToFolder);
    if (patchesPkgs.length === 0) return;
    const patchesPkgsToRemove = patchesPkgs.filter(patchPkg =>
      renamedPackages.find(pkg => patchPkg.includes(pkg)),
    );
    await Promise.all(
      patchesPkgsToRemove.map(async patchPkgToRemove => {
        await exec(`rm -rf ${pathToFolder}/${patchPkgToRemove}`);
        console.info(`Deleted the patch for: ${patchPkgToRemove}`);
      }),
    );
  } catch (e) {
    console.error(`More likely the folder 'patches' do not exits!`);
    console.error(e);
  }
}

/** Prepares the branch for install depending on the branch model.
 * If branch model is rebase:
 *  If the branch has not been modified, i.e. manually updated, reset on top of latest base branch
 *  Otherwise, reset the dependency files back to their original state and leave branch as-is
 * If the branch model is merge:
 *  Merge the latest base branch in, auto-merging dependency files, and then reset dependency files back to their original state
 */
async function prepareBranchForInstall(
  git: SimpleGit,
  branchName: string,
  productBaseBranch: string,
  productRepoPath: string,
  branchIsNew: boolean,
  flags: Flags,
) {
  console.log('Preparing branch for install...');
  async function resetDepFiles(baseBranch: string) {
    return resetFiles(git, baseBranch, [
      'package.json',
      'yarn.lock',
      '.yarnrc',
      '.yarn/',
      '.npmrc',
      // Refetch workspaces again as they may be different after merging
      ...(await getWorkspacePkgJsons(flags.packageEngine, productRepoPath)),
    ]);
  }

  let branchIsModified = false;
  if (flags.branchModel === 'merge') {
    console.log('Merge branch model detected - merging latest base branch');
    /* By default, we merge the productBaseBranch in each time we install a new atlassian frontend version.
     * However, if we are in an RC branch, we do _not_ want to merge the base branch (develop) in but instead
     * merge master in. This is because the RC branch should not have any develop branch fixes merged
     * in after the RC branch is created */
    const isRCBranch = branchName.startsWith(ReleaseBranchPrefix);
    const productMergeBranch = isRCBranch ? 'master' : productBaseBranch;

    /* We merge productBaseBranch so that the branch remains relatively up to date.
     * We also reset package.json/yarn.lock back to their state on master before running
     * a branch install to prevent previous branch installs lingering in package.json.
     */
    await merge(
      git,
      productMergeBranch,
      {
        files: [
          'package.json',
          'yarn.lock',
          '.yarnrc',
          '.yarn/',
          '.npmrc',
          versionFileName,
          ...(await getWorkspacePkgJsons(flags.packageEngine, productRepoPath)),
        ],
        resolutionStrategies: {
          // versionFileName will conflict if merging develop into a feature branch since both have that file
          ours: [versionFileName],
        },
      },
      !flags.ci,
    );

    /* We reset package.json/yarn.lock files back to their state on master before running
     * a branch install to get rid of any previous branch installed versions */
    await resetDepFiles(productMergeBranch);
  } else if (flags.branchModel === 'rebase') {
    console.log('Rebase branch model detected');
    // Check if manual commits on branch
    const branchMetadata = await readVersionFile(productRepoPath);
    branchIsModified = await isBranchModified(git, branchMetadata, branchIsNew);
    if (!branchIsModified) {
      console.log('Branch not modified, rebasing on top of master');
      // If the branch has not been modified, reset it back to the product base branch before installing
      await resetBranch(git, productBaseBranch);
    } else {
      console.log('Manual changes detected on branch, not rebasing');
      // Otherwise, just reset the files back to their state on base branch and let an install happen over the top
      await resetDepFiles(productBaseBranch);
    }
  } else {
    throw new Error(`Invalid branchModel "${flags.branchModel}"`);
  }
  return branchIsModified;
}

function returnJiraPackagesToInstall(packages: string[], jiraConfig: string[]) {
  // We need to transform the Jira config
  // as the `@atlassiansox` packages are published on the private registry to `@atlassian/not-sox-`.
  return packages
    .filter(pkg => convertSoxToNotSox(jiraConfig).includes(pkg))
    .join(',');
}

async function readVersionFile(
  productRepoPath: string,
): Promise<BranchMetadata | {}> {
  if (
    fs.existsSync(
      path.join(process.cwd(), `${productRepoPath}/${versionFileName}`),
    )
  ) {
    return JSON.parse(await fsp.readFile(versionFileName, 'utf8'));
  }
  return {};
}

async function createVersionFile(
  git: SimpleGit,
  productRepoPath: string,
  metadata: BranchMetadata,
) {
  await fsp.writeFile(
    `${productRepoPath}/${versionFileName}`,
    JSON.stringify(metadata),
    'utf8',
  );
  await git.add(versionFileName);
}

async function createNpmrc(git: SimpleGit, productRepoPath: string) {
  await fsp.writeFile(`${productRepoPath}/.npmrc`, '', 'utf8');
  await git.add('.npmrc');
}

/**
 * Prereleases are stored in p.a.c/api/npm/npm-private-snapshot
 * p.a.c/api/npm/atlassian-npm proxies between public npm and npm-private-snapshot
 * To make sure yarn resolves from p.a.c instead of public npm we need to map @atlaskit to atlassian-npm
 */
function addAtlaskitRegistryMapping(cwd: string) {
  return spawn(
    'npm',
    [
      'set',
      '@atlaskit:registry',
      'https://packages.atlassian.com/api/npm/atlassian-npm/',
      '--userconfig',
      './.npmrc',
    ],
    { cwd },
  );
}

function validateArgs(
  branchName: string,
  commitHash: string,
  flags: Flags,
): flags is Flags {
  const {
    branchModel,
    branchPrefix,
    packageEngine,
    packages,
    dedupe,
    ci,
    dedupeStrategy,
    cmd,
    dryRun,
    productCiPlanUrl,
    push,
    ...rest
  } = flags;
  if (!branchName || !commitHash) {
    throw new PushValidationError('Missing branchName or commitHash');
  }

  const invalidFlags = Object.keys(rest);
  if (invalidFlags.length > 0) {
    throw new PushValidationError(`Invalid flags: ${invalidFlags}`);
  }

  if (!['merge', 'rebase'].includes(branchModel)) {
    throw new PushValidationError(
      'branchModel must be one of "merge","rebase"',
    );
  }

  return true;
}

// Added a function that returns the running product builds urls and upload the `in-progress` status after the product builds is triggered.
// This was added to avoid the use case where `Bamboo` encounters an infra issue and do not properly post / upload the build status to the pull request in `Atlassian Frontend`.
async function uploadInProgressProductBuildStatus(
  productPlanUrl: string,
  productBranchName: string,
  token: string,
) {
  const [planUrl, apiUrl] = productPlanUrl.split('/rest/');
  const identifer = apiUrl.split('/').pop() || '';
  type STATE = 'INPROGRESS' | 'SUCCESSFUL' | 'FAILED' | 'STOPPED';
  let buildName = '';
  let state: STATE = 'INPROGRESS';

  if (productPlanUrl.includes('confluence')) buildName = 'Confluence Pipeline';
  if (productPlanUrl.includes('jira')) {
    // Jira build is currently optional
    buildName = 'Jira Pipeline [OPT]';
    state = 'STOPPED';
  }

  const { latestBuildUrl } = await getLatestBuildUrlInformation(
    planUrl,
    productBranchName,
    identifer,
    token,
  );

  await uploadBuildStatus({
    name: buildName,
    state,
    url: latestBuildUrl,
  });

  console.info(
    `The Product build for ${buildName} has status: ${state} and can be found at: ${latestBuildUrl}`,
  );
}

export async function push(
  branchName: string,
  commitHash: string,
  userFlags: UserFlags,
) {
  const flags: Flags = { ...defaultFlags, ...userFlags };

  const {
    branchModel,
    ci,
    packageEngine,
    packages,
    dedupe,
    dedupeStrategy,
    cmd,
    dryRun,
    productCiPlanUrl,
    push,
  } = flags;

  const afBranchName = branchName;

  const afCommitHash = commitHash;

  if (!validateArgs(afBranchName, afCommitHash, flags)) {
    return;
  }

  if (flags.packageEngine === 'bolt') {
    // Disable the install command prefix when using bolt
    // Only works as of bolt@^0.24.5
    extraArgs.push('--no-prefix');
  }

  const productBaseBranch = 'master';

  const config = getConfig();
  const product = (config && config.product) || 'confluence';

  // In pipeline, `atlassian-fronted` is cloned at the folder root.
  // When the product is cloned, it creates a folder inside atlassian frontend.
  const productRepoPath = process.cwd();
  const afRepoPath = productRepoPath.replace(product, '');

  const git = gitP(productRepoPath);

  const productBranchName = createBranchName(branchName, branchPrefix);

  const branchIsNew = await checkoutOrCreate(
    git,
    productBranchName,
    productBaseBranch,
    false,
  );

  const branchIsModified = await prepareBranchForInstall(
    git,
    branchName,
    productBaseBranch,
    productRepoPath,
    branchIsNew,
    flags,
  );

  // Create a version file so that we can easily link product commits back to atlassian frontend commits.
  await createVersionFile(git, productRepoPath, {
    afCommitHash: commitHash,
    afBranchName: branchName,
    branchIsModified,
  });

  const packagesToInstall =
    config && config.packages
      ? returnJiraPackagesToInstall(packages.split(','), config.packages)
      : packages;

  // Due to MONO-85, we need to manually create and track the `npmrc` file then set the registry.
  if (product === 'jira') {
    await createNpmrc(git, productRepoPath);
  }
  await addAtlaskitRegistryMapping(productRepoPath);
  // We delete patches to avoid failures on post-install command in CI.
  await deletePatchesToPackages(
    `${productRepoPath}/patches`,
    packagesToInstall,
  );

  console.log(
    `Installing packages: ${packagesToInstall} branch deployed from ${afCommitHash} to ${productRepoPath}`,
  );

  const numPackagesInstalled = await installFromCommit(
    afCommitHash,
    afRepoPath,
    productRepoPath,
    {
      engine: packageEngine,
      cmd: cmd,
      packages: packagesToInstall,
      extraArgs,
      dryRun,
    },
  );

  await exportVariable('numPackagesInstalled', `${numPackagesInstalled}`);

  if (numPackagesInstalled === 0) {
    console.log('No packages to install, aborting integration.');
    return;
  }

  // Only fetch the author email if running in CI, otherwise just use the user's default email
  let authorEmail = null;
  if (ci) {
    authorEmail = 'no-reply@atlassian.com';
  }

  // prettier-ignore
  const commitMessage = `Upgraded to Atlassian Frontend changes on branch ${branchName}

https://bitbucket.org/atlassian/atlassian-frontend/branch/${branchName}

This commit was auto-generated.

atlassian-frontend-commit-hash: ${commitHash}
  `;

  const commits = [];
  commits.push(await commit(git, commitMessage, authorEmail));

  const dedupeFlag = config && config.dedupe ? config.dedupe : dedupe;

  if (dedupeFlag) {
    console.log(chalk.yellow('Running yarn-deduplicate'));
    const useMostCommon = dedupeStrategy === 'fewer';
    await deduplicate(packageEngine, useMostCommon, 'yarn.lock', true);

    commits.push(
      await commit(
        git,
        `Deduplicated yarn.lock file

This commit was auto-generated.

atlassian-frontend-commit-hash: ${commitHash}
`,
        authorEmail,
      ),
    );
  }

  const codemodConfig = config && config.codemod;
  if (codemodConfig && !codemodConfig.disabled) {
    console.log(
      chalk.yellow(
        'Running any available codemods for packages that have been upgraded',
      ),
    );

    const mergeBaseCommit = await mergeBase(
      git,
      productBaseBranch,
      productBranchName,
    );

    const codemodRuns = Array.isArray(codemodConfig.flags)
      ? codemodConfig.flags
      : [codemodConfig.flags];

    let codemodResults;
    try {
      const results = await Promise.all(
        codemodRuns.map(codemonRun =>
          runCodemods(codemodConfig.filePaths, {
            ...codemonRun,
            sinceRef: mergeBaseCommit,
          }),
        ),
      );

      // Flatten results into array of transforms
      codemodResults = results.reduce(
        (acc: typeof results[number]['transforms'], result) =>
          acc.concat(result.transforms),
        [],
      );

      const resultMessage = `Run codemods for upgraded packages\n\n${codemodResults
        .map(t => `${t.module}: ${t.name}`)
        // Remove duplicates (created when codemods are run with different options)
        .filter((t, idx, self) => self.indexOf(t) === idx)
        .join('\n')}`;

      console.log(chalk.yellow(resultMessage));
      commits.push(await commit(git, resultMessage, authorEmail));
    } catch (e) {
      if (e instanceof NoTransformsExistError) {
        console.log('No codemods found for upgraded packages');
      } else {
        throw e;
      }
    }
  }

  const extraCommands =
    config && config.commands
      ? config.commands.filter(cmd => cmd.runCommand)
      : [];

  if (extraCommands && extraCommands.length > 0) {
    for (const command of extraCommands) {
      console.log(chalk.yellow(`Running additional command: ${command.name}`));
      try {
        await spawn(packageEngine, [command.name], { cwd: productRepoPath });
        commits.push(
          await commit(
            git,
            `Files generated after running: ${command.name}

This commit was auto-generated.

atlassian-frontend-commit-hash: ${afCommitHash}
  `,
            authorEmail,
          ),
        );
      } catch (err) {
        console.error(`The command : ${command.name} failed!`);
        console.error(err);
        process.exit(1);
      }
    }
  }

  const didCommit = commits.some(commit => commit === true);

  // Only run the following steps if we actually committed something
  if (!didCommit) {
    return;
  }

  if (push) {
    console.log('Pushing branch deployed versions');
    const forcePush = branchModel === 'rebase' && !branchIsModified;
    await safePush(git, productBranchName, forcePush);
  }

  if (!productCiPlanUrl || !ci) {
    console.log('Branch deploy product integrator success!');
    return;
  }

  if (
    typeof productCiPlanUrl !== 'string' ||
    !productCiPlanUrl.match(/^https.*$/)
  ) {
    console.log(
      `Not triggering product build - ${productCiPlanUrl} is not a valid URL`,
    );
    return;
  }

  if (!PRODUCT_CI_TOKEN) {
    throw Error('Missing $PRODUCT_CI_TOKEN environment variable');
  }

  console.log(
    `Triggering product build on ${productCiPlanUrl} for ${branchName}`,
  );

  if (!dryRun) {
    await triggerProductBuild(
      productCiPlanUrl,
      productBranchName,
      PRODUCT_CI_TOKEN,
    );
    // This function uploads the product CI build `IN-PROGESS` status from pipeline in case there is an issue in Bamboo to properly upload the build status.
    await uploadInProgressProductBuildStatus(
      productCiPlanUrl,
      productBranchName,
      PRODUCT_CI_TOKEN,
    );
  }

  console.log('Branch deploy product integrator success!');
}
