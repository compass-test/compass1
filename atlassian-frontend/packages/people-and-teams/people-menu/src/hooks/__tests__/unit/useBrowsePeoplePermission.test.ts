import { act, renderHook } from '@testing-library/react-hooks';

import useBrowsePeoplePermission from '../../useBrowsePeoplePermission';

describe('useBrowsePeoplePermission', () => {
  const renderTestHook = (funcReturnPromise?: () => Promise<boolean>) => {
    return renderHook(() => useBrowsePeoplePermission(funcReturnPromise));
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('hasPermission is true when funcReturnPromise is null/undefined', () => {
    const { result } = renderTestHook(undefined);
    expect(result.current).toEqual({
      loading: false,
      hasPermission: true,
    });
  });

  it('hasPermission is false when funcReturnPromise is defined and not resolve yet', async () => {
    const funcReturnPromise = () =>
      new Promise<boolean>((resolve) => setTimeout(() => resolve(true), 1000));

    const { result, waitForNextUpdate } = renderTestHook(funcReturnPromise);

    expect(result.current).toEqual({
      loading: true,
      hasPermission: false,
    });

    act(() => {
      jest.runTimersToTime(1000);
    });

    await waitForNextUpdate();

    expect(result.current).toEqual({
      loading: false,
      hasPermission: true,
    });
  });

  it('hasPermission is false after funcReturnPromise is defined and resolve as false', async () => {
    const funcReturnPromise = () =>
      new Promise<boolean>((resolve) => setTimeout(() => resolve(false), 1000));

    const { result, waitForNextUpdate } = renderTestHook(funcReturnPromise);

    expect(result.current).toEqual({
      loading: true,
      hasPermission: false,
    });

    act(() => {
      jest.runTimersToTime(1000);
    });

    await waitForNextUpdate();

    expect(result.current).toEqual({
      loading: false,
      hasPermission: false,
    });
  });
});
