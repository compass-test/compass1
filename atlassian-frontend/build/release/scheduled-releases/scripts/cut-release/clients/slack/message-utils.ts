export const MESSAGE_GREETING_PERSON = (channelLink: string) => ({
  type: 'section',
  text: {
    type: 'mrkdwn',
    text: `:blob-wave: Hey there! Your PRs will be part of ${channelLink} :rockon:`,
  },
});

export const MESSAGE_GREETING_TEAM = (
  teamName: string,
  channelLink: string,
) => ({
  type: 'section',
  text: {
    type: 'mrkdwn',
    text: `:blob-wave: ${teamName} team!\n\nYour releases will be part of ${channelLink} :partyparrot:`,
  },
});

export const MESSAGE_HEADING_TEAM = {
  type: 'section',
  text: {
    type: 'mrkdwn',
    text: `:playasateam: *Your Team's PRs in this Release* :playasateam:`,
  },
};

export const MESSAGE_CHECK_COMMITS = {
  type: 'section',
  text: {
    type: 'mrkdwn',
    text:
      '*Please ping the bump channel or message the release manager if you have any Feature Flags, ADF changes, or breaking changes which need to be addressed.*',
  },
};

export const MESSAGE_RELEASE_GO_LINK = (releaseName: string) => ({
  type: 'context',
  elements: [
    {
      type: 'mrkdwn',
      text: `To keep up to date with this release, check out <https://go.atlassian.com/go/release-${releaseName}|go/release-${releaseName}>! :manjit-believes-in-you:`,
    },
  ],
});

export const MESSAGE_RELEASES_HEADING = {
  type: 'section',
  text: {
    type: 'mrkdwn',
    text: ':thonk: *Your PRs in this Release* :thonk:',
  },
};

export const MESSAGE_DIVIDER = {
  type: 'divider',
};

export const MESSAGE_CONTEXT_SEARCH = {
  type: 'context',
  elements: [
    {
      type: 'mrkdwn',
      text:
        ':mag: Not seeing all your PRs? Make sure you talk to the release manager! :manjit-believes-in-you:',
    },
  ],
};

export const MESSAGE_EMPTY_TEAM = {
  type: 'section',
  text: {
    type: 'mrkdwn',
    text: 'Looks like your team has no PRs! :manjit-believes-in-you:',
  },
};

export const MESSAGE_WATCH_JIRA = (pullRequest: string, url: string) => ({
  type: 'section',
  text: {
    type: 'mrkdwn',
    text: `${pullRequest}`,
  },
  accessory: {
    type: 'button',
    text: {
      type: 'plain_text',
      text: 'See in Jira',
    },
    url,
  },
});

export const MESSAGE_AUTHOR_COMMITS = (
  authorHandle: string,
  authorPullRequests: string[],
) => ({
  type: 'section',
  text: {
    type: 'mrkdwn',
    text: `👏 *${authorHandle}'s PRs:*\n\n${authorPullRequests.join('\n')}`,
  },
});
