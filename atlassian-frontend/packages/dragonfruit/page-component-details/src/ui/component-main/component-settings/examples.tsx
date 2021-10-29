import React from 'react';

import { CONFIG_AS_CODE_APP_IDS } from '@atlassian/dragonfruit-external-component-management/constants';
import { ComponentSyncEventStatus } from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { MockedNonAdminTenantInfoProvider } from '@atlassian/dragonfruit-tenant-context';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import {
  MOCKED_COMPONENT,
  MOCKED_CONNECTED_COMPONENT,
} from '../../../common/mocks';

import { ComponentSettings } from './main';

const configAsCodeAppId = CONFIG_AS_CODE_APP_IDS[0];

export function WhenComponentIsManaged() {
  const mocks = {
    App: () => ({ id: configAsCodeAppId }),
  };

  const component = Object.assign(MOCKED_CONNECTED_COMPONENT, {
    dataManager: {
      ecosystemAppId: configAsCodeAppId,
      lastSyncEvent: {
        status: ComponentSyncEventStatus.SUCCESS,
        time: new Date().toISOString(),
      },
    },
  });

  return (
    <CompassTestProvider>
      <ApolloAutoMockProvider mocks={mocks}>
        <ComponentSettings currentComponent={component} />
      </ApolloAutoMockProvider>
    </CompassTestProvider>
  );
}

export function WhenComponentIsManagedWithServerError() {
  const mocks = {
    App: () => ({ id: configAsCodeAppId }),
  };
  const component = Object.assign(MOCKED_CONNECTED_COMPONENT, {
    dataManager: {
      ecosystemAppId: configAsCodeAppId,
      lastSyncEvent: {
        status: ComponentSyncEventStatus.SERVER_ERROR,
      },
    },
  });

  return (
    <CompassTestProvider>
      <ApolloAutoMockProvider mocks={mocks}>
        <ComponentSettings currentComponent={component} />
      </ApolloAutoMockProvider>
    </CompassTestProvider>
  );
}

export function WhenComponentIsManagedWithUserError() {
  const mocks = {
    App: () => ({ id: configAsCodeAppId }),
  };
  const component = Object.assign(MOCKED_CONNECTED_COMPONENT, {
    dataManager: {
      ecosystemAppId: configAsCodeAppId,
      lastSyncEvent: {
        status: ComponentSyncEventStatus.USER_ERROR,
        lastSyncErrors: [
          'Tier must be included in the config file',
          'ID must be of type ARI',
        ],
      },
    },
  });

  return (
    <CompassTestProvider>
      <ApolloAutoMockProvider mocks={mocks}>
        <ComponentSettings currentComponent={component} />
      </ApolloAutoMockProvider>
    </CompassTestProvider>
  );
}

export function WhenConfigAsCodeAppInstalled() {
  const mocks = {
    App: () => ({ id: configAsCodeAppId }),
  };
  return (
    <CompassTestProvider>
      <ApolloAutoMockProvider mocks={mocks}>
        <ComponentSettings currentComponent={MOCKED_COMPONENT} />
      </ApolloAutoMockProvider>
    </CompassTestProvider>
  );
}

export const AdminEmptyState = () => {
  const mocks = {
    App: () => ({}),
  };
  return (
    <CompassTestProvider>
      <ApolloAutoMockProvider mocks={mocks}>
        <ComponentSettings currentComponent={MOCKED_COMPONENT} />
      </ApolloAutoMockProvider>
    </CompassTestProvider>
  );
};

export const NonAdminEmptyState = () => {
  const mocks = {
    App: () => ({}),
  };
  return (
    <CompassTestProvider>
      <ApolloAutoMockProvider mocks={mocks}>
        <MockedNonAdminTenantInfoProvider>
          <ComponentSettings currentComponent={MOCKED_COMPONENT} />
        </MockedNonAdminTenantInfoProvider>
      </ApolloAutoMockProvider>
    </CompassTestProvider>
  );
};
