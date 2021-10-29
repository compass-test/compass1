import React, {
  createContext,
  FC,
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';

import { EventChannel } from '@atlassian/commerce-events-core-react';

const DEFAULT_START_TIME_THAT_SHOULDNT_BE_USED = Number.NaN;

type TimingRecorderContextData = {
  setStartTime: (time: number) => any;
  startTimeState: MutableRefObject<number>;
};

export const createTimingChannel = () => {
  const startTimeStateContext = createContext<
    TimingRecorderContextData | undefined
  >(undefined);

  /**
   * Records the "start time" of whatever you're timing once this component rendered.
   */
  const StartTimeRecorder = () => {
    const startTimeState = useContext(startTimeStateContext);
    if (startTimeState === undefined) {
      throw new Error(
        `Location where ${StartTimeRecorder.name} was rendered was not wrapped in a ${StartTimeProvider.name}`,
      );
    }

    const { setStartTime } = startTimeState;

    useEffect(() => {
      setStartTime(Date.now());
    }, [setStartTime]);

    return null;
  };

  /**
   * Declare this around all the components that will need to retrieve the start time of
   * whatever you're timing
   */
  const StartTimeProvider: FC = ({ children }) => {
    const startTimeState = useRef(DEFAULT_START_TIME_THAT_SHOULDNT_BE_USED);

    const setStartTime = useCallback((time: number) => {
      startTimeState.current = time;
    }, []);

    return (
      <startTimeStateContext.Provider
        value={{
          startTimeState,
          setStartTime,
        }}
      >
        {children}
      </startTimeStateContext.Provider>
    );
  };

  /**
   * Gets the start time from the nearest parent start time provider
   */
  const useStartTimeRef = () => {
    const startTimeContextValue = useContext(startTimeStateContext);
    if (startTimeContextValue === undefined) {
      throw new Error(
        `Location where ${useStartTimeRef.name} was called was not wrapped in a ${StartTimeProvider.name}`,
      );
    }
    return startTimeContextValue.startTimeState;
  };

  return {
    StartTimeProvider,
    StartTimeRecorder,
    useStartTimeRef,
  };
};

export type TimingChannelType = ReturnType<typeof createTimingChannel>;
export type UseStartTimeRefType = TimingChannelType['useStartTimeRef'];

export type RequiredEventChannelFields = Pick<
  EventChannel<number>,
  'useEventDispatch'
>;

export type TimingData<T> = {
  duration: number;
  timedPayload: T;
};

export const useTimeSinceStartEventDispatch = (
  useStartTimeRef: UseStartTimeRefType,
  { useEventDispatch }: RequiredEventChannelFields,
) => {
  const startTimeRef = useStartTimeRef();
  const eventDispatch = useEventDispatch();

  const wrappedEventDispatch = useCallback(() => {
    eventDispatch(Date.now() - startTimeRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventDispatch]);

  return wrappedEventDispatch;
};

/**
 * Measures the time it took for a synchronous method to complete
 */
export const timeDurationSync = <T extends any>(
  callback: () => T,
): TimingData<T> => {
  const startTime = performance.now();
  const timedPayload = callback();
  const endTime = performance.now();

  const duration = endTime - startTime;

  return {
    timedPayload,
    duration,
  };
};

/**
 * Measures the time between executing a method and resolving the promise resolved
 * from that method
 */
export const timeDuration = async <T extends any>(
  callback: () => Promise<T>,
): Promise<TimingData<T>> => {
  const startTime = Date.now();
  const timedPayload = await callback();
  const endTime = Date.now();

  const duration = endTime - startTime;

  return {
    timedPayload,
    duration,
  };
};
