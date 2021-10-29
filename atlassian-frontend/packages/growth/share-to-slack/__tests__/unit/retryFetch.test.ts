import fetchMock from 'fetch-mock/cjs/client';

import {
  CanRetry,
  httpRetryPolicy,
  RequestResult,
  retryFetch,
} from '../../src/common/slack-service/util';

jest.useFakeTimers();

function defaultHttpRetryPolicyWithSpy(): CanRetry {
  const canRetry = httpRetryPolicy();

  return jest.fn(async (...args) => {
    const [result] = await Promise.all([
      canRetry(...args),
      jest.runAllTimers(),
    ]);

    return result;
  });
}

describe('retryFetch', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe('default retry policy', () => {
    describe('200', () => {
      let result: RequestResult<unknown>;
      let canRetry: CanRetry;

      beforeEach(async () => {
        fetchMock.mock('/test', { body: { hello: 'world' }, status: 200 });
        canRetry = defaultHttpRetryPolicyWithSpy();
        result = await retryFetch({
          request: () => fetch('/test'),
          canRetry,
        });
      });

      it('returns the expected response', () => {
        expect(result).toEqual({ ok: true, result: { hello: 'world' } });
      });

      it('does’t retry', () => {
        expect(canRetry).not.toBeCalled();
      });
    });

    describe.each<[number, string, number]>([
      [400, 'Bad Request', 3],
      [401, 'Unauthorized', 1],
      [403, 'Forbidden', 1],
      [404, 'Not Found', 1],
      [429, 'Too Many Requests', 3],
      [500, 'Internal Server Error', 3],
    ])('%d', (status, message, retryCalls) => {
      let result: RequestResult<unknown>;
      let canRetry: CanRetry;

      beforeEach(async () => {
        fetchMock.mock('/test', status);
        canRetry = defaultHttpRetryPolicyWithSpy();

        result = await retryFetch({
          request: () => fetch('test'),
          canRetry,
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
        expect(canRetry).toBeCalledTimes(retryCalls);
      });
    });

    describe('Abort', () => {
      let result: RequestResult<unknown>;
      let canRetry: CanRetry;

      beforeEach(async () => {
        fetchMock.mock('/test', 200);
        canRetry = defaultHttpRetryPolicyWithSpy();
        const abortController = new AbortController();
        const { signal } = abortController;
        abortController.abort();
        result = await retryFetch({
          request: () => fetch('/test', { signal }),
          canRetry,
        });
      });

      it('returns the expected response', () => {
        expect(result).toEqual({ ok: false, aborted: true });
      });

      it('doesn’t call the retry function', () => {
        expect(canRetry).not.toBeCalled();
      });
    });
  });
});
