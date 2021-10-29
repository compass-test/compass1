import OriginTracing from '@atlassiansox/origin-tracing';
import { Locale } from '../../common/constants/supported-locales';

export const CONFLUENCE_LOADING = 'CONFLUENCE_LOADING';
export const CONFLUENCE_INACTIVE = 'CONFLUENCE_INACTIVE';
export const CONFLUENCE_DEACTIVATED = 'CONFLUENCE_DEACTIVATED';
export const CONFLUENCE_ACTIVE = 'CONFLUENCE_ACTIVE';
export const CONFLUENCE_ACTIVATING = 'CONFLUENCE_ACTIVATING';
export const CONFLUENCE_EXPIRED = 'CONFLUENCE_EXPIRED';
export const CONFLUENCE_ERROR = 'CONFLUENCE_ERROR';

export type ConfluenceInstanceState =
  | typeof CONFLUENCE_LOADING // fetching the state of Confluence
  | typeof CONFLUENCE_INACTIVE
  | typeof CONFLUENCE_ACTIVE
  | typeof CONFLUENCE_ACTIVATING
  | typeof CONFLUENCE_DEACTIVATED
  | typeof CONFLUENCE_EXPIRED
  | typeof CONFLUENCE_ERROR;

export const FREE_EDITION = 'free';
export const STANDARD_EDITION = 'standard';
export const PREMIUM_EDITION = 'premium';
export const ENTERPRISE_EDITION = 'enterprise';

export type ProductEdition =
  | typeof FREE_EDITION
  | typeof STANDARD_EDITION
  | typeof PREMIUM_EDITION
  | typeof ENTERPRISE_EDITION;

export enum ProductLicensingState {
  ACTIVE = 'ACTIVE',
  ACTIVATING = 'ACTIVATING',
  INACTIVE = 'INACTIVE',
  DEACTIVATED = 'DEACTIVATED',
}

export interface ProductLicenseInformation {
  state: ProductLicensingState;
  edition: ProductEdition;
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
  TOWNSQUARE = 'townsquare',
}

export interface LicenceInformation {
  products: {
    [key in ProductKeys]?: ProductLicenseInformation;
  };
}

export type ContextState = {
  baseUrl: string;
  isAdmin: boolean;
  locale: Locale;
  cloudId: string;
  accountId: string;
  confluenceState: ConfluenceInstanceState;
  confluenceEdition?: ProductEdition;
  jswEdition?: ProductEdition;
  suggestedKey: string | null | undefined;
  origin: OriginTracing | null;
};
