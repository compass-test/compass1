import {
  ClientCauseReason,
  ClientMetadata,
  ClientUserState,
  ClientVisibilityState,
} from '../fetcher/types';
import Storage from '../storage';
import { version } from '../util/version';

import { PollingConfig } from './types';

export default class MetadataManager {
  private readonly pollingSeconds: number;

  private clientCauseReason?: ClientCauseReason;

  private clientUserState?: ClientUserState;

  constructor(pollingConfig: PollingConfig) {
    this.pollingSeconds = pollingConfig.interval / 1000;
  }

  updateClientCauseReason(reason: ClientCauseReason): void {
    this.clientCauseReason = reason;
  }

  updateClientUserState(state: ClientUserState): void {
    this.clientUserState = state;
  }

  get(): ClientMetadata {
    const metadata: ClientMetadata = {
      client: {
        name: 'feature-flag-web-client',
        version,
      },
      config: {
        pollingSeconds: this.pollingSeconds,
      },
      state: {
        // Need to cast VisibilityState (type) to ClientVisibilityState (enum)
        visibility: document.visibilityState as ClientVisibilityState,
        storage: Storage.getStorageStatus(),
        userContext: this.clientUserState,
        cause: this.clientCauseReason,
      },
    };
    return metadata;
  }
}
