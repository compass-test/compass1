import { useCallback, useState } from 'react';

interface FetchStatus {
  loading?: boolean;
  error?: Error;
  data?: any;
}

export interface UseServiceData extends FetchStatus {
  fetchData: () => Promise<any>;
}

/*
  The idea is to keep useService() simple, just as a way to reuse code for simple services.
  As soon as we find ourselves in a situation we're re-implementing Apollo (adding caching layers, prevent multi-fetching etc), we can probably just use Apollo and compose useService into useQuery.

  This service should not auto-fetch. Component where this service is used can do it easily by calling fetch() in its componentDidMount(). This way this hook is more flexible and lets consumers decide what to do
  In case service gets more complex - consider using useReducer()
*/
export const useService = <Data>(
  request: () => Promise<Data>,
  initialState: FetchStatus = {},
): UseServiceData => {
  const [state, setState] = useState<FetchStatus>({
    loading: false,
    ...initialState,
  });

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
  }, [request]);

  return { ...state, fetchData };
};
