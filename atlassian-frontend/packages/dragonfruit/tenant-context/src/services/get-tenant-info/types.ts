import { ServiceState } from '@atlassian/dragonfruit-utils';

export interface AvailableProduct {
  product: Product;
  url?: string;
}

export enum Permission {
  WRITE = 'write',
  MANAGE = 'manage',
}

export enum Product {
  COMPASS = 'COMPASS',
  CONFLUENCE = 'CONFLUENCE',
  JIRA_BUSINESS = 'JIRA_BUSINESS',
  JIRA_CORE = 'JIRA_CORE',
  JIRA_SERVICE_DESK = 'JIRA_SERVICE_DESK',
  JIRA_SOFTWARE = 'JIRA_SOFTWARE',
  OPSGENIE = 'OPSGENIE',
  STATUSPAGE = 'STATUSPAGE',
}

export interface TenantInfoData {
  orgId: string;
  cloudId: string;
  workspaceId: string;
  availableProducts?: AvailableProduct[];
  accountId: string;
  permissions: Permission[];
}

export interface TenantInfoResult extends TenantInfoData {
  getAvailableProductData: (
    targetProduct: Product,
  ) => AvailableProduct | undefined;
  isAdmin: () => boolean;
}

export interface TenantInfoState extends ServiceState<TenantInfoData> {}

// This matches the envType in @atlassian-sox/analytics-web-client
export enum Environment {
  LOCAL = 'local',
  STAGING = 'staging',
  PROD = 'prod',
}
