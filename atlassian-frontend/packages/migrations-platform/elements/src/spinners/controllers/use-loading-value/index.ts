import { useEffect, useState } from 'react';

export const loadingStatusDelay = 150;
const pastValues = new WeakMap();

type ValueStatus = 'loading' | 'loaded' | 'stale';
type ValueState<Value> = {
  status: ValueStatus;
  value: Value;
};

/**
 * Manages the state of an async value that needs to be
 * reloaded on every mount, but is not likely to change.
 *
 * For new instances, it first returns cache value from
 * previous instances on this provider with 'state' ValueStatus
 *
 * When provider is faster to respond than 150ms,
 * then status will always be 'loaded' no matter what,
 * as this response time is considered instanteneous for the user.
 */
const useLoadingValue = <Value>(
  provider: () => Promise<Value>,
): [Value, ValueStatus] => {
  const initialState: ValueState<Value> = {
    value: pastValues.has(provider) ? pastValues.get(provider) : undefined,
    // Until delay has not passed, value is returned as loaded for fast responses
    status: 'loaded',
  };
  const [{ value, status }, setState] = useState<ValueState<Value>>(
    initialState,
  );

  useEffect(() => {
    // After the delay, we can start notifying of loading status
    const timeoutId = setTimeout(() => {
      setState({
        value: initialState.value,
        status: initialState.value ? 'stale' : 'loading',
      });
    }, loadingStatusDelay);

    // Call provider to load data
    provider().then((result) => {
      clearTimeout(timeoutId);
      setState({ value: result, status: 'loaded' });
      pastValues.set(provider, result);
    });

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);

  return [value, status];
};

export default useLoadingValue;
