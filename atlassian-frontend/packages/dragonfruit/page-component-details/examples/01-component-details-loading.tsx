import React from 'react';

import { v4 as uuid } from 'uuid';

import { PageLayout } from '@atlaskit/page-layout';
import { ApolloLoadingProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ComponentDetails } from '../src';

export default function ComponentDetailsLoading() {
  return (
    <CompassTestProvider>
      <ApolloLoadingProvider>
        <PageLayout>
          <ComponentDetails componentResourceId={uuid()} />
        </PageLayout>
      </ApolloLoadingProvider>
    </CompassTestProvider>
  );
}
