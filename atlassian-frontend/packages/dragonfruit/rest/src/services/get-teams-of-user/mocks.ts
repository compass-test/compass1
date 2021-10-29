import {
  MOCK_ACCOUNT_ID,
  MOCK_COMPASS_TEAM_ID,
  MOCK_ORG_ID,
} from '@atlassian/dragonfruit-testing';

import { DEFAULT_TEAMS_SHOWN } from './index';

export const mockGetTeamsOfUserSuccess = {
  request: {
    url: `/gateway/api/v3/teams/of-user/${MOCK_ACCOUNT_ID}?organizationId=${MOCK_ORG_ID}&limit=${DEFAULT_TEAMS_SHOWN}`,
  },
  result: {
    cursor: 'hash',
    entities: [
      {
        id: MOCK_COMPASS_TEAM_ID,
        displayName: 'Lodestone',
        description: 'Team description',
      },
    ],
  },
};

export const mockGetTeamsOfUserFailure = {
  request: {
    url: `/gateway/api/v3/teams/of-user/${MOCK_ACCOUNT_ID}?organizationId=${MOCK_ORG_ID}&limit=${DEFAULT_TEAMS_SHOWN}`,
  },
  result: 500,
};
