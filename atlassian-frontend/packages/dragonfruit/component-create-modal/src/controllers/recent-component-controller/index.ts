import { useCallback, useRef, useState } from 'react';

import { CompassComponentType } from '@atlassian/dragonfruit-graphql';
import { withContext } from '@atlassian/dragonfruit-utils';

export interface LocalComponent {
  id: string;
  type: CompassComponentType;
  name: string;
  description?: string | null;
  ownerId?: string;
  ownerName?: string;
}

const useRecentComponentControllerInternal: (
  initialComponents?: LocalComponent[],
) => [
  { localComponents: LocalComponent[]; highlightedComponents: number },
  {
    addComponent: (component: LocalComponent) => void;
    removeComponent: (componentId: string) => void;
    clearComponents: () => void;
  },
] = (initialComponents) => {
  const [highlightedComponents, setHighlightedComponents] = useState(0);
  const [localComponents, setLocalComponents] = useState<LocalComponent[]>(
    initialComponents || [],
  );

  // useRef here is used to get the most recent version of highlightedComponents even if there are
  // changes between when setTimeout is called and the timeout expires
  // (i.e. another component is added or the highlight expires on another component).
  // This allows highlightedComponents to work with multiple setTimeout invocations simultaneously.
  const highlightedComponentsRef = useRef(highlightedComponents);

  const addComponent = useCallback(
    (component: LocalComponent) => {
      setLocalComponents((current) => current.concat(component));
      setHighlightedComponents(highlightedComponentsRef.current + 1);
      highlightedComponentsRef.current = highlightedComponentsRef.current + 1;
      setTimeout(() => {
        setHighlightedComponents(highlightedComponentsRef.current - 1);
        highlightedComponentsRef.current = highlightedComponentsRef.current - 1;
      }, 4000);
    },
    [setLocalComponents, highlightedComponentsRef, setHighlightedComponents],
  );

  const removeComponent = useCallback(
    (componentId: string) => {
      setLocalComponents((current) =>
        current.filter((component) => component.id !== componentId),
      );
    },
    [setLocalComponents],
  );

  const clearComponents = useCallback(() => {
    setLocalComponents([]);
  }, [setLocalComponents]);

  return [
    {
      localComponents,
      highlightedComponents,
    },
    {
      addComponent,
      removeComponent,
      clearComponents,
    },
  ];
};

export const {
  SharedStateProvider: RecentComponentsProvider,
  useSharedStateHook: useRecentComponents,
} = withContext(useRecentComponentControllerInternal, {
  provider: 'RecentComponentsProvider',
  hook: 'useRecentComponents',
});
