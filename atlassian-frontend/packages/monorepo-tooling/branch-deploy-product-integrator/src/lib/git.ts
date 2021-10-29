/** Git utils */
import simpleGit, { SimpleGit } from 'simple-git/promise';
import cli from '@atlaskit/build-utils/cli';
import { debugMock } from './util';
import { branchPrefix } from '../constants';
import { BranchMetadata } from '../types';

const authorName = 'BOT Atlassian frontend branch deploy integrator';

/**
 * Auto-merging refers to being able to auto-resolve conflicts that arise in a file.
 */
export type AutoMergeRules = {
  /** List of files that can be auto-merged */
  files: string[];
  /** The default resolution strategy is --theirs. This allows specifying other strategies for specific files */
  resolutionStrategies?: {
    /** List of files that should be resolved using --ours */
    ours?: string[];
  };
};

export function getOriginBranchName(branchName: string) {
  return branchName.startsWith('origin/') ? branchName : `origin/${branchName}`;
}

export async function mergeBase(git: SimpleGit, ...branches: string[]) {
  const output = await git.raw(['merge-base', ...branches]);
  return output.replace(/\n/g, '');
}

/**
 * Returns a boolean indicating if it committed or not.
 * Returns false when there are no changes to commit */
export async function commit(
  git: SimpleGit,
  commitMessage: string,
  authorEmail: string | null,
  extraFlags: string[] = [],
): Promise<boolean> {
  // Only add tracked files
  await git.add(['-u']);

  const status = await git.status();
  if (status && status.staged.length === 0) {
    console.log('Nothing to commit');
    return false;
  }

  const commitArgs = authorEmail
    ? extraFlags.concat(['--author', `${authorName} <${authorEmail}>`])
    : extraFlags;
  await git.commit(commitMessage, commitArgs);

  console.log(`Committed changes`);

  return true;
}

export function createGit(basePath: string, dryRun: boolean = false) {
  return dryRun ? (debugMock('git') as SimpleGit) : simpleGit(basePath);
}

export async function getAuthorEmail(git: SimpleGit, commitHash: string) {
  const log = await git.log({ from: `${commitHash}~1`, to: commitHash });

  if (!log.latest) {
    throw new Error(`Cannot find log entry for ${commitHash}`);
  }

  return log.latest.author_email;
}

/**
 * Returns the conflict types of `conflictedFiles`
 */
function getConflictTypes(
  conflictedFiles: string[],
  fileStatuses: simpleGit.StatusResult['files'],
) {
  return conflictedFiles.reduce(
    (acc, c) => {
      const fileStatus = fileStatuses.find(f => f.path === c);
      if (!fileStatus) {
        throw new Error('Cannot find file status');
      }
      if (fileStatus.index === 'U' && fileStatus.working_dir === 'U') {
        acc.standard.push(c);
      } else if (fileStatus.index === 'U' && fileStatus.working_dir === 'D') {
        acc.deletedByThem.push(c);
      } else {
        acc.other.push(c);
      }
      return acc;
    },
    {
      standard: [] as string[],
      deletedByThem: [] as string[],
      other: [] as string[],
    },
  );
}

async function resolveMergeConflicts(
  git: SimpleGit,
  autoMergeRules: AutoMergeRules,
  promptOnConflicts: boolean,
) {
  const status = await git.status();
  const conflicts = status.conflicted;
  if (conflicts.length === 0) {
    console.log('Merge failed without any detected conflicts');
    return false;
  }
  const resolvableConflicts = conflicts.filter(c =>
    autoMergeRules.files.includes(c),
  );
  const conflictedTypes = getConflictTypes(resolvableConflicts, status.files);

  if (conflictedTypes.deletedByThem.length > 0) {
    console.log(
      `Resolving 'deletedByThem' conflicts for ${conflictedTypes.deletedByThem}`,
    );
    await git.rm(conflictedTypes.deletedByThem);
  }

  if (conflictedTypes.standard.length > 0) {
    console.log(`Resolving standard conflicts for ${conflictedTypes.standard}`);
    const resolveOurs: string[] = [];
    const resolveTheirs: string[] = [];
    const resolutionStrategies = autoMergeRules.resolutionStrategies || {};
    conflictedTypes.standard.forEach(file => {
      if (
        resolutionStrategies.ours &&
        resolutionStrategies.ours.includes(file)
      ) {
        resolveOurs.push(file);
      } else {
        resolveTheirs.push(file);
      }
    });
    if (resolveTheirs.length > 0) {
      await git.checkout(['--theirs', ...resolveTheirs]);
    }
    if (resolveOurs.length > 0) {
      await git.checkout(['--ours', ...resolveOurs]);
    }
    await git.add(conflictedTypes.standard);
  }

  const errors = [];
  if (conflictedTypes.other.length > 0) {
    errors.push(
      `Found unsupported merge conflict types for files that would otherwise be automergeable, you will need to manually resolve ${conflictedTypes.other} to their version on master.`,
    );
  }
  const unresolvableConflicts = conflicts.filter(
    c => !autoMergeRules.files.includes(c),
  );
  if (unresolvableConflicts.length > 0) {
    errors.push(
      `Found merge conflicts for files that are not automergeable, you will need to manually resolve conflicts for ${unresolvableConflicts}.`,
    );
  }

  if (errors.length > 0) {
    if (promptOnConflicts) {
      await cli.askConfirm(
        `${errors.join()}\nPlease manually resolve before proceeding`,
      );
    } else {
      throw Error(
        `${errors.join()}\nPlease run the @atlaskit/branch-deploy-product-integrator CLI manually by following its README`,
      );
    }
  }

  // --no-edit uses the default commit message
  // --no-verify to bypass pre-commit hooks that fail when new packages are merged in that don't exist locally
  // because of yarn/bolt not being run afterwards
  await git.commit([], undefined, { '--no-edit': true, '--no-verify': true });

  return true;
}

