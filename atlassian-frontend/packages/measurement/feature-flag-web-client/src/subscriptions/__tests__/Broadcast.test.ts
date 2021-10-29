import { CURRENT_FFS_API_VERSION } from '../../core/constants';
import generateChance from '../../testUtil/chance';
import {
  featureFlagState,
  fullUser,
  minimalUser,
} from '../../testUtil/mockData';
import hashUser from '../../util/hash';
import Broadcast, { CHANNEL_PREFIX } from '../Broadcast';

type MessageFunction = (message: Partial<MessageEvent>) => void;

interface BroadcastChannelAPI {
  name: string;
  close: () => void;
  postMessage: (data: any) => void;
  onmessage: undefined | MessageFunction;
}

describe('Broadcast', () => {
  const chance = generateChance('Broadcast');

  const channelClose = jest.fn();
  const channelPostMessage = jest.fn();
  const stateUpdateCallback = jest.fn();

  let apiKey: string;
  let broadcast: Broadcast;
  let channelName: string;

  beforeEach(() => {
    apiKey = chance.string();

    (global as any).BroadcastChannel = jest.fn().mockImplementation((name) => {
      const channel: BroadcastChannelAPI = {
        name,
        close: channelClose,
        postMessage: channelPostMessage,
        onmessage: undefined,
      };
      (channel.postMessage as any).mockImplementation((data: any) => {
        if (channel.onmessage) {
          channel.onmessage({ data });
        }
      });
      return channel;
    });

    broadcast = new Broadcast(apiKey, minimalUser, stateUpdateCallback);
    channelName = `${CHANNEL_PREFIX}.${CURRENT_FFS_API_VERSION}.${apiKey}.${hashUser(
      minimalUser,
    )}`;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('setup channel', () => {
    test('constructor setup channel', () => {
      expect((global as any).BroadcastChannel).toHaveBeenCalledWith(
        channelName,
      );
      expect((broadcast as any).channel.onmessage).toBeInstanceOf(Function);
    });

    test('update user context setup channel', () => {
      const stopSpy = jest.spyOn(broadcast, 'stop');
      broadcast.updateUserContext(fullUser);

      expect((global as any).BroadcastChannel).toHaveBeenCalledWith(
        channelName,
      );
      expect((broadcast as any).channel.onmessage).toBeInstanceOf(Function);
      expect(stopSpy).toHaveBeenCalledWith();
    });
  });

  describe('handle errors', () => {
    beforeEach(() => {
      (global as any).BroadcastChannel = undefined;
      broadcast = new Broadcast(apiKey, minimalUser, stateUpdateCallback);
    });

    test('setup channel graceful handle error', () => {
      expect(() => {
        broadcast = new Broadcast(apiKey, minimalUser, stateUpdateCallback);
      }).not.toThrow();
      expect((broadcast as any).channel).toBeUndefined();
    });

    test('send feature flag state on channel graceful handle error', () => {
      expect(() => {
        broadcast.sendFeatureFlagState(featureFlagState);
      }).not.toThrow();
    });

    test('update feature flag user channel graceful handle error', () => {
      expect(() => {
        broadcast.updateUserContext(fullUser);
      }).not.toThrow();
    });

    test('stop channel graceful handle error', () => {
      expect(() => {
        broadcast.stop();
      }).not.toThrow();
    });
  });

  test('send feature flag state on channel', () => {
    broadcast.sendFeatureFlagState(featureFlagState);
    expect(channelPostMessage).toHaveBeenCalledWith(featureFlagState);
    expect(stateUpdateCallback).toHaveBeenCalledWith(featureFlagState);
  });

  test('stop channel', () => {
    broadcast.stop();
    expect(channelClose).toHaveBeenCalledWith();
  });

  test('callback triggered even after user has been changed', () => {
    broadcast.updateUserContext(fullUser);
    broadcast.sendFeatureFlagState(featureFlagState);
    expect(stateUpdateCallback).toHaveBeenCalledWith(featureFlagState);
  });

  test('does not call callback if channel has changed', () => {
    const previousChannel = (broadcast as any).channel;
    broadcast.updateUserContext(fullUser);
    previousChannel.onmessage(featureFlagState);
    expect(stateUpdateCallback).not.toHaveBeenCalled();
  });
});
