import {
  CLIENT_ERROR_CODE,
  CLIENT_ERROR_MESSAGE,
  CLIENT_ERROR_STATUS,
} from './constants';
import { wait } from './wait';

type HttpRetryPolicyOptions = {
  maxAttempts?: number;
  backoffTimeMs?: number;
  rateLimitBackoffTimeMs?: number;
};

export type FetchItemsWithCursorSuccessResult<ITEM> = {
  ok: true;
  items: ITEM[];
  pages: number;
};

export type FetchItemsWithCursorErrorResult = {
  ok: false;
  aborted: false;
  page: number;
  status: number;
  code: string;
  message: string;
};

export type FetchItemsWithCursorAbortedResult = {
  ok: false;
  aborted: true;
};

export type FetchItemsWithCursorResult<ITEM> =
  | FetchItemsWithCursorSuccessResult<ITEM>
  | FetchItemsWithCursorErrorResult
  | FetchItemsWithCursorAbortedResult;

export type RequestSuccessResult<RESULT> = {
  ok: true;
  result: RESULT;
};

export type RequestFailureResult = {
  ok: false;
  aborted: false;
  status: number;
  code: string;
  message: string;
};

export type RequestAbortedResult = {
  ok: false;
  aborted: true;
};

export type RequestResult<RESULT> =
  | RequestSuccessResult<RESULT>
  | RequestFailureResult
  | RequestAbortedResult;

export type CanRetry = (
  status: number,
  attempts: number,
  signal?: AbortSignal,
) => [boolean, number];

function defaultErrorMapper(response: Response) {
  return Promise.resolve({
    code: response.status.toString(),
    message: response.statusText,
  });
}

function defaultResultMapper<RESULT>(response: Response) {
  return response.json() as Promise<RESULT>;
}

type FetchItemsWithCursorArgs<RESPONSE, ITEM> = {
  url: string;
  queryParams?: Record<string, string>;
  signal?: AbortSignal;
  getItems: (response: RESPONSE) => ITEM[];
  getCursor: (response: RESPONSE) => string | undefined;
  mapError?: (response: Response) => Promise<{ code: string; message: string }>;
  canRetryCheck?: CanRetry;
};

/**
 * Fetch a paginated list of items using a cursor.
 *
 * Assumption: Requests have an optional <code>cursor</code> parameter which is
 * set to the value of <code>getCursor</code> as applied to the previous
 * request’s response.
 *
 * @param url           - request URL
 * @param options       - request options
 * @param getItems      - extract items from a response
 * @param getCursor     - extract the cursor from the response
 * @param canRetry      - retry predicate
 * @param mapError      - error mapper
 */
export async function fetchItemsWithCursor<RESPONSE, ITEM>({
  url,
  queryParams = {},
  signal,
  getItems,
  getCursor,
  canRetryCheck,
  mapError = defaultErrorMapper,
}: FetchItemsWithCursorArgs<RESPONSE, ITEM>): Promise<
  FetchItemsWithCursorResult<ITEM>
> {
  const items: ITEM[] = [];
  let response: RequestResult<RESPONSE> | undefined;
  let page = 0;

  do {
    // Bail out here in case the abort signal is fired between requests.
    if (signal?.aborted) {
      return {
        ok: false,
        aborted: true,
      };
    }

    const cursor = response?.ok ? getCursor(response.result) : undefined;
    const queryParamsWithCursor = cursor
      ? { ...queryParams, cursor }
      : queryParams;
    const search = Object.entries(queryParamsWithCursor ?? {})
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      )
      .join('&');
    const urlWithParams = [url, search].filter(Boolean).join('?');

    // Get the next page and retry in case of intermittent errors
    response = await retryFetch<RESPONSE>({
      request: () => fetch(urlWithParams, { signal }),
      mapError,
      signal,
      canRetryCheck,
    });

    if (!response.ok) {
      return response.aborted ? response : { ...response, page };
    }

    items.push.apply(items, getItems(response.result));

    ++page;
  } while (response?.ok && getCursor(response.result));

  return {
    ok: true,
    items,
    pages: page,
  };
}

type RetryArgs<RESULT> = {
  request: (signal?: AbortSignal) => Promise<RequestResult<RESULT>>;
  canRetryCheck: CanRetry;
  attempt?: number;
  signal?: AbortSignal;
};

