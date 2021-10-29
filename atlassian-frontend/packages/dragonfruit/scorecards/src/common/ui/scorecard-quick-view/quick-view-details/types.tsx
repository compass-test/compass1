import { CompassScorecardImportance } from '@atlassian/dragonfruit-graphql';

import { CriteriaFragment } from '../../../../common/ui/types';

export type QuickViewDetailsProps = {
  componentId: string;
  scorecardId: string;
  scorecardName: string;
  scorecardImportance: CompassScorecardImportance;
  criterias: CriteriaFragment[];
  onScorecardFullViewOpen: Function;
  /**
   * A `testId` prop is provided for specified elements, which is a unique
   * string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests */
  testId?: string;
};
