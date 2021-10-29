import chalk from 'chalk';
import { promises as fsp } from 'fs';
import * as fs from 'fs';
import path from 'path';
import gitP, { SimpleGit } from 'simple-git/promise';
import { getConfig } from '../config';

const {
  STASH_TOKEN_BOT,
  STASH_USER_BOT,
  CI,
  CONFLUENCE_INTEGRATOR_OVERRIDE_COMMIT,
  JIRA_INTEGRATOR_OVERRIDE_COMMIT,
} = process.env;

type EnvironmentVariables = {
  STASH_USER_BOT: string;
  STASH_TOKEN_BOT: string;
};

type CloneFlags = {
  overrideCommit?: boolean;
  shallow?: boolean;
};

export const HELP_MSG = `
  🚀 Atlassian Frontend branch deploy product integrator™ 🚀

  ${chalk.yellow(
    'clone-product-repo',
  )} Clone and checkout a product repo outside of atlassian-frontend to be used by 'push-pipeline'.
  ${chalk.green('Options')}
    ${chalk.yellow(
      '--overrideCommit',
    )} Override the main branch to a particular commit controlled by environment variables in the repository settings.
    ${chalk.yellow(
      '--shallow',
    )} Whether to fully clone the repo or not. The product repo is shallow cloned only on first commit or at first creation of the product branch.
`;

function validateEnvironmentVariables(
  env: Partial<EnvironmentVariables>,
): env is EnvironmentVariables {
  return !!(env.STASH_USER_BOT && env.STASH_TOKEN_BOT);
}

function getRepoUrlWithAuth(repoUrl: string) {
  if (STASH_USER_BOT && STASH_TOKEN_BOT) {
    const stashTokenEncoded = encodeURIComponent(STASH_TOKEN_BOT);
    // The token env var is already URI encoded so that it is properly masked in pipeline output.
    return repoUrl.replace(
      'stash.atlassian.com',
      `${STASH_USER_BOT}:${stashTokenEncoded}@stash.atlassian.com`,
    );
  }
}

async function getDefaultBranch(git: SimpleGit) {
  const output = await git.listRemote(['--symref', 'origin', 'HEAD']);
  const match = output.match(/refs\/heads\/(\w+)\s/);
  if (match == null) {
    return null;
  }

  return match[1];
}

export async function checkoutProductRepo(flags: CloneFlags) {
  if (!validateEnvironmentVariables(process.env)) {
    throw new Error(
      'Environment variables for STASH_USER_BOT, STASH_TOKEN_BOT are not set!',
    );
  }

  const rootPath = process.cwd().replace('/atlassian-frontend', '').trim();

  const config = getConfig();

  const product = config && config.product;
  const repoUrl = config && config.repoUrl;
  const sshRepoUrl = config && config.sshRepoUrl;

  if (product && repoUrl) {
    const repositoryUrl = CI ? getRepoUrlWithAuth(repoUrl) : sshRepoUrl;

    if (!repositoryUrl) throw new Error('Issue with repo url');

    const localPath = path.resolve(rootPath, `${product}`);

    if (fs.existsSync(localPath) && fs.readdirSync(localPath).length !== 0) {
      console.log(
        chalk.yellow(
          `The local path for ${product} already exists on your computer and have an existing checkout.`,
        ),
      );
    } else {
      await fsp.mkdir(localPath, { recursive: true });
      const git = gitP(localPath);

      console.log(
        chalk.blue(
          `Cloning ${product} repo at ${repositoryUrl} to ${localPath}...`,
        ),
      );

      // If this is the first commit for the branch, we do a shallow clone.
      // if not, we fully clone the repo to properly rebase the products branch.
      const options = flags.shallow ? ['--depth', '1'] : [];

      await git.clone(repositoryUrl, localPath, options);
      const defaultBranch = await getDefaultBranch(git);

      if (defaultBranch == null) {
        throw new Error(
          `Could not retrieve default branch for ${product}:${repositoryUrl}`,
        );
      }
      await git.pull('origin', defaultBranch);
      const log = await git.log(['-1']);
      const branch = await git.revparse(['--abbrev-ref', 'HEAD']);
      console.log(
        chalk.blue(
          `Currently checked out ${product}@${branch} (${log.latest.hash}) at ${log.latest.date}`,
        ),
      );
      if (flags.overrideCommit) {
        const confluenceOverrideCommit =
          CONFLUENCE_INTEGRATOR_OVERRIDE_COMMIT || '';
        const jiraOverrideCommit = JIRA_INTEGRATOR_OVERRIDE_COMMIT || '';
        // We check the length of the value passed in the override commit variable, in case, we don't use those variables or they default to an empty string.
        if (
          confluenceOverrideCommit.length < 8 &&
          jiraOverrideCommit.length < 8
        ) {
          console.log(
            chalk.red(
              'if `--overrideCommit` flag is set, a commit value for the respective product need to be defined in the Atlassian Frontend repository variable settings.',
            ),
          );
          process.exit(0);
        }
        const commitToReset =
          product === 'confluence'
            ? confluenceOverrideCommit
            : jiraOverrideCommit;
        console.log(
          chalk.blue(
            `We may have a 🔴  master build and we are resetting the branch to the latest 🟢  master build`,
          ),
        );
        await git.reset(['--hard', commitToReset]);
        const log = await git.log(['-1']);
        console.log(
          chalk.blue(
            `After reset, we currently checked out ${product}@${branch} (${log.latest.hash}) at ${log.latest.date}`,
          ),
        );
      }
    }
  } else {
    console.log('Something is wrong and your config is not loaded!');
  }
}
