import React, { ReactElement } from 'react';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import ManagedComponentSectionMessage from './index';

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <ApolloAutoMockProvider>
        <CompassTestProvider>{storyFn()}</CompassTestProvider>
      </ApolloAutoMockProvider>
    ),
  ],
};

export const ManagedComponentSectionMessageExample = () => (
  <ManagedComponentSectionMessage dismissMessage={() => {}} />
);
