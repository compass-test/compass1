import { HttpResponseError } from '../http-response-error';

export type ResponseIdle = {
  loading: false;
  data: undefined;
  error: undefined;
};

export type ResponseLoading = {
  loading: true;
  data: undefined;
  error: undefined;
};

type ResponseComplete<ResponseData> = {
  loading: false;
  data: ResponseData;
  error: undefined;
};

// requested fresh data, previous data still available
type ResponseStale<ResponseData> = {
  loading: true;
  data: ResponseData;
  error: undefined;
};

type ResponseError<RequestError> = {
  loading: false;
  data: undefined;
  error: RequestError;
};

export type ResponseState<ResponseData, RequestError> =
  | ResponseIdle
  | ResponseLoading
  | ResponseStale<ResponseData>
  | ResponseComplete<ResponseData>
  | ResponseError<RequestError>;

export type ServiceResult<
  ResponseData,
  RequestArgs extends unknown[] = [],
  RequestError = Error
> = ResponseState<ResponseData, RequestError> & {
  fetchData: (...requestArgs: RequestArgs) => Promise<ResponseData>;
};

export type FetchServiceResult<
  ResponseData,
  RequestError = Error | HttpResponseError
> = ResponseState<ResponseData, RequestError> & {
  refresh: () => Promise<ResponseData>;
};

export type UpdateServiceResult<
  ResponseData,
  RequestArgs extends unknown[] = [],
  RequestError = Error | HttpResponseError
> = ResponseState<ResponseData, RequestError> & {
  update: (...requestArgs: RequestArgs) => Promise<ResponseData>;
};

export type FetchOnDemandServiceResult<
  ResponseData,
  RequestArgs extends unknown[] = [],
  RequestError = Error | HttpResponseError
> = ResponseState<ResponseData, RequestError> & {
  fetch: (...requestArgs: RequestArgs) => Promise<ResponseData>;
};

export type CreateServiceResult<
  ResponseData,
  RequestArgs extends unknown[] = [],
  RequestError = Error | HttpResponseError
> = ResponseState<ResponseData, RequestError> & {
  create: (...requestArgs: RequestArgs) => Promise<ResponseData>;
};
