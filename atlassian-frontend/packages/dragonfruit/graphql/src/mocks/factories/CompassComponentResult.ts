import { CompassComponentResult } from '../../__generated__/graphql';
import { fake } from '../utils';

export const FakeCompassComponentResultSuccess = fake<CompassComponentResult>({
  __typename: 'CompassComponent',
});

export const FakeCompassComponentResultQueryError = fake<
  CompassComponentResult
>({
  __typename: 'QueryError',
});
