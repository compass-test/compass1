import { CompassFieldDefinition } from '@atlassian/dragonfruit-graphql';

export type DefinitionsMap = Record<
  CompassFieldDefinition['id'],
  CompassFieldDefinition
>;
