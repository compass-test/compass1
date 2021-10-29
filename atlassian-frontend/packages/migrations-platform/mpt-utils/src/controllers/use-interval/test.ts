import { renderHook } from '@testing-library/react-hooks';

import useInterval from './index';

describe('useInterval()', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  it('should call the callback in the designated interval', () => {
    const cb = jest.fn();
    const delay = 1000;

    expect(cb).not.toBeCalled();
    renderHook(() => {
      useInterval(cb, delay);
    });
    jest.advanceTimersByTime(delay);
    expect(cb).toBeCalledTimes(1);
  });

  it('should call the new callback cb is updated', () => {
    const cb1 = jest.fn();
    const cb2 = jest.fn();
    const delay = 1000;

    // Render hook initially with cb1
    const result = renderHook<{ cb: () => void }, void>(
      ({ cb }) => {
        useInterval(cb, delay);
      },
      { initialProps: { cb: cb1 } },
    );

    // Expect
    expect(cb1).not.toBeCalled();
    expect(cb2).not.toBeCalled();

    // Update the cb1 to cb2
    result.rerender({ cb: cb2 });
    jest.advanceTimersByTime(delay);

    // Expect
    expect(cb1).not.toBeCalled();
    expect(cb2).toBeCalledTimes(1);
  });

  it('should reset the interval when the delay number is udpated', () => {
    const cb = jest.fn();
    const delay1 = 1000;
    const delay2 = 2000;

    // Render hook
    const result = renderHook<{ delay: number }, void>(
      ({ delay: delayNumber }) => {
        useInterval(cb, delayNumber);
      },
      { initialProps: { delay: delay1 } },
    );

    // Expect
    expect(cb).not.toBeCalled();

    // Update delay
    result.rerender({ delay: delay2 });
    jest.advanceTimersByTime(delay1);

    // Expect
    expect(cb).not.toBeCalled();

    // Expect
    jest.advanceTimersByTime(delay2);
    expect(cb).toBeCalled();
  });
});
