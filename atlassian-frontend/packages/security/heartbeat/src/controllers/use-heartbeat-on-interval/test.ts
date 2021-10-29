import { renderHook } from '@testing-library/react-hooks';

import { useBrowserInteractionTime } from '../use-browser-interaction-time';
import { useHearbeatService } from '../use-heartbeat-service';

import { useHeartbeatOnInterval } from './index';

const mockSetCallHeartbeatService = jest.fn();

jest.mock('../use-heartbeat-service', () => ({
  useHearbeatService: jest.fn(() => ({
    requestTimestamp: undefined,
    callHeartbeatService: false,
    setCallHeartbeatService: mockSetCallHeartbeatService,
  })),
}));

jest.mock('../use-browser-interaction-time', () => ({
  useBrowserInteractionTime: jest.fn(() => ({
    idle: false,
  })),
}));

jest.mock('@use-it/interval', () => ({
  __esModule: true,
  default: (cb: Function) => cb(),
}));

describe('useHeartbeatOnInterval', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('dependent hooks have been called when hook is rendered', () => {
    renderHook(() => useHeartbeatOnInterval('some/endpoint', 2000));
    expect(useHearbeatService).toBeCalled();
    expect(useBrowserInteractionTime).toBeCalled();
  });

  it('heartbeat api is called when component mounts', () => {
    (useHearbeatService as jest.Mock).mockImplementation(() => ({
      requestTimestamp: new Date(),
      callHeartbeatService: true,
      setCallHeartbeatService: mockSetCallHeartbeatService,
    }));

    renderHook(() => useHeartbeatOnInterval('some/endpoint', 5000));

    expect(mockSetCallHeartbeatService).toHaveBeenCalledTimes(1);
  });

  it('heartbeat api is called when user is idle', () => {
    (useBrowserInteractionTime as jest.Mock).mockImplementation(() => ({
      idle: true,
    }));

    renderHook(() => useHeartbeatOnInterval('some/endpoint', 2000));

    expect(mockSetCallHeartbeatService).toHaveBeenCalledTimes(2);
  });

  it('heartbeat api is called when session is expired', async () => {
    (useHearbeatService as jest.Mock).mockImplementation(() => ({
      sessionExpiryTimestamp: new Date(Date.now() - 1000),
      requestTimestamp: new Date(Date.now() - (10 * 60 * 10000 + 1000)),
      callHeartbeatService: false,
      setCallHeartbeatService: mockSetCallHeartbeatService,
    }));

    (useBrowserInteractionTime as jest.Mock).mockImplementation(() => ({
      idle: false,
    }));

    renderHook(() => useHeartbeatOnInterval('some/endpoint', 2000));

    expect(mockSetCallHeartbeatService).toHaveBeenCalledTimes(2);
  });

  it('heartbeat api is called when user is not idle but nextCallTimestamp has been reached', async () => {
    (useHearbeatService as jest.Mock).mockImplementation(() => ({
      sessionExpiryTimestamp: new Date(Date.now() + 15000),
      requestTimestamp: new Date(Date.now() - 3000),
      callHeartbeatService: false,
      setCallHeartbeatService: mockSetCallHeartbeatService,
    }));

    (useBrowserInteractionTime as jest.Mock).mockImplementation(() => ({
      idle: false,
    }));

    renderHook(() => useHeartbeatOnInterval('some/endpoint', 2000));

    expect(mockSetCallHeartbeatService).toHaveBeenCalledTimes(2);
  });
});
