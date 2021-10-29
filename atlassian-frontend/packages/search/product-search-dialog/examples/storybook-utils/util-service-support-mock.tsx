import {
  utils as realUtils,
  RequestServiceOptions as RealRequestServiceOptions,
  ServiceConfig as RealServiceConfig,
} from '@atlaskit/util-service-support';

export type RequestServiceOptions = RealRequestServiceOptions;
export type ServiceConfig = RealServiceConfig;

type Interceptor<T> = (
  config: ServiceConfig,
  options?: RequestServiceOptions,
) => Promise<T> | null;

interface UtilsInterface {
  requestService: <T>(
    serviceConfig: ServiceConfig,
    options?: RequestServiceOptions,
  ) => Promise<T>;

  // Used for testing to intercept certain calls. The first interceptor to return a `Promise` will intercept
  // the request.
  intercept: <T>(interceptor: Interceptor<T>) => void;

  // Removes all mocks
  restore: () => void;
}

const interceptors: Interceptor<any>[] = [];

export const utils: UtilsInterface = {
  requestService: (serviceConfig, options) => {
    for (let i = 0; i < interceptors.length; i++) {
      const result = interceptors[i](serviceConfig, options);
      if (result && result instanceof Promise) {
        return result;
      }
    }

    return realUtils.requestService(serviceConfig, options);
  },

  intercept: function <T>(interceptor: Interceptor<T>) {
    interceptors.push(interceptor);
  },

  restore: () => {
    // Mutates the array and clears it
    interceptors.splice(0, interceptors.length);
  },
};
