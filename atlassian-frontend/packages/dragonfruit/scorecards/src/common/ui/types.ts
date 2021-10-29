import {
  CompassComponentType,
  CompassHasDescriptionScorecardCriteria,
  CompassHasLinkScorecardCriteria,
  CompassHasOwnerScorecardCriteria,
  CompassScorecard,
  CompassScorecardCriteriaScore,
  CompassScorecardImportance,
  CompassScorecardScore,
  User,
} from '@atlassian/dragonfruit-graphql';

/*
Although we have the similar query between QuickView and FullView, they are
slightly different on what information they fetch.
For example,
  QuickView uses getComponentScorecardsWithScores query and fetches what is the
    minimal information needed for its functionality
  FullView uses getComponentScorecardWithScoresById query and fetches what
    QuickView fetches and additionally fetches
    description, importance, owner info for scorecard fragment and
    weight info for criteria fragment
There are two options to cater these differences in the query result fragments
  on setting the types and mocks, which are needed for stories/tests
  Option 1: Set the types and mocks for the common denominator, which is FullView
  Option 2: Set separate types and separate mocks for each of those query result fragments
There are trade offs between the two options.
  Option 1 is less code as we are reusing types and mocks.
  Option 2 is verbose, but does reflect 1:1 on what information is being queried
  to the corresponding types and mocks.
Upon team discussion, we have decided to go with Option 1 as
  - it is less verbose
  - it does not impact the queries and corresponding functionality
  - it does impact only the stories/tests
If we change our stance and decide to switch to Option 2, that can be handled
  in the gap week, as at the end of the day those 2 options are sort of
  implementation details for stories/tests and should not affect the functionality
*/

type CriteriaScoreFragment = Pick<
  CompassScorecardCriteriaScore,
  'score' | 'maxScore'
>;

export type HasDescriptionCriteriaFragment = Pick<
  CompassHasDescriptionScorecardCriteria,
  '__typename' | 'id' | 'weight'
> & {
  scorecardCriteriaScore: CriteriaScoreFragment;
};

export type HasOwnerCriteriaFragment = Pick<
  CompassHasOwnerScorecardCriteria,
  '__typename' | 'id' | 'weight'
> & {
  scorecardCriteriaScore: CriteriaScoreFragment;
};

export type HasLinkCriteriaFragment = Pick<
  CompassHasLinkScorecardCriteria,
  '__typename' | 'id' | 'weight' | 'linkType'
> & {
  scorecardCriteriaScore: CriteriaScoreFragment;
};

export type CriteriaFragment =
  | HasDescriptionCriteriaFragment
  | HasOwnerCriteriaFragment
  | HasLinkCriteriaFragment;

export type ScorecardScoreFragment = Pick<
  CompassScorecardScore,
  'totalScore' | 'maxTotalScore'
>;

export type OwnerFragment = Pick<User, 'name' | 'picture'>;

export type ScorecardFragment = Pick<
  CompassScorecard,
  'id' | 'name' | 'description' | 'componentType' | 'importance'
> & {
  owner: OwnerFragment;
} & {
  scorecardScore: ScorecardScoreFragment;
  criterias: Array<CriteriaFragment>;
};

// type to reflect the option in the Scorecards Select drop down
export type ScorecardOption = {
  label: string; // Scorecard name
  value: string; // Scorecard id
  description: string;
  componentType: CompassComponentType;
  importance: CompassScorecardImportance;
};
