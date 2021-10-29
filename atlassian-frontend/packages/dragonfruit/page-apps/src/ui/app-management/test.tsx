// smoke test
// success and error flags

import React from 'react';

import { render } from '@testing-library/react';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { MockedNonAdminTenantInfoProvider } from '@atlassian/dragonfruit-tenant-context';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import Apps from './main';

const appsPageTitle = 'Apps';

describe('Apps', () => {
  test('smoke test', async () => {
    const wrapper = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider>
          <Apps />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    expect(await wrapper.findByText(appsPageTitle)).toBeInTheDocument();
  });

  test('dislays warning when not admin', async () => {
    const wrapper = render(
      <CompassTestProvider>
        <MockedNonAdminTenantInfoProvider>
          <ApolloAutoMockProvider>
            <Apps />
          </ApolloAutoMockProvider>
        </MockedNonAdminTenantInfoProvider>
      </CompassTestProvider>,
    );

    expect(
      await wrapper.findByTestId(
        'dragonfruit-page-apps.ui.app-management.not-admin-msg',
      ),
    ).toBeDefined();
  });
});
