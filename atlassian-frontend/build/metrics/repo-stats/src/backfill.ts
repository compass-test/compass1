import child_process from 'child_process';
import fs from 'fs';
import util from 'util';
import path from 'path';
import stats from './calculate';
import chalk from 'chalk';
// eslint-disable-next-line no-restricted-imports
import { format, subDays, setHours, startOfHour } from 'date-fns';
import { Config } from './types';
import { getRepoName } from './util/repo';

const exec = util.promisify(child_process.exec);

const getLastCommitUntil = async (cwd: string, timestamp: number) => {
  const log = await exec(
    `git --no-pager log --until=${timestamp} -1 --format='%H' origin/master`,
    { cwd },
  );
  const commitHash = log.stdout.toString().split('\n')[0];
  return commitHash;
};

export default async (cwd: string, config: Config) => {
  // make unique backfill directory to clone repo into
  const startTimestamp = config.timestamp || Math.floor(Date.now() / 1000);
  const clonePath = path.join(cwd, 'backfill', startTimestamp.toString());
  await exec(`mkdir -p ${clonePath}`);

  const name = getRepoName(config.repository);
  const repoPath = path.join(clonePath, name);

  if (!fs.existsSync(clonePath)) {
    // clone repository
    console.log(
      `${chalk.dim('Cloning repository')} ${chalk.yellow(
        config.repository,
      )} ${chalk.dim('into')} ${chalk.yellow(clonePath)}`,
    );
    await exec(`git clone ${config.repository}`, { cwd: clonePath });
  }

  // set time to arbitrary hour to get consitent statistics
  let date = new Date(startTimestamp * 1000);
  date = startOfHour(setHours(date, 22));

  for (let i = 0; i < config.backfill.days; i += config.backfill.period) {
    const timestamp = Math.floor(date.getTime() / 1000);
    const commit = await getLastCommitUntil(repoPath, timestamp);

    console.log(
      `\n${chalk.dim('Checking out commit')} ${chalk.yellow(
        commit,
      )} ${chalk.dim('from')} ${chalk.yellow(
        format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
      )}`,
    );
    await exec(`git checkout ${commit}`, { cwd: repoPath });

    await stats(repoPath, {
      ...config,
      timestamp: timestamp,
    });

    date = subDays(date, config.backfill.period);
  }
};
