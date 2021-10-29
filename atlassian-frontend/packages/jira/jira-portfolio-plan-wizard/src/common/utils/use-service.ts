import { useCallback, useEffect, useRef, useState } from 'react';

type ResponseIdle = {
  loading: false;
  data: undefined;
  error: undefined;
};

type ResponseLoading<T> = {
  loading: true;
  data: T | undefined;
  error: undefined;
};

type ResponseComplete<T> = {
  loading: false;
  data: T;
  error: undefined;
};

type ResponseError<E> = {
  loading: false;
  data: undefined;
  error: E;
};

export type ResponseState<T, E = Error> =
  | ResponseIdle
  | ResponseLoading<T>
  | ResponseComplete<T>
  | ResponseError<E>;

export type ServiceResult<T, R extends any[]> = ResponseState<T> & {
  fetchData: (...requestData: R) => Promise<void>;
};

export const useService = <T, R extends any[]>(
  request: (...requestData: R) => Promise<T>,
  initialState: ResponseState<T>,
): ServiceResult<T, R> => {
  const [state, setState] = useState<ResponseState<T>>(initialState);
  const flagRef = useRef(0);

  const fetchData = useCallback(
    async (...requestData: R) => {
      const flag = (flagRef.current = Math.random());
      setState((state) => ({ ...state, loading: true, error: undefined }));
      try {
        const data = await request(...requestData);
        if (flagRef.current !== flag) {
          // There is another fetchData() in the meantime, so we do not need to handle the response.
          return;
        }

        setState({ loading: false, data, error: undefined });
      } catch (e) {
        // Satsify CI and IDE tslint
        const error = (e || new Error('Unknown Error')) as Error;
        // Bypass the error if the request are manually aborted.
        if (error?.name === 'AbortError') {
          return;
        }
        setState({ loading: false, data: undefined, error });
      }
    },
    [request],
  );

  return { ...state, fetchData };
};

export type FetchServiceResult<T> = ResponseState<T> & {
  refresh: () => void;
};

export const useFetchService = <T>(
  request: () => Promise<T>,
): FetchServiceResult<T> => {
  const { fetchData, ...state } = useService<T, []>(request, {
    loading: true,
    data: undefined,
    error: undefined,
  });

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, refresh: () => fetchData() };
};

export type MutationServiceResult<T, U extends any[] = [T]> = ResponseState<
  T
> & {
  exec: (...data: U) => Promise<void>;
};

export const useMutationService = <T, U extends any[] = [T]>(
  request: (...requestData: U) => Promise<T>,
): MutationServiceResult<T, U> => {
  const { fetchData, ...state } = useService(request, {
    loading: false,
    data: undefined,
    error: undefined,
  });
  return { ...state, exec: fetchData };
};
