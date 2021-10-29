import { ComparisonType } from '../../../common/types';

export interface SelectedComparison {
  comparisonType: ComparisonType;
  selectedFixedDate?: Date;
}
export interface ComparisonControlProps {
  baseDateStr: string;
  selectedComparison: SelectedComparison;
  onComparisonSelected: (selected: SelectedComparison) => void;
}
