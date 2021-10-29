import React from 'react';

import { ApolloLoadingProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import AppConfigPage from '../src/ui/app-config-page';

export default function LoadingAppConfigPage() {
  return (
    <CompassTestProvider>
      <ApolloLoadingProvider>
        <AppConfigPage
          extensionId="dummy-unused-id"
          pageUrl="dummy-unused-url"
        />
      </ApolloLoadingProvider>
    </CompassTestProvider>
  );
}
