import React, { createContext, useContext } from 'react';

interface CustomNames {
  provider?: string;
  hook?: string;
}

/**
 * Dynamically constructs a context provider and hook proxy which provides
 * shared state behavior while retaining the hook's interface.
 *
 * @param hook - A custom hook which provides
 * @param customNames.hook - An optional custom name which will be applied to
 * the returned hook.
 * @param customNames.provider - An optional custom name which will be applied
 * to the returned context provider.
 */
export const withContext = <T extends (...args: any[]) => any>(
  hook: T,
  customNames?: CustomNames,
) => {
  const { provider: customProviderName, hook: customHookName } =
    customNames || ({} as CustomNames);

  type P = Parameters<T>;
  type R = ReturnType<T>;

  // Create a "dummy" ancestor context that will test for whether or not the
  // `SharedStateHook` has been executed within a component that has a
  // `SharedStateProvider` as an ancestor. We could use the `dataContext`
  // instead and check for value existence, but that would preclude consumers
  // from explicitly storing `null` or `undefined`.
  const ancestorContext = createContext<boolean>(false);

  // Create the context that's used to share state within instantiations of the
  // dynamically created `SharedStateProvider`.
  const dataContext = createContext<R>(Object.create(null) as R);

  /**
   * Dynamically created context provider which provides instances of the
   * supplied controller with instantiation parameters and sets state values in
   * the internally created context.
   *
   * @param hookArgs - Initial values to pass to the underlying provided `hook`.
   */
  const SharedStateProvider: React.FC<{ hookArgs?: P }> = ({
    children,
    hookArgs,
  }) => {
    const data: R = hook(...(hookArgs || []));

    return (
      <ancestorContext.Provider value={true}>
        <dataContext.Provider value={data}>{children}</dataContext.Provider>
      </ancestorContext.Provider>
    );
  };

  /**
   * A dynamically-created hook that yields the same data type as the originally
   * supplied `hook`, but with return values shared within the closest ancestor
   * `SharedStateProvider`.
   */
  const useSharedStateHook: () => R = () => {
    const isDescendant = useContext(ancestorContext);

    if (!isDescendant) {
      throw new Error(
        `Invocation of ${
          customHookName || 'shared state hook'
        } must be within the associated ${
          customProviderName || 'SharedStateProvider.'
        }`,
      );
    }

    return useContext(dataContext);
  };

  // If custom provider or hook names are specified, apply them.

  if (customProviderName) {
    Object.defineProperty(SharedStateProvider, 'name', {
      value: customProviderName,
    });
  }

  if (customHookName) {
    Object.defineProperty(useSharedStateHook, 'name', {
      value: customHookName,
    });
  }

  return {
    SharedStateProvider,
    useSharedStateHook,
  };
};
