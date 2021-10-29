import React from 'react';

import { v4 as uuid } from 'uuid';

import { PageLayout } from '@atlaskit/page-layout';
import {
  CompassComponentType,
  CompassFieldType,
} from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ComponentDetails } from '../src';

export default function ComponentDetailsSuccess() {
  const mocks = {
    CompassComponent: () => ({
      type: CompassComponentType.SERVICE,
      dataManager: null,
      fields: [
        {
          __typename: 'CompassEnumField',
          definition: {
            id: 'compass:tier',
            type: CompassFieldType.ENUM,
          },
          value: ['4'],
        },
      ],
    }),
  };

  return (
    <CompassTestProvider locale="en">
      <ApolloAutoMockProvider mocks={mocks}>
        <PageLayout>
          <ComponentDetails componentResourceId={uuid()} />
        </PageLayout>
      </ApolloAutoMockProvider>
    </CompassTestProvider>
  );
}
