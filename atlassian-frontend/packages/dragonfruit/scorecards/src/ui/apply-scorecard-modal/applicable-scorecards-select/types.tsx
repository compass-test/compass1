import { FieldProps } from '@atlaskit/form';

import { ScorecardOption } from '../../../common/ui/types';

export type ApplicableScorecardsSelectProps = {
  /**
   * A `testId` prop is provided for specified elements, which is a unique
   * string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests */
  testId?: string;
  componentId: string;
  inlineErrorMessage?: string | null;
  clearError?: Function;
} & FieldProps<ScorecardOption>;
