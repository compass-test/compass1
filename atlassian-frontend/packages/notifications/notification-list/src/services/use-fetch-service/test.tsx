import { act, renderHook } from '@testing-library/react-hooks';

import { LoadingState } from '../../common/types';

import { useFetchService } from './index';

const generateMockSuccessFetchFunc = () => (args?: number) =>
  new Promise<number>((resolve) => {
    setTimeout(() => resolve(args === undefined ? 0 : args + 1), 100);
  });

const generateMockErrorFetchFunc = () => (args?: number) =>
  new Promise<number>((_, reject) => {
    setTimeout(() => reject(new Error('Fetch error')), 100);
  });

describe('Use fetch service test', () => {
  test('Should call async function and update state correctly', async () => {
    jest.useFakeTimers();

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchService(generateMockSuccessFetchFunc(), 0, 'test-service'),
    );

    expect(result.current.loadingState).toBe(LoadingState.INITIAL);
    expect(result.current.error).toBeUndefined();
    expect(result.current.data).toBe(0);
    expect(result.current.lastCallTimestamp).toBeUndefined();

    act(() => {
      result.current.fetchData(0);
    });

    expect(result.current.loadingState).toBe(LoadingState.LOADING);
    expect(result.current.error).toBeUndefined();
    expect(result.current.data).toBe(0);
    expect(result.current.lastCallTimestamp).toBeDefined();

    jest.runAllTimers();
    await waitForNextUpdate();

    expect(result.current.loadingState).toBe(LoadingState.COMPLETE);
    expect(result.current.error).toBeUndefined();
    expect(result.current.data).toBe(1);
    expect(result.current.lastCallTimestamp).toBeDefined();
  });

  test('Should call erroring async function and update state correctly', async () => {
    jest.useFakeTimers();

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchService(generateMockErrorFetchFunc(), 0, 'test-service'),
    );

    expect(result.current.loadingState).toBe(LoadingState.INITIAL);
    expect(result.current.error).toBeUndefined();
    expect(result.current.data).toBe(0);
    expect(result.current.lastCallTimestamp).toBeUndefined();

    act(() => {
      result.current.fetchData();
    });

    expect(result.current.loadingState).toBe(LoadingState.LOADING);
    expect(result.current.error).toBeUndefined();
    expect(result.current.data).toBe(0);
    expect(result.current.lastCallTimestamp).toBeDefined();

    jest.runAllTimers();
    await waitForNextUpdate();

    expect(result.current.loadingState).toBe(LoadingState.ERROR);
    expect(result.current.error).toStrictEqual(new Error('Fetch error'));
    expect(result.current.data).toBe(0);
    expect(result.current.lastCallTimestamp).toBeDefined();
  });
});
