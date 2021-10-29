import { Mutable } from 'utility-types';

import {
  CohortType,
  Environment,
  PageLoadType,
  Percentile,
} from '@atlassian/performance-portal-common';

import { ToplineType } from '../../../common/types';

import { toplineQueryResponse } from './__generated__/toplineQuery.graphql';

export type HotEvents = NonNullable<
  toplineQueryResponse['experience']
>['hotEvents'];

export type ToplineTrendSeries = NonNullable<
  toplineQueryResponse['experience']
>['dailyToplineTrend'];

export type ToplineTrendSerie = NonNullable<
  NonNullable<toplineQueryResponse['experience']>['dailyToplineTrend']
>[0];

export type ToplineTrendGoals = Mutable<
  NonNullable<ToplineTrendSerie['goals']>
>;

export type ToplineTrendData = NonNullable<ToplineTrendSerie['data']>[0];

export interface ToplineQueryVariables {
  id: string;
  env: Environment;

  dateFrom: string;
  dateTo: string;

  dateTimeRange: {
    from: string;
    to: string;
  };
  aggregations: Percentile[];
  toplineTypes: ToplineType[];
  pageLoadTypes: PageLoadType[];
  cohortTypes: CohortType[];
}
