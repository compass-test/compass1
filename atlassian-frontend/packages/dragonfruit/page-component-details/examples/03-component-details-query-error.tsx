import React from 'react';

import { v4 as uuid } from 'uuid';

import { PageLayout } from '@atlaskit/page-layout';
import {
  ApolloAutoMockProvider,
  FakeCompassComponentResultQueryError,
} from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ComponentDetails } from '../src';

// When service cannot be retrieved due to QueryError being returned

export default function ComponentDetailsQueryError() {
  // Force the CompassComponentResult to be a QueryError

  const mocks = {
    CompassComponentResult: FakeCompassComponentResultQueryError,
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
