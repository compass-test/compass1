import React, { useContext, useEffect, useState } from 'react';

import { overrideContext } from './context';
import { CommerceOverride, OverrideRegistry } from './types';

export const OverrideRegistryRoot: React.FC<{
  overrides: CommerceOverride[];
}> = ({ children, overrides }) => {
  const [registry] = useState(() => new Map(overrides));

  useEffect(
    () => {
      const callbacks = overrides.map(([subject, target]) =>
        addCommerceOverride(registry, subject, target),
      );
      return () => callbacks.forEach((cb) => cb());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    overrides,
  );

  return (
    <overrideContext.Provider value={registry}>
      {children}
    </overrideContext.Provider>
  );
};

export const useOverrideRegistry = () => useContext(overrideContext);
/**
 * adds an override for an entity
 * @param registry
 * @param subject
 * @param override
 * @returns {Function} cancellation function
 */
export const addCommerceOverride = <T extends any>(
  registry: OverrideRegistry,
  subject: T,
  override: T,
): (() => void) => {
  registry.set(subject, override);
  return () => {
    registry.delete(subject);
  };
};

/**
 * returns a possible mocked subject
 * @param subject
 * @returns subject
 *
 * @example
 * const thing = () => {};
 * addCommerceOverride(registry, thing, anotherThing);
 * // ...
 * withCommerceOverride(registry, thing) === anotherThing
 */
export const withCommerceOverride = <T extends any>(
  registry: OverrideRegistry,
  subject: T,
): T => {
  return registry.get(subject) || subject;
};

export const useCommerceOverride = <T extends any>(subject: T): T => {
  const registry = useOverrideRegistry();
  return (registry || new Map()).get(subject) || subject;
};

export const asCommerceOverride = <T extends any>(
  subject: T,
  target: T,
): CommerceOverride<T> => [subject, target];
