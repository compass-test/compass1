const spawn = require('projector-spawn');
const path = require('path');

const parseChangesetCommit = require('./parseChangesetCommit');

async function getCommitsSince(
  ref /*: string */,
  spawnOpts /*: Object */ = {},
) {
  const gitCmd = await spawn(
    'git',
    ['rev-list', '--no-merges', '--abbrev-commit', `${ref}..HEAD`],
    spawnOpts,
  );
  return gitCmd.stdout.trim().split('\n');
}

async function getCommitsBetween(ref1, ref2, spawnOpts) {
  const gitCmd = await spawn(
    'git',
    ['rev-list', '--first-parent', `${ref1}..${ref2}`],
    spawnOpts,
  );
  return gitCmd.stdout
    .trim()
    .split('\n')
    .filter(hash => hash !== '');
}

async function getChangedFilesSince(
  ref /*: string */,
  fullPath /*:boolean*/ = false,
  spawnOpts /*: Object */ = {},
) {
  // First we need to find the commit where we diverged from `ref` at using `git merge-base`
  let cmd = await spawn('git', ['merge-base', ref, 'HEAD'], spawnOpts);
  const divergedAt = cmd.stdout.trim();
  // Now we can find which files we added
  cmd = await spawn('git', ['diff', '--name-only', divergedAt], spawnOpts);
  const files = cmd.stdout.trim().split('\n');
  if (!fullPath) return files;
  return files.map(file => path.resolve(file));
}

async function getChangedChangesetFilesSinceBranch(
  branchName /*:string*/,
  fullPath /*:boolean*/ = false,
  spawnOpts /*: Object */ = {},
) {
  const ref = await getRef(branchName, spawnOpts);
  const mergeBaseCmd = await spawn(
    'git',
    ['merge-base', ref, 'HEAD'],
    spawnOpts,
  );
  const divergedAt = mergeBaseCmd.stdout.trim();

  // Now we can find which files we added
  const diffCmd = await spawn(
    'git',
    ['diff', '--name-only', '--diff-filter=d', divergedAt, '--', '*.md'],
    spawnOpts,
  );

  const files = diffCmd.stdout
    .trim()
    .split('\n')
    .filter(
      file => !file.includes('README.md') && file.startsWith('.changeset'),
    );
  if (!fullPath) return files;
  return files.map(file => path.resolve(file));
}

async function getChangesetFiles(spawnOpts /*: Object */ = {}) {
  const base = await getBaseBranch('HEAD', spawnOpts);
  return getChangedChangesetFilesSinceBranch(base, false, spawnOpts);
}

async function getBranchName(
  ref /*: string */ = 'HEAD',
  spawnOpts /*: Object */ = {},
) {
  const gitCmd = await spawn(
    'git',
    ['rev-parse', '--abbrev-ref', ref],
    spawnOpts,
  );
  return gitCmd.stdout.trim();
}

function getOriginBranchName(branchName /*: string */) {
  return branchName.startsWith('origin/') ? branchName : `origin/${branchName}`;
}

async function getRef(branchName /*:string*/, spawnOpts /*: Object */ = {}) {
  const gitCmd = await spawn(
    'git',
    ['rev-parse', getOriginBranchName(branchName)],
    spawnOpts,
  );
  return gitCmd.stdout.trim().split('\n')[0];
}

async function add(pathToFile /*: string */, spawnOpts /*: Object */ = {}) {
  const gitCmd = await spawn('git', ['add', pathToFile], spawnOpts);
  return gitCmd.code === 0;
}

async function branch(branchName /*: string */, spawnOpts /*: Object */ = {}) {
  const gitCmd = await spawn('git', ['checkout', '-b', branchName], spawnOpts);
  return gitCmd.code === 0;
}

async function checkout(
  pathToFile /*: string */,
  spawnOpts /*: Object */ = {},
) {
  const gitCmd = await spawn('git', ['checkout', pathToFile], spawnOpts);
  return gitCmd.code === 0;
}

