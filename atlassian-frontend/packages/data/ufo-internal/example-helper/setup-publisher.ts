import { ufologger } from '@atlassian/ufo-experimental/logger';

import { payloadPublisher } from '../src/core/publisher/publisher';
import { TenantType } from '../src/types';

import { SSR_PERFORMANCE_MARK } from './ssr-performance-mark';

export const initUFO = () => {
  ufologger.enable();
  payloadPublisher.setup({
    featureFlagClient: { getValue: () => true },
    product: 'examples',
    gasv3: { sendOperationalEvent: () => {} },
    app: {
      version: { web: 'example-version' },
    },
    tenantType: TenantType.Synthetic,
    ssr: {
      getDoneMark: () =>
        performance.getEntriesByName(SSR_PERFORMANCE_MARK, 'mark')[0]
          ?.startTime,
      getFeatureFlags: () => ({}),
    },
  });
};
