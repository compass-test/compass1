import React, {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
} from 'react';

export type { Consumer, Provider } from 'react';

export type EventListenerCallback<E> = (event: E) => any;

export type ListenerInput<T> = {
  onEvent: EventListenerCallback<T>;
};
export type ListenerProps<T> = PropsWithChildren<ListenerInput<T>>;

export type Listener<T> = FC<ListenerProps<T>>;

export type UseEventDispatchHook<T> = () => EventListenerCallback<T>;

export type EventChannel<T> = {
  /**
   * Listens to the event payload passed down in the by the callback from {@link EventChannel.useEventDispatch}
   */
  Listener: Listener<T>;
  /**
   * A React hook that triggers an event on the closest parent {@link EventChannel.Listener}
   */
  useEventDispatch: UseEventDispatchHook<T>;
};

export type EventChannelFactory<T> = () => EventChannel<T>;

/**
 * Exactly the same as {@see createEventChannel} except that the Listener "catches"
 * the event. That is to say, you have to manually redispatch the event on the
 * same event channel if you want a Listener further up in the component hierachy to
 * also catch the event.
 */
export const createCatchingEventChannel = <T extends any>(
  defaultOnEventCallback: EventListenerCallback<T> | undefined = undefined,
) => {
  const context = createContext(defaultOnEventCallback);

  const useEventDispatch: UseEventDispatchHook<T> = () => {
    const onEventCallback = useContext(context);

    const fireEventCallback = useCallback(
      (event: T) => {
        onEventCallback?.(event);
      },
      [onEventCallback],
    );

    return fireEventCallback;
  };

  const EventCatcher: Listener<T> = ({ onEvent, children }) => (
    <context.Provider value={onEvent}>{children}</context.Provider>
  );

  return {
    Listener: EventCatcher,
    useEventDispatch,
  };
};

/**
 * Creates a {@link UseEventDispatchHook} you can dispatch events from and a {@link Listener} you can listen to those
 * events from.
 *
 * Note that dispatched events will be picked up ONLY by the dispatching component's closest parent.
 */
export const createEventChannel = <T extends any>(): EventChannel<T> => {
  const catchingEventChannel = createCatchingEventChannel<T>();

  const ListenerThatDoesntConsumeEvent = withRedispatch({
    from: catchingEventChannel.Listener,
    to: catchingEventChannel.useEventDispatch,
  });

  return {
    Listener: ListenerThatDoesntConsumeEvent,
    useEventDispatch: catchingEventChannel.useEventDispatch,
  };
};

export type EventTypeOfListener<T> = T extends Listener<infer K> ? K : never;

export type PropsOfListener<T> = ListenerProps<EventTypeOfListener<T>>;

type ItemFromArray<T> = T extends Array<infer K> ? K : never;

export type CombinedListener<
  ListenersValueType extends Listener<any>[] | Listener<any>
> = Listener<
  EventTypeOfListener<
    ListenersValueType extends any[]
      ? ItemFromArray<ListenersValueType>
      : ListenersValueType
  >
>;

export const combineListeners = <ListenersType extends Listener<any>[]>(
  ...listenersToCombine: ListenersType
): CombinedListener<ListenersType> => {
  const CombinedListener: CombinedListener<ListenersType> = ({
    children,
    onEvent,
  }) => {
    let wrappedChildren = children;

    for (const ListenerToCombine of listenersToCombine) {
      wrappedChildren = ListenerToCombine({
        onEvent,
        children: wrappedChildren,
      });
    }

    return <>{wrappedChildren}</>;
  };

  return CombinedListener;
};

export type TransformCallback<InputEventType, OutputEventType> = (
  originalPayload: InputEventType,
) => OutputEventType;
export type UseTransformerHook<
  TransformerProps,
  InputEventType,
  OutputEventType
> = (
  transformerProps: TransformerProps,
) => TransformCallback<InputEventType, OutputEventType>;
export type RedispatchObject<
  ListenerType extends Listener<any>,
  OutputEventType
> = {
  from: ListenerType | ListenerType[];
  to: UseEventDispatchHook<OutputEventType>;
};
export type TransformerObject<
  TransformerPropsType,
  ListenerType extends Listener<any>,
  OutputEventType
> = RedispatchObject<ListenerType, OutputEventType> & {
  useTransformer: UseTransformerHook<
    TransformerPropsType,
    EventTypeOfListener<ListenerType>,
    OutputEventType
  >;
};

/**
 * Create a React component that listens to one type of event, transforms it and then
 * dispatches the transformed payload as another event.
 *
 * @see {@link createEventChannel}
 */
export const createTransformer = <
  TransformerPropsType,
  ListenerType extends Listener<any>,
  OutputEventType
>({
  from: inboundListenerValue,
  to: useOutboundEventDispatch,
  useTransformer,
}: TransformerObject<TransformerPropsType, ListenerType, OutputEventType>) => {
  const InboundListener = Array.isArray(inboundListenerValue)
    ? combineListeners(...inboundListenerValue)
    : inboundListenerValue;

  const Transformer = ({
    children,
    ...transformerProps
  }: PropsWithChildren<TransformerPropsType>) => {
    const dispatchTransformedEvent = useOutboundEventDispatch();

    const transform = useTransformer(transformerProps as TransformerPropsType);

    const transformFn = useCallback(
      (payload: EventTypeOfListener<ListenerType>) => {
        const transformed = transform(payload);

        dispatchTransformedEvent(transformed);
      },
      [dispatchTransformedEvent, transform],
    );

    return <InboundListener onEvent={transformFn}>{children}</InboundListener>;
  };

  return Transformer;
};

/**
 * @returns A listener that redispatches the event to a given callback.
 * A very common usecase for this is if you want to allow multiple listeners to listen to the same
 * event in the parent tree from listening to events.
 */
export const withRedispatch = <ListenerType extends Listener<any>>({
  from,
  to,
}: RedispatchObject<
  ListenerType,
  EventTypeOfListener<ListenerType>
>): CombinedListener<typeof from> => {
  const ListenerThatDoesntConsumeEvent = createTransformer({
    from,
    to,
    useTransformer: ({
      onEvent,
    }: ListenerInput<EventTypeOfListener<ListenerType>>) =>
      useCallback(
        (payload: EventTypeOfListener<ListenerType>) => {
          onEvent(payload);
          return payload;
        },
        [onEvent],
      ),
  });

  return ListenerThatDoesntConsumeEvent;
};

export type FilterCallback<T> = (payload: T) => boolean;
/**
 * @param filter A callback that is called per caught event. If the callback returns false, onEvent won't be called.
 */
export const withFilter = <T extends any>(
  Listener: Listener<T>,
  filter: FilterCallback<T>,
) => {
  const FilteredListener = ({ onEvent, ...other }: ListenerProps<T>) => {
    const filteredOnEvent = useCallback(
      (eventPayload: T) => {
        if (filter(eventPayload)) {
          onEvent(eventPayload);
        }
      },
      [onEvent],
    );
    return Listener({ onEvent: filteredOnEvent, ...other });
  };

  return FilteredListener;
};

export type ComponentInput<T> = {
  Listener: Listener<T>;
  onEvent: EventListenerCallback<any>;
};

// TODO: Variadic types will make this type definition work properly
export const nestListeners = <T extends ComponentInput<any>[]>(
  children: React.ReactNode,
  components: T,
) => {
  let wrappedChildren = <>{children}</>;

  for (let i = components.length - 1; i >= 0; i--) {
    const { Listener, onEvent } = components[i];
    wrappedChildren = <Listener onEvent={onEvent}>{wrappedChildren}</Listener>;
  }

  return wrappedChildren;
};
