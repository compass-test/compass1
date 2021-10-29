import { renderHook } from '@testing-library/react-hooks';

import { MOCK_CLOUD_ID } from '@atlassian/dragonfruit-testing';

import { useCoordinationClient } from './index';

jest.mock('@atlassian/dragonfruit-tenant-context', () => ({
  useTenantInfo: () => ({
    cloudId: MOCK_CLOUD_ID,
  }),
}));

describe('useCoordinationClient', () => {
  it('should create coordination client', async () => {
    const { result } = renderHook(() => useCoordinationClient());

    expect(result.current).toEqual({
      url: `/gateway/api/engage-targeting/api/v2/user/${MOCK_CLOUD_ID}`,
    });
    expect(result.current.start).toBeDefined();
    expect(result.current.stop).toBeDefined();
    expect(result.error).toBeUndefined();
  });
});
