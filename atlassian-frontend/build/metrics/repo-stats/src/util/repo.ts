import chalk from 'chalk';
import gitP, { SimpleGit } from 'simple-git/promise';

async function getDefaultBranch(git: SimpleGit) {
  const output = await git.listRemote(['--symref', 'origin', 'HEAD']);
  const match = output.match(/refs\/heads\/(\w+)\s/);
  if (match == null) {
    return null;
  }

  return match[1];
}

const getRepoUrlWithAuth = (repoUrl: string) => {
  if (!repoUrl.startsWith('http')) {
    return repoUrl;
  }

  let newRepoUrl = repoUrl;

  // The token env var is already URI encoded so that it is properly masked in pipeline output
  if (process.env.STASH_USER && process.env.STASH_TOKEN) {
    newRepoUrl = newRepoUrl.replace(
      'stash.atlassian.com',
      `${encodeURIComponent(process.env.STASH_USER)}:${
        process.env.STASH_TOKEN
      }@stash.atlassian.com`,
    );
  }

  return newRepoUrl;
};

export const getRepoName = (repo: string) =>
  repo.split('/').pop()!.replace('.git', '');

export const cloneRepo = async (
  repoName: string,
  repoUrl: string,
  repoPath: string,
) => {
  console.log(
    `${chalk.dim('Cloning repository')} ${chalk.yellow(repoUrl)} ${chalk.dim(
      'into',
    )} ${chalk.yellow(repoPath)}`,
  );
  const git = gitP(repoPath);
  git.init();

  const existingRemotes = await git.getRemotes(false);
  if (existingRemotes.length === 0) {
    await git.remote(['add', 'origin', getRepoUrlWithAuth(repoUrl)]);
  }

  const defaultBranch = await getDefaultBranch(git);
  if (defaultBranch == null) {
    throw new Error(
      `Could not retrieve default branch for ${chalk.yellow(
        repoName,
      )}:${chalk.yellow(repoUrl)}`,
    );
  }
  await git.pull('origin', defaultBranch);

  const log = await git.log(['-1']);
  const branch = await git.revparse(['--abbrev-ref', 'HEAD']);
  console.log(
    `${chalk.yellow(repoName)}@${chalk.yellow(branch)} (${chalk.yellow(
      log.latest.hash,
    )}) at ${chalk.yellow(log.latest.date)}`,
  );
};
