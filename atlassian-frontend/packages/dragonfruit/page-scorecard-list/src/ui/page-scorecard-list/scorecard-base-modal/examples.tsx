import React from 'react';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import ScorecardBaseModal from './main';

export const ScorecardBaseModalExample = () => (
  <CompassTestProvider locale="en">
    <ApolloAutoMockProvider>
      <ScorecardBaseModal
        onCancel={() => {}}
        onSubmit={() => {}}
        testId="storybook"
        mutationCallback={() => {}}
        isModalOpen={true}
      />
    </ApolloAutoMockProvider>
  </CompassTestProvider>
);
