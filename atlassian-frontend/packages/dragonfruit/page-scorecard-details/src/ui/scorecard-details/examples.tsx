import React from 'react';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { PageScorecardDetails } from './main';

export default {
  decorators: [
    (storyFn: () => React.ReactNode) => {
      return <CompassTestProvider>{storyFn()}</CompassTestProvider>;
    },
  ],
};
const mocks = {
  CompassScorecard: () => ({
    criterias: [
      {
        __typename: 'CompassHasOwnerScorecardCriteria',
        id: 'fake-id',
        weight: '100',
      },
    ],
  }),
};

const mockUpdateScorecardSuccessResolver = () => ({
  Mutation: {
    compass: () => ({
      updateScorecard: () => {
        return {
          success: true,
          errors: null,
        };
      },
    }),
  },
});

export const ScorecardMetadataSuccess = () => {
  return (
    <ApolloAutoMockProvider
      mocks={mocks}
      resolvers={mockUpdateScorecardSuccessResolver}
    >
      <PageScorecardDetails testId="test2" scorecardId="test-id" />
    </ApolloAutoMockProvider>
  );
};
