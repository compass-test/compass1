import { memo, version } from 'react';

import { browserMetrics } from '@atlassian/browser-metrics';

import { getAnalyticsWebClient } from '../../utils/analytics-web-client';

export const InitBM3 = memo(() => {
  browserMetrics.init({
    info: {
      app: {
        version: { web: '1.0.0' },
        framework: { name: 'react', version },
      },
      product: 'performancePortal',
      region: 'none',
    },
    events: {},
    plugins: {
      featureFlags: {
        client: Promise.resolve({ getValue: () => true }),
      },
      resourceTimings: {
        sanitiseEndpoints: (e) => e,
        mapResources: (e) => e,
        hasTimingHeaders: () => false,
      },
    },
    endpoints: {
      eventPipelineClient: Promise.resolve(getAnalyticsWebClient()),
    },
  });
  return null;
});
