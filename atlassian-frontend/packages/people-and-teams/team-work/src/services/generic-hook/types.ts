export type ServiceResult<TData> = {
  loading: boolean;
  error?: Error;
  data?: TData;
};

export type ServiceFn<TData = unknown> = (
  request: () => Promise<Response>,
  initialState?: Partial<ServiceResult<TData>>,
) => ServiceResult<TData>;
