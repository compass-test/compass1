import {
  CompassHasDescriptionScorecardCriteria,
  CompassHasLinkScorecardCriteria,
  CompassHasOwnerScorecardCriteria,
} from '@atlassian/dragonfruit-graphql';

export type Criteria = {
  id: string;
  field?: string; // TODO: Potentially constrain this value to an enum.
  weight?: string;
};

export type CriteriaType =
  | CompassHasDescriptionScorecardCriteria
  | CompassHasLinkScorecardCriteria
  | CompassHasOwnerScorecardCriteria;
