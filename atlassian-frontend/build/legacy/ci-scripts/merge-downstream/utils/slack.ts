import { SlackClient } from '@atlaskit/build-utils/slack';
import { User, ActionConfig, MergeConflict } from '../types';

const { BITBUCKET_REPO_FULL_NAME, BITBUCKET_BUILD_NUMBER } = process.env;

const pipelineUrl = `https://bitbucket.org/${BITBUCKET_REPO_FULL_NAME}/addon/pipelines/home#!/results/${BITBUCKET_BUILD_NUMBER}`;

/**
 * Constrain message length to prevent an API error when sent to Slack.
 *
 * The Slack API has a maximum character length limit of 3000 per block.
 *
 * @see https://api.slack.com/reference/block-kit/blocks#section_fields
 */
export function constrainMessage(message: string) {
  if (message.length > 3000) {
    // Instead of truncating the input message, we replace it with a fallback value
    message = `We are unable to display the conflicted files, check the bitbucket pipeline: ${pipelineUrl} for details.`;
  }
  return message;
}

async function getSlackId(
  email: string,
  slackClient: SlackClient,
): Promise<string> {
  // Search for user on Slack if the email exists
  const userResponse = await slackClient.lookupUserByEmail({ email });
  if (!userResponse.ok) {
    console.log(`Failed to fetch the RM from Slack: ${email}`);
    return '';
  }
  return userResponse.user.id;
}

async function getRMMention(releaseManager: User, slackClient: SlackClient) {
  let releaseManagerSlackId;
  if (releaseManager.emailAddress) {
    releaseManagerSlackId = await getSlackId(
      releaseManager.emailAddress,
      slackClient,
    );
  }

  return (
    ':call_me_hand: *Calling release manager:* ' +
    (releaseManagerSlackId
      ? `<@${releaseManagerSlackId}>\n\n`
      : 'RM could not be found, enable email visibility at https://id.atlassian.com/manage-profile/profile-and-visibility to be pinged.\n\n')
  );
}

const headerBlock = async (
  { from, to, pipelinesLink, releaseManager }: ActionConfig,
  headerText: string,
  typeEmoji: string,
  slackClient: SlackClient,
) => ({
  type: 'section',
  text: {
    type: 'mrkdwn',
    text:
      (await getRMMention(releaseManager, slackClient)) +
      `${typeEmoji} *${headerText}:* \`${from}\` to \`${to}\` ${typeEmoji}\n\n` +
      `:hammer_and_wrench: <${pipelinesLink}|See Pipeline for output>`,
  },
});

export async function conflictedFilesBlock(
  mergeConflictDetails: Array<MergeConflict>,
  slackClient: SlackClient,
) {
  if (mergeConflictDetails.length === 0) {
    return {};
  }

  const NUMBER_OF_FILES_TO_SHOW = 20;

  const conflictSummary = await Promise.all(
    mergeConflictDetails
      .slice(0, NUMBER_OF_FILES_TO_SHOW)
      .map(async conflict => {
        const slackId = await getSlackId(conflict.authorEmail, slackClient);
        const authorMention = slackId ? `(<@${slackId}>)` : '';
        return `${conflict.file} - ${conflict.authorName} ${authorMention}`;
      }),
  );

  const extraFilesMessage =
    mergeConflictDetails.length > NUMBER_OF_FILES_TO_SHOW
      ? `And ${
          mergeConflictDetails.length - NUMBER_OF_FILES_TO_SHOW
        } other files`
      : '';

  return {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text:
        '*Conflicted files and last people to edit them:*\n\n' +
        conflictSummary.join('\n') +
        extraFilesMessage,
    },
  };
}

const resolutionInstructionsBlock = ({
  from,
  to,
  mergeBranch,
}: ActionConfig) => ({
  type: 'section',
  text: {
    type: 'mrkdwn',
    text:
      '*Instructions:*' +
      `\`\`\`git fetch origin\n` +
      `git checkout -b ${mergeBranch} origin/${to}\n` +
      `git merge origin/${from}\n` +
      `# Fix all conflicts\n` +
      `git add <conflicted-filenames>\n` +
      `git commit --no-verify\n` +
      `# Uncomment "Conflicts:" section\n` +
      `git push -u origin ${mergeBranch}\`\`\`\n` +
      `Then, raise a PR from \`${mergeBranch}\` to \`${to}\``,
  },
});

const helpBlock = {
  type: 'context',
  elements: [
    {
      type: 'mrkdwn',
      text: `For more information on this process, please see <http://go.atlassian.com/af-merging-master|go/af-merging-master>`,
    },
  ],
};

const divider = {
  type: 'divider',
};

export async function sendFailedMessage(
  actionConfig: ActionConfig,
  mergeConflictDetails: Array<MergeConflict>,
  slackClient: SlackClient,
) {
  const conflicts = await conflictedFilesBlock(
    mergeConflictDetails,
    slackClient,
  );

  if (conflicts.text) {
    conflicts.text.text = constrainMessage(conflicts.text.text);
  }

  const blocks = [
    await headerBlock(
      actionConfig,
      'Automatic Merge Failed',
      ':no_entry:',
      slackClient,
    ),
    divider,
    conflicts,
    resolutionInstructionsBlock(actionConfig),
    helpBlock,
    divider,
  ];

  // Notify RMs with Slack bot if the merge fails
  console.log('Sending failure notification to Slack channel');
  const response = await slackClient.sendMessage({
    message: blocks,
  });
  console.log('response: ', response);

  if (response && !response.ok) {
    console.log(
      `Something went wrong when sending the Slack message, please consult the bitbucket pipeline for further details:\n${pipelineUrl}`,
    );
    throw new Error(response.error);
  }
}

export async function sendSuccessfulMessage(
  actionConfig: ActionConfig,
  prLink: string,
  slackClient: SlackClient,
) {
  const blocks = [
    await headerBlock(
      actionConfig,
      'Automatic Merge Succeeded',
      ':tada:',
      slackClient,
    ),
    divider,
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `However there's a chance the landkid pipeline failed, you can check its status on the PR: ${prLink}`,
      },
    },
    helpBlock,
    divider,
  ];

  // Notify RMs with Slack bot if the merge fails
  console.log('Sending success notification to Slack channel');
  const response = await slackClient.sendMessage({
    message: blocks,
  });
  console.log('response: ', response);
}

export async function sendSkippedMessage(
  actionConfig: ActionConfig,
  slackClient: SlackClient,
) {
  const { mergeBranch } = actionConfig;

  const blocks = [
    await headerBlock(
      actionConfig,
      'Automatic Merge Skipped',
      ':skip:',
      slackClient,
    ),
    divider,
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `There was an existing branch with the name \`${mergeBranch}\` so a new one wasn't created.`,
      },
    },
    helpBlock,
    divider,
  ];

  // Notify RMs with Slack bot if the merge fails
  console.log('Sending skipped notification to Slack channel');
  const response = await slackClient.sendMessage({
    message: blocks,
  });
  console.log('response: ', response);
}