async function commit(message /*: string */, spawnOpts /*: Object */ = {}) {
  const gitCmd = await spawn(
    'git',
    ['commit', '-m', message, '--allow-empty'],
    spawnOpts,
  );
  return gitCmd.code === 0;
}

async function fetch(spawnOpts /*: Object */ = {}) {
  const gitCmd = await spawn('git', ['fetch'], spawnOpts);
  return gitCmd.code === 0;
}

async function fetchOrigin(
  branchName /*: string */,
  spawnOpts /*: Object */ = {},
) {
  const gitCmd = await spawn('git', ['fetch', 'origin', branchName], spawnOpts);
  return gitCmd.code === 0;
}

async function init(spawnOpts /*: Object */ = {}) {
  const gitCmd = await spawn('git', ['init'], spawnOpts);
  return gitCmd.code === 0;
}

async function merge(branchName /*: string */, spawnOpts /*: Object */ = {}) {
  const gitCmd = await spawn('git', ['merge', `${branchName}`], spawnOpts);
  return gitCmd.code === 0;
}

async function push(args /*: Array<any>*/ = [], spawnOpts /*: Object */ = {}) {
  const gitCmd = await spawn('git', ['push', ...args], spawnOpts);
  return gitCmd.code === 0;
}

async function remote(
  name /*: string */,
  url /*: string */,
  spawnOpts /*: Object */ = {},
) {
  const gitCmd = await spawn(
    'git',
    ['remote', 'add', `${name}`, `${url}`],
    spawnOpts,
  );
  return gitCmd.code === 0;
}

// used to create a single tag at a time for the current head only
async function tag(tagStr /*: string */, spawnOpts /*: Object */ = {}) {
  // NOTE: it's important we use the -m flag otherwise 'git push --follow-tags' wont actually push
  // the tags
  const gitCmd = await spawn(
    'git',
    ['tag', '-a', tagStr, '-m', tagStr],
    spawnOpts,
  );
  return gitCmd.code === 0;
}

async function isAncestorOf(
  oldRef /*: string */,
  newRef /*: string */,
  spawnOpts /*: Object */ = {},
) {
  const result = await spawn(
    'git',
    ['merge-base', '--is-ancestor', oldRef, newRef],
    spawnOpts,
  )
    .then(response => {
      return response.code === 0;
    })
    .catch(error => {
      return error.code === 0;
    });

  return result;
}

async function rebase(
  maxAttempts /*: number*/ = 3,
  spawnOpts /*: Object */ = {},
) {
  let attempts = 0;
  let rebased = false;
  let lastError = {};

  while (!rebased) {
    attempts++;
    try {
      await spawn('git', ['pull', '--rebase'], spawnOpts);
      rebased = true;
    } catch (e) {
      lastError = e;
      if (attempts >= maxAttempts) {
        break;
      }
    }
  }

  if (!rebased) {
    throw new Error(
      `Failed to rebase after ${maxAttempts} attempts\n${JSON.stringify(
        lastError,
      )}`,
    );
  }
}

// We expose this as a combined command because we want to be able to do both commands
// atomically
async function rebaseAndPush(
  maxAttempts /*: number*/ = 3,
  spawnOpts /*: Object */ = {},
) {
  let attempts = 0;
  let pushed = false;
  let lastError = {};

  while (!pushed) {
    attempts++;
    try {
      await spawn('git', ['pull', '--rebase'], spawnOpts);
      await spawn('git', ['push', '--follow-tags'], spawnOpts);
      pushed = true;
    } catch (e) {
      lastError = e;
      if (attempts >= maxAttempts) {
        break;
      }
    }
  }

  if (!pushed) {
    throw new Error(
      `Failed to push after ${maxAttempts} attempts.\n${JSON.stringify(
        lastError,
      )}`,
    );
  }
}

