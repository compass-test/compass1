import { catalog } from '@atlassiansox/metal-client';

import {
  createAnalyticsClient,
  createMonitoringClient,
  createSentryClient,
} from '../src/mocks';

const expectClientFnGetsCalledCorrect = <T>(
  client: T,
  input: T,
  getMethod: (obj: T) => any,
) => {
  const clientMethod = getMethod(client);
  const mockedMethod = getMethod(input);
  clientMethod(1);
  expect(mockedMethod).toBeCalledTimes(1);
  expect(mockedMethod).toBeCalledWith(1);
};

describe('commerce-library-telemetry-clients', () => {
  it(createMonitoringClient.name, () => {
    const submitFn = jest.fn();
    const client = createMonitoringClient(submitFn);
    const expectedMetric = {
      task: 'mock task',
      name: catalog.performance.APDEX,
    };

    client.metric.submit(expectedMetric);
    expect(submitFn).toBeCalledTimes(1);
    expect(submitFn).toBeCalledWith(expectedMetric);
  });

  it(createAnalyticsClient.name, () => {
    const input = {
      sendUIEvent: jest.fn(),
      sendScreenEvent: jest.fn(),
      sendTrackEvent: jest.fn(),
      sendOperationalEvent: jest.fn(),
    };
    const client = createAnalyticsClient(input);
    expectClientFnGetsCalledCorrect(client, input, (obj) => obj.sendUIEvent);
    expectClientFnGetsCalledCorrect(
      client,
      input,
      (obj) => obj.sendScreenEvent,
    );
    expectClientFnGetsCalledCorrect(client, input, (obj) => obj.sendTrackEvent);
    expectClientFnGetsCalledCorrect(
      client,
      input,
      (obj) => obj.sendOperationalEvent,
    );
  });

  it(createSentryClient.name, () => {
    const input = {
      captureException: jest.fn(),
      captureEvent: jest.fn(),
      captureMessage: jest.fn(),
    };
    const client = createSentryClient(input);
    expectClientFnGetsCalledCorrect(
      client,
      input,
      (obj) => obj.captureException,
    );
    expectClientFnGetsCalledCorrect(client, input, (obj) => obj.captureEvent);
    expectClientFnGetsCalledCorrect(client, input, (obj) => obj.captureMessage);
  });
});
