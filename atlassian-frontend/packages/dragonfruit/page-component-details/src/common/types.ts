import { CompassComponentLabel } from '@atlassian/dragonfruit-graphql';

export type CompassComponentLabelForUI = {
  name: NonNullable<CompassComponentLabel['name']>;
};
