import React from 'react';

import { v4 as uuid } from 'uuid';

import { PageLayout } from '@atlaskit/page-layout';
import { ComponentSyncEventStatus } from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ComponentDetails } from '../src';

export default function ComponentDetailsSuccess() {
  // Fake managed component
  const mocks = {
    CompassComponent: () => ({
      dataManager: {
        ecosystemAppId: '123',
        externalSourceURL: 'https://example.com',
        lastSyncEvent: {
          status: ComponentSyncEventStatus.SUCCESS,
        },
      },
    }),
  };

  return (
    <CompassTestProvider>
      <ApolloAutoMockProvider mocks={mocks}>
        <PageLayout>
          <ComponentDetails componentResourceId={uuid()} />
        </PageLayout>
      </ApolloAutoMockProvider>
    </CompassTestProvider>
  );
}