// helper method for getAllReleaseCommits and getAllChangesetCommits as they are almost identical
async function getAndParseJsonFromCommitsStartingWith(str, since, spawnOpts) {
  // --grep lets us pass a regex, -z splits commits using NUL instead of newlines
  const cmdArgs = ['log', '--grep', `^${str}`, '-z', '--no-merges'];
  if (since) {
    cmdArgs.push(`${since}..`);
  }
  const gitCmd = await spawn('git', cmdArgs, spawnOpts);
  const result = gitCmd.stdout.trim().split('\0').filter(Boolean);
  if (result.length === 0) return [];
  const parsedCommits = result
    .map(parseFullCommit)
    // unfortunately, we have left some test data in the repo, which wont parse properly, so we
    // need to manually pull it out here.
    .filter(parsed => parsed.message.includes('---'))
    .map(parsedCommit => {
      // eslint-disable-next-line no-shadow
      const { commit } = parsedCommit;
      const changeset = parseChangesetCommit(parsedCommit.message);
      if (!changeset) return undefined;
      // we only care about the changeset and the commit
      return { ...changeset, commit };
    })
    // this filter is for the same reason as above due to some unparsable JSON strings
    .filter(parsed => !!parsed);
  return parsedCommits;
}

// TODO: Don't parse these, just return the commits
// LB: BETTER DO THIS SOON
async function getAllReleaseCommits(
  since /*: any */,
  spawnOpts /*: Object */ = {},
) {
  return getAndParseJsonFromCommitsStartingWith(
    'RELEASING: ',
    since,
    spawnOpts,
  );
}

async function getAllChangesetCommits(
  since /*: any */,
  spawnOpts /*: Object */ = {},
) {
  return getAndParseJsonFromCommitsStartingWith(
    'CHANGESET: ',
    since,
    spawnOpts,
  );
}

// TODO: This function could be a lot cleaner, simpler and less error prone if we played with
// the pretty format stuff from `git log` to make sure things will always be as we expect
// (i.e this function breaks if you dont put '--no-merges' in the git log command)
function parseFullCommit(commitStr) {
  const lines = commitStr.trim().split('\n');
  const hash = lines.shift().replace('commit ', '').substring(0, 7);
  const author = lines.shift().replace('Author: ', '');
  const date = new Date(lines.shift().replace('Date: ', '').trim());

  // remove the extra padding added by git show
  const message = lines
    .map(line => line.replace('    ', ''))
    .join('\n')
    .trim(); // There is one more extra line added by git
  return {
    commit: hash,
    author,
    date,
    message,
  };
}

