import { renderHook } from '@testing-library/react-hooks';
import fetchMock from 'fetch-mock/cjs/client';

import useGetTenantInfo from './main';
import { mockGetTenantInfo, mockGetTenantInfoError } from './mocks';
import { Permission, Product, TenantInfoData } from './types';

const MOCK_TENANT_INFO_DATA: TenantInfoData = {
  orgId: '7550aec5-71ad-43de-8402-8f7d2d37398c',
  cloudId: '2a032699-ce4f-40ef-ba07-1c63cb387855',
  workspaceId: '76b3ad80-186e-4b63-bb98-a2ca26fb2a94',
  availableProducts: [
    { product: Product.COMPASS, url: 'atlassian.com/compass' },
  ],
  accountId: '5ffec7e234847e0069498983',
  permissions: [Permission.WRITE, Permission.MANAGE],
};

describe('useGetTenantInfo', () => {
  afterEach(() => {
    fetchMock.reset();
  });

  const renderTestHook = () => {
    return renderHook(() => useGetTenantInfo());
  };

  it('should init correctly', () => {
    mockGetTenantInfo(MOCK_TENANT_INFO_DATA, 10);

    const { result } = renderTestHook();

    expect(result.current).toEqual({
      data: undefined,
      error: undefined,
      loading: true,
    });
  });

  it('should return data if request succeeds', async () => {
    mockGetTenantInfo(MOCK_TENANT_INFO_DATA);

    const { result, waitForNextUpdate } = renderTestHook();

    waitForNextUpdate().then(() =>
      expect(result.current).toEqual({
        data: MOCK_TENANT_INFO_DATA,
        error: undefined,
        loading: false,
      }),
    );
  });

  it('should return error if request fails', async () => {
    mockGetTenantInfoError();

    const { result, waitForNextUpdate } = renderTestHook();

    waitForNextUpdate().then(() =>
      expect(result.current).toEqual({
        data: undefined,
        error: expect.any(Error),
        loading: false,
      }),
    );
  });
});
