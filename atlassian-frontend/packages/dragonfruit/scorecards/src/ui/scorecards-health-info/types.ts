import {
  CompassScorecard,
  CompassScorecardScore,
} from '@atlassian/dragonfruit-graphql';

export type ScorecardScoreFragment = Pick<
  CompassScorecardScore,
  'totalScore' | 'maxTotalScore'
>;

export type ScorecardFragment = Pick<CompassScorecard, 'id' | 'name'> & {
  scorecardScore: ScorecardScoreFragment;
};

export interface ScorecardsHealthInfoProps {
  testId?: string;
  componentId: string;
}
export interface ContentProps {
  testId?: string;
  componentId: string;
  summary: string;
  scorecards: CompassScorecard[];
  onScorecardFullViewOpen: (scorecardId: string) => void;
}
