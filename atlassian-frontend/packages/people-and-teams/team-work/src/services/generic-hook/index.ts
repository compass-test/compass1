import { useCallback, useEffect, useRef, useState } from 'react';

import type { ServiceFn, ServiceResult } from './types';
export type { ServiceResult, ServiceFn };

export const useLazyService = <TData>(
  ...[request, initialState]: Parameters<ServiceFn<TData>>
): [() => Promise<void>, ServiceResult<TData>] => {
  const [state, setState] = useState<ServiceResult<TData>>({
    loading: false,
    error: undefined,
    data: undefined,
    ...(initialState || {}),
  });

  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const getData = useCallback(async () => {
    setState((s) => ({
      ...s,
      loading: true,
    }));

    try {
      const response = await request();
      const data = await response.json();
      if (mounted.current) {
        setState((s) => ({
          loading: false,
          data,
        }));
      }
    } catch (error) {
      if (mounted.current) {
        setState((s) => ({
          loading: false,
          error: error as Error,
        }));
      }
    }
  }, [request]);

  return [getData, state];
};

export const useService = <TData>(
  ...[request, initialState]: Parameters<ServiceFn<TData>>
): ReturnType<ServiceFn<TData>> => {
  const [getData, state] = useLazyService<TData>(request, {
    loading: true,
    ...(initialState || {}),
  });

  useEffect(() => {
    getData();
  }, [getData]);

  return state;
};

export default useService;
