import { FeatureFlagClientInterface } from '@atlassiansox/feature-flag-web-client';

import { FlagMap } from './services';

export type FeatureFlagClientState = {
  client: FeatureFlagClientInterface | undefined;
  loading: boolean;
  error: any | undefined;
};

export type FeatureFlagResult<V> = {
  loading: boolean;
  value: V; // value will be defaultValue if the flag is still loading or there is an error
  error: any | undefined;
};

export type FeatureFlagMockProps = {
  flags?: FlagMap;
};