async function getLastPublishCommit(spawnOpts /*: Object */ = {}) {
  const gitCmd = await spawn(
    'git',
    [
      'log',
      '--grep',
      '^RELEASING: ',
      '--no-merges',
      '--max-count=1',
      '--format="%H"',
    ],
    spawnOpts,
  );
  // eslint-disable-next-line no-shadow
  const commit = gitCmd.stdout.trim().replace(/"/g, '');

  return commit;
}

async function getCommitThatAddsFile(
  pathTo /*: string */,
  spawnOpts /*: Object */ = {},
) {
  const gitCmd = await spawn(
    'git',
    ['log', '--reverse', '--max-count=1', '--pretty=format:%h', '-p', pathTo],
    spawnOpts,
  );
  // For reasons I do not understand, passing pretty format through this is not working
  // The slice below is aimed at achieving the same thing.
  // eslint-disable-next-line no-shadow
  const commit = gitCmd.stdout.split('\n')[0];

  return commit;
}

async function getUnpublishedChangesetCommits(
  since /*: any */,
  spawnOpts /*: Object */ = {},
) {
  // Start one commit before the "since" if it's passed in so that we can find that commit if required
  const releaseCommits = await getAllReleaseCommits(
    since ? `${since}~1` : undefined,
    spawnOpts,
  );
  const changesetCommits = await getAllChangesetCommits(since, spawnOpts);
  // to find unpublished commits, we'll go through them one by one and compare them to all release
  // commits and see if there are any that dont have a release commit that matches them
  const unpublishedCommits = changesetCommits.filter(cs => {
    return !releaseCommits.find(publishCommit => {
      // release commits have references to the changesets that they come from
      return publishCommit.changesets.find(changeset => {
        return changeset.commit === cs.commit;
      });
    });
  });

  return unpublishedCommits;
}

async function getMergeBase(
  branchName /*: string */,
  reference /*: string */,
  spawnOpts /*: Object */ = {},
) {
  const gitCmd = await spawn(
    'git',
    ['merge-base', getOriginBranchName(branchName), reference],
    spawnOpts,
  );

  // eslint-disable-next-line no-shadow
  const commit = gitCmd.stdout.split('\n')[0];
  return commit;
}

async function branchContainsCommit(
  commitHash /*:string */,
  branchName /*:string */,
  spawnOpts /*: Object */ = {},
) {
  const gitCmd = await spawn(
    'git',
    ['branch', '-r', '--contains', `${commitHash}`],
    spawnOpts,
  );

  const output = gitCmd.stdout.split('\n');
  const originBranchName = getOriginBranchName(branchName);
  return output.some(b => b.includes(originBranchName));
}

async function getBaseBranch(
  ref /*: string */ = 'HEAD',
  spawnOpts /*: Object */ = {},
  noFetch /*: Bool */ = false,
) {
  if (!noFetch) {
    await fetch(spawnOpts);
  }

  const branchName = ref === 'HEAD' ? await getBranchName(ref, spawnOpts) : ref;
  if (
    getOriginBranchName(branchName) === 'origin/develop' ||
    getOriginBranchName(branchName) === 'origin/master'
  ) {
    /* The merge-base of develop check does not work for the develop branch itself.
     * Always return master here since that is the base branch of develop */
    return 'master';
  }

  const developMergeBase = await getMergeBase('develop', ref, spawnOpts);
  const isOriginMaster = await isAncestorOf(
    developMergeBase,
    'master',
    spawnOpts,
  );

  return isOriginMaster ? 'master' : 'develop';
}

// Returns true if branch is `develop`, an RC, or `master`
async function isBranchSpecial(
  ref /*: string */ = 'HEAD',
  spawnOpts /*: Object */ = {},
) {
  const ReleaseBranchPrefix = 'release-candidate/';

  // Get branch if `HEAD` was given as ref
  const branchName = ref === 'HEAD' ? await getBranchName(ref, spawnOpts) : ref;

  const isReleaseBranch =
    branchName && branchName.startsWith(ReleaseBranchPrefix);
  const isDevelop = branchName && branchName === 'develop';
  const isMaster = branchName && branchName === 'master';

  return isReleaseBranch || isDevelop || isMaster;
}

// Gets target branch, assuming target branch is the branch from which it was created
// Wrapper for getBaseBranch that handles the exception cases of `develop` and RC branches
async function getTargetBranch(
  ref /*: string */ = 'HEAD',
  spawnOpts /*: Object */ = {},
  noFetch /*: Bool */ = false,
) {
  let targetBranch = 'master';
  const isSpecialBranch = await isBranchSpecial(ref);

  // If not `develop`, `master`, or an RC branch, grabs the base branch
  if (!isSpecialBranch) {
    targetBranch = await getBaseBranch(ref, spawnOpts, noFetch);
  }

  return targetBranch;
}

module.exports = {
  add,
  branch,
  checkout,
  commit,
  fetch,
  fetchOrigin,
  init,
  merge,
  push,
  remote,
  tag,
  isAncestorOf,
  rebase,
  rebaseAndPush,
  getAllReleaseCommits,
  getAllChangesetCommits,
  getBaseBranch,
  getBranchName,
  getChangesetFiles,
  getChangedFilesSince,
  getChangedChangesetFilesSinceBranch,
  getCommitThatAddsFile,
  getCommitsSince,
  getCommitsBetween,
  getLastPublishCommit,
  getMergeBase,
  getRef,
  getUnpublishedChangesetCommits,
  getTargetBranch,
  isBranchSpecial,
  branchContainsCommit,
  getOriginBranchName,
};
