import { AvailableCohort, ToplineChartData } from '../../../common/types';

export interface Props {
  data: ToplineChartData;
  availableCohorts: AvailableCohort[];
  label?: string;
  width?: string | number;
  height?: string | number;
}
