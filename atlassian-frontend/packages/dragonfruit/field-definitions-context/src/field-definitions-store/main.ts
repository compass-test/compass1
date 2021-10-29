import { useReducer } from 'react';

import {
  CompassComponentType,
  CompassFieldDefinition,
} from '@atlassian/dragonfruit-graphql';

import { DefinitionsMap } from '../types';

import { FieldDefinitionsReducer, State } from './types';

const initialState: State = {
  definitions: {},
  componentTypes: {},
};

const addDefinitionsToState = (
  state: State,
  definitions: CompassFieldDefinition[],
): State => {
  // Convert the array of definitions into a map
  const definitionsMap = definitions.reduce(
    (map: DefinitionsMap, definition) => {
      map[definition.id] = definition;
      return map;
    },
    {},
  );

  return {
    ...state,
    definitions: {
      ...state.definitions,
      ...definitionsMap,
    },
  };
};

export const fieldDefinitionReducer: FieldDefinitionsReducer = (
  state,
  action,
) => {
  switch (action.type) {
    case 'ADD_DEFINITIONS':
      return addDefinitionsToState(state, action.payload.definitions);

    case 'SET_COMPONENT_TYPE_DEFINITIONS':
      return {
        // Add any missing definitions to the store
        ...addDefinitionsToState(state, action.payload.definitions),
        componentTypes: {
          ...state.componentTypes,
          [action.payload.componentType]: action.payload.definitions.map(
            (definition) => definition.id,
          ),
        },
      };
  }

  throw new Error(`Unknown action "${JSON.stringify(action)}"`);
};

export function useFieldDefinitionsStore(initial?: State) {
  const [state, dispatch] = useReducer(
    fieldDefinitionReducer,
    initial ?? initialState,
  );

  function setComponentTypeDefinitions(
    componentType: CompassComponentType,
    definitions: Array<CompassFieldDefinition>,
  ) {
    dispatch({
      type: 'SET_COMPONENT_TYPE_DEFINITIONS',
      payload: { componentType, definitions },
    });
  }

  return {
    state,
    setComponentTypeDefinitions,
  };
}
