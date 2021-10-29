import React from 'react';
import ErrorBoundary from '@atlaskit/gatsby-theme-brisk/src/components/error-boundary';
import AnalyticsProvider from './src/components/analytics-provider';
import GlobalError from './src/components/global-error';
import featureFlags from './feature-flags';

// eslint-disable-next-line react/prop-types
export const wrapRootElement = ({ element }) => {
  return (
    <AnalyticsProvider>
      <ErrorBoundary fallback={<GlobalError />}>{element}</ErrorBoundary>
    </AnalyticsProvider>
  );
};

export const onClientEntry = () => {
  try {
    // TODO: delete this after it's been deployed
    localStorage.removeItem('ff-exampleCodesandbox');

    Object.entries(featureFlags).forEach(([key, value]) => {
      // Initialize if it doesn't exist
      // OR override if the default flag state is true
      // Don't set the item if the user has enabled a flag that is disabled by default
      if (localStorage.getItem(`ff-${key}`) === null || value === true) {
        localStorage.setItem(`ff-${key}`, value);
      }
    });
  } catch (err) {
    console.error(err);
  }
};
