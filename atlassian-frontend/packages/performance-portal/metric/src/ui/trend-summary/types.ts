import { ApolloError } from '@apollo/client';

import { AvailableCohort } from '../../common/types';
import { ToplineTrendSeries } from '../../services/metric-chart-data/topline/types';

export interface Props {
  id: string;
  loading: boolean;
  error?: ApolloError;
  series?: ToplineTrendSeries[];
  availableCohorts: AvailableCohort[] | null;
}
