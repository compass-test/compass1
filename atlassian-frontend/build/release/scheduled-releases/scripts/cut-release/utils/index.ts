import {
  AuthorMetadata,
  AuthorMetadataItem,
  PullRequestTeamMetadata,
} from '../../getPrsInRelease';

const DEV_AUTHORS_ALLOW_LIST = ['akishore@atlassian.com', 'sxu@atlassian.com'];
const DEV_TEAMS_ALLOW_LIST = ['Editor Media'];
const DEV_TEAM_ROOM = 'cut-release-script-testing-ground';

export const stripAuthors = (
  authors: Record<string, AuthorMetadataItem[]>,
  allowList = DEV_AUTHORS_ALLOW_LIST,
) => {
  const authorsTest = allowList.reduce((acc, x) => {
    acc[x] = authors[x];
    return acc;
  }, {} as AuthorMetadata);
  return authorsTest;
};

export const stripTeams = (
  teams: Record<string, PullRequestTeamMetadata>,
  allowList = DEV_TEAMS_ALLOW_LIST,
) => {
  const teamsTest = allowList.reduce((acc, x) => {
    acc[x] = teams[x];
    return acc;
  }, {} as Record<string, PullRequestTeamMetadata>);
  // Send team message to a test room.
  const testTeam = DEV_TEAMS_ALLOW_LIST[0];
  teamsTest[testTeam] = {
    channel: DEV_TEAM_ROOM,
    pullRequests: teamsTest[testTeam].pullRequests,
  };
  return teamsTest;
};

export const getBitbucketCredentials = (env: any) => {
  if (!env.BITBUCKET_USER || !env.BITBUCKET_PASSWORD) {
    const message = `🔒 BITBUCKET_USER, BITBUCKET_PASSWORD required.`;
    const messageNextStep = `Create an app password at https://bitbucket.org/account/settings/app-passwords.`;
    throw Error(`${message} ${messageNextStep}`);
  }
  return {
    username: env.BITBUCKET_USER!,
    password: env.BITBUCKET_PASSWORD!,
  };
};

export const getAtlassianCredentials = (env: any) => {
  if (!env.ATLASSIAN_USER || !env.ATLASSIAN_PASSWORD) {
    const message = `🔒 ATLASSIAN_USER, ATLASSIAN_PASSWORD required.`;
    const messageNextStep = `Use your staff ID and token from https://id.atlassian.com/manage-profile/security/api-tokens.`;
    throw Error(`${message} ${messageNextStep}`);
  }
  return {
    username: env.ATLASSIAN_USER!,
    password: env.ATLASSIAN_PASSWORD!,
  };
};

export const getSlackCredentials = (env: any) => {
  if (!env.AFP_SLACK_TOKEN) {
    const message = `🔒 AFP_SLACK_TOKEN required.`;
    const messageNextStep = `Talk to the AFP team for access.`;
    throw Error(`${message} ${messageNextStep}`);
  }
  return {
    token: env.AFP_SLACK_TOKEN!,
  };
};
