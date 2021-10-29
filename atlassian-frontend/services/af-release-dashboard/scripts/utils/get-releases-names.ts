import simpleGit from 'simple-git/promise';

const git = simpleGit('./');
git.silent(true);

/**
 * List of releases that for some reason are invalid.
 * Zorbeez
 *  Yarn rebased all commits from zorbeez by mistake just before releasing to npm.
 *  This caused that zorbeez release was never a proper release. However, the git tags
 *  were created as usual, we removed the tags, but they are still appearing as someone
 *  might be pushing it.
 */
const BLACKLIST_RELEASES = ['zorbeez'];

export const getReleaseNames = async (): Promise<string[]> => {
  await git.fetch(['origin']);
  const output = await git.raw(
    'tag --list --sort -taggerdate next-release-start-*'.split(' '),
  );
  return output
    .split('\n')
    .map((str) => str.trim())
    .filter(Boolean)
    .map((str) => str.replace('next-release-start-', ''))
    .filter((release) => BLACKLIST_RELEASES.indexOf(release) === -1); // We need to removed blacklisted releases
};
