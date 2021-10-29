import React from 'react';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import AppConfigPage from '../src/ui/app-config-page';

const appUuid = '34nfdkjsf-e7e3-4e4e-b63e-4f83f1b317ed';
const appId = `ari:cloud:ecosystem::app/${appUuid}`;
const extensionId = `ari:cloud:ecosystem::extension/${appUuid}/90181aaa-bbb8-4ce0-b426-622313841eb9/static/compass-forge-hello-world2`;
const bbIcon =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Bitbucket-blue-logomark-only.svg/1200px-Bitbucket-blue-logomark-only.svg.png';

export default function ExampleAppConfigPage() {
  const mocks = {
    Extension: () => ({
      id: extensionId,
      properties: { title: 'Bitbucket app', icon: bbIcon },
    }),
    App: () => ({ id: appId }),
    AppUninstallationResponse: () => ({ success: false }),
  };

  return (
    <CompassTestProvider>
      <ApolloAutoMockProvider mocks={mocks}>
        <AppConfigPage extensionId={extensionId} pageUrl="dummy-unused-url" />
      </ApolloAutoMockProvider>
    </CompassTestProvider>
  );
}
