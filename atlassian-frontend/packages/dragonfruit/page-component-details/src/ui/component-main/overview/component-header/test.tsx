import React from 'react';

import { render } from '@testing-library/react';

import {
  CompassComponent,
  CompassComponentType,
  ComponentSyncEventStatus,
} from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import ComponentHeader from './index';

const MOCK_DATA_UNMANAGED_COMPONENT: CompassComponent = {
  id: 'mock-other-id',
  name: 'Mock Other',
  type: CompassComponentType.OTHER,
  dataManager: null,
  changeMetadata: {},
};

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

const MOCK_DATA_MANAGED_COMPONENT_ERRORS: CompassComponent = {
  id: 'mock-other-id',
  name: 'Mock Other',
  type: CompassComponentType.OTHER,
  dataManager: {
    ecosystemAppId:
      'ari:cloud:ecosystem::app/34nfdkjsf-e7e3-4e4e-b63e-4f83f1b317ed',
    externalSourceURL:
      'https://bitbucket.org/patrick-and-sarah-testing/componentyamlarea/src/master/patrick/compass.yml',
    lastSyncEvent: {
      time: new Date().toISOString(),
      status: ComponentSyncEventStatus.USER_ERROR,
      lastSyncErrors: ['test'],
    },
  },
  changeMetadata: {},
};

describe('ComponentHeader', () => {
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
  };

  it('can see the data manager info', async () => {
    const { findByTestId } = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider mocks={mocks}>
          <ComponentHeader component={MOCK_DATA_MANAGED_COMPONENT} />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    const dataManagerInfo = await findByTestId(
      'component-header.data-manager-info',
    );
    expect(dataManagerInfo).toBeInTheDocument();
  });

  it('can render data manager errors', async () => {
    const { findByTestId } = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider mocks={mocks}>
          <ComponentHeader component={MOCK_DATA_MANAGED_COMPONENT_ERRORS} />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    const dataManagerError = await findByTestId(
      'component-header.data-manager-error',
    );
    expect(dataManagerError).toBeInTheDocument();
  });

  it('does not display info if component is not externally managed', async () => {
    const { queryByTestId } = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider>
          <ComponentHeader component={MOCK_DATA_UNMANAGED_COMPONENT} />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    const dataManagerInfo = await queryByTestId(
      'component-header.data-manager-info',
    );
    expect(dataManagerInfo).toBeNull();
  });
});
