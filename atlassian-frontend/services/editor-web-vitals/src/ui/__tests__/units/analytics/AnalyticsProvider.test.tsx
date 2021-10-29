import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import {
  useAnalyticsEvents,
  AnalyticsEventPayload,
} from '@atlaskit/analytics-next';
import AnalyticsWebClient from '@atlassiansox/analytics-web-client';

import { withAnalyticsProvider } from '../../../analytics/AnalyticsProvider';
import { EVENT_TYPE } from '../../../analytics/types';

describe('AnalyticsProvider', () => {
  const createMockedApp = (
    eventsPayload: AnalyticsEventPayload[],
    analyticsWebClientObjectProperties: { [key: string]: jest.Mock },
  ) => {
    const mockedAnalyticsClient: typeof AnalyticsWebClient = {
      sendOperationalEvent: jest.fn(),
      sendUIEvent: jest.fn(),
      sendTrackEvent: jest.fn(),
      sendScreenEvent: jest.fn(),
      ...analyticsWebClientObjectProperties,
    };

    const MockedApp = () => {
      const { createAnalyticsEvent } = useAnalyticsEvents();
      eventsPayload.forEach((eventPayload) => {
        const analyticsEvent = createAnalyticsEvent(eventPayload);
        analyticsEvent.fire('editorSandbox');
      });

      return <div></div>;
    };
    return withAnalyticsProvider(MockedApp, mockedAnalyticsClient);
  };

  it('should call correct event sender based on event type', () => {
    const mockSendUIEvent = jest.fn();
    const mockSendOperationalEvent = jest.fn();
    const mockSendTrackEvent = jest.fn();
    const App = createMockedApp(
      [
        {
          actionSubject: 'renderer',
          action: 'ttr',
          attributes: {
            docWithoutLoadable: 1000,
          },
          source: 'pollinator',
          eventType: EVENT_TYPE.UI,
        },
        {
          actionSubject: 'renderer',
          action: 'ttr',
          attributes: {
            docWithoutLoadable: 1000,
          },
          source: 'pollinator',
          eventType: EVENT_TYPE.OPERATIONAL,
        },
        {
          actionSubject: 'renderer',
          action: 'ttr',
          attributes: {
            docWithoutLoadable: 1000,
          },
          source: 'pollinator',
          eventType: EVENT_TYPE.UI,
        },
      ],
      {
        sendUIEvent: mockSendUIEvent,
        sendOperationalEvent: mockSendOperationalEvent,
        sendTrackEvent: mockSendTrackEvent,
      },
    );
    render(<App />);
    expect(mockSendUIEvent).toHaveBeenCalledTimes(2);
    expect(mockSendOperationalEvent).toHaveBeenCalledTimes(1);
    expect(mockSendTrackEvent).toHaveBeenCalledTimes(0);
  });

  it('should call correct event sender based on event type with payload', () => {
    const mockSendUIEvent = jest.fn();
    const payload = {
      actionSubject: 'renderer',
      action: 'ttr',
      attributes: {
        docWithoutLoadable: 1000,
      },
      source: 'pollinator',
      eventType: EVENT_TYPE.UI,
    };
    const App = createMockedApp([payload], {
      sendUIEvent: mockSendUIEvent,
    });
    render(<App />);
    expect(mockSendUIEvent).toHaveBeenCalledWith(payload);
  });
});
