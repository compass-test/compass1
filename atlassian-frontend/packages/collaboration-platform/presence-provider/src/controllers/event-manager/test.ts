import { renderHook } from '@testing-library/react-hooks';

import { useEventManager } from './index';

describe('useEventManager', () => {
  const mockName = 'Homer Simpson';

  const mockGetUser = jest.fn();
  const mockOff = jest.fn();
  const mockDestroy = jest.fn();
  const mockAccountId = '123';
  const mockSessionId = 'mock-session-id';
  const mockUser = {
    sessionId: mockSessionId,
    avatar: '',
    name: mockName,
  };

  class MockPresenceProvider {
    constructor() {}
    on = (eventName: string, callback: (presenceData: any) => void) => {
      if (eventName === 'presence') {
        callback([{ accountId: mockAccountId, sessionId: mockSessionId }]);
      }
      return this;
    };
    off = (...args: any) => {
      mockOff(args);
      return this;
    };
    destroy = mockDestroy;
  }

  const mockProps: any = {
    getUser: mockGetUser,
    presenceProvider: new MockPresenceProvider(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockGetUser.mockReturnValue(Promise.resolve(mockUser));
    mockDestroy.mockRestore();
  });

  it('should return participants', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useEventManager(mockProps),
    );

    expect(result.current.participants).toEqual(null);
    await waitForNextUpdate();
    expect(result.current.participants).toEqual([
      {
        ...mockUser,
        accountId: mockAccountId,
      },
    ]);
  });

  it('should destroy presenceProvider and cleanup event handlers on unmount', async () => {
    const { unmount, waitForNextUpdate } = renderHook(() =>
      useEventManager(mockProps),
    );
    await waitForNextUpdate();
    unmount();

    expect(mockOff).toHaveBeenCalledTimes(2);
    expect(mockDestroy).toHaveBeenCalledTimes(1);
  });
});
