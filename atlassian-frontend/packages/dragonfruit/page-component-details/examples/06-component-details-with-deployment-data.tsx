import React from 'react';

import { v4 as uuid } from 'uuid';

import { PageLayout } from '@atlaskit/page-layout';
import { ComponentSyncEventStatus } from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ComponentDetails } from '../src';

export default function ComponentDetailsSuccess() {
  const appUuid = '34nfdkjsf-e7e3-4e4e-b63e-4f83f1b317ed';
  const appId = `ari:cloud:ecosystem::app/${appUuid}`;
  const extensionId = `ari:cloud:ecosystem::extension/${appUuid}/90181aaa-bbb8-4ce0-b426-622313841eb9/static/compass-forge-hello-world2`;
  const bbIcon =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Bitbucket-blue-logomark-only.svg/1200px-Bitbucket-blue-logomark-only.svg.png';

  const mocks = {
    Extension: () => ({
      id: extensionId,
      properties: { title: 'Bitbucket app', icon: bbIcon },
    }),
    App: () => ({ id: appId }),
    CompassComponent: () => ({
      dataManager: {
        ecosystemAppId:
          'ari:cloud:ecosystem::app/34nfdkjsf-e7e3-4e4e-b63e-4f83f1b317ed',
        externalSourceURL:
          'https://bitbucket.org/patrick-and-sarah-testing/componentyamlarea/src/master/patrick/compass.yml',
        lastSyncEvent: {
          status: ComponentSyncEventStatus.SUCCESS,
        },
      },
      changeMetadata: {},
      events: {
        __typename: 'CompassEventConnection',
        nodes: [
          {
            __typename: 'CompassDeploymentEvent',
            displayName: '#32',
            url: 'https://atlassian.com',
            environment: {
              displayName: 'Example environment name',
            },
          },
        ],
      },
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
