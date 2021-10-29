import React from 'react';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { MockedNonAdminTenantInfoProvider } from '@atlassian/dragonfruit-tenant-context';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import Apps from '../src/ui/app-management';

export default function AppsNotAdmin() {
  return (
    <CompassTestProvider>
      <MockedNonAdminTenantInfoProvider>
        <ApolloAutoMockProvider>
          <Apps />
        </ApolloAutoMockProvider>
      </MockedNonAdminTenantInfoProvider>
    </CompassTestProvider>
  );
}
