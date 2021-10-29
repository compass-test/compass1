import Client from '../core';

import {
  AnalyticsClientInterface,
  AutomaticExposureEventsPredicate,
  ClientOptions,
  FeatureFlagClientInterface,
  FeatureFlagUser,
  GetValueOptions,
  RawFlag,
  RawFlags,
  ReadyResponse,
  SupportedFlagTypes,
} from './types';

export default class FeatureFlagClient implements FeatureFlagClientInterface {
  private readonly client: Client;

  constructor(
    apiKey: string,
    analyticsWebClient: AnalyticsClientInterface,
    featureFlagUser: FeatureFlagUser,
    options: ClientOptions,
  ) {
    this.client = new Client(
      apiKey,
      analyticsWebClient,
      featureFlagUser,
      options,
    );
  }

  ready(): Promise<ReadyResponse> {
    return this.client.ready();
  }

  setAutomaticExposuresEnabled(
    enabled: boolean,
    predicate?: AutomaticExposureEventsPredicate,
  ): void {
    this.client.setAutomaticExposuresEnabled(enabled, predicate);
  }

  getFlagValue<T extends SupportedFlagTypes>(
    flagKey: string,
    defaultValue: T,
    options?: GetValueOptions<T>,
  ): T {
    return this.client.getFlagValue(flagKey, defaultValue, options);
  }

  getFlagDetails<T extends SupportedFlagTypes>(
    flagKey: string,
    defaultValue: T,
    options?: GetValueOptions<T>,
  ): RawFlag<T> {
    return this.client.getFlagDetails(flagKey, defaultValue, options);
  }

  getFlags(): RawFlags {
    return this.client.getFlags();
  }

  on<T extends SupportedFlagTypes>(
    flagKey: string,
    defaultValue: T,
    callback: (flagValue: T) => void,
    options?: GetValueOptions<T>,
  ): () => void {
    return this.client.on(flagKey, defaultValue, callback, options);
  }

  onAnyFlagUpdated(callback: () => void): () => void {
    return this.client.onAnyFlagUpdated(callback);
  }

  updateFeatureFlagUser(
    featureFlagUser: FeatureFlagUser,
  ): Promise<ReadyResponse> {
    return this.client.updateFeatureFlagUser(featureFlagUser);
  }

  destroy(): void {
    this.client.destroy();
  }
}
