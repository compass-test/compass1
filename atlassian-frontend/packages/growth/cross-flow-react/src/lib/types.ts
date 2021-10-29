import { PluginCollection } from '@atlassiansox/cross-flow-base-types';
import {
  CrossFlowExtensions,
  JSONValue,
} from '@atlassiansox/cross-flow-base-types';

export enum Editions {
  FREE = 'free',
  STANDARD = 'standard',
  PREMIUM = 'premium',
  ESSENTIALS = 'essentials',
  ENTERPRISE = 'enterprise',
}

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

export enum CrossFlowOriginProduct {
  BITBUCKET = 'bitbucket',
  CONFLUENCE = 'confluence',
  JIRA_CORE = 'jira-core',
  JIRA_SERVICE_DESK = 'jira-servicedesk',
  JIRA_SOFTWARE = 'jira-software',
  JIRA_FAMILY = 'jira',
  TRELLO = 'trello',
  OPSGENIE = 'opsgenie',
  STATUSPAGE = 'statuspage',
  START = 'start',
}

export enum CrossFlowEvents {
  INITIATE_SPA_CLOSE = 'INITIATE_SPA_CLOSE',
}

export interface CrossFlowIntegrationProps {
  src?: string;
  locale?: string;
  cloudId?: string;
  sourceContext: string;
  sourceComponent: string;
  targetProduct: ProductKeys;
  originProduct: CrossFlowOriginProduct;
  experimentalOptions?: ExperimentalOptions;
  extensions?: CrossFlowExtensions;
  env?: string;
  journey?: string;
  onClose?: (e: any) => void;
  onError?: (e: any) => void;
  onAnalyticsEvent?: (e: any) => void;
  onHandShake?: (e: any) => void;
  plugins?: PluginCollection;
  edgePrefix?: string;
}

export type ExperimentalOptions = Record<string, JSONValue>;
