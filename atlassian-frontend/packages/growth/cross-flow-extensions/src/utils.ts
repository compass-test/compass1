import { JSONValue } from '@atlassiansox/cross-flow-base-types';
import { CrossFlowExtensions } from '@atlassiansox/cross-flow-base-types';

export const filterProperties = (
  object: Record<string, JSONValue | undefined>,
  propertyNames: string[],
) =>
  propertyNames.reduce((accumulator, property) => {
    const value = object[property];
    if (value !== undefined) {
      accumulator[property] = value;
    }
    return accumulator;
  }, {} as Record<string, JSONValue>);

export const createProductExtensions = <
  T extends Record<string, JSONValue | undefined>
>(
  extensionsWhitelist: string[],
) => (options: T) => {
  const filteredOptions = filterProperties(options, extensionsWhitelist);
  return new CrossFlowExtensions(filteredOptions);
};
