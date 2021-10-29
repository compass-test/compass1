import React from 'react';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import CompassNavigation from '../src';

const TopNavigation = () => {
  return (
    <CompassTestProvider>
      <ApolloAutoMockProvider>
        <div
          // Set a larger width to ensure that the navigation doesn't show any collapsed items.
          // This is especially important for any visual regression test snapshots.
          style={{ width: '1920px' }}
          data-testid="dragonfruit.navigation.examples.top-navigation"
        >
          <CompassNavigation />
        </div>
      </ApolloAutoMockProvider>
    </CompassTestProvider>
  );
};

export default TopNavigation;
