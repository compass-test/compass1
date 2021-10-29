import React from 'react';

import fetchMock from 'fetch-mock/cjs/client';

import { CONNECT_BASE_URL } from '@atlassian/dragonfruit-external-component-management/constants';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { APP_KEY, getPublishedApp } from '../src/common/constants';
import AppConfigPage from '../src/ui/app-config-page';

const bbApp = getPublishedApp(APP_KEY.BITBUCKET);
const extensionId = `ari:cloud:ecosystem::extension/${bbApp.id}/90181aaa-bbb8-4ce0-b426-622313841eb9/static/compass-forge-hello-world2`;
const bbIcon =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Bitbucket-blue-logomark-only.svg/1200px-Bitbucket-blue-logomark-only.svg.png';

export default function AppConfigPageDisabledUninstall() {
  // need to make sure there's an extension & app for the same app UUID
  const mocks = {
    Extension: () => ({
      id: extensionId,
      properties: { title: 'Bitbucket app', icon: bbIcon },
    }),
    App: () => ({ id: bbApp.ari }),
  };

  fetchMock.restore().mock(`begin:${CONNECT_BASE_URL}`, {
    status: 200,
    body: {
      connected: true,
    },
  });

  return (
    <CompassTestProvider>
      <ApolloAutoMockProvider mocks={mocks}>
        <AppConfigPage extensionId={extensionId} pageUrl="dummy-unused-url" />
      </ApolloAutoMockProvider>
    </CompassTestProvider>
  );
}
