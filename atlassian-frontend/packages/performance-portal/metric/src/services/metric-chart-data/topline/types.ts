import {
  CohortType,
  Environment,
  PageLoadType,
  Percentile,
} from '@atlassian/performance-portal-common';

import {
  HotEventFragment,
  ToplineGoalFragment,
  ToplineSeriesFragment,
  ToplineTrendDataFragment,
} from '../../../__generated__/graphql';
import { ToplineType } from '../../../common/types';

export type HotEvent = HotEventFragment;

export type ToplineTrendSeries = ToplineSeriesFragment;

export type ToplineTrendGoal = ToplineGoalFragment;

export type ToplineTrendData = ToplineTrendDataFragment;

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
