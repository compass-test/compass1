import {
  act,
  renderHook,
  RenderHookResult,
} from '@testing-library/react-hooks';

import { postHeartbeat } from '../../services/heartbeat';

import { useHearbeatService } from './index';

jest.mock('../../services/heartbeat', () => ({
  postHeartbeat: jest.fn(() => ({
    nextCallTimestamp: new Date().toISOString(),
  })),
}));

describe('useHeartbeatService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initially returns', () => {
    let renderedHook: RenderHookResult<
      string,
      ReturnType<typeof useHearbeatService>
    >;

    beforeAll(() => {
      renderedHook = renderHook(() => useHearbeatService('some/endpoint'));
    });
    it('no timestamp', () => {
      expect(renderedHook.result.current.requestTimestamp).toBe(undefined);
    });

    it('callHeartbeatService is false', () => {
      expect(renderedHook.result.current.callHeartbeatService).toBe(false);
    });

    it('setCallHeartbeatService is a function', () => {
      expect(
        renderedHook.result.current.setCallHeartbeatService,
      ).toBeInstanceOf(Function);
    });
  });

  describe('setting callHeartbeatService', () => {
    let renderedHook: RenderHookResult<
      string,
      ReturnType<typeof useHearbeatService>
    >;

    beforeAll(() => {
      renderedHook = renderHook(() => useHearbeatService('some/endpoint'));
    });
    it('sets state callHeartbeatService', async () => {
      act(() => {
        renderedHook.result.current.setCallHeartbeatService(true);
      });
      expect(renderedHook.result.current.callHeartbeatService).toBe(true);
    });

    it('calls heartbeatService', async () => {
      act(() => {
        renderedHook.result.current.setCallHeartbeatService(true);
      });
      await renderedHook.waitForNextUpdate();

      expect(postHeartbeat).toBeCalledWith('some/endpoint', undefined);
    });

    it('does not set timestamp if no timestamp was returned ', async () => {
      act(() => {
        renderedHook.result.current.setCallHeartbeatService(true);
      });
      await renderedHook.waitForNextUpdate();

      expect(renderedHook.result.current.requestTimestamp).toBeInstanceOf(Date);
    });

    it('resets callHeartbeatService ', async () => {
      act(() => {
        renderedHook.result.current.setCallHeartbeatService(true);
      });
      await renderedHook.waitForNextUpdate();

      expect(postHeartbeat).toBeCalledWith('some/endpoint', undefined);
    });
  });
});
