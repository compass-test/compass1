import { FilterType as ConfluenceFilterType } from '../../confluence/clients';
import { FilterType as JiraFilterType } from '../../jira/clients';
import { Products } from '../product-context';

export interface ModelParam {
  '@type': string;
  [value: string]: string | number;
}

export interface SearchContext {
  sessionId: string;
  referrerId: string | null;
}

export interface ABTest {
  abTestId: string;
  controlId: string;
  experimentId: string;
}

export interface ScopedAggregatorResponse<T> {
  id: T;
  error?: string;
  size?: number;
}

export interface ExperimentResponse<T> {
  scopes: {
    id: T;
    abTest: ABTest;
  }[];
}

export type CommonFilterType = 'site';

export type ProductFilterType =
  | ConfluenceFilterType
  | JiraFilterType
  | CommonFilterType;

/**
 * All filters must implement this interface.
 */
export interface FilterInterface {
  '@type': string;
}

/****************************************************************/
/**                   Collaboration Graph                      **/
/****************************************************************/

export const SpaceContainerType = 'confluenceSpace';
export const ProjectContainerType = 'jiraProject';

export type ContainerType =
  | typeof SpaceContainerType
  | typeof ProjectContainerType;

export interface CollaborationGraphContainerAPIResponse {
  entityType: string;
  containerType: ContainerType;
  id: string;
  containerDetails: {
    id: string;
    key: string;
    name: string;
    url: string;
    iconUrl: string;
    score: number;
  };
}

export interface CollaborationGraphContainer
  extends CollaborationGraphContainerAPIResponse {
  siteId: string;
}

export interface CollaborationGraphUserAPIResponse {
  entityType: string;
  id: string;
  userProfile: {
    account_id: string;
    email: string;
    name: string;
    picture: string;
    account_status: string;
    account_type: string;
    locale: string;
    score: number;
  };
}

export interface CollaborationGraphUser
  extends CollaborationGraphUserAPIResponse {
  siteId: string;
}

export interface CollaborationGraphResponse<T> {
  collaborationGraphEntities: T[];
  timings: number;
}

export interface SharedClient {
  getAbTestData: () => Promise<ABTest | null>;
  getProductPermissions: (products: Products[]) => Promise<Products[]>;
}

/****************************************************************/
/**                   Multi Site                               **/
/****************************************************************/

/**
 * Defines the properties to be passed to serve results from multiple tenants.
 *
 * @siteUrl {string} can be thought of as the hostUrl without a trailing '/'. Not to be confused with 'baseUrl' which has the value '/wiki' for confluence.
 */
export interface Site {
  product: Products;
  avatarUrl: string;
  cloudId: string;
  collabGraphSessionId?: string;
  siteName: string;
  siteUrl: string;
}
