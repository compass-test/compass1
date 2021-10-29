// eslint-disable-next-line import/no-extraneous-dependencies
import { useCallback, useEffect, useMemo, useState } from 'react';

import { HttpResponseError } from '../http-response-error';

import {
  CreateServiceResult,
  FetchOnDemandServiceResult,
  FetchServiceResult,
  ResponseState,
  ServiceResult,
  UpdateServiceResult,
} from './types';

export const useService = <
  ResponseData,
  RequestArgs extends unknown[] = [],
  ServiceError = Error
>(
  request: (...requestArgs: RequestArgs) => Promise<ResponseData>,
  initialState: ResponseState<ResponseData, ServiceError> = {
    loading: false,
    data: undefined,
    error: undefined,
  },
): ServiceResult<ResponseData, RequestArgs, ServiceError> => {
  const [state, setState] = useState<ResponseState<ResponseData, ServiceError>>(
    initialState,
  );
  const fetchData = useCallback(
    async (...requestArgs: RequestArgs) => {
      setState({ loading: true, data: undefined, error: undefined });

      try {
        const data = await request(...requestArgs);
        setState({ loading: false, data, error: undefined });
        return data;
      } catch (error) {
        // Casting promise error to provided type. I assumes that the person that
        // provides types know that kind of type promise will return on reject.
        setState({
          loading: false,
          data: undefined,
          error: error as ServiceError,
        });
        throw error;
      }
    },
    [request],
  );

  return useMemo(() => ({ ...state, fetchData }), [state, fetchData]);
};

export const useFetchService = <
  ResponseData,
  ServiceError = Error | HttpResponseError
>(
  request: () => Promise<ResponseData>,
): FetchServiceResult<ResponseData, ServiceError> => {
  const service = useService<ResponseData, [], ServiceError>(request, {
    loading: true,
    data: undefined,
    error: undefined,
  });

  const { fetchData } = service;

  useEffect(() => {
    // on error promise will be resolved to undefined, error instance available in state
    // eslint-disable-next-line no-console
    fetchData().catch((error) => console.warn(error));
  }, [fetchData]);

  return useMemo(() => {
    const { fetchData, ...state } = service;
    return {
      ...state,
      refresh: () => fetchData(),
    };
  }, [service]);
};

export const useUpdateService = <
  ResponseData,
  RequestArgs extends unknown[] = [],
  ServiceError = Error | HttpResponseError
>(
  request: (...requestArgs: RequestArgs) => Promise<ResponseData>,
): UpdateServiceResult<ResponseData, RequestArgs, ServiceError> => {
  const service = useService<ResponseData, RequestArgs, ServiceError>(request, {
    loading: false,
    data: undefined,
    error: undefined,
  });

  return useMemo(() => {
    const { fetchData, ...state } = service;
    return { ...state, update: fetchData };
  }, [service]);
};

export const useFetchOnDemandService = <
  ResponseData,
  RequestArgs extends unknown[] = [],
  ServiceError = Error | HttpResponseError
>(
  request: (...requestArgs: RequestArgs) => Promise<ResponseData>,
): FetchOnDemandServiceResult<ResponseData, RequestArgs, ServiceError> => {
  const service = useUpdateService<ResponseData, RequestArgs, ServiceError>(
    request,
  );

  return useMemo(() => {
    const { update, ...state } = service;
    return { ...state, fetch: update };
  }, [service]);
};

export const useCreateService = <
  ResponseData,
  RequestArgs extends unknown[] = [],
  ServiceError = Error | HttpResponseError
>(
  request: (...requestArgs: RequestArgs) => Promise<ResponseData>,
): CreateServiceResult<ResponseData, RequestArgs, ServiceError> => {
  const service = useService<ResponseData, RequestArgs, ServiceError>(request);

  return useMemo(() => {
    const { fetchData, ...state } = service;
    return { ...state, create: fetchData };
  }, [service]);
};