/**
 * Keep performing a request until it returns a successful result or <code>canRetry</code> returns false.
 *
 * Optionally, provide an <code>AbortSignal</code> to allow the retry loop and pending requests, if
 * supported, to be aborted.
 *
 * @param request - the request to perform
 * @param canRetryCheck - indicates whether a failed request can be retried
 * @param signal - an abort signal which will stop any current request and prevent any further requests
 */
export async function retry<RESULT>({
  request,
  canRetryCheck,
  attempt = 0,
  signal,
}: RetryArgs<RESULT>): Promise<RequestResult<RESULT>> {
  const result: RequestResult<RESULT> = await request(signal);
  if (result.ok || result.aborted || signal?.aborted) {
    return result;
  } else {
    const [canRetry, timeToWait] = canRetryCheck(
      result.status,
      ++attempt,
      signal,
    );
    if (canRetry) {
      if (timeToWait) {
        await wait(timeToWait);
      }
      return retry({ request, canRetryCheck, attempt, signal });
    }
  }

  return result;
}

const DEFAULT_MAX_ATTEMPTS = 3;
const DEFAULT_BACKOFF_TIME_MS = 200;
const DEFAULT_BACKOFF_TIME_429_MS = 1000;

/**
 * Create a <code>canRetry</code> implementation for <code>retry</code> for
 * handling HTTP errors.
 *
 * Assumptions:
 * - The error message is the HTTP status code
 * - 401, 403 and 404 statuses won’t retry as it’s unlikely to succeed
 * - 429 status indicates that the rate limit was exceeded
 *
 * @param maxAttempts            - maximum attempts before giving up
 * @param backoffTimeMs          - delay between attempts
 * @param rateLimitBackoffTimeMs - delay between attempts when the error is caused by rate limiting (429 status)
 */
export function httpRetryPolicy({
  maxAttempts = DEFAULT_MAX_ATTEMPTS,
  backoffTimeMs = DEFAULT_BACKOFF_TIME_MS,
  rateLimitBackoffTimeMs = DEFAULT_BACKOFF_TIME_429_MS,
}: HttpRetryPolicyOptions = {}): CanRetry {
  return (status, attempts) => {
    // Stop if attempts are exhausted
    if (attempts >= maxAttempts) {
      return [false, 0];
    }

    switch (status) {
      // Unlikely to recover from these
      case 401:
      case 403:
      case 404:
        return [false, 0];

      // Probably rate limiting. Back off and try again.
      case 429:
        return [true, rateLimitBackoffTimeMs];

      // Unknown error. Back off and try again.
      default:
        return [true, backoffTimeMs];
    }
  };
}

type RetryFetchArgs<RESULT> = {
  request: () => Promise<Response>;
  mapResult?: (response: Response) => Promise<RESULT>;
  mapError?: (response: Response) => Promise<{ code: string; message: string }>;
  canRetryCheck?: CanRetry;
  signal?: AbortSignal;
};

/**
 * Retry a fetch using the specified retry policy.
 *
 * @param request      - creates a fetch request
 * @param mapResult    - maps the response body to a result
 * @param mapError     - maps the response to error details
 * @param canRetry     - retry predicate
 * @param signal  - an optional abort signal to stop retrying and cancel any pending request
 */
export function retryFetch<RESULT>({
  request,
  mapResult = defaultResultMapper,
  mapError = defaultErrorMapper,
  canRetryCheck = httpRetryPolicy(),
  signal,
}: RetryFetchArgs<RESULT>): Promise<RequestResult<RESULT>> {
  return retry<RESULT>({
    request: async () => {
      let response: Response;

      try {
        response = await request();

        if (response.ok) {
          return {
            ok: true,
            result: await mapResult(response),
          };
        }

        const { code, message } = await mapError(response);

        // Error status
        return {
          ok: false,
          aborted: false,
          status: response.status,
          code,
          message,
        } as RequestFailureResult;
      } catch (error) {
        if (error instanceof Error) {
          // Request aborted client-side
          if (error.name === 'AbortError') {
            return {
              ok: false,
              aborted: true,
            };
          }

          // Client-side networking error
          return {
            ok: false,
            aborted: false,
            status: CLIENT_ERROR_STATUS,
            code: error.name,
            message: error.message,
          };
        }

        return {
          ok: false,
          aborted: false,
          status: CLIENT_ERROR_STATUS,
          code: CLIENT_ERROR_CODE,
          message: CLIENT_ERROR_MESSAGE,
        };
      }
    },
    canRetryCheck,
    signal,
  });
}
