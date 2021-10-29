/* eslint-disable no-console */
import meow from 'meow';

import { mapPRMetadataToEntity } from '../utils/map-metadata-to-entity';
import { getReleaseNames } from '../utils/get-releases-names';
import { createPullRequestsInReleaseFactory } from '../utils/get-prs-in-releases';
import { seedExist, writeSeed } from './seed-fs';
import { getReleasesFromCli } from '../utils/get-releases-from-cli';

const main = async (flags: typeof cli.flags) => {
  let releaseNames = await getReleaseNames();

  // Filtering any release older than jersey, as the PR's lives in the older repo
  // Filtering any release older than merino, as the release tag didn't exist at that point
  const mIndex = releaseNames.indexOf('merino');
  releaseNames = releaseNames.slice(0, mIndex + 1);

  const releases = getReleasesFromCli(flags, releaseNames);
  const { getPullRequestsInRelease } = createPullRequestsInReleaseFactory(
    releaseNames,
  );
  for (const releaseName of releases) {
    if (!flags.force && (await seedExist(releaseName))) {
      console.log(`Seed for release: ${releaseName} already exist skipping.`);
      continue;
    }
    console.log(`Retrieving PullRequests for release: ${releaseName}.`);
    const pullRequests = await getPullRequestsInRelease(releaseName);
    console.log(`Writing release: ${releaseName} dataset to local file.`);
    await writeSeed(releaseName, pullRequests.map(mapPRMetadataToEntity));
  }
};

const cli = meow(
  `
  Usage:
    $ yarn create:db-seed --release fox --release jersey --force
    $ yarn create:db-seed --from hartebeest --to cockatoo

  Options
     --force,   will rewrite existing seed
     --release, release name that you want to create the seed
     --from,    release name where you want to start the seed creation
     --to,      release name where you want to end the seed creation
     --help,    show this help dialog

  Environment Variables
    BITBUCKET_USER, BB user to do the API requests
    BITBUCKET_PASSWORD, NOT your password, but the API token that you can create to access BB api.
   `,
  {
    description: 'Create seed files for releases',
    flags: {
      force: {
        type: 'boolean',
      },
      release: {
        type: 'string',
        isMultiple: true,
        isRequired: true,
      },
      from: {
        type: 'string',
      },
      to: {
        type: 'string',
      },
      help: {
        type: 'boolean',
      },
    },
  },
);

const { help, from, to, release } = cli.flags;

if (
  help ||
  !((from && to) || release) // or range or specific release
) {
  cli.showHelp();
} else {
  main(cli.flags).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
