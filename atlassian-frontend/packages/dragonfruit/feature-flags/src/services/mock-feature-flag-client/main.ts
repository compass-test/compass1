import {
  AutomaticExposureEventsPredicate,
  FeatureFlagClientInterface,
  FeatureFlagUser,
  GetValueOptions,
  RawFlag,
  RawFlags,
  ReadyReason,
  ReadyResponse,
  SupportedFlagTypes,
} from '@atlassiansox/feature-flag-web-client';

export type FlagMap = Record<string, SupportedFlagTypes>;

export class MockFeatureFlagClient implements FeatureFlagClientInterface {
  private readonly flags: FlagMap;

  constructor(flags: FlagMap) {
    this.flags = flags;
  }

  getFlagValue<T extends SupportedFlagTypes>(
    flagKey: string,
    defaultValue: T,
    options?: GetValueOptions<T>,
  ): T {
    return (this.flags[flagKey] as T | undefined) ?? defaultValue;
  }

  getFlagDetails<T extends SupportedFlagTypes>(
    flagKey: string,
    defaultValue: T,
    options?: GetValueOptions<T>,
  ): RawFlag<T> {
    return { value: this.getFlagValue<T>(flagKey, defaultValue, options) };
  }

  getFlags(): RawFlags {
    return Object.keys(this.flags).reduce(
      (flags, flagKey) => ({
        ...flags,
        [flagKey]: { value: this.flags[flagKey] },
      }),
      {} as RawFlags,
    );
  }

  on<T extends SupportedFlagTypes>(
    flagKey: string,
    defaultValue: T,
    callback: (flagValue: T) => void,
    options?: GetValueOptions<T>,
  ): () => void {
    return () => {};
  }

  onAnyFlagUpdated(callback: () => void): () => void {
    return () => {};
  }

  ready(): Promise<ReadyResponse> {
    return Promise.resolve({ reason: ReadyReason.FETCH });
  }

  updateFeatureFlagUser(
    featureFlagUser: FeatureFlagUser,
  ): Promise<ReadyResponse> {
    return Promise.resolve({ reason: ReadyReason.FETCH });
  }

  setAutomaticExposuresEnabled(
    enabled: boolean,
    predicate?: AutomaticExposureEventsPredicate,
  ) {}
}
