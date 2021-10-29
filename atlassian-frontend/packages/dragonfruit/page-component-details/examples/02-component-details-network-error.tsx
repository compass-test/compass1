import React from 'react';

import { v4 as uuid } from 'uuid';

import { PageLayout } from '@atlaskit/page-layout';
import { ApolloNetworkErrorProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ComponentDetails } from '../src';

export default function ComponentDetailsNetworkError() {
  return (
    <CompassTestProvider>
      <ApolloNetworkErrorProvider>
        <PageLayout>
          <ComponentDetails componentResourceId={uuid()} />
        </PageLayout>
      </ApolloNetworkErrorProvider>
    </CompassTestProvider>
  );
}
