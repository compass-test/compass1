import React from 'react';

import { CompassComponentDataManager } from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { MOCKED_COMPONENT } from '../../../../../common/mocks';

import { RelationshipsEmptyState } from './main';

export const NonManagedComponent = () => {
  return (
    <CompassTestProvider>
      <ApolloAutoMockProvider>
        <RelationshipsEmptyState
          currentComponent={MOCKED_COMPONENT}
          dataManager={null}
        />
      </ApolloAutoMockProvider>
    </CompassTestProvider>
  );
};

export const ManagedComponent = () => {
  const dataManager: CompassComponentDataManager = {
    ecosystemAppId: 'ecosystemAppId_1',
    externalSourceURL: 'https://bitbucket.org',
  };

  return (
    <CompassTestProvider>
      <ApolloAutoMockProvider>
        <RelationshipsEmptyState
          currentComponent={MOCKED_COMPONENT}
          dataManager={dataManager}
        />
      </ApolloAutoMockProvider>
    </CompassTestProvider>
  );
};
