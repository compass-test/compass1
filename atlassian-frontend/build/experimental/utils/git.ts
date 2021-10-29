import path from 'path';
import simplegit from 'simple-git/promise';
import child_process from 'child_process';
import util from 'util';

const exec = util.promisify(child_process.exec);

export default function git(cwd?: string) {
  const simpleGit = simplegit(cwd);

  /**
   * Small helper that ensures a branchName always starts with 'origin/'
   */
  function getOriginBranchName(branchName: string) {
    return branchName.startsWith('origin')
      ? branchName
      : `origin/${branchName}`;
  }

  /**
   * Small helper to get the current branch name.
   * rev-parse only works with HEAD so this should not be changed to accept a different input.
   */
  async function getBranchName() {
    const output = await simpleGit.revparse(['--abbrev-ref', 'HEAD']);
    return output.trim();
  }

  /**
   * Returns a common ancestor commit between two refs.
   * Defaults to comparing against HEAD
   */
  async function getMergeBase(ref: string, ref2: string = 'HEAD') {
    const output = await simpleGit.raw(['merge-base', ref, ref2]);
    return output.trim();
  }

  /**
   * Returns true if ref is ancestor of ref2, otherwise false
   */
  function isAncestorOf(ref: string, ref2: string = 'HEAD') {
    // simple-git.raw does not throw an error when there is a non-zero exit code and no output to stderr
    // so the cases can't be differentiated as they both return null stdout
    return exec(`git merge-base --is-ancestor ${ref} ${ref2}`, {
      cwd,
    })
      .then(() => true)
      .catch(() => false);
  }

  /**
   * Atlassian frontend specific helper to determine the _likely_ base branch.
   * It does this by checking if we are on develop (-> master) then checking if the merge-base
   * between origin/develop and us is already contained in origin/master
   */
  async function getBaseBranch() {
    const branchName = await getBranchName();
    if (branchName === 'develop') {
      return 'master';
    }
    const developMergeBase = await getMergeBase('origin/develop');
    const masterContainsDevelopMergeBase = await isAncestorOf(
      developMergeBase,
      'master',
    );
    return masterContainsDevelopMergeBase ? 'master' : 'develop';
  }

  /**
   * Check that a branch contains a commit
   */
  async function branchContainsCommit(branch: string, commit: string) {
    const originBranchName = getOriginBranchName(branch);
    const summary = await simpleGit.branch(['-r', '--contains', commit]);
    return summary.all.find(branch => branch === originBranchName);
  }

  /**
   * Fetches all changed files since a certain ref/commit
   * Defaults to relative path unless fullPath option is set
   */
  async function getChangedFilesSinceRef(
    ref: string,
    opts?: { fullPath: boolean },
  ) {
    const mergeBase = await getMergeBase(ref);
    const output = await simpleGit.diff([mergeBase, '--name-only']);
    const changedFiles = output.trim().split('\n');
    if (opts && opts.fullPath) {
      return changedFiles.map(file => path.resolve(file));
    }
    return changedFiles;
  }

  /**
   * Finds merge base with the current branch's base branch
   * to determine all files changed since then
   */
  async function getChangedFilesSinceBaseBranch() {
    const baseBranch = await getBaseBranch();
    const mergeBase = await getMergeBase(baseBranch, 'HEAD');
    return getChangedFilesSinceRef(mergeBase);
  }

  return {
    ...simpleGit,
    getOriginBranchName,
    getBranchName,
    getMergeBase,
    isAncestorOf,
    getBaseBranch,
    branchContainsCommit,
    getChangedFilesSinceRef,
    getChangedFilesSinceBaseBranch,
  };
}
