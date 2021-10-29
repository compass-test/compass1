import faker from 'faker';

import { CompassAnnouncement } from '../../__generated__/graphql';
import { fake } from '../utils';

export const FakeCompassAnnouncement = fake<CompassAnnouncement>({
  title: faker.random.words(5),
  description: faker.lorem.paragraph(),
});
