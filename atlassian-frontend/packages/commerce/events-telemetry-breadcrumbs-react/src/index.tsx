import React, {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';

import {
  createEventChannel,
  EventChannel,
  EventChannelFactory,
  Listener,
  UseEventDispatchHook,
} from '@atlassian/commerce-events-core-react';

export type BreadcrumbName = string | symbol;

export type BreadcrumbPayload<T> = {
  name: BreadcrumbName;
} & Omit<T, 'name'>;
export type BreadcrumbedPayload<T, B> = {
  breadcrumbs: BreadcrumbPayloads<B>;
  payload: T;
};
export type BreadcrumbPayloads<T> = BreadcrumbPayload<T>[];
export type BreadcrumbMountedPayload<T> = BreadcrumbedPayload<
  BreadcrumbPayload<T>,
  T
>;

export type BreadcrumbProps<T> = PropsWithChildren<BreadcrumbPayload<T>>;
export type BreadcrumbComponent<T> = FC<BreadcrumbProps<T>>;

export type BreadcrumbMountedListenerComponent<T> = Listener<
  BreadcrumbMountedPayload<T>
>;

export type BreadcrumbContextCallback<T> = () =>
  | BreadcrumbMountedPayload<T>
  | undefined;
export type UseGetBreadcrumbsHook<T> = () => BreadcrumbContextCallback<T>;

const emptyObject = {};

export type BreadcrumbMountedEventChannel<T> = EventChannel<
  BreadcrumbMountedPayload<T>
>;
export type BreadcrumbAPI<T> = {
  /**
   * This event channel will fire whenever a Breadcrumb is mounted OR the name of that breadcrumb changes.
   */
  breadcrumbMountedEventChannel: BreadcrumbMountedEventChannel<T>;
  Breadcrumb: BreadcrumbComponent<T>;
  useGetBreadcrumbs: UseGetBreadcrumbsHook<T>;
};
export const createBreadcrumbAPI = <
  T extends Record<any, any>
>(): BreadcrumbAPI<T> => {
  const context = createContext<BreadcrumbContextCallback<T>>(() => undefined);
  const useGetBreadcrumbs: UseGetBreadcrumbsHook<T> = () => useContext(context);

  const breadcrumbMountedEventChannel = createEventChannel<
    BreadcrumbMountedPayload<T>
  >();
  const { useEventDispatch } = breadcrumbMountedEventChannel;

  const EmitEventOnMount = ({
    name,
    getMountedBreadcrumbPayload,
  }: {
    name: string | symbol;
    getMountedBreadcrumbPayload: () => BreadcrumbMountedPayload<T>;
  }) => {
    const eventDispatch = useEventDispatch();
    useEffect(
      () => {
        // Should always be defined at this point.
        eventDispatch(getMountedBreadcrumbPayload()!);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [name],
    );
    return null;
  };

  const Breadcrumb = ({
    children,
    ...breadcrumbPayload
  }: BreadcrumbProps<T>) => {
    const getParentBreadcrumbs = useGetBreadcrumbs();

    // TODO: Type inference doesn't seem to understand that children and name are never a part of breadcrumbPayload. Investigate and fix.
    const castBreadcrumbPayload = breadcrumbPayload as BreadcrumbPayload<T>;

    // Prevents breadcrumb callback from being recreated everytime props change/every-render
    const breadcrumbRef = useRef<BreadcrumbPayload<T>>(castBreadcrumbPayload);
    useLayoutEffect(() => {
      // Ensures that the breadcrumb only updates when it component is mounted
      breadcrumbRef.current = castBreadcrumbPayload;
    });

    // TODO: Memoize this in the future?
    const getMountedBreadcrumbPayload = useCallback(
      (): BreadcrumbMountedPayload<T> => ({
        breadcrumbs: [
          ...(getParentBreadcrumbs()?.breadcrumbs ?? []),
          breadcrumbRef.current,
        ],
        payload: breadcrumbRef.current,
      }),
      [getParentBreadcrumbs],
    );

    return (
      <>
        <EmitEventOnMount
          name={breadcrumbPayload.name}
          getMountedBreadcrumbPayload={getMountedBreadcrumbPayload}
        />
        <context.Provider value={getMountedBreadcrumbPayload}>
          {children}
        </context.Provider>
      </>
    );
  };

  return {
    /**
     * An event channel whos event represents that a breadcrumb was mounted
     */
    breadcrumbMountedEventChannel,
    Breadcrumb,
    useGetBreadcrumbs,
  };
};

export type BreadcrumbedListener<T, B> = Listener<BreadcrumbedPayload<T, B>>;
export type BreadcrumbedEventChannel<T, B> = EventChannel<
  BreadcrumbedPayload<T, B>
> & {
  Listener: BreadcrumbedListener<T, B>;
  useEventDispatch: UseEventDispatchHook<BreadcrumbedPayload<T, B>>;
  useBreadcrumbedEventDispatch: UseEventDispatchHook<T>;
};
export type CreateBreadcrumbedEventChannelFn = {
  <T, B>(
    breadcrumbAPI: Pick<BreadcrumbAPI<B>, 'useGetBreadcrumbs'>,
  ): BreadcrumbedEventChannel<T, B>;
  <T, B>(
    breadcrumbAPI: Pick<BreadcrumbAPI<B>, 'useGetBreadcrumbs'>,
    createEventChannelFn: EventChannelFactory<T>,
  ): BreadcrumbedEventChannel<T, B>;
};
export const createBreadcrumbedEventChannel: CreateBreadcrumbedEventChannelFn = <
  T,
  B
>(
  { useGetBreadcrumbs }: Pick<BreadcrumbAPI<B>, 'useGetBreadcrumbs'>,
  createEventChannelFn: EventChannelFactory<
    BreadcrumbedPayload<T, B>
  > = createEventChannel,
): BreadcrumbedEventChannel<T, B> => {
  const { Listener, useEventDispatch } = createEventChannelFn();

  const useBreadcrumbedEventDispatch: UseEventDispatchHook<T> = () => {
    const eventDispatch = useEventDispatch();
    const getParentBreadcrumbs = useGetBreadcrumbs();

    const breadcrumbedEventDispatch = useCallback(
      (payload: T) =>
        eventDispatch({
          breadcrumbs: getParentBreadcrumbs()?.breadcrumbs ?? [],
          payload,
        }),
      [getParentBreadcrumbs, eventDispatch],
    );

    return breadcrumbedEventDispatch;
  };

  return {
    Listener,
    useEventDispatch,
    useBreadcrumbedEventDispatch,
  };
};

/**
 * Wraps your component with a {@link BreadcrumbComponent}
 */
export const withBreadcrumb = <ComponentPropsType, BreadcrumbFields>(
  Component: FC<ComponentPropsType>,
  Breadcrumb: BreadcrumbComponent<BreadcrumbFields>,
  name: string,
  // TODO: Fix up this type
  breadcrumbFields: BreadcrumbFields = emptyObject as any,
) => {
  const ComponentWithBreadcrumb = (props: ComponentPropsType) => (
    <Breadcrumb {...breadcrumbFields} name={name}>
      <Component {...props} />
    </Breadcrumb>
  );

  return ComponentWithBreadcrumb;
};
