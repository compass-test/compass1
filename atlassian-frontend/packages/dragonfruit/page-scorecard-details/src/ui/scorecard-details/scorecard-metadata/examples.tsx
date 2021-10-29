import React from 'react';

import { CompassScorecardImportance } from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ScorecardMetadata } from './main';

export default {
  decorators: [
    (storyFn: () => React.ReactNode) => {
      return <CompassTestProvider>{storyFn()}</CompassTestProvider>;
    },
  ],
};

export const ScorecardMetadataSuccess = () => {
  return (
    <ApolloAutoMockProvider>
      <ScorecardMetadata
        ownerId="test-owner"
        ownerName="Owner Name"
        importance={CompassScorecardImportance.REQUIRED}
      />
    </ApolloAutoMockProvider>
  );
};
