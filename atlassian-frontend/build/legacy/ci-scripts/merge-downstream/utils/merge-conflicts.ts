import { SimpleGit, StatusResult } from 'simple-git/promise';
import spawn from 'spawndamnit';

import { MergeConflict } from '../types';

const mergeConflicts = (status: StatusResult) =>
  status.conflicted && status.conflicted.length > 0;

const yarnLockConflict = (status: StatusResult) =>
  status.conflicted.length === 1 && status.conflicted[0] === 'yarn.lock';

const getLastGitLogForFile = (git: SimpleGit, file: string) =>
  git.log({
    file,
    '-1': null,
  });

export async function getMergeConflicts(
  git: SimpleGit,
): Promise<Array<MergeConflict>> {
  const status = await git.status();
  if (mergeConflicts(status)) {
    const { conflicted } = status;

    return Promise.all(
      conflicted.map(async (file: string) => {
        const log = await getLastGitLogForFile(git, file);
        return {
          file,
          authorEmail: log.latest.author_email,
          authorName: log.latest.author_name,
        };
      }),
    );
  } else {
    return [];
  }
}

/**
 * Tries to auto resolve yarn.lock merge conflicts by running bolt and using yarn's
 * automatic merge conflict resolution
 */
export async function resolveMergeConflicts(git: SimpleGit) {
  const status = await git.status();
  const { conflicted } = status;
  if (!mergeConflicts(status)) {
    console.log('Merge failed without any detected conflicts');
    return false;
  }
  if (yarnLockConflict(status)) {
    // Run bolt
    console.log(
      'Detected only yarn.lock conflicts, attempting to auto resolve',
    );
    try {
      await spawn('bolt');
      await git.add('yarn.lock');
      // --no-edit uses the default commit message
      await git.commit([], undefined, {
        '--no-edit': true,
      });
      console.log('Auto-resolved yarn.lock successfully');
      return true;
    } catch (e) {
      console.log('Failed to auto-resolve yarn.lock');
      console.log(e);
      return false;
    }
  }
  console.log(`Detected conflicts ${conflicted}`);
  return false;
}
