import { ApolloError } from '@apollo/client';

import { AvailableCohort } from '../../common/types';
import {
  HotEvent,
  ToplineTrendSeries,
} from '../../services/metric-chart-data/topline/types';

export interface Props {
  loading: boolean;
  error?: ApolloError;
  series?: ToplineTrendSeries[];
  hotEvents?: Nullable<HotEvent[]>;
  showWeekend: boolean;
  onDateSelected?: (date: Date) => void;
  selectedDate?: Date;
  availableCohorts: AvailableCohort[] | null;
  onLoad?: () => void;
}
