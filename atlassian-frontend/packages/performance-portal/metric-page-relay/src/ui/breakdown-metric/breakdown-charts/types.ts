import { BreakdownTimingData } from '../../../common/types';

import { breakdownChartsFragment } from './__generated__/breakdownChartsFragment.graphql';

export interface Entry {
  name: string;
  data: {
    [key: string]: number;
  };
}

export type DeltaEntry = Entry & {
  delta: number;
};

export interface GraphDetails extends BreakdownTimingData {
  submetrics: Graph;
}
export interface Graph {
  [key: string]: GraphDetails;
}

export type TimingDetail = NonNullable<
  NonNullable<
    NonNullable<breakdownChartsFragment['baseBreakdown']>['timings']
  >['app']
>[0];

export type AddingFunction = (
  current: GraphDetails,
  timing: TimingDetail,
) => void;
