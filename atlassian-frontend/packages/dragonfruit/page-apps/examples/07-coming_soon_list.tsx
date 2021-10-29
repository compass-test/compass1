import React from 'react';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import ComingSoonList from '../src/ui/app-management/coming-soon-list';

export default function DefaultComingSoonList() {
  return (
    <CompassTestProvider>
      <ApolloAutoMockProvider>
        <ComingSoonList />
      </ApolloAutoMockProvider>
    </CompassTestProvider>
  );
}
