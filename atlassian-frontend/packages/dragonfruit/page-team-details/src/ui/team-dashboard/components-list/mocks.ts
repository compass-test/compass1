import { SearchResponse } from '@atlassian/dragonfruit-utils';

export const ParseSearchComponentsMock = (): SearchResponse => {
  return {
    connection: {
      __typename: 'CompassSearchComponentConnection',
      nodes: [],
      pageInfo: { __typename: 'PageInfo', hasNextPage: false, endCursor: null },
    },
  };
};
