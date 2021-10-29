import { useCallback, useState } from 'react';

import { LoadingState } from '../../common/types';
import { useLogger } from '../../common/utils/logger';

export const useFetchService = <T, S extends any[]>(
  request: (...args: S) => Promise<T>,
  initialData: T,
  source: string,
) => {
  const logger = useLogger();
  const [state, setState] = useState<{
    error: undefined | Error | any;
    data: T;
    lastCallTimestamp: undefined | number;
    loadingState: LoadingState;
  }>({
    error: undefined,
    data: initialData,
    lastCallTimestamp: undefined,
    loadingState: LoadingState.INITIAL,
  });

  const fetchData = useCallback(
    async (...args: S) => {
      setState((previousState) => ({
        ...previousState,
        loadingState: LoadingState.LOADING,
        error: undefined,
        lastCallTimestamp: Date.now(),
      }));

      try {
        const data = await request(...args);
        setState((previousState) => ({
          ...previousState,
          loadingState: LoadingState.COMPLETE,
          error: undefined,
          data,
        }));
        return data;
      } catch (error) {
        logger?.captureException(error, { source });
        setState((previousState) => ({
          ...previousState,
          loadingState: LoadingState.ERROR,
          error,
        }));
      }
    },
    [request, logger, source],
  );

  return { ...state, fetchData };
};
