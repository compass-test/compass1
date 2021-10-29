import React, { ReactElement } from 'react';

import { useGetComponentDetailsQuery } from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ComponentTags } from './index';

const appUuid = '34nfdkjsf-e7e3-4e4e-b63e-4f83f1b317ed';
const appId = `ari:cloud:ecosystem::app/${appUuid}`;
const extensionId = `ari:cloud:ecosystem::extension/${appUuid}/90181aaa-bbb8-4ce0-b426-622313841eb9/static/compass-forge-hello-world2`;
const bbIcon =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Bitbucket-blue-logomark-only.svg/1200px-Bitbucket-blue-logomark-only.svg.png';

const generateMocks = (deploymentData: boolean, managed: boolean) => {
  return {
    Extension: () => ({
      id: extensionId,
      properties: { title: 'Bitbucket app', icon: bbIcon },
    }),
    App: () => ({ id: appId }),
    CompassComponent: () => ({
      dataManager: managed
        ? {
            ecosystemAppId:
              'ari:cloud:ecosystem::app/34nfdkjsf-e7e3-4e4e-b63e-4f83f1b317ed',
            externalSourceURL:
              'https://bitbucket.org/patrick-and-sarah-testing/componentyamlarea/src/master/patrick/compass.yml',
          }
        : null,
      events: deploymentData
        ? {
            __typename: 'CompassEventConnection',
            nodes: [
              {
                __typename: 'CompassDeploymentEvent',
                displayName: '#32',
                url: 'https://atlassian.com',
              },
            ],
          }
        : null,
    }),
  };
};

function ComponentTagsController() {
  const { data } = useGetComponentDetailsQuery({
    variables: { id: 'abcdef' },
  });

  const component = data?.compass?.component;

  if (!component || component.__typename === 'QueryError') {
    return null;
  }

  return <ComponentTags component={component} />;
}

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <CompassTestProvider>{storyFn()}</CompassTestProvider>
    ),
  ],
};

export const DeploymentTagOnly = () => (
  <div style={{ marginTop: '24px' }}>
    <ApolloAutoMockProvider mocks={generateMocks(true, false)}>
      <ComponentTagsController />
    </ApolloAutoMockProvider>
  </div>
);

export const ManagedTagOnly = () => (
  <div style={{ marginTop: '24px' }}>
    <ApolloAutoMockProvider mocks={generateMocks(false, true)}>
      <ComponentTagsController />
    </ApolloAutoMockProvider>
  </div>
);

export const ManagedAndDeploymentTag = () => (
  <div style={{ marginTop: '24px' }}>
    <ApolloAutoMockProvider mocks={generateMocks(true, true)}>
      <ComponentTagsController />
    </ApolloAutoMockProvider>
  </div>
);

export const NoComponentTags = () => (
  <ApolloAutoMockProvider mocks={generateMocks(false, false)}>
    <ComponentTagsController />
  </ApolloAutoMockProvider>
);
