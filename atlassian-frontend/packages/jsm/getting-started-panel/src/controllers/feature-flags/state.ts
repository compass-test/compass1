import { useEffect } from 'react';
import { di } from 'react-magnetic-di';
import { createHook, createStore } from 'react-sweet-state';
import AnalyticsWebClient from '@atlassiansox/analytics-web-client';
import { Environment } from '../../common/types';
import { actions, Actions } from './actions';
import { State } from './types';
import {
  FeatureFlagKey,
  featureFlagDefaultValues,
  FeatureFlagMap,
} from './constants';

const initialState: State = {
  isInitialised: false,
  gspFeatureFlagValues: featureFlagDefaultValues,
};

const GspFeatureFlags = createStore<State, Actions>({
  initialState,
  actions,
  name: 'gsp-feature-flags',
});

export const useGspFeatureFlags = createHook(GspFeatureFlags);

export const useInitialiseGspFeatureFlags = (
  analyticsClient: typeof AnalyticsWebClient,
  environment: Environment,
  cloudId: string,
) => {
  const [{ isInitialised }, { initialiseFlags }] = useGspFeatureFlags();

  useEffect(() => {
    initialiseFlags(analyticsClient, environment, cloudId);
  }, [initialiseFlags, analyticsClient, environment, cloudId]);

  return { isInitialised };
};

export const useGspFeatureFlag = <T extends FeatureFlagKey>(
  flagKey: T,
): FeatureFlagMap[T] => {
  di(useGspFeatureFlags);
  const [{ gspFeatureFlagValues }] = useGspFeatureFlags();
  return gspFeatureFlagValues[flagKey];
};
