import fetchMock from 'fetch-mock/cjs/client';

import { CanRetry, httpRetryPolicy, RequestResult, retryFetch } from '../util';
import { wait } from '../wait';

jest.mock('../wait');

function defaultHttpRetryPolicyWithSpy(): CanRetry {
  const canRetry = httpRetryPolicy();

  return jest.fn((...args) => {
    const result = canRetry(...args);
    return result;
  });
}

describe('retryFetch', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('default retry policy', () => {
    describe('200', () => {
      let result: RequestResult<unknown>;
      let canRetryCheck: CanRetry;

      beforeEach(async () => {
        fetchMock.mock('/test', { body: { hello: 'world' }, status: 200 });
        canRetryCheck = defaultHttpRetryPolicyWithSpy();
        result = await retryFetch({
          request: () => fetch('/test'),
          canRetryCheck,
        });
      });

      it('returns the expected response', () => {
        expect(result).toEqual({ ok: true, result: { hello: 'world' } });
      });

      it('does’t retry', () => {
        expect(canRetryCheck).not.toBeCalled();
      });
    });

    describe.each<[number, string, number, number?]>([
      [400, 'Bad Request', 3, 200],
      [401, 'Unauthorized', 1],
      [403, 'Forbidden', 1],
      [404, 'Not Found', 1],
      [429, 'Too Many Requests', 3, 1000],
      [500, 'Internal Server Error', 3, 200],
    ])('%d', (status, message, retryCalls, retryTime) => {
      let result: RequestResult<unknown>;
      let canRetryCheck: CanRetry;

      beforeEach(async () => {
        fetchMock.mock('/test', status);
        canRetryCheck = defaultHttpRetryPolicyWithSpy();

        result = await retryFetch({
          request: () => fetch('test'),
          canRetryCheck,
        });
      });

      it('returns the expected response', () => {
        expect(result).toEqual({
          ok: false,
          aborted: false,
          status,
          code: `${status}`,
          message,
        });
      });

      it(`calls retry function ${retryCalls} time(s)`, () => {
        expect(canRetryCheck).toBeCalledTimes(retryCalls);
        expect(wait).toBeCalledTimes(retryCalls - 1);
      });

      it(`calls wait function ${retryCalls - 1} time(s)`, () => {
        expect(wait).toBeCalledTimes(retryCalls - 1);
      });

      if (retryTime) {
        it(`calls wait function with ${retryTime} ms`, () => {
          expect(wait).toHaveBeenCalledWith(retryTime);
        });
      }
    });

    describe('Abort', () => {
      let result: RequestResult<unknown>;
      let canRetryCheck: CanRetry;

      beforeEach(async () => {
        fetchMock.mock('/test', 200);
        canRetryCheck = defaultHttpRetryPolicyWithSpy();
        const abortController = new AbortController();
        const { signal } = abortController;
        abortController.abort();
        result = await retryFetch({
          request: () => fetch('/test', { signal }),
          canRetryCheck,
        });
      });

      it('returns the expected response', () => {
        expect(result).toEqual({ ok: false, aborted: true });
      });

      it('doesn’t call the retry function', () => {
        expect(canRetryCheck).not.toBeCalled();
      });
    });
  });
});
