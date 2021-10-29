/**
 * We don't ever want (or need) to send real telemetry data during unit tests.
 * As such, we provide a mock for the client.
 *
 * This file should always be used as a mock automatically.
 */

/* TODO: bolt doesn't allow workspace dependencies to be root dependencies.
   However, it is required for this functionality to work without lint errors.
   Lint disable comment can be removed if supported in future (E.g. It'll be valid if switched to yarn 1/2 or npm) */
// eslint-disable-next-line import/no-extraneous-dependencies
// export * from '@atlassian/commerce-telemetry-clients-mock-jest';

/* TODO: Orginally written as a package called "@atlassian/commerce-telemetry-clients-mock-jest" (see above)
   Directly implementing source here for now to avoid the following error:
   "The likely causes are introducing a circular dependency between packages or directly importing from the source of another package via relative path.
   Remove the circular dependency and/or remove the relative path to resolve the issue."
 */

import MetalClient, { catalog } from '@atlassiansox/metal-client';

export { catalog };

// TODO: Remove 'any's

// TODO: This is definately missing types
const metalClient = {
  metric: {
    submit: jest.fn(),
  },
};
export const createMonitoringClient = (): MetalClient => {
  return metalClient as any;
};

const analyticsClient = {
  sendUIEvent: jest.fn(),
  sendScreenEvent: jest.fn(),
  sendTrackEvent: jest.fn(),
  sendOperationalEvent: jest.fn(),
};
export const createAnalyticsClient = (): any => {
  return analyticsClient;
};

const sentryClient = {
  captureException: jest.fn(),
  captureEvent: jest.fn(),
  captureMessage: jest.fn(),
};
export const createSentryClient = () => sentryClient;
