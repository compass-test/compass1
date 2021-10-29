import React from 'react';

import { mount } from 'enzyme';

import { MockedTenantInfoProvider } from '@atlassian/dragonfruit-tenant-context';

import {
  CompassRecentsProvider,
  useCompassRecentsClient,
  withCompassRecentsClient,
} from './index';

const tenantInfo = {
  loading: false,
  error: undefined,
  data: {
    cloudId: 'mock-cloud-id',
    workspaceId: 'mock-workspace-id',
    orgId: '',
    accountId: '',
    permissions: [],
  },
};

describe('CompassRecentsProvider', () => {
  const TestComponent = (_props: any) => <div data-testid="test-component" />;
  const TestComponentWithClients = withCompassRecentsClient(TestComponent);

  const TestComponentWithHook = (_props: any) => {
    useCompassRecentsClient();
    return <div />;
  };

  it('composed child components receive the same props', () => {
    const wrapper = mount(
      <MockedTenantInfoProvider>
        <CompassRecentsProvider tenantInfo={tenantInfo}>
          <TestComponentWithClients />
          <TestComponentWithClients />
        </CompassRecentsProvider>
      </MockedTenantInfoProvider>,
    );

    const testComponents = wrapper.find(TestComponent);

    expect(testComponents).toHaveLength(2);

    expect(testComponents.at(0).prop('compassRecentsClient')).toStrictEqual(
      testComponents.at(1).prop('compassRecentsClient'),
    );
  });

  it('hooked components receive the same props', () => {
    const wrapper = mount(
      <MockedTenantInfoProvider>
        <CompassRecentsProvider tenantInfo={tenantInfo}>
          <TestComponentWithHook />
          <TestComponentWithHook />
        </CompassRecentsProvider>
      </MockedTenantInfoProvider>,
    );

    const testComponents = wrapper.find(TestComponentWithHook);

    expect(testComponents).toHaveLength(2);

    expect(testComponents.at(0).prop('compassRecentsClient')).toStrictEqual(
      testComponents.at(1).prop('compassRecentsClient'),
    );
  });

  it('still renders children without tenantInfo', () => {
    const wrapper = mount(
      <MockedTenantInfoProvider>
        <CompassRecentsProvider
          tenantInfo={{
            ...tenantInfo,
            loading: true,
            data: {
              ...tenantInfo.data,
              cloudId: '',
              workspaceId: '',
            },
          }}
        >
          <TestComponentWithHook />
          <TestComponentWithHook />
        </CompassRecentsProvider>
      </MockedTenantInfoProvider>,
    );

    const testComponents = wrapper.find(TestComponentWithHook);

    expect(testComponents).toHaveLength(2);
  });
});
