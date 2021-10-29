import React, { useEffect } from 'react';
import { render } from '@testing-library/react';
import {
  AnalyticsContext,
  withAnalyticsEvents,
  WithAnalyticsEventsProps,
} from '@atlaskit/analytics-next';
import { getHasBeenCalledPromise } from '@atlassian/aux-test-utils';

import ForgeUIAnalyticsListener, {
  AnalyticsWebClient,
  FORGE_UI_ANALYTICS_CHANNEL,
} from '../ForgeUIAnalyticsListener';

describe('ForgeUIAnalyticsListener', () => {
  let analyticsWebClientMock: AnalyticsWebClient;

  beforeEach(() => {
    analyticsWebClientMock = {
      sendUIEvent: jest.fn(),
      sendOperationalEvent: jest.fn(),
      sendTrackEvent: jest.fn(),
      sendScreenEvent: jest.fn(),
    };
  });

  const eventPayload = {
    action: 'test-action',
    actionSubject: 'test-action-subject',
    actionSubjectId: 'test-action-subject-id',
    attributes: { testAttribute: 'test-attribute' },
  };
  const ComponentContainingFiredEvent = withAnalyticsEvents()(
    ({ createAnalyticsEvent }: WithAnalyticsEventsProps) => {
      useEffect(() => {
        if (createAnalyticsEvent) {
          createAnalyticsEvent({
            eventType: 'ui',
            data: eventPayload,
          }).fire(FORGE_UI_ANALYTICS_CHANNEL);
        }
      }, [createAnalyticsEvent]);
      return <div />;
    },
  );

  test('events fired on the forge-ui channel are correctly captured, processed and fired via the analytics web client', async () => {
    const sendUIEventHasBeenCalled = getHasBeenCalledPromise(
      analyticsWebClientMock.sendUIEvent as jest.Mock,
    );

    const WrapperComponent = () => {
      return (
        <ForgeUIAnalyticsListener client={analyticsWebClientMock}>
          <ComponentContainingFiredEvent />
        </ForgeUIAnalyticsListener>
      );
    };
    render(<WrapperComponent />);

    await sendUIEventHasBeenCalled;

    expect(analyticsWebClientMock.sendUIEvent).toHaveBeenCalledWith({
      ...eventPayload,
      source: 'unknown',
      eventType: 'ui',
    });
  });

  test('handles common attributes passed via analytics context and the listener itself', async () => {
    const sendUIEventHasBeenCalled = getHasBeenCalledPromise(
      analyticsWebClientMock.sendUIEvent as jest.Mock,
    );
    const contextAttributes = {
      testContextAttribute: 'test-context-attribute',
    };
    const testSource = 'test-source';
    const WrapperComponent = () => {
      return (
        <ForgeUIAnalyticsListener
          client={analyticsWebClientMock}
          commonAttributes={{ common: 'attribute' }}
        >
          <AnalyticsContext
            data={{
              forgeUIAnalyticsContext: {
                source: testSource,
              },
            }}
          >
            <AnalyticsContext
              data={{
                forgeUIAttributes: contextAttributes,
              }}
            >
              <ComponentContainingFiredEvent />
            </AnalyticsContext>
          </AnalyticsContext>
        </ForgeUIAnalyticsListener>
      );
    };
    render(<WrapperComponent />);

    await sendUIEventHasBeenCalled;

    expect(analyticsWebClientMock.sendUIEvent).toHaveBeenCalledWith({
      ...eventPayload,
      attributes: {
        common: 'attribute',
        ...contextAttributes,
        ...eventPayload.attributes,
      },
      source: testSource,
      eventType: 'ui',
    });
  });
});
