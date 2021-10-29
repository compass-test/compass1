import child_process from 'child_process';
import util from 'util';
import path from 'path';
import stats from './calculate';
import { Config } from './types';
import { getRepoName, cloneRepo } from './util/repo';

const exec = util.promisify(child_process.exec);
const DEST_DIR = 'repo-stats-remote';

export default async (cwd: string, config: Config) => {
  const repoName = getRepoName(config.repository);
  const repoPath = path.join(cwd, DEST_DIR, repoName);
  await exec(`mkdir -p ${repoPath}`);

  // clone repository
  await cloneRepo(repoName, config.repository, repoPath);

  stats(repoPath, config);
};
