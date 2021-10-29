import React, { ReactElement } from 'react';

import { boolean, withKnobs } from '@storybook/addon-knobs';

import { ComponentSyncEventStatus } from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import DataManagerInfo from './main';

const appUuid = '34nfdkjsf-e7e3-4e4e-b63e-4f83f1b317ed';
const appId = `ari:cloud:ecosystem::app/${appUuid}`;
const extensionId = `ari:cloud:ecosystem::extension/${appUuid}/90181aaa-bbb8-4ce0-b426-622313841eb9/static/compass-forge-hello-world2`;
const componentId = 'test123';
const dataManager = {
  ecosystemAppId: `ari:cloud:ecosystem::app/${appUuid}`,
  externalSourceURL: 'https://example.com',
  lastSyncEvent: {
    time: new Date().toISOString(),
    status: ComponentSyncEventStatus.USER_ERROR,
    lastSyncErrors: null,
  },
};
const bbIcon =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Bitbucket-blue-logomark-only.svg/1200px-Bitbucket-blue-logomark-only.svg.png';
const mocks = {
  Extension: () => ({
    id: extensionId,
    properties: { title: 'Bitbucket app', icon: bbIcon },
  }),
  App: () => ({ id: appId }),
};

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <CompassTestProvider>
        <ApolloAutoMockProvider mocks={mocks}>
          {storyFn()}
        </ApolloAutoMockProvider>
      </CompassTestProvider>
    ),
    withKnobs,
  ],
};

export const DataManagerInfoExample = () => (
  <div style={{ padding: '20px' }}>
    <DataManagerInfo
      componentId={componentId}
      dataManager={dataManager}
      canDisplayErrors={boolean('Can Display Errors', false)}
    />
  </div>
);
