import { ApolloError } from '@apollo/client';

import {
  Environment,
  PageLoadType,
  Percentile,
} from '@atlassian/performance-portal-common';

export enum ToplineType {
  TTI = 'TTI',
  FMP = 'FMP',
}

export interface ToplineTrendData {
  dateTime: string;
  value: number;
  count: number;
  aggregatedAt?: string;
}

export interface ToplineTrendGoal {
  id: string;
  name: string;
  value: number;
}

export interface ToplineTrendSeries {
  toplineType: ToplineType;
  aggregation: Percentile;
  pageLoadType: PageLoadType;
  goal?: ToplineTrendGoal[];
  data: ToplineTrendData[];
}

export interface Metrics {
  metricsByIds: Array<{
    id: string;
    name: string;
    product: string;
    eventKey?: string;
    toplineTrend: {
      series: ToplineTrendSeries[];
    };
  }>;
}

export interface MetricsQueryVariables {
  ids: Array<string>;
  env: Environment;
  dateTimeRange: {
    from: string;
    to: string;
  };
  aggregations: Percentile[];
  toplineTypes: ToplineType[];
  pageLoadTypes: PageLoadType[];
}

export enum MetricsOptions {
  FMP = 'FMP',
  TTI = 'TTI',
  SPATransitionRatio = 'transition-ratio',
}

export interface TrendSeries {
  type: ToplineType;
  goal?: ToplineTrendGoal[];
  data: ToplineTrendData[];
}

export interface FilteredMetric {
  id: string;
  name: string;
  product: string;
  eventKey?: string;
  series: TrendSeries[];
}

export interface ProcessedMetric {
  id: string;
  name: string;
  product: string;
  eventKey?: string;
  series: TrendSeries[];
  volume?: number;
}

export interface RatioDataEntry {
  id: string;
  data: ToplineTrendData[];
}

export interface RatioResultEntry {
  loading: boolean;
  error: ApolloError | undefined;
  data: RatioDataEntry[] | undefined;
}

export interface ChartSnapshotData {
  dateTime: string;
  value: number;
}
