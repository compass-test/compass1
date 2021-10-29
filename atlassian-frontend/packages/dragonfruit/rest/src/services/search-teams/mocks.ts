import {
  MOCK_COMPASS_TEAM_ID,
  MOCK_COMPASS_TEAM_ID_2,
  MOCK_ORG_ID,
  RestMock,
} from '@atlassian/dragonfruit-testing';

import { TeamDetails, TeamsSearchResponse } from '../../types';

const BASE_REQUEST_URL = '/gateway/api/v3/teams';
const GET_TEAMS_REQUEST_URL = `${BASE_REQUEST_URL}/search?limit=20&organizationId=${MOCK_ORG_ID}&q=`;
const DELAY_MS = 100;

export const mockGetTeamsSuccess = (): RestMock<TeamsSearchResponse> => {
  return {
    request: {
      url: GET_TEAMS_REQUEST_URL,
    },
    result: [
      {
        id: `ari:cloud:teams::team/${MOCK_COMPASS_TEAM_ID}`,
        displayName: 'Compass Crux',
        description: 'Great team',
        organizationId: 'orgId',
        smallAvatarImageUrl: 'http://placehold.it/24x24',
        largeAvatarImageUrl: 'http://placehold.it/24x24',
        smallHeaderImageUrl: 'http://placehold.it/24x24',
        largeHeaderImageUrl: 'http://placehold.it/24x24',
        permission: 'permission',
        restriction: 'restriction',
        state: 'state',
      },
      {
        id: `ari:cloud:teams::team/${MOCK_COMPASS_TEAM_ID_2}`,
        displayName: 'Compass Vega',
        description: 'Great team',
        organizationId: 'orgId',
        smallAvatarImageUrl: 'http://placehold.it/24x24',
        largeAvatarImageUrl: 'http://placehold.it/24x24',
        smallHeaderImageUrl: 'http://placehold.it/24x24',
        largeHeaderImageUrl: 'http://placehold.it/24x24',
        permission: 'permission',
        restriction: 'restriction',
        state: 'state',
      },
    ],
    delay: DELAY_MS,
  };
};

export const mockGetTeamsNoResults = (): RestMock<TeamsSearchResponse> => {
  return {
    request: {
      url: GET_TEAMS_REQUEST_URL,
    },
    result: [],
    delay: DELAY_MS,
  };
};

export const mockGetTeamsFailure = (): RestMock<number> => {
  return {
    request: {
      url: GET_TEAMS_REQUEST_URL,
    },
    result: 400,
    delay: DELAY_MS,
  };
};

export const mockGetTeamByIdSuccess = (
  teamId: string = MOCK_COMPASS_TEAM_ID,
): RestMock<TeamDetails> => {
  return {
    request: {
      url: `${BASE_REQUEST_URL}/${teamId}`,
    },
    result: {
      id: `ari:cloud:teams::team/${MOCK_COMPASS_TEAM_ID}`,
      displayName: 'Compass Crux',
      description: 'Great team',
      organizationId: 'orgId',
      smallAvatarImageUrl: 'http://placehold.it/24x24',
      largeAvatarImageUrl: 'http://placehold.it/24x24',
      smallHeaderImageUrl: 'http://placehold.it/24x24',
      largeHeaderImageUrl: 'http://placehold.it/24x24',
      permission: 'permission',
      restriction: 'restriction',
      state: 'state',
    },
    delay: DELAY_MS,
  };
};

export const mockGetTeamByIdFailure = (
  teamId: string = MOCK_COMPASS_TEAM_ID,
): RestMock<number> => {
  return {
    request: {
      url: `${BASE_REQUEST_URL}/${teamId}`,
    },
    result: 500,
  };
};

export const mockGetTeamByIdAccessRestricted = (
  teamId: string = MOCK_COMPASS_TEAM_ID,
): RestMock<number> => {
  return {
    request: {
      url: `${BASE_REQUEST_URL}/${teamId}`,
    },
    result: 403,
  };
};

export const mockGetTeamByIdNotFound = (
  teamId: string = MOCK_COMPASS_TEAM_ID,
): RestMock<number> => {
  return {
    request: {
      url: `${BASE_REQUEST_URL}/${teamId}`,
    },
    result: 404,
  };
};
