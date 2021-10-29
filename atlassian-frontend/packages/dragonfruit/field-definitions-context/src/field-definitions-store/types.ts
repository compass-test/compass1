import { Reducer } from 'react';

import {
  CompassComponentType,
  CompassFieldDefinition,
} from '@atlassian/dragonfruit-graphql';

import { DefinitionsMap } from '../types';

export type State = {
  // Unique definitions are stored in the root of the context as a map with
  // their ID as the key. This allows us to quickly lookup a field definition.
  definitions: DefinitionsMap;

  // We keep a map of what field definitions are present on each component type.
  componentTypes: Partial<
    Record<CompassComponentType, Array<CompassFieldDefinition['id']>>
  >;
};

type AddDefinitionsAction = {
  type: 'ADD_DEFINITIONS';
  payload: {
    definitions: Array<CompassFieldDefinition>;
  };
};

type SetComponentTypeDefinitionsAction = {
  type: 'SET_COMPONENT_TYPE_DEFINITIONS';
  payload: {
    componentType: CompassComponentType;
    definitions: Array<CompassFieldDefinition>;
  };
};

type Actions = AddDefinitionsAction | SetComponentTypeDefinitionsAction;

export type FieldDefinitionsReducer = Reducer<State, Actions>;
