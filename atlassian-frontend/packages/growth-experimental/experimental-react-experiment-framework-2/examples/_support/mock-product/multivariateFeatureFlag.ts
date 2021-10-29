import React from 'react';
import { ProductEnvContext } from './support/productEnv';
import { ExperimentCore } from '../../../src/core/types';
import {
  ExperimentFeatureFlag,
  useDelegateMultivariateFeatureFlag,
} from '../../../src/abstract/featureFlag';
import { ExperimentResolution } from '../../../src/portable/resolver';

type RequiredUpstream = ExperimentCore;

export const usePluginMultivariateFeatureFlag = <
  Upstream extends RequiredUpstream,
  FlagValueType extends string
>(
  flagName: string,
  variants: FlagValueType[],
  defaultValue: FlagValueType,
) =>
  function useMultivariateFeatureFlag(
    pipeline: Upstream,
  ): Upstream & ExperimentFeatureFlag<FlagValueType> & ExperimentResolution {
    const productContext = React.useContext(ProductEnvContext);

    // variants will be used here in confluence frontend since it's using @atlaskit/feature-flag-client
    const flagValue = productContext.featureFlag.getFlag(
      flagName,
      variants,
      defaultValue,
    );

    return useDelegateMultivariateFeatureFlag<Upstream, FlagValueType>({
      flagName,
      flagValue: flagValue as FlagValueType,
      otherFeatureFlagAttributes: {
        tags: ['measurement', 'confluence'],
      },
    })(pipeline);
  };
