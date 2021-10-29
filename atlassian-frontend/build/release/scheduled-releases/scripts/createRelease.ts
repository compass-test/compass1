import path from 'path';
import chalk from 'chalk';
import meow from 'meow';
import simpleGit, { SimpleGit } from 'simple-git/promise';
import { ValidationError } from '@atlaskit/build-utils/errors';
import { DevelopBranchName, ReleaseBranchPrefix } from '../constants';
import { createSpyObject } from '@atlaskit/build-utils/logging';
import { capitalise } from '../utils';
import generateReleaseNotes from './generateReleaseNotes';
import { Logger } from './cut-release/utils/logger';
import { BITBUCKET_REPO_REMOTE_FORK } from './cut-release/clients/bitbucket/constants';

type Options = {
  dryRun: boolean;
  dev: boolean;
};

const defaultOpts: Options = {
  dryRun: false,
  dev: false,
};

// Log without a newline
const logger = new Logger();

export default async function main(
  releaseName: string,
  nextReleaseName: string,
  userOpts: Partial<Options> = {},
) {
  if (!releaseName || !nextReleaseName) {
    throw new ValidationError(
      'Must supply the current release name and the next release name.',
    );
  }
  const opts = { ...defaultOpts, ...userOpts };
  const git = opts.dryRun ? createSpyObject<SimpleGit>('git') : simpleGit('./');
  const rootDir = path.resolve('../../..');
  const remote = userOpts.dev ? 'fork' : 'origin';
  const developBranch = `${remote}/${DevelopBranchName}`;

  if (opts.dev) {
    const remotes = await git.remote([]);
    if (remotes) {
      const remotesArr = remotes.split('\n');
      const hasFork = remotesArr.includes('fork');
      if (hasFork) {
        logger.success('✅ Already have `fork` remote.');
      } else {
        await git.remote(['add', 'fork', BITBUCKET_REPO_REMOTE_FORK]);
        logger.success('✅ Added `fork` remote...');
      }
    } else {
      throw Error('Unable to list git remotes');
    }
  }

  await logger.task('Performing `git fetch`', () => git.fetch([remote]));

  const nextReleaseTagName = `next-release-start-${nextReleaseName}`;

  await logger.task(`Performing \`git checkout\` of ${developBranch}`, () =>
    git.checkout(developBranch),
  );

  await logger.task(`Tagging ${developBranch} with start of next release`, () =>
    git.addAnnotatedTag(
      nextReleaseTagName,
      `Marks the start of code that will go out in the next release - ${capitalise(
        nextReleaseName,
      )}`,
    ),
  );

  const releaseBranchName = `${ReleaseBranchPrefix}${releaseName}`;
  await logger.task(`Checking out release branch from  ${developBranch}`, () =>
    git.checkoutBranch(releaseBranchName, developBranch),
  );

  let releaseNotesPath: string = '';
  await logger.task('Generating release notes', async () => {
    const releaseNotesResult = await generateReleaseNotes(releaseName, {
      rootDir,
      write: true,
    });
    releaseNotesPath = String(releaseNotesResult.releaseNotesPath);
  });
  console.log(`✅ Finished - Release notes generated at ${releaseNotesPath}`);

  await logger.task('Comitting release notes', async () => {
    await git.add([releaseNotesPath]);
    await git.commit([`adding release notes for ${releaseName}`]);
  });

  await logger.task('Pushing release branch and notes, next release tag', () =>
    git.raw(['push', remote, releaseBranchName, nextReleaseTagName]),
  );
  return;
}

if (require.main === module) {
  const cli = meow(
    `
    Usage
        $ create-release <releaseName> <nextReleaseName>

      Options
        --dry-run, -d         Perform a dry run
        --dev, --dev          Perform against a fork of the atlassian-frontend repository (must have \`fork\` git remote)

      Examples
        $ create-release elastiq flannel
`,
    {
      description:
        'Creates a new release branch, tags the next release name and creates metadata about the release',
      flags: {
        dryRun: {
          type: 'boolean',
          alias: 'd',
        },
      },
    },
  );

  const [releaseName, nextReleaseName] = cli.input;

  main(releaseName, nextReleaseName, cli.flags).catch(e => {
    if (e instanceof ValidationError) {
      console.error(chalk.red(e.message));
      cli.showHelp(2);
    }
    console.error(chalk.red(e));
    process.exit(1);
  });
}
