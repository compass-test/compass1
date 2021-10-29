import { CompassScorecardResult } from '../../__generated__/graphql';
import { fake } from '../utils';

export const FakeCompassScorecardResultSuccess = fake<CompassScorecardResult>({
  __typename: 'CompassScorecard',
});

export const FakeCompassScorecardResultQueryError = fake<
  CompassScorecardResult
>({
  __typename: 'QueryError',
});
