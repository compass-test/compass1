import { CompassEventsQueryResult } from '../../__generated__/graphql';
import { fake } from '../utils';

export const FakeCompassEventQueryError = fake<CompassEventsQueryResult>({
  __typename: 'QueryError',
});
