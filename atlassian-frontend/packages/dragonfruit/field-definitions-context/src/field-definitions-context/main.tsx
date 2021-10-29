import React, { createContext, useContext } from 'react';

import {
  CompassComponentType,
  CompassFieldDefinition,
} from '@atlassian/dragonfruit-graphql';

import { useFieldDefinitionsStore } from '../field-definitions-store';

import { initialState } from './initial-state';
import { FieldDefinitionsContextType } from './types';

const defaultContext: FieldDefinitionsContextType = {
  state: initialState,
  // Provide dummy functions that do nothing as the default
  setComponentTypeDefinitions: () => {},
  getDefinition: () => undefined,
  getComponentTypeDefinitionIds: () => [],
};

const FieldDefinitionsContext = createContext<FieldDefinitionsContextType>(
  defaultContext,
);

type FieldDefinitionsProviderProps = {
  children: React.ReactNode;
};

export function FieldDefinitionsProvider(props: FieldDefinitionsProviderProps) {
  // Initialise the store with a starting state
  const { state, setComponentTypeDefinitions } = useFieldDefinitionsStore(
    initialState,
  );

  function getDefinition(definitionId: CompassFieldDefinition['id']) {
    return state.definitions[definitionId] ?? undefined;
  }

  function getComponentTypeDefinitionIds(componentType: CompassComponentType) {
    return state.componentTypes[componentType] ?? [];
  }

  return (
    <FieldDefinitionsContext.Provider
      value={{
        state,
        setComponentTypeDefinitions,
        getDefinition,
        getComponentTypeDefinitionIds,
      }}
    >
      {props.children}
    </FieldDefinitionsContext.Provider>
  );
}

export function useFieldDefinitions() {
  return useContext(FieldDefinitionsContext);
}
