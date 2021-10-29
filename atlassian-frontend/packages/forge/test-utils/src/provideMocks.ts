/* eslint-env jest */
import MetalClient from '@atlassiansox/metal-client';

/**
 * mocks the @atlassiansox/metal-client import and returns the spies
 */
export function provideMockMetalClient() {
  const mockMetalMetricSubmitSpy = jest.fn();
  const mockMetalErrorSubmitSpy = jest.fn();
  const mockMetalClientDestroySpy = jest.fn();

  // @ts-ignore - does not need to have all the attributes of MetalClient for this test
  const mockMetalClientMock = {
    metric: {
      submit: mockMetalMetricSubmitSpy,
    },
    error: {
      submit: mockMetalErrorSubmitSpy,
    },
    destroy: mockMetalClientDestroySpy,
  } as MetalClient;

  jest.mock('@atlassiansox/metal-client', () => {
    const { catalog } = jest.requireActual('@atlassiansox/metal-client');
    return {
      __esModule: true,
      // This must be a proper function rather than an arrow function so it can act as a class constructor (new)
      default: function () {
        return mockMetalClientMock;
      },
      envTypes: {
        LOCAL: 'local',
        DEV: 'dev',
        STAGING: 'staging',
        PROD: 'prod',
      },
      catalog: {
        performance: {
          REQUEST_TIMING: catalog.performance.REQUEST_TIMING,
          COMPONENT_READY: catalog.performance.COMPONENT_READY,
        },
        metric: {
          submit: mockMetalMetricSubmitSpy,
        },
        error: {
          submit: mockMetalErrorSubmitSpy,
        },
        destroy: mockMetalClientDestroySpy,
      },
      PerformanceMarkPlugin: jest.fn(),
    };
  });

  return {
    metalMetricSubmitSpy: mockMetalMetricSubmitSpy,
    metalErrorSubmitSpy: mockMetalErrorSubmitSpy,
    metalClientMock: mockMetalClientMock,
    metalClientDestroySpy: mockMetalClientDestroySpy,
  };
}

/**
 * mocks the @sentry/browser import and returns the spies
 */
export function provideMockSentryClient() {
  const browserClientConstructorSpy = jest.fn();
  const closeSpy = jest.fn();

  class BrowserClient {
    // @ts-ignore asserting what the constructor is called with
    constructor(...args) {
      browserClientConstructorSpy(...args);
    }
    close = closeSpy;
  }

  const hubConstructorSpy = jest.fn();
  const scope = {
    setTag: jest.fn(),
    setExtra: jest.fn(),
  };
  const hubWithScopeSpy = jest.fn().mockImplementation((handler) => {
    handler(scope);
  });

  const captureExceptionSpy = jest.fn();

  class Hub {
    // @ts-ignore asserting what the constructor is called with
    constructor(client) {
      hubConstructorSpy(client);
    }
    captureException = captureExceptionSpy;
    withScope = hubWithScopeSpy;
  }

  jest.doMock('@sentry/browser');
  // eslint-disable-next-line import/no-extraneous-dependencies
  const sentryBrowser = require('@sentry/browser');
  (sentryBrowser.BrowserClient as any).mockImplementation(
    (...args: any[]) => new BrowserClient(...args),
  );
  (sentryBrowser.Hub as any).mockImplementation(
    (client: any) => new Hub(client),
  );

  return {
    client: {
      constructor: browserClientConstructorSpy,
      close: closeSpy,
    },
    hub: {
      captureException: captureExceptionSpy,
      constructor: hubConstructorSpy,
      withScope: hubWithScopeSpy,
      scope,
    },
  };
}
