import React from 'react';

import { v4 as uuid } from 'uuid';

import { PageLayout } from '@atlaskit/page-layout';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ComponentDetails } from '../src';

export default function ComponentDetailsPartialResponse() {
  const componentId = uuid();

  const mocks = {
    CompassComponent: () => ({
      // The fields below could hypothetically return null, so we force them to do so
      // We let auto-mock generate the rest of the required data
      applicableScorecards: null,
      dataManager: null,
      description: null,
      externalAliases: null,
      fields: null,
      labels: null,
      links: null,
      ownerId: null,
      scorecardScores: null,
      scorecards: null,
      relationships: null,
      events: null,
    }),
  };

  return (
    <CompassTestProvider>
      <ApolloAutoMockProvider mocks={mocks}>
        <PageLayout>
          <ComponentDetails componentResourceId={componentId} />
        </PageLayout>
      </ApolloAutoMockProvider>
    </CompassTestProvider>
  );
}