/**
 * This function merges `mergeBranch` and attempts to automatically resolve conflicts as per `autoMergeRules`.
 * If `promptOnConflicts` is set it will pause execution and allow the user to resolve conflicts that could not be auto-resolved, otherwise
 * it will throw an error.
 *
 * By default, all `files` in `automergeRules` will be automatically resolved to their copy on `mergeBranch`.
 */
export async function merge(
  git: SimpleGit,
  mergeBranch: string,
  autoMergeRules: AutoMergeRules,
  promptOnConflicts = false,
) {
  let mergeError;
  const originMergeBranch = getOriginBranchName(mergeBranch);
  // Need to fetch files before package.json potentially gets into a conflicted state since then bolt
  // and other tools cannot parse it
  try {
    console.log(`Merging ${originMergeBranch} into current branch`);
    await git.merge([originMergeBranch]);
  } catch (error) {
    // Conflicts or another type of error
    mergeError = error;
  }

  if (mergeError == null) {
    console.log('Merge succeeded with no conflicts');
  } else {
    console.log('Found merge conflicts...attempting to resolve');
    const successful = await resolveMergeConflicts(
      git,
      autoMergeRules,
      promptOnConflicts,
    );
    if (successful === false) {
      // If we have no conflicts, the merge failed for another reason
      throw mergeError;
    }
  }
}

/**
 * Resets `files` back to their state on the latest version of master contained in `baseBranch`
 */
export async function resetFiles(
  git: SimpleGit,
  baseBranch: string,
  files: string[],
) {
  const originBaseBranch = getOriginBranchName(baseBranch);

  // If base branch is master, we use the current branch as the other base
  const otherBase =
    originBaseBranch === 'origin/master' ? 'HEAD' : originBaseBranch;
  /* We want to use the specific version of master that was merged into `baseBranch` to ensure
   * that we don't try to reset files that only exist in master and not `baseBranch`.
   */
  const masterMergeBase = await mergeBase(git, otherBase, 'origin/master');
  console.log(
    `Resetting ${files} back to their state on origin/master at ${masterMergeBase} (relative to ${otherBase})`,
  );
  await git.checkout([masterMergeBase, '--', ...files]);
}

/** Pulls and checks out `branchName` if it exists, otherwise creates it.
 * If `onlyCheckout` is set to true, will fail if branch does not exist.
 *
 * Returns whether the branch is new (didn't exist beforehand) or not
 */
export async function checkoutOrCreate(
  git: SimpleGit,
  branchName: string,
  baseBranchName: string,
  onlyCheckout = false,
) {
  const branchExists = await remoteBranchExists(git, branchName);
  if (branchExists) {
    console.log(`Pulling existing branch ${branchName}`);
    await git.checkout(branchName);
    await git.pull('origin', branchName);
  } else {
    if (onlyCheckout) {
      throw Error(
        `Branch ${branchName} does not exist. Must specify existing branch. Have you mistakenly prefixed ${branchPrefix}?`,
      );
    }
    try {
      console.log(`Checking out new branch ${branchName}`);
      await git.checkoutBranch(branchName, `origin/${baseBranchName}`);
    } catch (err) {
      if (err.toString().includes('exists')) {
        console.log(`We need to delete the local branch: ${branchName} ...`);
      } else {
        throw new Error(err.toString());
      }
    }
  }

  return !branchExists;
}

export async function isInsideRepo(git: SimpleGit, repoName: string) {
  const remote = await git.listRemote(['--get-url']);

  return remote.indexOf(repoName) > -1;
}

export async function isBranchModified(
  git: SimpleGit,
  branchMetadata: Partial<BranchMetadata>,
  branchIsNew: boolean,
) {
  if (branchIsNew) {
    return false;
  }
  if (branchMetadata.branchIsModified) {
    // If the branch has already been previously detected as modified, always return true
    return true;
  }
  const lastCommit = await git.log(['-1']);

  // Branch is modified if the last commit wasn't made by the bot user
  return lastCommit.latest && lastCommit.latest.author_name !== authorName;
}

export function resetBranch(git: SimpleGit, branch: string) {
  return git.reset(['--hard', getOriginBranchName(branch)]);
}

export async function remoteBranchExists(git: SimpleGit, branch: string) {
  let branchExists;

  try {
    await git.revparse(['--verify', getOriginBranchName(branch)]);
    branchExists = true;
  } catch (error) {
    branchExists = false;
  }

  return branchExists;
}

export async function hasRemoteBranchUpdated(git: SimpleGit, branch: string) {
  if (!(await remoteBranchExists(git, branch))) {
    return false;
  }

  const originBranchName = getOriginBranchName(branch);
  const oldRemoteCommit = await git.revparse([originBranchName]);
  await git.fetch('origin', branch);
  const newRemoteCommit = await git.revparse([originBranchName]);

  return oldRemoteCommit !== newRemoteCommit;
}

export async function safePush(
  git: SimpleGit,
  branchName: string,
  forcePush = false,
) {
  // Set upstream so we can do subsequent pushes without specifying the branch name (such as the integrator.log push)
  let pushOptions: Record<string, any> = { '--set-upstream': true };
  if (forcePush) {
    pushOptions = { ...pushOptions, '--force': true };
    const remoteBranchUpdated = await hasRemoteBranchUpdated(git, branchName);
    if (remoteBranchUpdated) {
      throw Error(
        'Aborting since remote branch updated since job started. Please re-run the job',
      );
    }
  }
  await git.push('origin', branchName, pushOptions);
}
