import { useCallback, useEffect, useState } from 'react';

export interface ServiceState<T> {
  loading: boolean;
  error?: Error;
  data?: T;
}

export interface FetchableServiceState<T> extends ServiceState<T> {
  fetchData: () => Promise<void>;
}

export const useService = <T>(
  request: () => Promise<T>,
  initialState = {},
  onCompleted?: (data: T) => void,
): FetchableServiceState<T> => {
  const [state, setState] = useState<ServiceState<T>>({
    loading: false,
    error: undefined,
    data: undefined,
    ...initialState,
  });

  const fetchData = useCallback(async () => {
    setState({
      loading: true,
      error: undefined,
      data: undefined,
    });

    try {
      const data = await request();
      if (onCompleted) {
        onCompleted(data);
      }
      setState({
        loading: false,
        error: undefined,
        data,
      });
    } catch (error) {
      setState({
        loading: false,
        error,
        data: undefined,
      });
    }
  }, [request, onCompleted]);

  return { ...state, fetchData };
};

export const useGetRequestState = <T>(
  request: () => Promise<T>,
): ServiceState<T> => {
  const [state, setState] = useState<ServiceState<T>>({
    loading: true,
  });

  useEffect(() => {
    request()
      .then((data) =>
        setState({
          loading: false,
          data,
        }),
      )
      .catch((error) =>
        setState({
          loading: false,
          error,
        }),
      );
  }, [request]);

  return state;
};
