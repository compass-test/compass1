import { ReducerState } from 'react';

import {
  CompassComponentType,
  CompassFieldDefinition,
} from '@atlassian/dragonfruit-graphql';

import { FieldDefinitionsReducer } from '../field-definitions-store';

export type FieldDefinitionsContextType = {
  // Inherited from the reducer
  state: ReducerState<FieldDefinitionsReducer>;
  setComponentTypeDefinitions: (
    componentType: CompassComponentType,
    definitions: Array<CompassFieldDefinition>,
  ) => void;

  // Convenience functions in the context
  getDefinition: (
    definitionId: CompassFieldDefinition['id'],
  ) => CompassFieldDefinition | undefined;
  getComponentTypeDefinitionIds: (
    componentType: CompassComponentType,
  ) => Array<CompassFieldDefinition['id']>;
};
