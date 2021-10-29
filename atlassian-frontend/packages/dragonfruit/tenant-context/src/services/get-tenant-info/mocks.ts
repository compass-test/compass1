import fetchMock from 'fetch-mock/cjs/client';

import { TenantInfoData } from './types';

export const mockGetTenantInfo = (
  mockTenantInfoData: TenantInfoData,
  delay?: number,
) => {
  fetchMock.get('/gateway/api/compass/v1/page/context', mockTenantInfoData, {
    delay: delay ?? 0,
  });
};

export const mockGetTenantInfoError = () => {
  fetchMock.get('/gateway/api/compass/v1/page/context', 400);
};
