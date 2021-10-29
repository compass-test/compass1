import { renderHook } from '@testing-library/react-hooks';
import { CancelError } from '../../../utils/cancellable-promise';
import useMaxOneInflightRequest from '../use-max-one-inflight-request';

/**
 * Avoid using Promise.resolve / or Promises which are already in the resolved state for these tests as
 * CancalleablePromise implementation will execute such promises immediately.
 */

describe('useMaxOneInflightRequest', () => {
  it('should resolve a promise if only one call ', async () => {
    jest.setTimeout(100);

    const promise1 = new Promise((resolve) => resolve('worked'));

    const mock1 = jest.fn();
    const { result } = renderHook(() => {
      const oneRequestGenerator = useMaxOneInflightRequest();
      const cancellablePromise1 = oneRequestGenerator(promise1);

      return new Promise((resolve) => {
        cancellablePromise1.then(mock1).then(resolve);
      });
    });

    await result.current;
    expect(mock1).toHaveBeenCalled();
  });

  it('should not resolve previous promise if multiple calls are in progress', async () => {
    expect.assertions(3);
    /**
     * Assumption here is that the call which has gone afterwards will return later than the previous one.
     */
    jest.setTimeout(100);
    const promise1 = new Promise((resolve) => setTimeout(resolve, 20));
    const promise2 = new Promise((resolve) => setTimeout(resolve, 30));
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    const { result } = renderHook(() => {
      const oneRequestGenerator = useMaxOneInflightRequest();
      const cancellablePromise1 = oneRequestGenerator(promise1);
      const cancellablePromise2 = oneRequestGenerator(promise2);

      return new Promise((resolve) => {
        cancellablePromise1.then(mock1).catch((error) => {
          expect(error).toBeInstanceOf(CancelError);
        });
        cancellablePromise2.then(mock2).then(resolve);
      });
    });

    await result.current;
    expect(mock1).not.toHaveBeenCalled();
    expect(mock2).toHaveBeenCalled();
  });

  it('should not resolve previous promise if multiple calls are in progress in the same tick', async () => {
    expect.assertions(3);
    /**
     * Assumption here is that the call which has gone afterwards will return later than the previous one.
     */
    jest.setTimeout(100);

    const promise1 = new Promise((resolve) =>
      setTimeout(() => resolve('worked'), 0),
    );
    const promise2 = new Promise((resolve) =>
      setTimeout(() => resolve('worked2'), 0),
    ); // Both of these are queued in the next tick.
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    const { result } = renderHook(() => {
      const oneRequestGenerator = useMaxOneInflightRequest();
      const cancellablePromise1 = oneRequestGenerator(promise1);
      const cancellablePromise2 = oneRequestGenerator(promise2);

      return new Promise((resolve) => {
        cancellablePromise1.then(mock1).catch((error) => {
          expect(error).toBeInstanceOf(CancelError);
        });
        cancellablePromise2.then(mock2).then(resolve);
      });
    });

    await result.current;
    expect(mock1).not.toHaveBeenCalled();
    expect(mock2).toHaveBeenCalled();
  });
});
