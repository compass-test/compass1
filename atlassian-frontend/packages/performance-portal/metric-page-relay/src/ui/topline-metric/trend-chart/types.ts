import { AvailableCohort, ToplineChartData } from '../../../common/types';
import {
  HotEvents,
  ToplineTrendGoals,
} from '../../../services/metric-chart-data/topline/types';

export interface Props {
  data: ToplineChartData;
  availableCohorts: AvailableCohort[];
  goals?: ToplineTrendGoals;
  hotEvents?: HotEvents;
  label?: string;
  width?: string | number;
  height?: string | number;
}
