// Data Plugin definition and utility types

type Values<T> = T[keyof T];

export type DataPlugin<
  N extends string,
  I extends (...args: any) => Promise<any>
> = [N, I];

export type DataPluginNameType<
  R extends DataPlugin<any, any>
> = R extends DataPlugin<infer N, any> ? N : never;

export type DataPluginImplementationType<
  R extends DataPlugin<any, any>
> = R extends DataPlugin<any, infer I> ? I : never;

export type PluginCollection = DataPlugin<
  DataPluginNameType<any>,
  DataPluginImplementationType<any>
>[];

export const PluginTypes = {
  GetContainers: 'GetContainers',
  GetUsers: 'GetUsers',
  GetSuggestedSiteNames: 'GetSuggestedSiteNames',
  GetAvailableSites: 'GetAvailableSites',
} as const;

// GetContainers plugin types
export const ContainerTypes = {
  BITBUCKET_WORKSPACE: 'bitbucket-workspace',
  ATLASSIAN_CLOUD_ID: 'ATLASSIAN_CLOUD_ID',
  JIRA_SOFTWARE_PROJECT: 'JIRA_SOFTWARE_PROJECT',
} as const;

export interface ContainerData {
  id: string;
  displayName: string;
  type: Values<typeof ContainerTypes>;
}

export interface ContainerList {
  type: Values<typeof ContainerTypes>;
  containers: ContainerData[];
}

export type GetContainersDataPlugin = DataPlugin<
  typeof PluginTypes.GetContainers,
  () => Promise<ContainerList>
>;

// GetUsers plugin types

export const UserIdTypes = {
  ATLASSIAN_ACCOUNT_ID: 'ATLASSIAN_ACCOUNT_ID',
  TRELLO_ID: 'TRELLO_ID',
} as const;

export interface UserData {
  id: string;
  displayName: string;
  idType: Values<typeof UserIdTypes>;
  avatarUrl?: string;
}

export type GetUsersDataPlugin = DataPlugin<
  typeof PluginTypes.GetUsers,
  (containerId: string) => Promise<UserData[]>
>;

export type SuggestedSiteNamesData = string[];

export type GetSuggestedSiteNamesPlugin = DataPlugin<
  typeof PluginTypes.GetSuggestedSiteNames,
  () => Promise<SuggestedSiteNamesData>
>;

// Coincides with the product types in the Available Products Service
export const SwitcherProductType = {
  JIRA_BUSINESS: 'JIRA_BUSINESS',
  JIRA_SERVICE_DESK: 'JIRA_SERVICE_DESK',
  JIRA_SOFTWARE: 'JIRA_SOFTWARE',
  CONFLUENCE: 'CONFLUENCE',
  OPSGENIE: 'OPSGENIE',
  BITBUCKET: 'BITBUCKET',
  STATUSPAGE: 'STATUSPAGE',
  TRELLO: 'TRELLO',
  COMPASS: 'COMPASS',
} as const;

export type AvailableProduct =
  | {
      productType:
        | typeof SwitcherProductType.JIRA_BUSINESS
        | typeof SwitcherProductType.JIRA_SERVICE_DESK
        | typeof SwitcherProductType.JIRA_SOFTWARE
        | typeof SwitcherProductType.CONFLUENCE
        | typeof SwitcherProductType.COMPASS;
    }
  | AvailableProductWithUrl;

interface AvailableProductWithUrl {
  productType:
    | typeof SwitcherProductType.BITBUCKET
    | typeof SwitcherProductType.OPSGENIE
    | typeof SwitcherProductType.STATUSPAGE // assuming that the URL is provided by TCS (same as Opsgenie)
    | typeof SwitcherProductType.TRELLO;
  url: string;
}

export interface AvailableSite {
  adminAccess: boolean;
  availableProducts: AvailableProduct[];
  avatar: string | null;
  cloudId: string;
  displayName: string;
  url: string;
}

export interface AvailableSitesResponse {
  sites: AvailableSite[];
}

export type GetAvailableSitesPlugin = DataPlugin<
  typeof PluginTypes.GetAvailableSites,
  () => Promise<AvailableSitesResponse>
>;
