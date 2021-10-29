import type { CloudSite } from './types';

export const cloudSites: CloudSite[] = [
  { cloudId: '1', cloudUrl: 'https://site-1.atlassian.net' },
  { cloudId: '2', cloudUrl: 'https://site-2.atlassian.net' },
  {
    cloudId: '3',
    cloudUrl: 'https://site-3-confluence-free.atlassian.net',
    edition: 'free',
  },
  {
    cloudId: '4',
    cloudUrl: 'https://site-4-jira-standard.atlassian.net',
    edition: 'standard',
  },
  {
    cloudId: '5',
    cloudUrl: 'https://site-5-confluence-standard.atlassian.net',
    edition: 'standard',
  },
];
