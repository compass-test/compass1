import React from 'react';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import CreateScorecardModal from './main';

export const CreateScorecardModalExample = () => (
  <CompassTestProvider locale="en">
    <ApolloAutoMockProvider>
      <CreateScorecardModal
        onCancel={() => {}}
        onSubmit={() => {}}
        testId="storybook"
        isModalOpen={true}
      />
    </ApolloAutoMockProvider>
  </CompassTestProvider>
);
