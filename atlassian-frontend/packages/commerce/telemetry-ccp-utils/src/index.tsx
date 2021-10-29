import { HttpResponseError } from '@atlassian/commerce-service-hook';
import {
  ProbabilityOfBug,
  Service,
  TaskCallbackFailureResult,
} from '@atlassian/commerce-telemetry';

export type GetTaskResultErrorType<T, ServiceType> =
  | TaskCallbackFailureResult<T, ServiceType>
  | undefined;

export const getTaskResultFromServiceError = <T extends unknown>(
  err: T,
): GetTaskResultErrorType<T, Service.UnknownServiceType> => {
  if (err instanceof HttpResponseError) {
    const isExternalBug = err.statusCode >= 500 && err.statusCode <= 599;

    return {
      fail: {
        payload: err,
        responsibleService: Service.UNKNOWN_EXTERNAL,
        loggablePayload: isExternalBug ? err : undefined,
        probabilityOfBug: isExternalBug
          ? ProbabilityOfBug.GUARANTEED
          : undefined,
      },
    };
  }

  return undefined;
};

export const getTaskResultFromResourceNotFoundError = <T extends unknown>(
  err: T,
): GetTaskResultErrorType<T, Service.UnknownServiceType> => {
  if (err instanceof HttpResponseError) {
    if (err.statusCode === 404) {
      return {
        fail: {
          payload: err,
          responsibleService: Service.UNKNOWN_EXTERNAL,
          loggablePayload: err,
          probabilityOfBug: ProbabilityOfBug.NONE,
        },
      };
    }
  }
  return undefined;
};
