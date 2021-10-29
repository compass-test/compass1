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
  jdog = 'jdog',
  pug = 'pug',
  hello = 'hello',
  sdog = 'sdog',
  confOnly = 'confOnly',
  jiraSpa = 'jira-spa',
  jqauch = 'jquach',
}

export const presetConfig: {
  [key in AllowedSites]: Config;
} = {
  jdog: {
    aggregatorUrl: 'https://jdog.jira-dev.com/gateway/api/xpsearch-aggregator',
    corsEnabled: true,
    cloudId: '497ea592-beb4-43c3-9137-a6e5fa301088',
    activityServiceUrl: 'https://jdog.jira-dev.com/gateway/api/activity',
    collaborationGraphUrl:
      'https://jdog.jira-dev.com/gateway/api/collaboration',
    searchAggregatorServiceUrl:
      'https://jdog.jira-dev.com/gateway/api/xpsearch-aggregator',
    directoryServiceUrl: 'https://jdog.jira-dev.com/gateway/api/directory',
    baseUrl: 'https://jdog.jira-dev.com',
    accountId: '655363:2a8cb791-3b93-463a-a8a3-45c2ae5b920d',
    products: [Products.jira],
  },
  'jira-spa': {
    aggregatorUrl:
      'https://jira-spa.jira-dev.com/gateway/api/xpsearch-aggregator',
    corsEnabled: true,
    cloudId: '90f4bdd8-1946-4973-b072-284e3e0bce1d',
    activityServiceUrl: 'https://jira-spa.jira-dev.com/gateway/api/activity',
    collaborationGraphUrl:
      'https://jira-spa.jira-dev.com/gateway/api/collaboration',
    searchAggregatorServiceUrl:
      'https://jira-spa.jira-dev.com/gateway/api/xpsearch-aggregator',
    directoryServiceUrl: 'https://jira-spa.jira-dev.com/gateway/api/directory',
    baseUrl: 'https://jira-spa.jira-dev.com',
    accountId: '655363:2a8cb791-3b93-463a-a8a3-45c2ae5b920d',
    products: [Products.jira, Products.confluence],
  },
  pug: {
    aggregatorUrl: 'https://pug.jira-dev.com/gateway/api/xpsearch-aggregator',
    corsEnabled: true,
    cloudId: 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5',
    activityServiceUrl: 'https://pug.jira-dev.com/gateway/api/activity',
    searchAggregatorServiceUrl:
      'https://pug.jira-dev.com/gateway/api/xpsearch-aggregator',
    collaborationGraphUrl: 'https://pug.jira-dev.com/gateway/api/collaboration',
    directoryServiceUrl: 'https://pug.jira-dev.com/gateway/api/directory',
    baseUrl: 'https://pug.jira-dev.com',
    products: [Products.confluence],
  },
  hello: {
    aggregatorUrl:
      'https://hello.atlassian.net/gateway/api/xpsearch-aggregator',
    cloudId: 'a436116f-02ce-4520-8fbb-7301462a1674',
    activityServiceUrl: 'blank',
    searchAggregatorServiceUrl:
      'https://hello.atlassian.net/gateway/api/xpsearch-aggregator',
    collaborationGraphUrl:
      'https://hello.atlassian.net/gateway/api/collaboration',
    directoryServiceUrl: 'https://hello.atlassian.net/gateway/api/directory',
    baseUrl: 'https://hello.atlassian.net',
    products: [Products.jira, Products.confluence],
  },
  sdog: {
    aggregatorUrl: 'https://sdog.jira-dev.com/gateway/api/xpsearch-aggregator',
    corsEnabled: true,
    cloudId: 'DUMMY-7c8a2b74-595a-41c7-960c-fd32f8572cea',
    activityServiceUrl: 'blank',
    searchAggregatorServiceUrl:
      'https://sdog.jira-dev.com/gateway/api/xpsearch-aggregator',
    collaborationGraphUrl:
      'https://sdog.jira-dev.com/gateway/api/collaboration',
    directoryServiceUrl: 'https://sdog.jira-dev.com/gateway/api/directory',
    baseUrl: 'https://sdog.jira-dev.com',
    accountId: '655363:2a8cb791-3b93-463a-a8a3-45c2ae5b920d',
    products: [Products.jira],
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
    directoryServiceUrl:
      'https://confluence-only.jira-dev.com/gateway/api/directory',
    baseUrl: 'https://confluence-only.jira-dev.com',
    accountId: '655363:2a8cb791-3b93-463a-a8a3-45c2ae5b920d',
    products: [Products.jira, Products.confluence],
  },
  jquach: {
    aggregatorUrl:
      'https://jquach.jira-dev.com/gateway/api/xpsearch-aggregator',
    corsEnabled: true,
    cloudId: '690973c4-d02a-470f-b795-0af9b28f75c1',
    activityServiceUrl: 'https://jquach.jira-dev.com/gateway/api/activity',
    collaborationGraphUrl:
      'https://jquach.jira-dev.com/gateway/api/collaboration',
    searchAggregatorServiceUrl:
      'https://jquach.jira-dev.com/gateway/api/xpsearch-aggregator',
    directoryServiceUrl: 'https://jquach.jira-dev.com/gateway/api/directory',
    baseUrl: 'https://jquach.jira-dev.com',
    accountId: '655363:2a8cb791-3b93-463a-a8a3-45c2ae5b920d',
    products: [Products.jira, Products.confluence],
  },
  local: {
    corsEnabled: true,
    searchAggregatorServiceUrl: 'https://localhost:9999/',
    collaborationGraphUrl: '/collaboration',
    cloudId: 'localhost',
    baseUrl: 'localhost',
    products: [Products.jira, Products.confluence],
  },
};
