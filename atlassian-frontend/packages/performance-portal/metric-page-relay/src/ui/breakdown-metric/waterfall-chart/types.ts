import {
  AvailableCohort,
  BreakdownTimingData,
  ComparisonType,
} from '../../../common/types';

export interface ChartTimingData extends BreakdownTimingData {
  hasSubmetrics: boolean;
  isExpanded: boolean;
}

export interface Props {
  data: ChartTimingData[];
  onTimingBarClicked?: (timingName: string) => void;
  baseDate: Date;
  comparisonDate: Date;
  comparisonType: ComparisonType;
  availableCohorts: AvailableCohort[];
  focusedCohort: string;
  isShowAbsoluteTimingDiff: boolean;
  isShowPercentageTimingDiff: boolean;
}
