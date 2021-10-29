import React, { createContext, useContext } from 'react';

import { FeatureFlags } from '../../common/types';

const context = createContext<FeatureFlags>({} as any);

export function useFeatureFlags(): FeatureFlags {
  return useContext<FeatureFlags>(context);
}

type Props = {
  featureFlags: FeatureFlags;
  children: React.ReactNode;
};

export const FeatureFlagsProvider: React.FC<Props> = ({
  children,
  featureFlags,
}) => {
  return <context.Provider value={featureFlags} children={children} />;
};
