import fetchMock from 'fetch-mock/cjs/client';

import { testRecommendationsData } from './mock-data';

const RECOMMENDATIONS_SERVICE_URL = '/gateway/api/v1/recommendations';

export function mockGetRecommendations(tenantUrl?: string, timeout = 500) {
  return fetchMock.post(
    RECOMMENDATIONS_SERVICE_URL,
    () =>
      new Promise((res) =>
        setTimeout(() => res(testRecommendationsData), timeout),
      ),
    { method: 'POST', overwriteRoutes: true },
  );
}
