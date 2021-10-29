import React from 'react';
import { ProductEnvContext } from './support/productEnv';
import { ExperimentCore } from '../../../src/core/types';
import {
  ExperimentFeatureFlag,
  useDelegateBooleanFeatureFlag,
} from '../../../src/abstract/featureFlag';
import { ExperimentResolution } from '../../../src/portable/resolver';

type RequiredUpstream = ExperimentCore;

type CohortMap = Parameters<
  typeof useDelegateBooleanFeatureFlag
>[0]['cohortMap'];

export const usePluginBooleanFeatureFlag = <Upstream extends RequiredUpstream>(
  flagName: string,
  cohortMap: CohortMap,
  defaultValue: boolean,
) =>
  function useBooleanFeatureFlag(
    pipeline: Upstream,
  ): Upstream & ExperimentFeatureFlag<boolean> & ExperimentResolution {
    const productContext = React.useContext(ProductEnvContext);

    // variants will be used here in confluence frontend since it's using @atlaskit/feature-flag-client
    const flagValue = productContext.featureFlag.getFlag(
      flagName,
      [true, false],
      defaultValue,
    );

    if (typeof flagValue !== 'boolean') {
      throw new Error(
        `expecting boolean feature flag value, but received ${flagValue} instead`,
      );
    }

    return useDelegateBooleanFeatureFlag<Upstream>({
      flagName,
      flagValue,
      cohortMap,
      otherFeatureFlagAttributes: {
        tags: ['measurement', 'confluence'],
      },
    })(pipeline);
  };
