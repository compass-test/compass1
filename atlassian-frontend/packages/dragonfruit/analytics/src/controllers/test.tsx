import AnalyticsWebClient from '@atlassiansox/analytics-web-client';
import { renderHook } from '@testing-library/react-hooks';

import { useGetAnalyticsClient } from './index';

jest.mock('@atlassiansox/analytics-web-client');

describe('useGetAnalyticsClient', () => {
  let mockAnalyticsWebClient = {
    setTenantInfo: () => {
      return undefined;
    },
    setUserInfo: () => {
      return undefined;
    },
    startUIViewedEvent: () => {
      return undefined;
    },
  };
  beforeAll(() => {
    AnalyticsWebClient.mockImplementation(() => {
      return mockAnalyticsWebClient;
    });
  });

  describe('when environment is undefined', () => {
    const environment = undefined;
    const cloudId = 'test-cloud-id';
    const accountId = 'test-account-id';

    it('should return undefined', () => {
      const { result } = renderHook(() =>
        useGetAnalyticsClient(environment, cloudId, accountId),
      );

      expect(result.current).toBeUndefined();
    });
  });

  describe('when cloudId is undefined', () => {
    const environment = 'test-environment';
    const cloudId = undefined;
    const accountId = 'test-account-id';

    it('should return undefined', () => {
      const { result } = renderHook(() =>
        useGetAnalyticsClient(environment, cloudId, accountId),
      );

      expect(result.current).toBeUndefined();
    });
  });

  describe('when accountId is undefined', () => {
    const environment = 'test-environment';
    const accountId = undefined;
    const cloudId = 'test-cloud-id';

    it('should return undefined', () => {
      const { result } = renderHook(() =>
        useGetAnalyticsClient(environment, cloudId, accountId),
      );

      expect(result.current).toBeUndefined();
    });
  });

  describe('when environment, cloudId and accountId are present', () => {
    const environment = 'test-environment';
    const cloudId = 'test-cloud-id';
    const accountId = 'test-account-id';

    it('should construct AnalyticsWebClient', () => {
      renderHook(() => useGetAnalyticsClient(environment, cloudId, accountId));

      const productInfo = {
        env: 'test-environment',
        product: 'compass',
      };
      const settings = {};

      expect(AnalyticsWebClient).toHaveBeenCalledWith(productInfo, settings);
      expect(AnalyticsWebClient).toHaveBeenCalledTimes(1);
    });

    it('should return AnalyticsWebClient', () => {
      const { result } = renderHook(() =>
        useGetAnalyticsClient(environment, cloudId, accountId),
      );

      expect(result.current).toBe(mockAnalyticsWebClient);
    });
  });
});
