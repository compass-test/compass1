import React from 'react';

import { renderHook } from '@testing-library/react-hooks';

import { Permission } from '../../services/get-tenant-info/types';

import { MockedTenantInfoProvider } from './mocks';

import { useTenantInfo } from './index';

describe('useTenantInfo', () => {
  it('returns true when the permissions contain MANAGE', () => {
    let wrapper: React.FC = ({ children }) => (
      <MockedTenantInfoProvider
        data={{ permissions: [Permission.WRITE, Permission.MANAGE] }}
      >
        {children}
      </MockedTenantInfoProvider>
    );

    const { result } = renderHook(() => useTenantInfo(), { wrapper });
    const { isAdmin } = result.current;

    expect(isAdmin()).toEqual(true);
  });

  it('returns false when the permissions do not contain MANAGE', () => {
    let wrapper: React.FC = ({ children }) => (
      <MockedTenantInfoProvider data={{ permissions: [Permission.WRITE] }}>
        {children}
      </MockedTenantInfoProvider>
    );

    const { result } = renderHook(() => useTenantInfo(), { wrapper });
    const { isAdmin } = result.current;

    expect(isAdmin()).toEqual(false);
  });
});
