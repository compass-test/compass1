import fetchMock from 'fetch-mock/cjs/client';

import {
  DEFAULT_STARGATE_SERVICE_URL,
  EXUS_THIRDPARTY_PATH,
  INFI_URL,
} from '../../src/clients/common';

import {
  GOOGLE_SERVICE,
  MICROSOFT_SERVICE,
  SLACK_SERVICE,
} from '../../src/components/ThirdParty/constants';

export const mockSiteId = '5e982da0-ca43-4e91-b5ba-6fdadf1df292';
export const mockResourceAri = `ari:cloud:confluence::site/${mockSiteId}`;
export const mockPlatformResourceAri = `ari:cloud:platform::site/${mockSiteId}`;
export const slackWorkspaceId = 'workspace-1';

export const integrationsMockMatcher = `begin:${DEFAULT_STARGATE_SERVICE_URL}${INFI_URL}/integrations`;
export const integrationsSearchMatcher = `begin:${DEFAULT_STARGATE_SERVICE_URL}${INFI_URL}/search`;
export const exusIntegrationsMockMatcher = `begin:${DEFAULT_STARGATE_SERVICE_URL}${EXUS_THIRDPARTY_PATH}/integrations`;
export const exusIntegrationsSearchMatcher = `begin:${DEFAULT_STARGATE_SERVICE_URL}${EXUS_THIRDPARTY_PATH}/search`;
export const slackWorkspacesJiraMatcher = `${DEFAULT_STARGATE_SERVICE_URL}${INFI_URL}/slack-workspaces?cloudId=${mockSiteId}&product=jira`;
export const slackWorkspacesConfluenceMatcher = `${DEFAULT_STARGATE_SERVICE_URL}${INFI_URL}/slack-workspaces?cloudId=${mockSiteId}&product=confluence`;
export const slackConversationsConfluenceMatcher = `${DEFAULT_STARGATE_SERVICE_URL}${INFI_URL}/slack-conversations?cloudId=${mockSiteId}teamId=${slackWorkspaceId}&product=confluence&`;
export const slackConversationsJiraMatcher = `${DEFAULT_STARGATE_SERVICE_URL}${INFI_URL}/slack-conversations?cloudId=${mockSiteId}&teamId=${slackWorkspaceId}&product=jira`;
export const loggedInUserMatcher = `begin:${DEFAULT_STARGATE_SERVICE_URL}/me`;
export const slackJiraEnabledMatcher = `begin:${DEFAULT_STARGATE_SERVICE_URL}/slack/jira/enabled`;
export const slackJiraTeamsMatcher = `begin:${DEFAULT_STARGATE_SERVICE_URL}/slack/jira/teams`;
export const slackJiraUsersMatcher = `begin:${DEFAULT_STARGATE_SERVICE_URL}/slack/jira/recipients`;

const mockWorkSpaces = [
  {
    id: slackWorkspaceId,
    avatar:
      'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
    name: 'test',
  },
  {
    id: '1',
    name: 'security',
    avatar:
      'https://upload.wikimedia.org/wikipedia/commons/7/76/Slack_Icon.png',
  },
  {
    id: '2',
    name: 'support',
    avatar:
      'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
  },
  {
    id: '3',
    name: 'dev ops',
    avatar:
      'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
  },
];

export const mockLoggedInUser = () => {
  fetchMock.get({
    matcher: loggedInUserMatcher,
    response: {
      body: {
        acount_id: 'account-id',
        email: 'email@email.com',
      },
      status: 200,
    },
    name: 'get-logged-in-user',
  });
};

export const mockIntegrationsResponse = (integrations?: string[]) => {
  fetchMock.get({
    matcher: integrationsMockMatcher,
    delay: 1000,
    response: {
      body: {
        enabledIntegrations: [GOOGLE_SERVICE, MICROSOFT_SERVICE, SLACK_SERVICE],
        connectedIntegrations: integrations || [],
      },
      status: 200,
    },
    name: 'get-existing-integrations',
    overwriteRoutes: true,
  });
};

export const mockIntegrationsSearchResponse = () => {
  fetchMock.get({
    matcher: integrationsSearchMatcher,
    delay: 1000,
    response: {
      body: [
        {
          email: 'email@email.com',
          displayName: 'Test User1',
          sources: ['google'],
        },
        {
          email: 'email_2@email.com',
          displayName: 'Test User2',
          sources: ['microsoft'],
        },
      ],
      status: 200,
    },
    name: 'search-integrations',
  });
};

