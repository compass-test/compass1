import { renderHook } from '@testing-library/react-hooks';
import BrowserInteractionTime from 'browser-interaction-time';

import { useBrowserInteractionTime } from './index';

const mockStartTimer = jest.fn();

jest.mock('browser-interaction-time', () => {
  return jest.fn().mockImplementation(() => {
    return { startTimer: mockStartTimer };
  });
});

describe('useBrowserInteractionTime', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates instance of BrowserInteractionTime', () => {
    renderHook(() => useBrowserInteractionTime(2000));
    expect(BrowserInteractionTime).toBeCalledTimes(1);
  });

  it('starts the timer browserInteractionTime is created', () => {
    renderHook(() => useBrowserInteractionTime(2000));
    expect(mockStartTimer).toBeCalledTimes(1);
  });

  it('returns idle state', () => {
    const { result } = renderHook(() => useBrowserInteractionTime(2000));
    expect(result.current.idle).toBeFalsy();
  });
});
