import React, { ReactNode } from 'react';

import {
  Permission,
  TenantInfoData,
} from '../../services/get-tenant-info/types';

import { TenantInfoProvider } from './index';

export const MOCK_ACCOUNT_ID = '7dd4fc4403edb50ef3812f71';
export const MOCK_CLOUD_ID = '7550aec5-71ad-43de-8402-8f7d2d37398c';
export const MOCK_WORKSPACE_ID = '8660aec5-71ad-43de-8402-8f7d2d37398d';
export const MOCK_ORG_ID = '1a2c9aaf-25e9-4d3d-91b2-35f21a01a223';

export const MockedTenantInfoProvider = ({
  data,
  children,
}: {
  data?: Partial<TenantInfoData>;
  children: ReactNode;
}) => (
  <TenantInfoProvider
    value={{
      loading: false,
      error: undefined,
      data: {
        accountId: MOCK_ACCOUNT_ID,
        cloudId: MOCK_CLOUD_ID,
        workspaceId: MOCK_WORKSPACE_ID,
        orgId: MOCK_ORG_ID,
        permissions: [Permission.WRITE, Permission.MANAGE],
        ...data,
      },
    }}
  >
    {children}
  </TenantInfoProvider>
);

export const MockedNonAdminTenantInfoProvider = ({
  data,
  children,
}: {
  data?: Partial<TenantInfoData>;
  children: ReactNode;
}) => {
  data && delete data.permissions;
  return (
    <MockedTenantInfoProvider data={{ permissions: [], ...data }}>
      {children}
    </MockedTenantInfoProvider>
  );
};
