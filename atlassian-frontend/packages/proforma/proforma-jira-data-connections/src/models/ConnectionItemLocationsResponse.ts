import { ResponseStatus } from '@atlassian/proforma-common-core/jira-common-models';

export interface ConnectionItemLocation {
  name: string;
  count: number;
  idNames: string[];
  labelNames: string[];
}

export interface ConnectionItemLocationsResponse extends ResponseStatus {
  headers: string[];
  redirected?: boolean;
  data?: string;
  itemLocations: ConnectionItemLocation[];
  request?: string[];
  contentType: string;
}
