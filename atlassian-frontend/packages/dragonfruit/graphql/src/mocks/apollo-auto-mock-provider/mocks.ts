import faker from 'faker';

import {
  FakeCompassAnnouncement,
  FakeCompassComponent,
  FakeCompassComponentResultSuccess,
  FakeCompassScorecard,
  FakeCompassScorecardResultSuccess,
} from '../factories';
import { Mocks } from '../types';

export const defaultMockResolvers: Mocks = {
  // Custom scalars
  DateTime: () => faker.date.past().toISOString(),
  URL: () => faker.internet.url(),
  JSON: () => ({ random: 'json' }),

  CompassComponentResult: FakeCompassComponentResultSuccess,
  CompassComponent: FakeCompassComponent,
  CompassAnnouncement: FakeCompassAnnouncement,
  CompassScorecardResult: FakeCompassScorecardResultSuccess,
  CompassScorecard: FakeCompassScorecard,
};
