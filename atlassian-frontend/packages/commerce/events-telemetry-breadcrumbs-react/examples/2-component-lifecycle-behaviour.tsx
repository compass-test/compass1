import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

import { createBreadcrumbAPI } from '../src';

export const TOGGLE_UNMOUNT_EVENT_COMPONENT_TEST_ID =
  'toggle-unmount-event-component-button';

const { Breadcrumb, useGetBreadcrumbs } = createBreadcrumbAPI<
  Record<never, never>
>();

export const LogOnUnmountEvent = () => {
  const getBreadcrumbs = useGetBreadcrumbs();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => console.log(getBreadcrumbs?.());
  }, [getBreadcrumbs]);

  return <>Mounted with useEffect!</>;
};

export const LogOnLayoutUnmountEvent = () => {
  const getBreadcrumbs = useGetBreadcrumbs();

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => console.log(getBreadcrumbs?.());
  }, [getBreadcrumbs]);

  return <>Mounted with useLayoutEffect!</>;
};

const Example = () => {
  const [
    showNormalUseEffectOnUnmountComponent,
    setShowNormalUseEffectOnUnmountComponent,
  ] = useState<boolean>(true);

  const toggleLogOnUnmountEventComponent = useCallback(
    () => {
      setShowNormalUseEffectOnUnmountComponent(
        !showNormalUseEffectOnUnmountComponent,
      );
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [showNormalUseEffectOnUnmountComponent],
  );

  return (
    <Breadcrumb
      name={
        showNormalUseEffectOnUnmountComponent
          ? LogOnUnmountEvent.name
          : LogOnLayoutUnmountEvent.name
      }
    >
      <button
        onClick={toggleLogOnUnmountEventComponent}
        data-testid={TOGGLE_UNMOUNT_EVENT_COMPONENT_TEST_ID}
      >
        {showNormalUseEffectOnUnmountComponent
          ? 'Trigger "LogOnUnmountEvent"'
          : 'Trigger "LogOnLayoutUnmountEvent"'}
      </button>
      {showNormalUseEffectOnUnmountComponent ? (
        <LogOnUnmountEvent />
      ) : (
        <LogOnLayoutUnmountEvent />
      )}
    </Breadcrumb>
  );
};

export default Example;
