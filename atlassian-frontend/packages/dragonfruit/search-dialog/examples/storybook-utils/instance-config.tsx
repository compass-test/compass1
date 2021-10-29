import { Products } from '../../src';

interface Config {
  accountId?: string;
  activityServiceUrl?: string;
  aggregatorUrl?: string;
  baseUrl: string;
  cloudId: string;
  collaborationGraphUrl: string;
  corsEnabled?: boolean;
  directoryServiceUrl?: string;
  products: Array<Products>;
  searchAggregatorServiceUrl: string;
}

export enum AllowedSites {
  local = 'local',
  pug = 'pug',
  hello = 'hello',
  confOnly = 'confOnly',
}

export const presetConfig: {
  [key in AllowedSites]: Config;
} = {
  pug: {
    aggregatorUrl: 'https://pug.jira-dev.com/gateway/api/xpsearch-aggregator',
    corsEnabled: true,
    cloudId: 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5',
    activityServiceUrl: 'https://api-private.stg.atlassian.com/activity',
    searchAggregatorServiceUrl:
      'https://api-private.stg.atlassian.com/xpsearch-aggregator',
    collaborationGraphUrl:
      'https://api-private.stg.atlassian.com/collaboration',
    directoryServiceUrl: 'https://api-private.stg.atlassian.com/directory',
    baseUrl: 'https://pug.jira-dev.com',
    products: [Products.confluence],
  },
  hello: {
    aggregatorUrl:
      'https://hello.atlassian.net/gateway/api/xpsearch-aggregator',
    cloudId: 'a436116f-02ce-4520-8fbb-7301462a1674',
    activityServiceUrl: 'blank',
    searchAggregatorServiceUrl:
      'https://api-private.atlassian.com/xpsearch-aggregator',
    collaborationGraphUrl:
      'https://hello.atlassian.net/gateway/api/collaboration',
    directoryServiceUrl: 'https://api-private.atlassian.com/directory',
    baseUrl: 'https://hello.atlassian.net',
    products: [Products.confluence],
  },
  confOnly: {
    aggregatorUrl:
      'https://confluence-only.jira-dev.com/gateway/api/xpsearch-aggregator',
    corsEnabled: true,
    cloudId: '4f9f7d1a-81bc-4554-bc14-704fcd49b1a8',
    activityServiceUrl: 'blank',
    searchAggregatorServiceUrl:
      'https://confluence-only.jira-dev.com/gateway/api/xpsearch-aggregator',
    collaborationGraphUrl:
      'https://confluence-only.jira-dev.com/gateway/api/collaboration',
    directoryServiceUrl: 'https://api-private.stg.atlassian.com/directory',
    baseUrl: 'https://confluence-only.jira-dev.com',
    accountId: '655363:2a8cb791-3b93-463a-a8a3-45c2ae5b920d',
    products: [Products.confluence],
  },
  local: {
    corsEnabled: true,
    searchAggregatorServiceUrl: 'https://localhost:9999/',
    collaborationGraphUrl: '/collaboration',
    cloudId: 'localhost',
    baseUrl: 'localhost',
    products: [Products.confluence],
  },
};
