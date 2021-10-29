import { fake } from '../utils';

export const FakeCompassScorecard = fake({
  owner: () => ({
    __typename: 'CustomerUser',
  }),
});
