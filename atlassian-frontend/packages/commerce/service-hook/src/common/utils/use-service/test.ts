// eslint-disable-next-line import/no-extraneous-dependencies
import { useCallback } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { act, renderHook } from '@testing-library/react-hooks';

import { useFetchService, useService, useUpdateService } from './index';

const createFetchingFunction = (): (() => Promise<string>) => {
  let counter = 0;
  return () => {
    counter += 1;
    return Promise.resolve(`response ${counter}`);
  };
};

const createUpdateFunction = () => (data: string): Promise<string> =>
  Promise.resolve(`response: ${data}`);

const createRejectFunction = () => (): Promise<string> =>
  Promise.reject('error');

describe('use service', () => {
  const initialState = {
    loading: false,
    data: 42,
    error: undefined,
  };

  test('use service initial state', async () => {
    const payload = jest.fn();
    const { result } = renderHook(() => useService(payload, initialState));
    const { fetchData, ...state } = result.current;

    expect(state).toEqual(initialState);
  });

  /**
   * this test is need to "prove" the following one
   */
  test('test unstable data', async () => {
    const { result, rerender } = renderHook(() => ({}));
    const currentData = result.current;
    rerender();
    expect(result.current).not.toBe(currentData);
  });

  test('use service return stable data', async () => {
    const payload = jest.fn();
    const { result, rerender } = renderHook(() =>
      useService(payload, initialState),
    );

    const currentData = result.current;
    rerender();
    expect(result.current).toBe(currentData);
  });
});

describe('fetch service', () => {
  test('fetch service auto fetches data on render', async () => {
    const { result, waitForNextUpdate, rerender } = renderHook(() =>
      // AFP-2511 TODO: Fix automatic suppressions below
      // eslint-disable-next-line react-hooks/exhaustive-deps
      useFetchService(useCallback(createFetchingFunction(), [])),
    );

    const firstResult = result.current;
    rerender();
    // ref should be equal equal
    expect(result.current).toBe(firstResult);

    await waitForNextUpdate();

    expect(result.current.data).toEqual('response 1');
    expect(result.current).not.toBe(firstResult);
  });

  test('fetch service is loading on initiation', async () => {
    const { result } = renderHook(() =>
      // AFP-2511 TODO: Fix automatic suppressions below
      // eslint-disable-next-line react-hooks/exhaustive-deps
      useFetchService(useCallback(createFetchingFunction(), [])),
    );

    expect(result.current.loading).toEqual(true);
  });

  test('fetch service is able to refresh', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      // AFP-2511 TODO: Fix automatic suppressions below
      // eslint-disable-next-line react-hooks/exhaustive-deps
      useFetchService(useCallback(createFetchingFunction(), [])),
    );

    await waitForNextUpdate();

    act(() => {
      result.current.refresh();
    });

    expect(result.current.loading).toEqual(true);

    await waitForNextUpdate();

    expect(result.current.data).toEqual('response 2');
    expect(result.current.loading).toEqual(false);
  });

  test('fetch service returns error', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      // AFP-2511 TODO: Fix automatic suppressions below
      // eslint-disable-next-line react-hooks/exhaustive-deps
      useFetchService(useCallback(createRejectFunction(), [])),
    );

    await waitForNextUpdate();

    expect(result.current.error).toEqual('error');
  });

  test('fetch service refresh resolves promise with result', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      // AFP-2511 TODO: Fix automatic suppressions below
      // eslint-disable-next-line react-hooks/exhaustive-deps
      useFetchService(useCallback(createFetchingFunction(), [])),
    );

    await waitForNextUpdate();

    let response;
    act(() => {
      response = result.current.refresh();
    });
    await expect(response).resolves.toEqual('response 2');
  });

  test('fetch service refresh rejects promise on error', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      // AFP-2511 TODO: Fix automatic suppressions below
      // eslint-disable-next-line react-hooks/exhaustive-deps
      useFetchService(useCallback(createRejectFunction(), [])),
    );

    await waitForNextUpdate();

    let response;
    act(() => {
      response = result.current.refresh();
    });
    await expect(response).rejects.toEqual('error');
  });
});

describe('update service', () => {
  test('update service is idle on initiation', async () => {
    const { result } = renderHook(() =>
      // AFP-2511 TODO: Fix automatic suppressions below
      // eslint-disable-next-line react-hooks/exhaustive-deps
      useUpdateService(useCallback(createUpdateFunction(), [])),
    );

    expect(result.current.loading).toEqual(false);
  });

  test('update service does a request passing data', async () => {
    const { result, waitForNextUpdate, rerender } = renderHook(() =>
      // AFP-2511 TODO: Fix automatic suppressions below
      // eslint-disable-next-line react-hooks/exhaustive-deps
      useUpdateService(useCallback(createUpdateFunction(), [])),
    );

    const firstResult = result.current;
    act(() => {
      result.current.update('test');
    });

    const secondResult = result.current;
    expect(firstResult).not.toBe(secondResult);
    rerender();
    expect(result.current.loading).toEqual(true);
    expect(result.current).toBe(secondResult);

    await waitForNextUpdate();

    expect(result.current.loading).toEqual(false);
    expect(result.current.data).toEqual('response: test');
  });

  test('update service returns error', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      // AFP-2511 TODO: Fix automatic suppressions below
      // eslint-disable-next-line react-hooks/exhaustive-deps
      useUpdateService(useCallback(createRejectFunction(), [])),
    );

    act(() => {
      result.current.update();
    });

    await waitForNextUpdate();

    expect(result.current.error).toEqual('error');
  });

  test('update service resolves update promise', async () => {
    const { result } = renderHook(() =>
      // AFP-2511 TODO: Fix automatic suppressions below
      // eslint-disable-next-line react-hooks/exhaustive-deps
      useUpdateService(useCallback(createUpdateFunction(), [])),
    );

    let response;
    act(() => {
      response = result.current.update('test');
    });

    expect(await response).toEqual('response: test');
  });

  test('update service reject update promise on error', async () => {
    const { result } = renderHook(() =>
      // AFP-2511 TODO: Fix automatic suppressions below
      // eslint-disable-next-line react-hooks/exhaustive-deps
      useUpdateService(useCallback(createRejectFunction(), [])),
    );

    let response;
    act(() => {
      response = result.current.update();
    });

    await expect(response).rejects.toEqual('error');
  });
});
