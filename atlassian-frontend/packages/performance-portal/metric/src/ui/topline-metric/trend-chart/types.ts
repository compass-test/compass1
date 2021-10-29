import { AvailableCohort, ToplineChartData } from '../../../common/types';
import {
  HotEvent,
  ToplineTrendGoal,
} from '../../../services/metric-chart-data/topline/types';

export interface Props {
  data: ToplineChartData;
  availableCohorts: AvailableCohort[];
  goals?: ToplineTrendGoal[];
  hotEvents?: Nullable<HotEvent[]>;
  label?: string;
  width?: string | number;
  height?: string | number;
}
