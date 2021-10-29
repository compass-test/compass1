import {
  CohortType,
  Environment,
  PageLoadType,
  Percentile,
} from '@atlassian/performance-portal-common';

import { ToplineType } from '../../common/types';

export interface PageLoadInitialRatioTrendData {
  dateTime: string;
  count: number;
}

export interface PageLoadInitialRatioSeries {
  pageLoadType: PageLoadType;
  data: PageLoadInitialRatioTrendData[];
}

export interface PageLoadInitialRatioQueryResponse {
  metricsByIds: Array<{
    id: string;
    eventKey: string;
    name: string;
    product: string;
    toplineTrend: {
      series: PageLoadInitialRatioSeries[];
    };
  }>;
}

export interface PageLoadInitialRatioQueryVariables {
  ids: string[];
  env: Environment;

  dateTimeRange: {
    from: string;
    to: string;
  };
  aggregations: Percentile[];
  toplineTypes: ToplineType[];
  pageLoadTypes: PageLoadType[];
  cohortTypes: CohortType[];
}

export interface PageLoadInitialRatioData {
  dateTime: string;
  value: number;
  count: number;
}

export interface PageLoadInitialRatioType {
  metric: {
    id: string;
    series: Array<{
      cohortType: CohortType;
      cohortValue: string;
      data: PageLoadInitialRatioData[];
    }>;
  };
}
