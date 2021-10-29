/* eslint-disable no-console */
import meow from 'meow';

import { getReleaseNames } from './utils/get-releases-names';
import { createPullRequestsInReleaseFactory } from './utils/get-prs-in-releases';
import { sendRelease } from './utils/send-releases-server';
import { mapPRMetadataToEntity } from './utils/map-metadata-to-entity';

const main = async (flags: typeof cli.flags) => {
  const { last, since, url } = flags;
  const lastNumber = Number.parseInt(last, 10);
  if (Number.isNaN(lastNumber)) {
    throw new Error(`You need to specify a number in 'last' option.`);
  }

  let releaseNames = (await getReleaseNames()).splice(0, lastNumber);

  const { getPullRequestsInRelease } = createPullRequestsInReleaseFactory(
    releaseNames,
  );
  for (const releaseName of releaseNames) {
    console.log(
      `Retrieving PullRequests for release: ${releaseName} since ${since}.`,
    );
    const pullRequests = await getPullRequestsInRelease(releaseName, { since });
    if (pullRequests.length === 0) {
      console.log(
        `No pull requests were found for release ${releaseName} since ${since}`,
      );
      continue;
    }
    await sendRelease(
      releaseName,
      pullRequests.map(mapPRMetadataToEntity),
      url,
    );
  }
};

const cli = meow(
  `
  Usage:
    $ yarn update-releases --last 3 --since "2 hours ago" --url http://localhost:8080

  Options
     --last,    amount of last releases that you want to use, Default: 3
     --since,   time since we are going to look for pull requests, Default: "2 hours ago"
     --url,     release dashboard URL that you want to update
     --help,    show this help dialog

  Environment Variables
    BITBUCKET_USER, BB user to do the API requests
    BITBUCKET_PASSWORD, NOT your password, but the API token that you can create to access BB api.
    RELEASE_DASHBOARD_TOKEN, Auth token to connect with the Release Dashboard API.
   `,
  {
    description: 'Create seed files for releases',
    flags: {
      last: {
        type: 'string',
        default: '3',
      },
      since: {
        type: 'string',
        default: '2 hours ago',
      },
      url: {
        type: 'string',
        // @ts-ignore
        isRequired: true,
      },
      help: {
        type: 'boolean',
      },
    },
  },
);

const { help, url } = cli.flags;

if (help || !url) {
  cli.showHelp();
} else {
  main(cli.flags).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
