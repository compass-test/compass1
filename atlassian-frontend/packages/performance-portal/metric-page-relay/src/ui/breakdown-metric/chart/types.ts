import {
  AvailableCohort,
  ComparisonType,
  TimingType,
} from '../../../common/types';

export type ChartData = Array<{
  name: string;
  duration?: number | null;
  comparisonDuration?: number | null;
  delta?: number | null;
  level?: number | null;
  startTime?: number | null;
  comparisonStartTime?: number | null;
  timingType: TimingType;
}>;

export interface Props {
  data: ChartData;
  onChartClick?: () => void;
  baseDate: Date;
  comparisonDate: Date;
  comparisonType: ComparisonType;
  availableCohorts: AvailableCohort[];
  focusedCohort: string;
}
