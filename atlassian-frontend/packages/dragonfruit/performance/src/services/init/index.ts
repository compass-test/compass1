import { version } from 'react';

import AnalyticsWebClient from '@atlassiansox/analytics-web-client';
import { FeatureFlagClientInterface } from '@atlassiansox/feature-flag-web-client';

import { browserMetrics } from '@atlassian/browser-metrics';
import {
  UI_BM3_ENABLED,
  UI_BM3_ENABLED_DEFAULT_VALUE,
} from '@atlassian/dragonfruit-feature-flags';

declare const COMPASS_BUILD_KEY: string;

const getBaseName = (assetPathOrURL: string) =>
  assetPathOrURL.split('#')[0].split('?')[0].split('/').pop();

const sanitiseAssetName = (isDevelopment: boolean) => (assetURL: string) => {
  const baseName = getBaseName(assetURL);
  if (!baseName) {
    return '';
  }

  // report "[name.with.dots].[ext]"
  // in debug we expect "[name.with.dots].[hash].bundle.[ext]"
  // in production we expect "[name.with.dots].[hash].bundle.[ext]"
  const split = baseName.split('.');
  return isDevelopment || split.length < 4
    ? baseName
    : [...split.slice(0, -3), ...split.slice(-1)].join('.');
};

const sanitiseEndpoints = (resourceURL: string) => {
  try {
    const url = new URL(resourceURL);
    const operation = url.searchParams.get('operation');
    if (operation) {
      return `${url.pathname}?operation=${operation}`;
    }
    return url.pathname;
  } catch (e) {
    return '';
  }
};

let initialised = false;

export const initBM3 = (
  awc: typeof AnalyticsWebClient,
  env: string,
  featureFlagClient?: FeatureFlagClientInterface,
) => {
  if (
    !awc ||
    !featureFlagClient ||
    !env ||
    initialised ||
    !featureFlagClient.getFlagValue(
      UI_BM3_ENABLED,
      UI_BM3_ENABLED_DEFAULT_VALUE,
    )
  ) {
    return;
  }

  initialised = true;

  const info = {
    product: 'compass',
    app: {
      version: { web: COMPASS_BUILD_KEY },
      framework: { name: 'react', version },
    },
    region: 'unknown',
  };

  const endpoints = {
    eventPipelineClient: Promise.resolve(awc),
  };

  const plugins = {
    featureFlags: {
      client: Promise.resolve({
        getValue: (featureFlagName: string) => {
          return (
            featureFlagClient.getFlagValue(featureFlagName, false) || false
          );
        },
      }),
    },
    resourceTimings: {
      sanitiseEndpoints,
      mapResources: sanitiseAssetName(env === 'local'),
    },
  };

  browserMetrics.init({
    info,
    endpoints,
    plugins,
    events: {},
  });

  browserMetrics.startPageLoad({ isInitial: true });
};
