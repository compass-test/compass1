import { renderHook } from '@testing-library/react-hooks';
import useCancelledPromiseOnUnmount from '../use-cancelled-promise-on-un-mount';
import { delay } from '../test-utils';

describe('useCancelledPromiseOnUnmount', () => {
  it('should resolve a promise if mounted', async () => {
    const promise = Promise.resolve('worked');
    const { result } = renderHook(() => {
      const generateCancellablePromise = useCancelledPromiseOnUnmount();
      return generateCancellablePromise(promise);
    });

    await result.current.then((res) => expect(res).toEqual('worked'));
  });

  it('should catch a promise if mounted', async () => {
    const promise = Promise.reject('blew up');
    const { result } = renderHook(() => {
      const generateCancellablePromise = useCancelledPromiseOnUnmount();
      return generateCancellablePromise(promise);
    });

    await result.current.catch((res) => expect(res).toEqual('blew up'));
  });

  it('should not resolve a promise if unmounted', async () => {
    jest.setTimeout(100);

    const promise = Promise.resolve('worked');
    const mock = jest.fn();
    const { result, unmount } = renderHook(() => {
      const generateCancellablePromise = useCancelledPromiseOnUnmount();
      return generateCancellablePromise(promise);
    });
    unmount();
    result.current.then(mock); // this promise will not resolve as the comoponent has unmounted so cant await it.

    await delay(50);
    expect(mock).not.toHaveBeenCalled();
  });

  it('should not reject a promise if unmounted', async () => {
    jest.setTimeout(100);

    const promise = Promise.reject('worked');
    const mock = jest.fn();
    const { result, unmount } = renderHook(() => {
      const generateCancellablePromise = useCancelledPromiseOnUnmount();
      return generateCancellablePromise(promise);
    });
    unmount();
    result.current.catch(mock); // this promise will not resolve as the comoponent has unmounted so cant await it.

    await delay(50);
    expect(mock).not.toHaveBeenCalled();
  });
});
