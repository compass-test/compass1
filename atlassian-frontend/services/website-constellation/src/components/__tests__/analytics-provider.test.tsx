import * as mocks from './analytics-provider.test.mock';
import React from 'react';
import { render } from '@testing-library/react';
import {
  ContextualAnalyticsData,
  FireScreenAnalytics,
  FireUIAnalytics,
  FireTrackAnalytics,
  FireOperationalAnalytics,
} from '@atlassian/analytics-bridge';
import { createAnalyticsClient } from '../../utils/analytics';
import AnalyticsProvider, {
  injectUrlToAttributes,
} from '../analytics-provider';
import { version } from '../../../package.json';

describe('AnalyticsProvider', () => {
  beforeEach(() => {
    delete process.env.GATSBY_CONSTELLATION_ENVIRONMENT;
    mocks.mockStartUIViewedEvent.mockReset();
    mocks.mockSendUIEvent.mockReset();
    mocks.mockSendTrackEvent.mockReset();
    mocks.mockSendOperationalEvent.mockReset();
    mocks.mockSendScreenEvent.mockReset();
  });

  it('should construct the client with default values', () => {
    render(
      <AnalyticsProvider>
        <ContextualAnalyticsData>
          <FireScreenAnalytics />
        </ContextualAnalyticsData>
      </AnalyticsProvider>,
    );

    expect(createAnalyticsClient).toHaveBeenCalledWith({
      version,
      env: 'local',
      locale: 'en-US',
      product: 'designSystemDocs',
      useLegacyUrl: true,
    });
  });

  it('should start ui viewed event on the first analytic event fired', () => {
    render(
      <AnalyticsProvider>
        <ContextualAnalyticsData>
          <FireScreenAnalytics />
        </ContextualAnalyticsData>
      </AnalyticsProvider>,
    );

    expect(mocks.mockStartUIViewedEvent).toHaveBeenCalled();
  });

  it('should only fire the ui viewed event once', () => {
    const { rerender } = render(
      <AnalyticsProvider>
        <ContextualAnalyticsData>
          <FireScreenAnalytics />
        </ContextualAnalyticsData>
      </AnalyticsProvider>,
    );

    rerender(
      <AnalyticsProvider>
        <ContextualAnalyticsData>
          <FireScreenAnalytics key="1" />
        </ContextualAnalyticsData>
      </AnalyticsProvider>,
    );

    expect(mocks.mockStartUIViewedEvent).toHaveBeenCalledTimes(1);
  });

  it('should fire a ui event', () => {
    render(
      <AnalyticsProvider>
        <ContextualAnalyticsData>
          <FireUIAnalytics eventName="button clicked" />
        </ContextualAnalyticsData>
      </AnalyticsProvider>,
    );

    expect(mocks.mockSendUIEvent).toHaveBeenCalled();
  });

  it('should fire a screen event', () => {
    render(
      <AnalyticsProvider>
        <ContextualAnalyticsData>
          <FireScreenAnalytics />
        </ContextualAnalyticsData>
      </AnalyticsProvider>,
    );

    expect(mocks.mockSendScreenEvent).toHaveBeenCalled();
  });

  it('should fire a operational event', () => {
    render(
      <AnalyticsProvider>
        <ContextualAnalyticsData>
          <FireOperationalAnalytics eventName="page loaded" />
        </ContextualAnalyticsData>
      </AnalyticsProvider>,
    );

    expect(mocks.mockSendOperationalEvent).toHaveBeenCalled();
  });

  it('should fire a track event', () => {
    render(
      <AnalyticsProvider>
        <ContextualAnalyticsData>
          <FireTrackAnalytics eventName="issue created" />
        </ContextualAnalyticsData>
      </AnalyticsProvider>,
    );

    expect(mocks.mockSendTrackEvent).toHaveBeenCalled();
  });

  it('should use environment from dev', () => {
    process.env.GATSBY_CONSTELLATION_ENVIRONMENT = 'PROD';

    render(
      <AnalyticsProvider>
        <ContextualAnalyticsData>
          <FireScreenAnalytics />
        </ContextualAnalyticsData>
      </AnalyticsProvider>,
    );

    expect(createAnalyticsClient).toHaveBeenCalledWith({
      version,
      env: 'production',
      locale: 'en-US',
      product: 'designSystemDocs',
      useLegacyUrl: true,
    });
  });

  it('should send through global attributes data', () => {
    render(
      <AnalyticsProvider>
        <ContextualAnalyticsData>
          <FireScreenAnalytics />
        </ContextualAnalyticsData>
      </AnalyticsProvider>,
    );

    expect(mocks.mockSendScreenEvent).toHaveBeenCalledWith(undefined, null, {
      namespaces: '',
      url: 'http://localhost/',
    });
  });

  it('should default to local environment if invalid env variable', () => {
    process.env.GATSBY_CONSTELLATION_ENVIRONMENT = 'DONTEXIST';

    render(
      <AnalyticsProvider>
        <ContextualAnalyticsData>
          <FireScreenAnalytics />
        </ContextualAnalyticsData>
      </AnalyticsProvider>,
    );

    expect(createAnalyticsClient).toHaveBeenCalledWith({
      version,
      env: 'local',
      locale: 'en-US',
      product: 'designSystemDocs',
      useLegacyUrl: true,
    });
  });
});

describe('injectUrlToAttributes', () => {
  it('should add url to attributes', () => {
    const eventPayload = {
      attributes: {
        name: 'brandHome',
        entriesCount: 0,
        namespaces: 'indexScreen',
      },
      name: 'indexScreen',
    };
    expect(injectUrlToAttributes(eventPayload).attributes.url).toBe(
      location.href,
    );
  });
});
