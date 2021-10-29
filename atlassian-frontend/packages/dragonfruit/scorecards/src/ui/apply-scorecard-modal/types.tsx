import { ScorecardOption } from '../../common/ui/types';

export type ApplyScorecardModalProps = {
  /**
   * A `testId` prop is provided for specified elements, which is a unique
   * string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests */
  testId?: string;
  componentId: string;
  onCancel: () => void;
  onClose: () => void;
};

export type FormData = {
  scorecard: ScorecardOption;
};
