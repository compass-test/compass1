import React from 'react';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import Apps from '../src/ui/app-management';

export default function DefaultApps() {
  return (
    <CompassTestProvider>
      <ApolloAutoMockProvider>
        <Apps />
      </ApolloAutoMockProvider>
    </CompassTestProvider>
  );
}
