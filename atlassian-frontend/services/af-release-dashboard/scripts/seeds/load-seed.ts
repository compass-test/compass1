import meow from 'meow';

import { PullRequestEntity } from '../../src/db/entities/PullRequest';
import { ReleaseStatus } from '../../src/db/entities/Release';
import { getSeedPaths } from './seed-fs';
import { sendRelease } from '../utils/send-releases-server';

const main = async (url: string) => {
  const paths = await getSeedPaths();

  // Reverse alphabetically to get the newest release first
  const entries = paths.sort().reverse().entries();

  // Get release status phases and discard the first 'planned' status
  // since they get filtered out in the UI.
  const statusPhases = Object.values(ReleaseStatus);
  statusPhases.shift();

  for (const [i, { name, path }] of entries) {
    // eslint-disable-next-line import/dynamic-import-chunkname
    const { pullRequests } = (await import(path)) as {
      pullRequests: PullRequestEntity[];
    };

    // Set initial status based on the index
    const status = statusPhases[i] || ReleaseStatus['adopted-by-all-products'];
    await sendRelease(name, pullRequests, url, status);
  }
};

const cli = meow(
  `
  Usage:
    $ yarn db:load-seed --url http://localhost:8080

  Options
     --url, root url where the server lives

  Environment Variables
    RELEASE_DASHBOARD_TOKEN, Auth token to connect with the Release Dashboard API.
   `,
  {
    description: 'Store the seeds in the DB',
    flags: {
      url: {
        type: 'string',
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
  main(url).catch((err) => {
    console.error(err);
  });
}
