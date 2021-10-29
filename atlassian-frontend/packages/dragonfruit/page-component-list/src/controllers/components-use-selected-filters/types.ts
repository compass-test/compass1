import { CompassQueryFilter } from '@atlassian/dragonfruit-graphql';

export type TeamFilter = {
  name: string;
  filter: CompassQueryFilter;
};
