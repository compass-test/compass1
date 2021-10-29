type CloudProductKey =
  | 'confluence.ondemand'
  | 'jira-core.ondemand'
  | 'jira-software.ondemand'
  | 'jira-servicedesk.ondemand';

type CloudEditionKey = 'free' | 'standard' | 'premium';

export type CloudSite = {
  cloudId: string;
  cloudUrl: string;
  productKey?: CloudProductKey;
  edition?: CloudEditionKey;
  usersCount?: number;
};
