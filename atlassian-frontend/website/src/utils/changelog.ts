import { Logs } from '../components/ChangeLog';

export type Changelog = { default: { default: string } | string } | string;

export const divvyChangelog = (changelog: Changelog): Logs => {
  let stringChangelog = '';
  if (
    typeof changelog === 'object' &&
    typeof changelog.default === 'object' &&
    changelog.default.default
  ) {
    stringChangelog = changelog.default.default;
  } else if (typeof changelog === 'object' && changelog.default) {
    stringChangelog = changelog.default as string;
  } else if (typeof changelog === 'string') {
    stringChangelog = changelog;
  }

  const splitToken = `__CHANGELOG_SPLIT_${Date.now()}__`;
  let prevChangesetRepo = 'atlassian-frontend';
  return stringChangelog
    .replace(/[\n\r\s]## /g, `${splitToken}## `)
    .split(splitToken)
    .reduce((all, md) => {
      // This should only allow us to skip the first chunk which is the name, as
      // well as the unreleased section.
      const match = md.match(/\d+\.\d+\.\d+/);
      if (!match) {
        return all;
      }
      // Getting the repository url
      let repository = [
        'atlaskit',
        'atlaskit-mk-2',
        'atlassian-frontend',
      ].find(r => md.match(`https://bitbucket.org/atlassian/${r}/commits/`));
      if (!repository) {
        // Some versions of a component do not link to a commit, so we use the same repo
        // that we found rather than always defaulting to the latest
        repository = prevChangesetRepo;
      }
      prevChangesetRepo = repository;
      return all.concat({
        version: match[0],
        md,
        repository,
      });
    }, [] as Logs);
};
