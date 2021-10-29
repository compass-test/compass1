import React from 'react';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import AppList from '../src/ui/app-management/app-list';

export default function DefaultAppList() {
  return (
    <CompassTestProvider>
      <ApolloAutoMockProvider>
        <AppList />
      </ApolloAutoMockProvider>
    </CompassTestProvider>
  );
}
