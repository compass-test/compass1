import React, { ReactNode, useContext } from 'react';

import { SupportedFlagTypes } from '@atlassiansox/feature-flag-web-client';

import { FeatureFlagClientContext } from '../../services';
import { FeatureFlagClientState, FeatureFlagResult } from '../../types';

export const FeatureFlagClientProvider = ({
  value,
  children,
}: {
  value: FeatureFlagClientState;
  children: ReactNode;
}) => (
  <FeatureFlagClientContext.Provider value={value}>
    {children}
  </FeatureFlagClientContext.Provider>
);

export const useFeatureFlagClient = () => {
  const featureFlagClientState = useContext(FeatureFlagClientContext);

  if (featureFlagClientState === undefined) {
    throw new Error(
      'useFeatureFlags must be used within a FeatureFlagClientProvider',
    );
  }

  return featureFlagClientState;
};

/**
 Returns the value of the given feature flag.
 If there is an error while fetching the flag, or if it's still loading, then defaultValue will returned as the value
 */
export function useFeatureFlag<V extends SupportedFlagTypes>(
  flagKey: string,
  defaultValue: V,
): FeatureFlagResult<V> {
  const { client, loading, error } = useFeatureFlagClient();

  const value = client?.getFlagValue(flagKey, defaultValue);

  if (loading || error || value == null) {
    return {
      value: defaultValue,
      loading,
      error,
    };
  }

  return {
    value,
    loading,
    error,
  };
}
