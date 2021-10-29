import { CompassComponentType } from '@atlassian/dragonfruit-graphql';

const MOCKED_NODES = [
  {
    component: {
      id: '48098507-7cc0-43d4-9931-fbaa100a9687',
      name: 'searchApi',
      type: CompassComponentType.SERVICE,
      ownerId: 'ari:cloud:teams::team/1234',
      dataManager: {
        ecosystemAppId: '567890',
      },
    },
  },
  {
    component: {
      id: '1a1f593e-32d4-4293-be44-cd32ad69b3c1',
      name: 'react',
      type: CompassComponentType.LIBRARY,
      ownerId: 'ari:cloud:teams::team/1234',
    },
  },
  {
    component: {
      id: '4cc042c8-99da-47ad-849e-5f8ebf574c32',
      name: 'noOwnerComponentName',
      type: CompassComponentType.LIBRARY,
      // set ownerId to null to prevent trigger confirmation modal
      // ApolloAutoMock fills ownerId when set to undefined so won't work
      ownerId: null,
      description: 'This is the component description.',
    },
  },
  {
    component: {
      id: '965286c2-be12-4131-9a8f-793be429eba6',
      name: 'compass',
      type: CompassComponentType.APPLICATION,
      ownerId: 'ari:cloud:teams::team/1234',
      dataManager: {
        ecosystemAppId: '567890',
      },
    },
  },
];

export const MOCK_TEAM_ID = '6c80685b-2a5d-4d88-8365-68087a5c678d';

export const MOCKED_SEARCH_RESULTS = {
  CompassComponentQueryResult: () => ({
    __typename: 'CompassSearchComponentConnection',
    nodes: [...MOCKED_NODES],
  }),
};

export const MOCKED_SEARCH_RESULTS_EMPTY = {
  CompassComponentQueryResult: () => ({
    __typename: 'CompassSearchComponentConnection',
    nodes: [],
  }),
};

export const MOCKED_TEAM_REQUEST = {
  request: {
    url: `/gateway/api/v3/teams/1234`,
  },
  result: {
    id: `ari:cloud:teams::team/1234`,
    displayName: 'Vega',
    smallAvatarImageUrl:
      'https://pbs.twimg.com/profile_images/803832195970433027/aaoG6PJI_400x400.jpg',
  },
};

export const MOCKED_TEAM_REQUEST_ERROR = {
  request: {
    url: `/gateway/api/v3/teams/1234`,
  },
  result: {
    throws: { message: 'error' },
  },
};
