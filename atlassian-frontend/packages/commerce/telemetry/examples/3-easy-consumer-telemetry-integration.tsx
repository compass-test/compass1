import React from 'react';

// Pretend this is in a child package
import { InternalCommerceTelemetryIntegrations } from '../src';
// Pretend this is in a child package
import { useGasV3UIEventDispatch } from '../src/common/utils/dispatch-hooks';
// Pretend this is consumer code
import {
  GasV3Integration,
  MetalIntegration,
  SentryBrowserIntegration,
} from '../src/common/utils/integrations';

// For testing this example
export const EXAMPLE_BUTTON_TEST_ID = 'button-test-id';

const EventEmittingButton = () => {
  const dispatch = useGasV3UIEventDispatch();
  return (
    <button
      data-testid={EXAMPLE_BUTTON_TEST_ID}
      onClick={() => {
        // Just an example - You can utilise @atlassian/commerce-events-telemetry-react/atlaskit for an Atlaskit button
        dispatch({
          action: 'irrelevant',
          actionSubject: 'irrelevant',
          actionSubjectId: 'irrelevant',
        });
      }}
    >
      Click me
    </button>
  );
};

const PretendThisIsExportedFromADependency = () => (
  <InternalCommerceTelemetryIntegrations>
    <EventEmittingButton />
  </InternalCommerceTelemetryIntegrations>
);

const Example = () => (
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
          captureException: (event) => {
            console.log(
              'You can safely submit this event to Sentry via your `@sentry/browser` module',
              'https://www.npmjs.com/package/@sentry/browser',
              event,
            );
          },
        }}
      >
        <PretendThisIsExportedFromADependency />
      </SentryBrowserIntegration>
    </MetalIntegration>
  </GasV3Integration>
);

export default Example;
