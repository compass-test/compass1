import React from 'react';

import { FeatureFlagClientState } from '../../types';

/**
 * This context is stored separately so that it can be used in both
 * feature-flags-context *and* mock-feature-flags-context.
 */
export const FeatureFlagClientContext = React.createContext<
  FeatureFlagClientState | undefined
>(undefined);
