import { CompassScorecard } from '@atlassian/dragonfruit-graphql';

export type ScorecardFragment = Pick<
  CompassScorecard,
  'id' | 'name' | 'description' | 'componentType' | 'importance'
>;
