import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import AnalyticsWebClient from '@atlassiansox/analytics-web-client';

import { withAnalyticsProvider } from '../../../analytics/AnalyticsProvider';
import {
  useFireAnalyticsEvent,
  withFireAnalyticsEvent,
} from '../../../analytics/FireAnalyticsEvent';
import {
  EVENT_TYPE,
  WithFireAnalyticsEventsProps,
} from '../../../analytics/types';

describe('FireAnalyticsEvent', () => {
  it('should fire correnct event using useFireAnalyticsEvent ', () => {
    const mockSendUIEvent = jest.fn();
    const mockedAnalyticsClient: typeof AnalyticsWebClient = {
      sendOperationalEvent: jest.fn(),
      sendUIEvent: mockSendUIEvent,
      sendTrackEvent: jest.fn(),
      sendScreenEvent: jest.fn(),
    };

    const payload = {
      actionSubject: 'renderer',
      action: 'lcp',
      attributes: {
        docWithFewLoadable: 1000,
      },
    };

    const expectedPayload = {
      ...payload,
      eventType: EVENT_TYPE.UI,
      source: 'unknown',
    };

    const MockedApp = () => {
      const { fireUIAnalyticEvent } = useFireAnalyticsEvent();
      fireUIAnalyticEvent(payload);

      return <div></div>;
    };
    const App = withAnalyticsProvider(MockedApp, mockedAnalyticsClient);

    render(<App />);
    expect(mockSendUIEvent).toHaveBeenCalledTimes(1);
    expect(mockSendUIEvent).toHaveBeenCalledWith(expectedPayload);
  });

  it('should fire correnct event using withFireAnalyticsEvent ', () => {
    const mockSendOperationalEvent = jest.fn();
    const mockSendTrackEvent = jest.fn();
    const mockSendScreenEvent = jest.fn();
    const mockedAnalyticsClient: typeof AnalyticsWebClient = {
      sendOperationalEvent: mockSendOperationalEvent,
      sendUIEvent: jest.fn(),
      sendTrackEvent: mockSendTrackEvent,
      sendScreenEvent: mockSendScreenEvent,
    };

    const payload = {
      actionSubject: 'renderer',
      action: 'lcp',
      attributes: {
        docWithFewLoadable: 1000,
      },
    };

    const MockedApp = (props: WithFireAnalyticsEventsProps) => {
      const {
        fireOperationalAnalyticEvent,
        fireTrackAnalyticEvent,
        fireScreenAnalyticEvent,
      } = props.fireAnalyticsEvent;

      fireOperationalAnalyticEvent(payload);
      fireTrackAnalyticEvent(payload);
      fireScreenAnalyticEvent(payload);

      return <div></div>;
    };
    const App = withAnalyticsProvider(
      withFireAnalyticsEvent(MockedApp),
      mockedAnalyticsClient,
    );

    render(<App />);
    expect(mockSendOperationalEvent).toHaveBeenCalledTimes(1);
    expect(mockSendTrackEvent).toHaveBeenCalledTimes(1);
    expect(mockSendScreenEvent).toHaveBeenCalledTimes(1);
  });
});
