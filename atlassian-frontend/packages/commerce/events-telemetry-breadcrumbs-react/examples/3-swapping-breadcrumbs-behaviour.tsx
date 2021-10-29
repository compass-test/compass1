import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

import { createBreadcrumbAPI } from '../src';

export const TOGGLE_UNMOUNT_EVENT_COMPONENT_TEST_ID =
  'toggle-unmount-event-component-button';
export const TOGGLE_BREADCRUMB_COMPONENT_TEST_ID =
  'toggle-breadcrumb-component-button';

const {
  Breadcrumb,
  useGetBreadcrumbs,
  breadcrumbMountedEventChannel: { Listener },
} = createBreadcrumbAPI<Record<never, never>>();

export const LogOnUnmountEvent = () => {
  const getBreadcrumbs = useGetBreadcrumbs();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => console.log('unmount event', getBreadcrumbs?.());
  }, [getBreadcrumbs]);

  return <>Mounted with useEffect!</>;
};

export const LogOnLayoutUnmountEvent = () => {
  const getBreadcrumbs = useGetBreadcrumbs();

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => console.log('unmount event', getBreadcrumbs?.());
  }, [getBreadcrumbs]);

  return <>Mounted with useLayoutEffect!</>;
};

const BreadcrumbSwapper = () => {
  const [
    showNormalUseEffectOnUnmountComponent,
    setShowNormalUseEffectOnUnmountComponent,
  ] = useState<boolean>(true);

  const [showBreadcrumb1, setShowBreadcrumb1] = useState<boolean>(true);

  const toggleLogOnUnmountEventComponent = useCallback(() => {
    setShowNormalUseEffectOnUnmountComponent(
      !showNormalUseEffectOnUnmountComponent,
    );
  }, [showNormalUseEffectOnUnmountComponent]);

  const toggleOuterBreadcrumb = useCallback(() => {
    setShowBreadcrumb1(!showBreadcrumb1);
  }, [showBreadcrumb1]);

  const subChildren = (
    <>
      <div>
        <button
          onClick={toggleLogOnUnmountEventComponent}
          data-testid={TOGGLE_UNMOUNT_EVENT_COMPONENT_TEST_ID}
        >
          {showNormalUseEffectOnUnmountComponent
            ? 'Trigger useEffect unmount event'
            : 'Trigger useLayoutEffect unmount event'}
        </button>
      </div>
      <div>
        <button
          onClick={toggleOuterBreadcrumb}
          data-testid={TOGGLE_BREADCRUMB_COMPONENT_TEST_ID}
        >
          {showBreadcrumb1
            ? 'Change to breadcrumb component 2'
            : 'Change to breadcrumb component 1'}
        </button>
      </div>
      {showNormalUseEffectOnUnmountComponent ? (
        <LogOnUnmountEvent />
      ) : (
        <LogOnLayoutUnmountEvent />
      )}
    </>
  );

  const children = showBreadcrumb1 ? (
    <Breadcrumb name={LogOnUnmountEvent.name}>{subChildren}</Breadcrumb>
  ) : (
    <Breadcrumb name={LogOnLayoutUnmountEvent.name}>{subChildren}</Breadcrumb>
  );

  return children;
};

const Example = () => (
  <Listener
    onEvent={(breadcrumb) => console.log('new breadcrumb mounted', breadcrumb)}
  >
    <BreadcrumbSwapper />
  </Listener>
);

export default Example;
