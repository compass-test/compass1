import { TimeoutHelper } from '../../helpers/timeoutHelper';

const mockOnTimeout = jest.fn();

jest.useFakeTimers();

describe('TimeoutHelper', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });
  it('should call `onTimeout` after exceeding the polling threshold duration', () => {
    const timeoutHelper = new TimeoutHelper(1000, mockOnTimeout);
    timeoutHelper.start();
    jest.advanceTimersByTime(2000);
    expect(mockOnTimeout).toHaveBeenCalled();
  });
  it('should NOT call `onTimeout` before exceeding the polling threshold duration', () => {
    const timeoutHelper = new TimeoutHelper(2000, mockOnTimeout);
    timeoutHelper.start();
    jest.advanceTimersByTime(1000);
    expect(mockOnTimeout).not.toHaveBeenCalled();
  });
  it('should NOT call `onTimeout` if cleared before exceeding the polling threshold duration', () => {
    const timeoutHelper = new TimeoutHelper(1000, mockOnTimeout);
    timeoutHelper.start();
    timeoutHelper.clear();
    jest.advanceTimersByTime(2000);
    expect(mockOnTimeout).not.toHaveBeenCalled();
  });
  it('should NOT call `onTimeout` if start() is not called', () => {
    new TimeoutHelper(1000, mockOnTimeout);
    jest.advanceTimersByTime(2000);
    expect(mockOnTimeout).not.toHaveBeenCalled();
  });
});
