import faker from 'faker';

import { TeamCheckin } from './types';

export const MockEdit = (_teamCheckinId: string) => {};

export const MockDelete = (_teamCheckinId: string) => {};

export const MockTeamCheckin: TeamCheckin = {
  teamId: 'ari:cloud:identity::team/0006b873-ace9-4e73-bc19-b80b68c69397',
  id: 'd852f339-2830-4754-a657-50001e3cf0e4',
  mood: 5,
  response1: 'This week three of our scorecards hit 100%',
  response2: 'There are a few other scorecards that need to be improved',
  response3: 'Another team was able to step in and help this week',
  changeMetadata: {
    createdAt: '2021-09-15T12:12:44.629023-07:00',
    lastUserModificationAt: '2021-09-15T12:12:44.629023-07:00',
  },
};

export const MockTeamCheckinLongForm: TeamCheckin = {
  teamId: 'ari:cloud:identity::team/0006b873-ace9-4e73-bc19-b80b68c69397',
  id: 'd852f339-2830-4754-a657-50001e3cf0e4',
  mood: 5,
  response1: faker.lorem.paragraphs(3),
  response2: faker.lorem.paragraphs(3),
  response3: faker.lorem.paragraphs(3),
  changeMetadata: {
    createdAt: '2021-09-15T12:12:44.629023-07:00',
    lastUserModificationAt: '2021-09-15T12:12:44.629023-07:00',
  },
};
