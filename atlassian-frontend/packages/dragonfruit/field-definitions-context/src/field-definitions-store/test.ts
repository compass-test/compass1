import { renderHook } from '@testing-library/react-hooks';

import {
  CompassComponentType,
  CompassFieldDefinition,
  CompassFieldType,
} from '@atlassian/dragonfruit-graphql';

import { fieldDefinitionReducer, useFieldDefinitionsStore } from './main';
import { State } from './types';

function makeTestDefinition(id: string): CompassFieldDefinition {
  return {
    id: id,
    name: 'Tier',
    type: CompassFieldType.ENUM,
    description:
      'The tier of a component reflects how important it is, the lower number the more important the component is',
    options: {
      values: ['1', '2', '3', '4'],
      default: ['4'],
    },
  };
}

describe('Field definitions store', () => {
  const initialState: State = {
    definitions: {},
    componentTypes: {},
  };

  // Test the logic of the reducer
  describe('fieldDefinitionReducer', () => {
    describe('ADD_DEFINITIONS', () => {
      it('should add no definitions', () => {
        const state = fieldDefinitionReducer(initialState, {
          type: 'ADD_DEFINITIONS',
          payload: {
            definitions: [],
          },
        });

        expect(state).toEqual(initialState);
      });

      it('should add a single definition', () => {
        const definition = makeTestDefinition('compass:tier');

        const state = fieldDefinitionReducer(initialState, {
          type: 'ADD_DEFINITIONS',
          payload: {
            definitions: [definition],
          },
        });

        expect(state).toEqual({
          definitions: {
            'compass:tier': definition,
          },
          componentTypes: {},
        });
      });

      it('should add multiple definitions', () => {
        const definition1 = makeTestDefinition('compass:tier');
        const definition2 = makeTestDefinition('compass:other');

        const state = fieldDefinitionReducer(initialState, {
          type: 'ADD_DEFINITIONS',
          payload: {
            definitions: [definition1, definition2],
          },
        });

        expect(state).toEqual({
          definitions: {
            'compass:tier': definition1,
            'compass:other': definition2,
          },
          componentTypes: {},
        });
      });

      it('should deduplicate definitions', () => {
        const definition = makeTestDefinition('compass:tier');

        let state = fieldDefinitionReducer(initialState, {
          type: 'ADD_DEFINITIONS',
          payload: {
            // Add the same definition multiple times
            definitions: [definition, definition],
          },
        });

        expect(state).toEqual({
          definitions: {
            'compass:tier': definition,
          },
          componentTypes: {},
        });

        // Add the same definitions again in another dispatch
        state = fieldDefinitionReducer(state, {
          type: 'ADD_DEFINITIONS',
          payload: {
            // Add the same definition multiple times
            definitions: [definition, definition],
          },
        });

        expect(state).toEqual({
          definitions: {
            'compass:tier': definition,
          },
          componentTypes: {},
        });
      });
    });

    describe('SET_COMPONENT_TYPE_DEFINITIONS', () => {
      it('should add a definition for a component type', () => {
        const definition = makeTestDefinition('compass:tier');

        const state = fieldDefinitionReducer(initialState, {
          type: 'SET_COMPONENT_TYPE_DEFINITIONS',
          payload: {
            componentType: CompassComponentType.SERVICE,
            definitions: [definition],
          },
        });

        expect(state).toEqual({
          definitions: {
            'compass:tier': definition,
          },
          componentTypes: {
            [CompassComponentType.SERVICE]: ['compass:tier'],
          },
        });
      });

      it('should add multiple definitions for a component type', () => {
        const definition1 = makeTestDefinition('compass:tier');
        const definition2 = makeTestDefinition('compass:other');

        const state = fieldDefinitionReducer(initialState, {
          type: 'SET_COMPONENT_TYPE_DEFINITIONS',
          payload: {
            componentType: CompassComponentType.SERVICE,
            definitions: [definition1, definition2],
          },
        });

        expect(state).toEqual({
          definitions: {
            'compass:tier': definition1,
            'compass:other': definition2,
          },
          componentTypes: {
            [CompassComponentType.SERVICE]: ['compass:tier', 'compass:other'],
          },
        });
      });

      it('should add definitions for multiple component types', () => {
        const definition1 = makeTestDefinition('compass:tier');
        const definition2 = makeTestDefinition('compass:other');

        let state = fieldDefinitionReducer(initialState, {
          type: 'SET_COMPONENT_TYPE_DEFINITIONS',
          payload: {
            componentType: CompassComponentType.SERVICE,
            definitions: [definition1],
          },
        });

        // Add a different field to a library
        state = fieldDefinitionReducer(state, {
          type: 'SET_COMPONENT_TYPE_DEFINITIONS',
          payload: {
            componentType: CompassComponentType.LIBRARY,
            definitions: [definition2],
          },
        });

        // Add both fields to an application
        state = fieldDefinitionReducer(state, {
          type: 'SET_COMPONENT_TYPE_DEFINITIONS',
          payload: {
            componentType: CompassComponentType.APPLICATION,
            definitions: [definition1, definition2],
          },
        });

        expect(state).toEqual({
          definitions: {
            'compass:tier': definition1,
            'compass:other': definition2,
          },
          componentTypes: {
            [CompassComponentType.SERVICE]: ['compass:tier'],
            [CompassComponentType.LIBRARY]: ['compass:other'],
            [CompassComponentType.APPLICATION]: [
              'compass:tier',
              'compass:other',
            ],
          },
        });
      });

      it('should overwrite existing definition relations', () => {
        const definition1 = makeTestDefinition('compass:tier');
        const definition2 = makeTestDefinition('compass:other');

        // Set a component type to have 2 definitions
        let state = fieldDefinitionReducer(initialState, {
          type: 'SET_COMPONENT_TYPE_DEFINITIONS',
          payload: {
            componentType: CompassComponentType.SERVICE,
            definitions: [definition1, definition2],
          },
        });

        // Change it to a single definition
        state = fieldDefinitionReducer(state, {
          type: 'SET_COMPONENT_TYPE_DEFINITIONS',
          payload: {
            componentType: CompassComponentType.SERVICE,
            definitions: [definition1],
          },
        });

        expect(state).toEqual({
          // Both definitions should still exist
          definitions: {
            'compass:tier': definition1,
            'compass:other': definition2,
          },
          // But only one is associated
          componentTypes: {
            [CompassComponentType.SERVICE]: ['compass:tier'],
          },
        });
      });
    });
  });

  // Test the actual hook
  describe('useFieldDefinitionsStore', () => {
    it('should initialise empty', () => {
      const { result } = renderHook(() => useFieldDefinitionsStore());

      expect(result.current.state).toEqual(initialState);
    });

    it('should initialise with a starting state', () => {
      const state: State = {
        definitions: {
          'compass:tier': makeTestDefinition('compass:tier'),
        },
        componentTypes: {
          [CompassComponentType.SERVICE]: ['compass:tier'],
        },
      };

      const { result } = renderHook(() => useFieldDefinitionsStore(state));

      expect(result.current.state).toEqual(state);
    });

    // We don't have to test too many cases here, as its all covered in the tests for the reducer itself
    // We just need to make sure that the call passes through as expected ;)
    it('should add definitions for a component type', () => {
      const { result } = renderHook(() => useFieldDefinitionsStore());

      const definition1 = makeTestDefinition('compass:tier');
      const definition2 = makeTestDefinition('compass:other');

      result.current.setComponentTypeDefinitions(CompassComponentType.SERVICE, [
        definition1,
        definition2,
      ]);

      expect(result.current.state).toEqual({
        definitions: {
          'compass:tier': definition1,
          'compass:other': definition2,
        },
        componentTypes: {
          [CompassComponentType.SERVICE]: ['compass:tier', 'compass:other'],
        },
      });
    });
  });
});