export const mockExusIntegrationsResponse = (integrations?: string[]) => {
  fetchMock.get({
    matcher: exusIntegrationsMockMatcher,
    delay: 1000,
    response: {
      body: {
        enabledIntegrations: [GOOGLE_SERVICE, SLACK_SERVICE],
        connectedIntegrations: integrations || [],
      },
      status: 200,
    },
    name: 'exus-get-existing-integrations',
    overwriteRoutes: true,
  });
};

export const mockExusIntegrationsSearchResponse = () => {
  fetchMock.get({
    matcher: exusIntegrationsSearchMatcher,
    delay: 1000,
    response: {
      body: [
        {
          email: 'email@exus.com',
          displayName: 'Test User1 Exus',
          sources: ['GOOGLE'],
        },
        {
          email: 'email_2@exus.com',
          displayName: 'Test User2 Exus',
          sources: ['GOOGLE'],
        },
      ],
      status: 200,
    },
    name: 'exus-search-integrations',
  });
};

export const mockSlackWorkspacesJiraResponse = () => {
  fetchMock.get({
    matcher: slackWorkspacesJiraMatcher,
    response: {
      body: {
        teams: mockWorkSpaces,
      },
      status: 200,
    },
    name: 'get-slack-jira-workspaces',
  });
};

export const mockSlackWorkspacesConfluenceResponse = () => {
  fetchMock.get({
    matcher: slackWorkspacesConfluenceMatcher,
    response: {
      body: {
        teams: [
          {
            id: slackWorkspaceId,
            avatar: '',
            name: 'test',
          },
        ],
      },
      status: 200,
    },
    name: 'get-slack-confluence-workspaces',
  });
};

export const mockSlackConversationsResponse = () => {
  fetchMock.get({
    matcher: slackConversationsConfluenceMatcher,
    response: {
      body: {
        channels: [],
        dms: [
          {
            id: '1',
            email: 'email@email.com',
            avatarUrl:
              'https://secure.gravatar.com/avatar/429c1801cd501aad73557f4a84f51bae.jpg?s=192&d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0014-192.png',
            name: 'Test User1',
            type: 'directMessage',
          },
        ],
      },
      status: 200,
    },
    name: 'get-slack-confluence-conversations',
  });
};

export const mockSlackConversationsJiraResponse = () => {
  fetchMock.get({
    matcher: slackConversationsJiraMatcher,
    response: {
      body: {
        channels: [],
        dms: [
          {
            id: '2',
            email: 'email_2@email.com',
            avatarUrl:
              'https://secure.gravatar.com/avatar/429c1801cd501aad73557f4a84f51bae.jpg?s=192&d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0014-192.png',
            name: 'Test User2',
            type: 'directMessage',
          },
        ],
      },
      status: 200,
    },
    name: 'get-slack-jira-conversations',
  });
};

export const mockIsSlackJiraEnabled = () => {
  fetchMock.get({
    matcher: slackJiraEnabledMatcher,
    delay: 1000,
    response: {
      body: { enabled: true },
      status: 200,
    },
    name: 'is-slack-jira-enabled',
    overwriteRoutes: true,
  });
};

export const mockGetJiraTeams = () => {
  fetchMock.get({
    matcher: slackJiraTeamsMatcher,
    delay: 1000,
    response: {
      body: {
        teams: mockWorkSpaces,
      },
      status: 200,
    },
    name: 'get-slack-jira-teams',
    overwriteRoutes: true,
  });
};

export const mockGetJiraUsers = () => {
  fetchMock.get({
    matcher: slackJiraUsersMatcher,
    delay: 1000,
    response: {
      body: {
        recipients: [
          {
            id: '1',
            email: 'email@email.com',
            avatarUrl:
              'https://secure.gravatar.com/avatar/429c1801cd501aad73557f4a84f51bae.jpg?s=192&d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0014-192.png',
            name: 'Test User1',
            type: 'directMessage',
          },
        ],
      },
      status: 200,
    },
    name: 'get-slack-jira-users',
    overwriteRoutes: true,
  });
};
