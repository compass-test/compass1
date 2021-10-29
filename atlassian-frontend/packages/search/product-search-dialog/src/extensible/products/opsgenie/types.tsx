import { ScopedAggregatorResponse } from '../../../common/clients';

export enum OpsgenieScope {
  OpsgenieAlert = 'opsgenie.alert',
}

export interface OpsgenieAlertResponse {
  tinyId: string;
  count: number;
  createdAt: string;
  id: string;
  link: string;
  message: string;
  priority: string; // as 1 | 2 | 3 | 4 | 5
  status: string; // open | close
  iconURI: string;
}

export interface AggregatorOpsgenieResponse
  extends ScopedAggregatorResponse<OpsgenieScope> {
  results: OpsgenieAlertResponse[];
}

export interface OpsgenieURLGenerators {
  viewAllLinkGenerator: (query: string) => string;
  urlGeneratorForNoResultsScreen: (query: string) => string;
}
