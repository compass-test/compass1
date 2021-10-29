import chalk from 'chalk';
import { ValidationError } from '@atlaskit/build-utils/errors';

import { cutReleaseCli as cli } from './cli';
import { ReleaseOpts, ScriptsOpts } from './types';

import { JiraClient } from './clients/jira';
import { BitbucketClient } from './clients/bitbucket';
import { SlackClient } from './clients/slack';
import { AuthOpts } from './clients/base';

import { createRelease } from './steps/step-01-create-release/index';
import { createPullRequest } from './steps/step-02-create-pull-request/index';
import { transitionReleaseTicket } from './steps/step-03-transition-release-ticket/index';
import { getAllPullRequests } from './steps/step-04-get-all-pull-requests/index';
import { labelTicketsInRelease } from './steps/step-05-label-tickets-in-release/index';
import { sendMessagesAndInvites } from './steps/step-06-send-slack-messages-and-invites/index';
import { addCommentToTicket } from './steps/step-07-add-comment-to-ticket/index';

import { Logger } from './utils/logger';
import {
  getAtlassianCredentials,
  getBitbucketCredentials,
  getSlackCredentials,
} from './utils';

export const logger = new Logger();

export default async function main(
  releaseOpts: ReleaseOpts,
  authOpts: { atlassian: AuthOpts; bitbucket: AuthOpts; slack: AuthOpts },
  scriptOpts: ScriptsOpts = {},
) {
  const { currRelease, nextRelease } = releaseOpts;
  const { atlassian, slack, bitbucket } = authOpts;

  const bitbucketClient = new BitbucketClient(bitbucket);
  const jiraClient = new JiraClient(atlassian);
  const slackClient = new SlackClient(slack);

  try {
    // 1. Create the release branch off develop, against `master`.
    const createReleaseOpts = { currRelease, nextRelease };
    await createRelease(createReleaseOpts, scriptOpts);
    // 2. Create the pull request between release-candidate and `master`.
    const createPullRequestOpts = { currRelease, client: bitbucketClient };
    await createPullRequest(createPullRequestOpts, scriptOpts);
    // 3. Move the release ticket to 'stabilising' with the RC date set.
    const transitionReleaseTicketOpts = {
      currRelease,
      status: 'STABILISING' as const,
      client: jiraClient,
    };
    await transitionReleaseTicket(transitionReleaseTicketOpts, scriptOpts);
    // 4. Get information about the PRs in the release.
    const getAllPullRequestsOpts = { currRelease, bitbucket };
    const { pullRequests, authors, teams } = await getAllPullRequests(
      getAllPullRequestsOpts,
      scriptOpts,
    );
    // 5. Label issues part of release with release tag in Jira.
    const labelTicketsInReleaseOpts = {
      currRelease,
      pullRequests,
      auth: atlassian,
    };
    await labelTicketsInRelease(labelTicketsInReleaseOpts, scriptOpts);
    // 6. Send message to authors of each commit in the release. Also send a
    // summary to the teams who are part of a release.
    const sendMessagesOpts = {
      currRelease,
      teams,
      authors,
      client: slackClient,
    };
    const channel = await sendMessagesAndInvites(sendMessagesOpts, scriptOpts);
    // 7. Add Jira comment to ticket.
    const addCommentToTicketOpts = {
      currRelease,
      channelUrl: channel.url,
      client: jiraClient,
    };
    await addCommentToTicket(addCommentToTicketOpts, scriptOpts);

    // Nice, done!
    logger.success(
      `
        🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉
        🎉🎊🥳 All done! Now, go and take a well-deserved break :troll: 🎉🎊🥳
        🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉
      `,
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
}

if (require.main === module) {
  const [releaseName, nextReleaseName] = cli.input;
  const releaseOpts = {
    currRelease: releaseName,
    nextRelease: nextReleaseName,
  };
  const authOpts = {
    atlassian: getAtlassianCredentials(process.env),
    bitbucket: getBitbucketCredentials(process.env),
    slack: getSlackCredentials(process.env),
  };

  main(releaseOpts, authOpts, cli.flags).catch(e => {
    if (e instanceof ValidationError) {
      console.error(chalk.red(e.message));
      cli.showHelp(2);
    }
    console.error(chalk.red(e));
    process.exit(1);
  });
}
