import React, { createContext, ReactNode, useContext } from 'react';

type FeatureFlagKey = 'enableKeyboardNavigation' | string;

export type FeatureFlags = Record<FeatureFlagKey, boolean>;

const DEFAULT_FLAG_STATE: FeatureFlags = {};

export const FeatureFlagsContext = createContext<FeatureFlags>(
  DEFAULT_FLAG_STATE,
);

interface ProviderProps {
  children: ReactNode;
  flags?: FeatureFlags;
}

export const FeatureFlagsProvider = ({
  children,
  flags = DEFAULT_FLAG_STATE,
}: ProviderProps) => {
  return (
    <FeatureFlagsContext.Provider value={flags}>
      {children}
    </FeatureFlagsContext.Provider>
  );
};

export const useFeatureFlag = (key: FeatureFlagKey, defaultValue: boolean) => {
  const flags = useContext(FeatureFlagsContext);
  const value = flags[key];

  if (typeof value === 'undefined') {
    return defaultValue;
  }

  return value;
};
