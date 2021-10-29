import { useCallback, useEffect, useRef, useState } from 'react';

interface FetchStatus<Data, E = Error> {
  loading?: boolean;
  error?: E;
  data?: Data;
}

export interface UseServiceData<Data, E = Error> extends FetchStatus<Data, E> {
  fetchData: () => Promise<any>;
}

/*
  The idea is to keep useService() simple, just as a way to reuse code for simple services.
  As soon as we find ourselves in a situation we're re-implementing Apollo (adding caching layers, prevent multi-fetching etc), we can probably just use Apollo and compose useService into useQuery.

  This service should not auto-fetch. Component where this service is used can do it easily by calling fetch() in its componentDidMount(). This way this hook is more flexible and lets consumers decide what to do
  In case service gets more complex - consider using useReducer()
*/
export const useService = <Data, E extends Error = Error>(
  request: () => Promise<Data>,
  initialState: FetchStatus<Data, E> = {},
): UseServiceData<Data, E> => {
  const [state, setStateRaw] = useState<FetchStatus<Data, E>>({
    loading: false,
    ...initialState,
  });

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  });

  const setState = useCallback((state: FetchStatus<Data, E>) => {
    if (isMounted.current) {
      setStateRaw(state);
    }
  }, []);

  const fetchData = useCallback(async () => {
    setState({
      loading: true,
      error: undefined,
      data: undefined,
    });

    try {
      const data: Data = await request();

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
  }, [request, setState]);

  return { ...state, fetchData };
};
