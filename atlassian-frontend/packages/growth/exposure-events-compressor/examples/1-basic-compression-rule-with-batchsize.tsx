import AnalyticsWebClient, {
  CompressionRule,
  envType,
  originType,
  platformType,
  // eslint-disable-next-line import/no-extraneous-dependencies
} from '@atlassiansox/analytics-web-client';

import { buildCompressionFunction, canCompress } from '../src';

// @ts-ignore
const analyticsClient = new AnalyticsWebClient(
  {
    env: envType.DEV, // required
    product: 'jira', // required
    subproduct: 'software', // should only be used by Jira
    version: '1.0.0',
    origin: originType.DESKTOP, // defaults to WEB if not specified
    platform: platformType.MAC, // defaults to WEB if not specified
    locale: 'en-US',
  },
  {
    // Setting a batchSize without using the default export method
    delayQueueCompressors: [
      new CompressionRule(canCompress, buildCompressionFunction(20)),
    ],
  },
);
