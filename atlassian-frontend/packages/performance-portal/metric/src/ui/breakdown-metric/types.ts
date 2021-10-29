import { ApolloError } from '@apollo/client';

import {
  BreakdownTimingDetailFragment,
  PerfPortalBreakdownChartQuery,
} from '../../__generated__/graphql';
import { AvailableCohort, BreakdownTimingData } from '../../common/types';

export interface Entry {
  name: string;
  data: {
    [key: string]: number;
  };
}

export type DeltaEntry = Entry & {
  delta: number;
};

export interface Props {
  loading: boolean;
  error?: ApolloError;
  data?: PerfPortalBreakdownChartQuery;

  availableCohorts: AvailableCohort[] | null;
}

export interface GraphDetails extends BreakdownTimingData {
  submetrics: Graph;
}
export interface Graph {
  [key: string]: GraphDetails;
}

export type AddingFunction = (
  current: GraphDetails,
  timing: BreakdownTimingDetailFragment,
) => void;
