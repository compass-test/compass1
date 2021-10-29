import { MOCK_COMPASS_TEAM_ID, RestMock } from '@atlassian/dragonfruit-testing';

import {
  TeamMember,
  TeamsMembershipResponse,
  UseGetTeamMembersResponse,
} from '../../types';

import { USERS_QUERY } from './index';

/** List of member IDs */
const MOCK_JAMES_ID = '5fabb5fb0eb8b400698f5784';
const MOCK_ZABDIEL_ID = '5d8c6d232792bc0dcbf11b5d';
const MOCK_RA_ID = '5da81bd9a7b3e00daf6bdad4';
const MOCK_RACHEL_ID = '5fb4f9b47cc10300691f79df';

const MOCK_ACCOUNT_IDS = [
  MOCK_ZABDIEL_ID,
  MOCK_RA_ID,
  MOCK_JAMES_ID,
  MOCK_RACHEL_ID,
];

const mockData = [
  {
    accountId: MOCK_ZABDIEL_ID,
    name: 'Zabdiel Jaramillo',
    picture:
      'https://secure.gravatar.com/avatar/56fd42898a624b75ed4bba4a058d3792?d=https%3A%2F%2Favatar-management--avatars.us-west-2.staging.public.atl-paas.net%2Finitials%2FZJ-5.png',
  },
  {
    accountId: MOCK_RA_ID,
    name: 'Ra Kang',
    picture:
      'https://secure.gravatar.com/avatar/6c07436d48a925a1bf87f64619db5666?d=https%3A%2F%2Favatar-management--avatars.us-west-2.staging.public.atl-paas.net%2Finitials%2FRK-5.png',
  },
  {
    accountId: MOCK_JAMES_ID,
    name: 'James Grose',
    picture:
      'https://secure.gravatar.com/avatar/6f075cdacdfaafcd330ed5a1a94321f8?d=https%3A%2F%2Favatar-management--avatars.us-west-2.staging.public.atl-paas.net%2Finitials%2FJG-2.png',
  },
  {
    accountId: MOCK_RACHEL_ID,
    name: 'Rachel Liang',
    picture:
      'https://secure.gravatar.com/avatar/045c36a64d2d583882f146f307ee177d?d=https%3A%2F%2Favatar-management--avatars.us-west-2.staging.public.atl-paas.net%2Finitials%2FRL-6.png',
  },
];

export const mockGetCompassTeamUsersDataSuccess = {
  request: {
    query: USERS_QUERY,
    variables: {
      accountIds: MOCK_ACCOUNT_IDS,
    },
  },
  result: {
    data: { users: { mockData } },
  },
};

export const mockGetCompassTeamUsersDataFailure = {
  request: {
    query: USERS_QUERY,
    variables: {
      accountIds: MOCK_ACCOUNT_IDS,
    },
  },
  result: {
    data: { users: { mockData } },
    error: { error: 'error' },
  },
};

export const mockGetCompassTeamUsersDataFailure404 = {
  request: {
    query: USERS_QUERY,
    variables: {
      accountIds: MOCK_ACCOUNT_IDS,
    },
  },
  result: {
    data: { users: { mockData } },
    error: { statusCode: 404 },
  },
};

export const mockGetCompassTeamUsersDataFailure410 = {
  request: {
    query: USERS_QUERY,
    variables: {
      accountIds: MOCK_ACCOUNT_IDS,
    },
  },
  result: {
    data: { users: { mockData } },
    error: { statusCode: 410 },
  },
};

export const GetTeamMembersMockFailure = (
  //@ts-ignore
  teamId: string,
) => {
  return {
    data: undefined,
    error: { name: 'error' } as Error,
    isLoading: false,
  } as UseGetTeamMembersResponse;
};

export const GetTeamMembersMock = (
  //@ts-ignore
  teamId: string,
) => {
  return {
    data: mockData as TeamMember[],
    error: undefined,
    isLoading: false,
  } as UseGetTeamMembersResponse;
};

export function getMockCompassTeamMembersRest(
  teamId: string = MOCK_COMPASS_TEAM_ID,
): RestMock<TeamsMembershipResponse> {
  return {
    request: {
      url: `/gateway/api/v3/teams/${teamId}/members`,
    },
    result: {
      entities: [
        {
          membershipId: {
            teamId: teamId,
            memberId: MOCK_ZABDIEL_ID,
          },
          state: 'FULL_MEMBER',
          role: 'REGULAR',
        },
        {
          membershipId: {
            teamId: teamId,
            memberId: MOCK_RA_ID,
          },
          state: 'FULL_MEMBER',
          role: 'REGULAR',
        },
        {
          membershipId: {
            teamId: teamId,
            memberId: MOCK_JAMES_ID,
          },
          state: 'FULL_MEMBER',
          role: 'REGULAR',
        },
        {
          membershipId: {
            teamId: teamId,
            memberId: MOCK_RACHEL_ID,
          },
          state: 'FULL_MEMBER',
          role: 'REGULAR',
        },
      ],
      cursor: null,
    },
    delay: 100,
  };
}
