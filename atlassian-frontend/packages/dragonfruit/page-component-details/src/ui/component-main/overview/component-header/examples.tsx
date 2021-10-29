import React, { ReactElement } from 'react';

import {
  CompassComponent,
  CompassComponentType,
  useGetComponentDetailsQuery,
} from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import ComponentHeader from './index';

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

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <ApolloAutoMockProvider mocks={mocks}>
        <CompassTestProvider>{storyFn()}</CompassTestProvider>
      </ApolloAutoMockProvider>
    ),
  ],
};

/* Application */

const MOCK_APPLICATION_COMPONENT: CompassComponent = {
  id: 'mock-application-id',
  name: 'Mock Application',
  type: CompassComponentType.APPLICATION,
  changeMetadata: {},
};

export const ApplicationComponentHeader = () => (
  <ComponentHeader component={MOCK_APPLICATION_COMPONENT} />
);

/* Library */

const MOCK_LIBRARY_COMPONENT: CompassComponent = {
  id: 'mock-library-id',
  name: 'Mock Library',
  type: CompassComponentType.LIBRARY,
  changeMetadata: {},
};

export const LibraryComponentHeader = () => (
  <ComponentHeader component={MOCK_LIBRARY_COMPONENT} />
);

/* Service */

const MOCK_SERVICE_COMPONENT: CompassComponent = {
  id: 'mock-service-id',
  name: 'Mock Service',
  type: CompassComponentType.SERVICE,
  changeMetadata: {},
};

export const ServiceComponentHeader = () => (
  <ComponentHeader component={MOCK_SERVICE_COMPONENT} />
);

/* Other */

const MOCK_OTHER_COMPONENT: CompassComponent = {
  id: 'mock-other-id',
  name: 'Mock Other',
  type: CompassComponentType.OTHER,
  changeMetadata: {},
};

export const OtherComponentHeader = () => (
  <ComponentHeader component={MOCK_OTHER_COMPONENT} />
);

/* Data Manager */

const MOCK_DATA_MANAGED_COMPONENT: CompassComponent = {
  id: 'mock-other-id',
  name: 'Mock Other',
  type: CompassComponentType.OTHER,
  dataManager: {
    ecosystemAppId:
      'ari:cloud:ecosystem::app/34nfdkjsf-e7e3-4e4e-b63e-4f83f1b317ed',
    externalSourceURL:
      'https://bitbucket.org/patrick-and-sarah-testing/componentyamlarea/src/master/patrick/compass.yml',
  },
  changeMetadata: {},
};

export const DataManagedComponentHeader = () => (
  <ComponentHeader component={MOCK_DATA_MANAGED_COMPONENT} />
);

function ComponentHeaderController() {
  const { data } = useGetComponentDetailsQuery({
    variables: { id: 'abcdef' },
  });

  const component = data?.compass?.component;
  if (!component || component.__typename === 'QueryError') {
    return null;
  }
  return <ComponentHeader component={component} />;
}

export const DeploymentDataManagedComponentHeader = () => (
  <ComponentHeaderController />
);
