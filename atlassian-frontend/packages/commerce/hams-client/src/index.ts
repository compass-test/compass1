import {
  createErrorResult,
  createExceptionResult,
  createSuccessResult,
  Result,
} from '@atlassian/commerce-resultful';

export {
  isSuccessful,
  isFailure,
  isError,
  isException,
} from '@atlassian/commerce-resultful';

/**
 * A set of GET/POST/etc HTTP helpers that can generally be applied to all APIs in HAMS
 */
export type HamsError = {
  error: string;
  errorDetail: string;
  errorKey: string;
  uuid: string;
  /**
   * Sometimes it's more useful in HAMS to categorise errors via status code, in which case,
   * you can use this
   */
  status: number;
};

export type HamsResult<R> = Result<R, HamsError, Error>;

/**
 * Wrapper around the normal fetch client for GET calls to HAMS.
 */
export const get = async <R extends any>(
  fetch: typeof window.fetch,
  url: Parameters<typeof fetch>[0],
  options: Parameters<typeof fetch>[1] = {},
): Promise<HamsResult<R>> => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        Accept: 'application/json',
        ...options.headers,
      },
      method: 'GET',
    });

    if (response.status === 204) {
      // Note: We cast to R since not the caller knows whether it's possible to have an undefined 204. Might be worth refactoring
      return createSuccessResult(null as R);
    }

    const json = await response.json();
    if (response.ok) {
      return createSuccessResult({
        ...json,
        status: response.status,
      });
    } else {
      return createErrorResult(json);
    }
  } catch (err) {
    return createExceptionResult(err);
  }
};
