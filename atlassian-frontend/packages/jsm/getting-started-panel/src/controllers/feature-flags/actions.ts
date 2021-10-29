import FeatureFlagWebClient, {
  Identifiers,
  EnvironmentType,
} from '@atlassiansox/feature-flag-web-client';
import AnalyticsWebClient from '@atlassiansox/analytics-web-client';
import { Environment } from '../../common/types';
import { StoreApi } from './types';
import {
  FX3_PRODUCTION_KEY,
  FX3_STAGING_KEY,
  FX3_LOCAL_KEY,
  featureFlagDefaultValues,
  FeatureFlagKey,
  FeatureFlagMap,
} from './constants';

const getClientKey = (environment: Environment) => {
  switch (environment) {
    case Environment.Prod:
      return FX3_PRODUCTION_KEY;
    case Environment.Staging:
      return FX3_STAGING_KEY;
    default:
      return FX3_LOCAL_KEY;
  }
};

const getFx3EnvironmentType = (environment: Environment) => {
  switch (environment) {
    case Environment.Prod:
      return EnvironmentType.PROD;
    case Environment.Staging:
      return EnvironmentType.STAGING;
    default:
      return EnvironmentType.LOCAL;
  }
};

const FX3_CLIENT_OPTIONS = {
  shouldSendExposureEvent: false,
};

export const initialiseFlags = (
  analyticsClient: typeof AnalyticsWebClient,
  environment: Environment,
  cloudId: string,
) => async ({ getState, setState }: StoreApi) => {
  // We assume the environment and cloud id never change
  if (!getState().isInitialised) {
    const featureFlagClient = new FeatureFlagWebClient(
      getClientKey(environment),
      analyticsClient,
      {
        identifier: {
          type: Identifiers.TENANT_ID,
          value: cloudId,
        },
        custom: { cloudId },
      },
      {
        productKey: 'jira-service-management',
        environment: getFx3EnvironmentType(environment),
      },
    );

    await featureFlagClient.ready();

    const getFlagValueAndSubscribe = <T extends FeatureFlagKey>(
      flagKey: T,
      defaultValue: FeatureFlagMap[T],
    ) => {
      featureFlagClient.on(
        flagKey,
        defaultValue,
        (newValue) => {
          setState({
            gspFeatureFlagValues: {
              ...getState().gspFeatureFlagValues,
              [flagKey]: newValue,
            },
          });
        },
        FX3_CLIENT_OPTIONS,
      );

      return featureFlagClient.getFlagValue<FeatureFlagMap[T]>(
        flagKey,
        defaultValue,
        FX3_CLIENT_OPTIONS,
      );
    };

    // initial fetch of all the flag values
    const gspFeatureFlagValues: FeatureFlagMap = Object.values(
      FeatureFlagKey,
    ).reduce((acc: FeatureFlagMap, flagKey: FeatureFlagKey) => {
      return {
        ...acc,
        [flagKey]: getFlagValueAndSubscribe(
          flagKey,
          featureFlagDefaultValues[flagKey],
        ),
      };
    }, featureFlagDefaultValues);

    setState({
      isInitialised: true,
      gspFeatureFlagValues,
    });
  }
};

export const actions = { initialiseFlags };

export type Actions = typeof actions;
