/* eslint-disable no-console */
import meow from 'meow';

import { getReleaseNames } from './utils/get-releases-names';
import { getReleasesFromCli } from './utils/get-releases-from-cli';
import { JiraUtils } from '../src/utils/jira/jira-utils';
import { updateRelease } from './utils/send-releases-server';

const main = async (flags: typeof cli.flags) => {
  let releaseNames = await getReleaseNames();

  // Filtering any release older than jersey, as the PR's lives in the older repo
  // Filtering any release older than merino, as the release tag didn't exist at that point
  const mIndex = releaseNames.indexOf('merino');
  releaseNames = releaseNames.slice(0, mIndex + 1);

  const releases = getReleasesFromCli(flags, releaseNames);
  const fabdodgemTickets = await JiraUtils.getFabDodgemTickets();
  for (const release of releases) {
    const jiraTicket = fabdodgemTickets.find(
      ({ releaseName }) => releaseName === release,
    );
    if (!jiraTicket) {
      console.log(`No jira ticket found for release ${release}.`);
      continue;
    }
    const partialRelease = await JiraUtils.getFabDodgemTicketReleaseChanges(
      jiraTicket.key,
    );

    await updateRelease(release, partialRelease, flags.url);
  }
};

const cli = meow(
  `
  Usage:
    $ yarn update-timelines --from hartebeest --to cockatoo --url http://localhost:8080

  Options
     --from,    release name where you want to start the seed creation
     --to,      release name where you want to end the seed creation
     --url,     release dashboard URL that you want to update
     --help,    show this help dialog

  Environment Variables
    JIRA_USER, User to access atlassian account
    JIRA_PASSWORD, NOT your password, but the API token that you can create to access atlassian API.
    RELEASE_DASHBOARD_TOKEN, Auth token to connect with the Release Dashboard API.
   `,
  {
    description: 'Create seed files for releases',
    flags: {
      from: {
        type: 'string',
      },
      to: {
        type: 'string',
      },
      url: {
        type: 'string',
      },
      help: {
        type: 'boolean',
      },
    },
  },
);

const { help, url, from, to } = cli.flags;

if (
  help ||
  !(from && to) || // or range or specific release
  !url
) {
  cli.showHelp();
} else {
  main(cli.flags).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
