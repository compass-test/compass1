import React, { ReactNode } from 'react';

import {
  FeatureFlagClientContext,
  FlagMap,
  MockFeatureFlagClient,
} from '../../services';

type MockFeatureFlagClientProviderProps = {
  flags?: FlagMap;
  children?: ReactNode;
};

export function MockFeatureFlagClientProvider(
  props: MockFeatureFlagClientProviderProps,
) {
  const client = new MockFeatureFlagClient(props.flags ?? {});

  const state = {
    client,
    loading: false,
    error: undefined,
  };

  return (
    <FeatureFlagClientContext.Provider value={state}>
      {props.children}
    </FeatureFlagClientContext.Provider>
  );
}
