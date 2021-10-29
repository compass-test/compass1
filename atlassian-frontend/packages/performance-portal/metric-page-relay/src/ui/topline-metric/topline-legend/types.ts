import { AvailableCohort } from '../../../common/types';

export interface Props {
  availableCohorts: AvailableCohort[];
  visibleCohorts: string[];
  isAllCohortVisible: boolean;
  onShowAllCohorts: () => void;
  onShowOnlyCohort: (cohort: string) => void;
  onHideCohort: (cohort: string) => void;
  onShowCohort: (cohort: string) => void;
}
