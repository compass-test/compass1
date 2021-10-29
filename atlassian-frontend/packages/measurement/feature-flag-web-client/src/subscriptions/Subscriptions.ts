import mitt, { Emitter } from 'mitt';

import { GetValueOptions, SupportedFlagTypes } from '../api/types';

export const FLAG_PREFIX = 'flagKey.';

export const ALL_FLAGS = 'allFlags';

export default class Subscriptions {
  private emitter: Emitter;

  constructor() {
    this.emitter = mitt();
  }

  on<T extends SupportedFlagTypes>(
    flagKey: string,
    defaultValue: T,
    callback: (newValue: T) => void,
    getFlagValue: (
      byFlagKey: string,
      withDefaultValue: T,
      options?: GetValueOptions<T>,
    ) => T,
    options?: GetValueOptions<T>,
  ): () => void {
    const wrapCallback = (): void =>
      callback(getFlagValue(flagKey, defaultValue, options));
    this.emitter.on(FLAG_PREFIX + flagKey, wrapCallback);
    return (): void => this.emitter.off(FLAG_PREFIX + flagKey, wrapCallback);
  }

  onAnyFlagUpdated(callback: () => void): () => void {
    this.emitter.on(ALL_FLAGS, callback);
    return (): void => this.emitter.off(ALL_FLAGS, callback);
  }

  anyFlagUpdated(): void {
    this.emitter.emit(ALL_FLAGS);
  }

  flagValueUpdated(flagKey: string): void {
    this.emitter.emit(FLAG_PREFIX + flagKey);
  }

  stop(): void {
    // There is no way to clear the emitter so instead we're creating a new one
    this.emitter = mitt();
  }
}
