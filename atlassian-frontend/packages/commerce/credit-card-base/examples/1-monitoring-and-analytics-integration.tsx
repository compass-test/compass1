import React from 'react';

import {
  GasV3Integration,
  MetalIntegration,
  SentryBrowserIntegration,
} from '../src/common/utils/telemetry-integrations';

import PreviousExample from './0-basic-example';

const MonitoringAndAnalyticsExample = () => (
  // So long as you wrap the integrations ARROUND the the rest of the CC package, code,
  // you'll receive all analytics & monitoring events that are emitted from the package
  <GasV3Integration
    client={{
      sendUIEvent: (event) => {
        console.log(
          'You can safely submit this event to GasV3 via your @atlassiansox/analytics-web-client client.',
          'https://developer.atlassian.com/platform/metal/',
          event,
        );
      },
      sendScreenEvent: (event) => console.log('screen', event),
      sendTrackEvent: (event) => console.log('track', event),
      sendOperationalEvent: (event) => console.log('operational', event),
    }}
  >
    <MetalIntegration
      client={{
        metric: {
          submit: (event) => {
            console.log(
              'You can safely submit this event to SignalFX via your @atlassiansox/metal-client client.',
              'https://developer.atlassian.com/platform/metal/',
              event,
            );
          },
        },
      }}
    >
      <SentryBrowserIntegration
        client={{
          captureException: (event) =>
            console.log(
              'You can safely submit this event to Sentry via your `@sentry/browser` module',
              'https://www.npmjs.com/package/@sentry/browser',
              event,
            ),
        }}
      >
        <PreviousExample />
      </SentryBrowserIntegration>
    </MetalIntegration>
  </GasV3Integration>
);

export default MonitoringAndAnalyticsExample;
