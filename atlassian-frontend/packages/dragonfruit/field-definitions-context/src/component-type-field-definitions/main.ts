import {
  CompassComponentType,
  CompassFieldDefinition,
} from '@atlassian/dragonfruit-graphql';

import { useFieldDefinitions } from '../field-definitions-context';
import { DefinitionsMap } from '../types';

/**
 * This hook does 2 things:
 * - Returns the definitions for your component type from the store immediately
 * - Subscribes to GraphQL changes for that type and updates the store
 *
 * @param componentType
 */
export function useComponentTypeFieldDefinitions(
  componentType: CompassComponentType,
): DefinitionsMap {
  const {
    getComponentTypeDefinitionIds,
    getDefinition,
    // setComponentTypeDefinitions,
  } = useFieldDefinitions();

  /**
   * ---------------------------------------------------------------------------
   * The code below has been commented out while we define how we want to cache
   * the data, when we want to fetch it, and how long we want to persist it.
   *
   * We could write any number of different hooks that call the GraphQL query to
   * fetch the definitions, and then call setComponentTypeDefinitions to update
   * it in the global context. This is just one example.
   *
   * Options:
   *  - We could preload the definitions for all component types on page load
   *  - We could preload the definitions for a component type on hover
   *  - We could load the data for a component type when it's used (this implementation!)
   * ---------------------------------------------------------------------------
   */

  // const { cloudId } = useTenantInfo();
  //
  // // Subscribe to GraphQL changes in the field definition
  // const { data } = useGetFieldDefinitionsByComponentTypeQuery({
  //   variables: {
  //     cloudId,
  //     type: componentType,
  //   },
  // });
  //
  // // Update the definitions store with the latest from the API
  // useEffect(() => {
  //   const result = data?.compass?.fieldDefinitionsByComponentType;
  //
  //   if (result && result.__typename === 'CompassFieldDefinitions') {
  //     setComponentTypeDefinitions(componentType, result.definitions);
  //   }
  // }, [componentType, data, setComponentTypeDefinitions]);

  // Immediately return what we have in the store
  return (
    getComponentTypeDefinitionIds(componentType)
      // Map into an array of definition objects
      .map(getDefinition)
      // Filter out anything that isn't a CompassFieldDefinition (just in case)
      .filter((definition): definition is CompassFieldDefinition => {
        return Boolean(definition?.id);
      })
      // Convert into a map
      .reduce((map: DefinitionsMap, definition) => {
        map[definition.id] = definition;
        return map;
      }, {})
  );
}
