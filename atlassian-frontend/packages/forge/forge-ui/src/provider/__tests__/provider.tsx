import React, { useEffect } from 'react';
import { render } from '@testing-library/react';
import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import { ProductEnvironment } from '@atlassian/forge-ui-types';

import { MetalClientConsumer } from '../../context';
import { ForgeUIExtensionPointProvider } from '..';

function mockAnalyticsClient() {
  return {
    sendUIEvent: jest.fn(),
    sendOperationalEvent: jest.fn(),
    sendTrackEvent: jest.fn(),
    sendScreenEvent: jest.fn(),
  };
}

const mockMetalClient = {
  destroy: jest.fn(),
};
const mockConstructorSpy = jest.fn().mockImplementation(() => mockMetalClient);
jest.mock('@atlassiansox/metal-client', () => ({
  __esModule: true,
  ...jest.requireActual<Object>('@atlassiansox/metal-client'),
  // Override constructor so we can spy it
  default: (args: any) => {
    mockConstructorSpy(args);
    return mockMetalClient;
  },
}));

describe('ForgeUIExtensionPointProvider', () => {
  it('provides a metal client', async () => {
    const metalClientContextUser = jest.fn();
    render(
      <ForgeUIExtensionPointProvider
        analyticsWebClient={mockAnalyticsClient()}
        environment={ProductEnvironment.DEVELOPMENT}
        page="jest"
        product="Jest"
      >
        <MetalClientConsumer>
          {(value) => metalClientContextUser(value)}
        </MetalClientConsumer>
      </ForgeUIExtensionPointProvider>,
    );

    expect(metalClientContextUser).toHaveBeenCalled();
    const {
      metalClient,
      environment,
      product,
      page,
    } = metalClientContextUser.mock.calls[0][0];
    expect(await metalClient).toBe(mockMetalClient);
    expect({ environment, product, page }).toEqual({
      environment: 'DEVELOPMENT',
      product: 'Jest',
      page: 'jest',
    });
  });

  it('adds an analytics listener', async () => {
    function AnalyticsOnMount() {
      const { createAnalyticsEvent } = useAnalyticsEvents();
      useEffect(() => {
        createAnalyticsEvent({
          eventType: 'ui',
          data: {
            action: 'mounted',
            actionSubject: 'myActionSubject',
            actionSubjectId: 'myActionSubjectId',
          },
        }).fire('forge-ui');
      }, [createAnalyticsEvent]);
      return null;
    }

    const analyticsClient = mockAnalyticsClient();

    const view = render(
      <ForgeUIExtensionPointProvider
        analyticsWebClient={analyticsClient}
        environment={ProductEnvironment.DEVELOPMENT}
        page="jest:test"
        product="Jest"
      >
        <AnalyticsOnMount />
        mounted
      </ForgeUIExtensionPointProvider>,
    );

    await view.findByText('mounted');

    expect(analyticsClient.sendUIEvent).toHaveBeenCalledWith({
      action: 'mounted',
      actionSubject: 'myActionSubject',
      actionSubjectId: 'myActionSubjectId',
      attributes: {
        moduleType: 'jest:test',
      },
      eventType: 'ui',
      source: 'unknown',
    });
  });
});
