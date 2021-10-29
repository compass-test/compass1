import { AuthorMetadataItem } from '../../../getPrsInRelease';
import {
  MESSAGE_GREETING_PERSON,
  MESSAGE_GREETING_TEAM,
  MESSAGE_CHECK_COMMITS,
  MESSAGE_RELEASE_GO_LINK,
  MESSAGE_DIVIDER,
  MESSAGE_RELEASES_HEADING,
  MESSAGE_CONTEXT_SEARCH,
  MESSAGE_HEADING_TEAM,
  MESSAGE_EMPTY_TEAM,
  MESSAGE_WATCH_JIRA,
  MESSAGE_AUTHOR_COMMITS,
} from './message-utils';

export const generateBlock = (
  releaseName: string,
  releaseChannelUrl: string,
  authorItems: AuthorMetadataItem[],
) => {
  const channelLink = `<${releaseChannelUrl}|#bump-editor-${releaseName}>`;
  const cards = (authorItems || [])
    .map(authorItem => generateMyBlock(authorItem))
    .reduce((acc, cardItems) => acc.concat(cardItems), []);

  return [
    MESSAGE_GREETING_PERSON(channelLink),
    MESSAGE_CHECK_COMMITS,
    MESSAGE_RELEASE_GO_LINK(releaseName),
    MESSAGE_DIVIDER,
    MESSAGE_RELEASES_HEADING,
    ...cards,
    MESSAGE_DIVIDER,
    MESSAGE_CONTEXT_SEARCH,
  ];
};

export const generateTeamBlock = (
  releaseName: string,
  teamName: string,
  releaseChannelUrl: string,
  teamItems: Record<string, AuthorMetadataItem[]>,
) => {
  const channelLink = `<${releaseChannelUrl}|#bump-editor-${releaseName}>`;
  const teamUsers = Object.keys(teamItems);
  if (teamUsers.length === 0) {
    return generateEmptyTeamBlock(releaseName);
  }

  const teamCards = teamUsers.reduce(
    (blocks: ReturnType<typeof generateContributorBlock>[], teamUser) =>
      teamItems[teamUser].length > 0
        ? blocks.concat(generateContributorBlock(teamUser, teamItems[teamUser]))
        : blocks,
    [],
  );

  return [
    MESSAGE_GREETING_TEAM(teamName, channelLink),
    MESSAGE_CHECK_COMMITS,
    MESSAGE_RELEASE_GO_LINK(releaseName),
    MESSAGE_DIVIDER,
    MESSAGE_HEADING_TEAM,
    ...teamCards,
    MESSAGE_RELEASE_GO_LINK(releaseName),
  ];
};

const generateEmptyTeamBlock = (releaseName: string) => {
  return [
    MESSAGE_EMPTY_TEAM,
    MESSAGE_RELEASE_GO_LINK(releaseName),
    MESSAGE_CONTEXT_SEARCH,
  ];
};

export const generateMyBlock = (authorItem: AuthorMetadataItem) => {
  const pullRequest = `*<${authorItem.link}|${authorItem.title}>*`;
  return [MESSAGE_WATCH_JIRA(pullRequest, authorItem.ticketUrl)];
};

export const generateContributorBlockItem = (
  authorItem: AuthorMetadataItem,
) => {
  const pullRequestLink = `*<${authorItem.link}|${authorItem.title}>*`;
  const jiraLink = `_<${authorItem.ticketUrl}|See in Jira>_`;
  return `${pullRequestLink} | ${jiraLink}`;
};

export const generateContributorBlock = (
  author: string,
  authorItems: AuthorMetadataItem[],
) => {
  const authorHandle = `@${author.split('@')[0]}`;
  const authorPullRequests = authorItems.map(authorItem =>
    generateContributorBlockItem(authorItem),
  );
  return [
    MESSAGE_AUTHOR_COMMITS(authorHandle, authorPullRequests),
    MESSAGE_DIVIDER,
  ];
};
