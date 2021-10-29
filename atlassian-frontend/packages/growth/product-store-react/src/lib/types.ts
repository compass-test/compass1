import { JSONValue } from '@atlassiansox/cross-flow-base-types';

export enum ProductKeys {
  CONFLUENCE = 'confluence.ondemand',
  JIRA_CORE = 'jira-core.ondemand',
  JIRA_SERVICE_DESK = 'jira-servicedesk.ondemand',
  JIRA_SOFTWARE = 'jira-software.ondemand',
  TRELLO = 'trello',
  OPSGENIE = 'opsgenie',
  BITBUCKET = 'bitbucket.ondemand',
  STATUSPAGE = 'statuspage',
}

export enum Routes {
  DISCOVERY_PRODUCTS = '/',
  JIRA_SOFTWARE = '/learn-more/jira-software.ondemand',
  JIRA_CORE = '/learn-more/jira-core.ondemand',
  JIRA_SERVICE_DESK = '/learn-more/jira-servicedesk.ondemand',
  CONFLUENCE = '/learn-more/confluence.ondemand',
  OPSGENIE = '/learn-more/opsgenie',
  BITBUCKET = '/learn-more/bitbucket.ondemand',
}

export enum ProductStoreEventTypes {
  CLOSE = 'CLOSE',
  TRY_CLICKED = 'TRY_CLICKED',
  LEARN_MORE_CLICKED = 'LEARN_MORE_CLICKED',
  CHANGE_ROUTE = 'CHANGE_ROUTE',
  CHANGE_PREFETCHED_AVAILABLE_SITES = 'CHANGE_PREFETCHED_AVAILABLE_SITES',
}

interface CloseTriggeredHostEvent {
  type: ProductStoreEventTypes.CLOSE;
}

interface TryClickedHostEvent {
  type: ProductStoreEventTypes.TRY_CLICKED;
  data: {
    productKey: ProductKeys;
  };
}

/**
 * @deprecated please use RouteChangeHostEvent instead
 */
interface LearMoreClickedHostEvent {
  type: ProductStoreEventTypes.LEARN_MORE_CLICKED;
  data: {
    productKey: ProductKeys;
  };
}

interface RouteChangeHostEvent {
  type: ProductStoreEventTypes.CHANGE_ROUTE;
  data: {
    route: Routes;
  };
}

export type ProductStoreEvent =
  | LearMoreClickedHostEvent
  | CloseTriggeredHostEvent
  | TryClickedHostEvent
  | RouteChangeHostEvent;

export enum AvailableSitesProductKeys {
  JIRA_SOFTWARE = 'JIRA_SOFTWARE',
  JIRA_CORE = 'JIRA_BUSINESS',
  JIRA_SERVICE_DESK = 'JIRA_SERVICE_DESK',
  CONFLUENCE = 'CONFLUENCE',
  OPSGENIE = 'OPSGENIE',
  STATUSPAGE = 'STATUSPAGE',
  BITBUCKET = 'BITBUCKET',
  TRELLO = 'TRELLO',
}

export interface AvailableProductsInformation {
  activityCount?: number;
  productType: AvailableSitesProductKeys;
  url?: string;
}

export interface AvailableSitesInformation {
  adminAccess?: boolean;
  availableProducts: AvailableProductsInformation[];
  avatar?: string;
  cloudId?: string;
  displayName?: string;
  url?: string;
}

export interface AvailableSitesResponse {
  sites: AvailableSitesInformation[];
}

export type ExperimentalOptions = Record<string, JSONValue>;
