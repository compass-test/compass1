import React, { FC, useEffect } from 'react';

import { render } from '@testing-library/react';

import { nestListeners } from '@atlassian/commerce-events-telemetry-react/core';
import * as Listeners from '@atlassian/commerce-telemetry/listeners';

import { ValidationError } from '../validation-errors';

import { TelemetryRoot, useSubmissionEventDispatch } from './index';

const createTestScenario = () => {
  const gasV3Client = {
    sendUIEvent: jest.fn(),
    sendScreenEvent: jest.fn(),
    sendOperationalEvent: jest.fn(),
    sendTrackEvent: jest.fn(),
  };
  const metalClient = {
    metric: {
      submit: jest.fn(),
    },
  };
  const sentryClient = {
    captureException: jest.fn(),
    setContext: jest.fn(),
  };

  const AllListeners: FC = ({ children }) =>
    nestListeners(children, [
      {
        Listener: Listeners.GasV3OperationalEventListener,
        onEvent: gasV3Client.sendOperationalEvent,
      },
      {
        Listener: Listeners.GasV3ScreenEventListener,
        onEvent: gasV3Client.sendScreenEvent,
      },
      {
        Listener: Listeners.GasV3TrackEventListener,
        onEvent: gasV3Client.sendTrackEvent,
      },
      {
        Listener: Listeners.GasV3UIEventListener,
        onEvent: gasV3Client.sendUIEvent,
      },
      {
        Listener: Listeners.MetalListener,
        onEvent: metalClient.metric.submit,
      },
      {
        Listener: Listeners.SentryExceptionListener,
        onEvent: sentryClient.captureException,
      },
    ]);

  const TestEnvironment: FC<{}> = ({ children }) => (
    <AllListeners>
      <TelemetryRoot>{children}</TelemetryRoot>
    </AllListeners>
  );

  return {
    gasV3Client,
    metalClient,
    sentryClient,
    TestEnvironment,
  };
};

const createImmediateDispatchMocks = () => {
  const mockUseEventDispatch = jest.fn().mockImplementation(() => () => {});
  const createEvent = jest.fn();

  const ImmediatelyDispatchEvent = () => {
    const dispatch = mockUseEventDispatch();
    useEffect(() => {
      const event = createEvent();
      dispatch(event);
    }, [dispatch]);

    return null;
  };

  return {
    mockUseEventDispatch,
    createEvent,
    ImmediatelyDispatchEvent,
  };
};

const createImmediateDispatchScenario = () => {
  const env = createTestScenario();
  const { TestEnvironment, gasV3Client, metalClient, sentryClient } = env;

  const {
    mockUseEventDispatch,
    createEvent,
    ImmediatelyDispatchEvent,
  } = createImmediateDispatchMocks();

  const TestingComponent = () => (
    <TestEnvironment>
      <ImmediatelyDispatchEvent />
    </TestEnvironment>
  );

  return {
    gasV3Client,
    metalClient,
    sentryClient,
    mockUseEventDispatch,
    createEvent,
    TestingComponent,
  };
};
describe('All clients called when their associated events are dispatched', () => {
  it('Submission error event -> Sentry', () => {
    const scenario = createImmediateDispatchScenario();

    scenario.mockUseEventDispatch.mockImplementation(
      useSubmissionEventDispatch,
    );
    scenario.createEvent.mockReturnValue({
      // May need to reflect the real shape in the future
      data: {},
      error: new Error(),
    });
    render(<scenario.TestingComponent />);

    expect(scenario.metalClient.metric.submit).toBeCalledTimes(0);
    expect(scenario.sentryClient.captureException).toBeCalledTimes(1);
    expect(scenario.sentryClient.captureException).toBeCalledWith(
      expect.objectContaining({
        exception: expect.any(Error),
      }),
    );

    expect(scenario.gasV3Client.sendOperationalEvent).toBeCalledTimes(0);
    expect(scenario.gasV3Client.sendScreenEvent).toBeCalledTimes(0);
    expect(scenario.gasV3Client.sendTrackEvent).toBeCalledTimes(0);
    expect(scenario.gasV3Client.sendUIEvent).toBeCalledTimes(0);
  });
  it("Submission validation error event -> Isn't sent to any telemetry clients", () => {
    const scenario = createImmediateDispatchScenario();

    scenario.mockUseEventDispatch.mockImplementation(
      useSubmissionEventDispatch,
    );
    scenario.createEvent.mockReturnValue({
      // May need to reflect the real shape in the future
      data: {},
      error: new ValidationError({}),
    });
    render(<scenario.TestingComponent />);

    expect(scenario.metalClient.metric.submit).toBeCalledTimes(0);
    expect(scenario.sentryClient.captureException).toBeCalledTimes(0);

    expect(scenario.gasV3Client.sendOperationalEvent).toBeCalledTimes(0);
    expect(scenario.gasV3Client.sendScreenEvent).toBeCalledTimes(0);
    expect(scenario.gasV3Client.sendTrackEvent).toBeCalledTimes(0);
    expect(scenario.gasV3Client.sendUIEvent).toBeCalledTimes(0);
  });
});
