import { renderHook } from '@testing-library/react-hooks';

import { useService } from '../../../hooks/use-service';

describe('useService', () => {
  const requestResult = 'testResult';
  const requestWithSuccess = () => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(requestResult), 1),
    );
  };

  const requestError = new Error('testError');
  const requestWithError = () => {
    return new Promise((resolve, reject) =>
      setTimeout(() => reject(requestError), 1000),
    );
  };

  it('should init correctly', () => {
    const { result } = renderHook(() => useService(requestWithSuccess));

    expect(result.current).toEqual({
      loading: false,
      error: undefined,
      data: undefined,
      fetchData: expect.any(Function),
    });
  });

  it('should return data if request succeeds', async () => {
    const { result } = renderHook(() => useService(requestWithSuccess));

    const promise = result.current.fetchData();

    expect(result.current).toEqual({
      loading: true,
      error: undefined,
      data: undefined,
      fetchData: expect.any(Function),
    });

    await promise;

    expect(result.current).toEqual({
      loading: false,
      error: undefined,
      data: requestResult,
      fetchData: expect.any(Function),
    });
  });

  it('should return error if request fails', async () => {
    const { result } = renderHook(() => useService(requestWithError));

    const promise = result.current.fetchData();

    expect(result.current).toEqual({
      loading: true,
      error: undefined,
      data: undefined,
      fetchData: expect.any(Function),
    });

    await promise;

    expect(result.current).toEqual({
      loading: false,
      error: requestError,
      data: undefined,
      fetchData: expect.any(Function),
    });
  });

  it('should set initial state', () => {
    const { result } = renderHook(() =>
      useService(requestWithError, { loading: true }),
    );

    expect(result.current).toEqual({
      loading: true,
      error: undefined,
      data: undefined,
      fetchData: expect.any(Function),
    });
  });
});
