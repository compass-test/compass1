import { CompassTeamCheckin } from '@atlassian/dragonfruit-graphql';

export type TeamCheckin = Pick<
  CompassTeamCheckin,
  | 'teamId'
  | 'id'
  | 'mood'
  | 'response1'
  | 'response2'
  | 'response3'
  | 'changeMetadata'
>;
