import { CURRENT_FFS_API_VERSION } from '../core/constants';
import { FeatureFlagUserWithIdentifier } from '../index';
import hashUser from '../util/hash';
import { FeatureFlagState } from '../util/types';

export const CHANNEL_PREFIX = 'flagData';

export default class Broadcast {
  private readonly apiKey: string;

  private channel: BroadcastChannel | undefined;

  private stateUpdateCallback: (state: FeatureFlagState) => void;

  constructor(
    apiKey: string,
    user: FeatureFlagUserWithIdentifier,
    stateUpdateCallback: (state: FeatureFlagState) => void,
  ) {
    this.apiKey = apiKey;
    this.stateUpdateCallback = stateUpdateCallback;
    this.setupChannel(user);
  }

  updateUserContext(user: FeatureFlagUserWithIdentifier): void {
    this.stop();
    this.setupChannel(user);
  }

  sendFeatureFlagState(featureFlagState: FeatureFlagState): void {
    this.channel?.postMessage(featureFlagState);
  }

  stop(): void {
    this.channel?.close();
  }

  private setupChannel(user: FeatureFlagUserWithIdentifier): void {
    try {
      // Keep reference to old channel so we can check the name of the current subscription
      // is the same as the channel we received a message for.
      // Due to a bug in Firefox which events can be recieved after
      // the channel has been closed.
      // eslint-disable-next-line compat/compat
      const channel = new BroadcastChannel(this.createChannelName(user));
      channel.onmessage = (e: MessageEvent): void => {
        if (channel.name === this.channel?.name) {
          this.stateUpdateCallback(e.data);
        }
      };
      this.channel = channel;
    } catch (error) {
      // This could fail due to BroadcastChannel not available.
      // In that case, we do nothing.
    }
  }

  private createChannelName(user: FeatureFlagUserWithIdentifier): string {
    return `${CHANNEL_PREFIX}.${CURRENT_FFS_API_VERSION}.${
      this.apiKey
    }.${hashUser(user)}`;
  }
}
