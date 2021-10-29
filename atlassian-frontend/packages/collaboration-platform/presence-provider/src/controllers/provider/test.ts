import { act, renderHook } from '@testing-library/react-hooks';

import { usePresenceProvider } from './index';

const mockOn = jest.fn();
jest.mock('@atlassian/presence-client', () => {
  class Presence {
    constructor() {}
    on = mockOn;
  }
  return { Presence };
});

describe('usePresenceProvider', () => {
  const mockProps = {
    spaceKey: 'mock-spaceKey',
    presenceServerUrl: 'mock-presenceServerUrl',
    initialData: { accountId: 'mock-account-id' },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return provider instance', () => {
    const { result } = renderHook(() => usePresenceProvider(mockProps));
    expect(result.current.on).toEqual(mockOn);
  });

  it('should initialize connection on mount', () => {
    act(() => {
      renderHook(() => usePresenceProvider(mockProps));
    });

    expect(mockOn).toHaveBeenCalledTimes(1);
    expect(mockOn).toHaveBeenCalledWith('connected', expect.anything());
  });
});
