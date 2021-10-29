import React from 'react';

import { FlagsProvider } from '@atlaskit/flag';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import Apps from '../src/ui/app-management';

export default function ExampleSuccessfulInstallAppsPage() {
  const mocks = {
    AppInstallationResponse: () => ({ success: true }),
  };

  return (
    <CompassTestProvider>
      <FlagsProvider>
        <ApolloAutoMockProvider mocks={mocks}>
          <Apps />
        </ApolloAutoMockProvider>
      </FlagsProvider>
    </CompassTestProvider>
  );
}
