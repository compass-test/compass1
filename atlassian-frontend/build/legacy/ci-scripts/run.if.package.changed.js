/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const spawndamnit = require('spawndamnit');
const git = require('@atlaskit/build-utils/git');
const { default: getReleasePlan } = require('@changesets/get-release-plan');
const {
  getChangedPackages,
  getChangedPackagesSincePublishCommit,
} = require('@atlaskit/build-utils/packages-old');

/**
 * This is a helper to run a script if a certain package changed.
 * Should only be run on feature branches and _not_ on master.
 * It works by returning a zero code if a tool should be run, so that the normal usage becomes:
 *
 * `node build/legacy/ci-scripts/run.if.package.changed @full/package-name -- yarn toolName`.
 * `node build/legacy/ci-scripts/run.if.package.changed @full/package-name @another/package-name -- yarn toolName`.
 */
(async () => {
  const args = process.argv.slice(2);

  const dashdashIndex = args.indexOf('--');
  const command = args.slice(dashdashIndex + 1);
  const packageNames = args.slice(0, dashdashIndex);

  if (dashdashIndex < 0 || command.length === 0 || packageNames.length === 0) {
    console.error('Incorrect usage, run it like this:\n');
    console.error(
      '  $ node build/legacy/ci-scripts/run.if.package.changed.js [...packages] -- <...command>\n',
    );
    process.exit(1);
  }
  // Take changed files since a commit or master branch
  const branch = await git.getBranchName();

  const sinceRef = await (branch === 'master'
    ? git.getLastPublishCommit()
    : git.getBaseBranch(branch, undefined, true));

  const releasePlan = await getReleasePlan(process.cwd(), sinceRef);

  const packagesToRelease = releasePlan.releases
    .filter(release => release.type !== 'none')
    .map(release => release.name);
  const changedPackages =
    branch === 'master'
      ? await getChangedPackagesSincePublishCommit()
      : await getChangedPackages(process.env.BITBUCKET_BRANCH);

  const matched = !!changedPackages
    .map(pkg => pkg.name)
    .concat(packagesToRelease)
    .find(pkgName => packageNames.includes(pkgName));

  if (!matched) {
    process.exit(0);
  }

  try {
    const res = await spawndamnit(command[0], command.slice(1), {
      stdio: 'inherit',
      tty: (process.stdout && process.stdout.isTTY) || false,
    });

    throw process.exit(res.code);
  } catch (err) {
    if (err instanceof spawndamnit.ChildProcessError) {
      process.exit(err.code);
    } else {
      process.exit(1);
    }
  }
})();
