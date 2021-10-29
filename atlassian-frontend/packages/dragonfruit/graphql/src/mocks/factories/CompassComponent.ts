import faker from 'faker';

import {
  CompassComponent,
  CompassComponentLabel,
} from '../../__generated__/graphql';
import { fake } from '../utils';

const generateLabels = (count: number): Array<CompassComponentLabel> => {
  const array = new Array<CompassComponentLabel>();
  for (let i = 0; i < count; i++) {
    array.push({
      name: faker.random.word(),
    });
  }
  return array;
};

export const FakeCompassComponent = fake<CompassComponent>({
  name: faker.random.words(),
  description: faker.lorem.paragraph(),
  dataManager: null,
  labels: generateLabels(faker.random.number({ min: 2, max: 4 })),
});
