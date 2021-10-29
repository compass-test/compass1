import React from 'react';

import { v4 as uuid } from 'uuid';

import { PageLayout } from '@atlaskit/page-layout';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ComponentDetails } from '../src';

export default function ComponentDetailsSuccess() {
  const mocks = {
    Extension: () => ({
      id:
        'ari:cloud:ecosystem::extension/appUuid/90181aaa-bbb8-4ce0-b426-622313841eb9/static/compass-forge-hello-world2',
      properties: { title: 'testAppTitle', icon: 'bbIcon' },
    }),
    App: () => ({
      id: 'appId',
      name: 'testAppTitle',
      vendorName: 'testVendorName',
      description: 'testDescription',
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
