import MetalClient, { catalog } from '@atlassiansox/metal-client';

export { catalog };

// TODO: Should make this a separate package like the jest package

export type MetalSubmissionFn = MetalClient['metric']['submit'];

export const createMonitoringClient = (
  submitFn: MetalClient['metric']['submit'] = () => {},
): MetalClient => {
  // TODO: This is definately missing types
  const mockedClient: MetalClient = {
    metric: {
      submit: submitFn,
    },
  } as any;

  return mockedClient;
};

export const createAnalyticsClient = ({
  sendUIEvent = () => {},
  sendScreenEvent = () => {},
  sendTrackEvent = () => {},
  sendOperationalEvent = () => {},
  // TODO: Use @atlassiansox/analytics-web-client if they ever become available
} = {}): any => {
  return {
    sendUIEvent,
    sendScreenEvent,
    sendTrackEvent,
    sendOperationalEvent,
  };
};

export const createSentryClient = ({
  captureException = () => {},
  captureEvent = () => {},
  captureMessage = () => {},
} = {}) => ({
  captureException,
  captureEvent,
  captureMessage,
});
