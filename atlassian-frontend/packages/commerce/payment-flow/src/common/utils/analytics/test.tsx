import React, { FC, useEffect } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';

import { nestListeners } from '@atlassian/commerce-events-telemetry-react/core';
import { InternalCommerceTelemetryIntegrations } from '@atlassian/commerce-telemetry';
import { catalog } from '@atlassian/commerce-telemetry-clients';
import * as Listeners from '@atlassian/commerce-telemetry/listeners';

import {
  FlowStartTimeProvider,
  FlowStartTimeRecorder,
} from '../flow-start-time';

import {
  BillingAddressScreenBreadcrumb,
  PaymentCaptureFlowBreadcrumb,
  useSummarySubmitEventDispatch,
} from './index';

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
    setTag: jest.fn(),
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

  const TestEnvironment: FC = ({ children }) => (
    <FlowStartTimeProvider>
      <FlowStartTimeRecorder />
      <AllListeners>
        <InternalCommerceTelemetryIntegrations>
          {children}
        </InternalCommerceTelemetryIntegrations>
      </AllListeners>
    </FlowStartTimeProvider>
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
  it('Submit failure -> GasV3 Track & Metal user interaction failure', () => {
    const scenario = createImmediateDispatchScenario();

    scenario.mockUseEventDispatch.mockImplementation(
      useSummarySubmitEventDispatch,
    );
    scenario.createEvent.mockReturnValue({
      duration: 1,
      timedPayload: {
        error: new Error(),
      },
    });
    render(<scenario.TestingComponent />);

    expect(scenario.gasV3Client.sendTrackEvent).toBeCalledTimes(1);

    expect(scenario.metalClient.metric.submit).toBeCalledWith(
      expect.objectContaining({
        name: catalog.userInteraction.TASK_FAILURE,
      }),
    );
    expect(scenario.metalClient.metric.submit).toBeCalledTimes(1);
    expect(scenario.sentryClient.captureException).toBeCalledTimes(0);
    expect(scenario.gasV3Client.sendScreenEvent).toBeCalledTimes(0);
    expect(scenario.gasV3Client.sendOperationalEvent).toBeCalledTimes(0);
    expect(scenario.gasV3Client.sendUIEvent).toBeCalledTimes(0);
  });
  it('Submit success -> GasV3 Track, Metal user interaction success, TTC and duration', () => {
    const scenario = createImmediateDispatchScenario();

    scenario.mockUseEventDispatch.mockImplementation(
      useSummarySubmitEventDispatch,
    );
    scenario.createEvent.mockReturnValue({
      duration: 1,
      timedPayload: {
        error: undefined,
      },
    });
    render(<scenario.TestingComponent />);

    expect(scenario.gasV3Client.sendTrackEvent).toBeCalledTimes(1);

    expect(scenario.metalClient.metric.submit).toBeCalledWith(
      expect.objectContaining({
        name: catalog.userInteraction.TASK_SUCCESS,
      }),
    );
    expect(scenario.metalClient.metric.submit).toBeCalledWith(
      expect.objectContaining({
        name: catalog.userInteraction.TASK_TIME_TO_COMPLETE,
      }),
    );
    expect(scenario.metalClient.metric.submit).toBeCalledWith(
      expect.objectContaining({
        name: catalog.userInteraction.TASK_DURATION,
      }),
    );
    expect(scenario.metalClient.metric.submit).toBeCalledTimes(3);
    expect(scenario.sentryClient.captureException).toBeCalledTimes(0);
    expect(scenario.gasV3Client.sendScreenEvent).toBeCalledTimes(0);
    expect(scenario.gasV3Client.sendOperationalEvent).toBeCalledTimes(0);
    expect(scenario.gasV3Client.sendUIEvent).toBeCalledTimes(0);
  });
  it('Billing address breadcrumb -> GasV3 screen event & metal TTI event', () => {
    const scenario = createTestScenario();

    const TestEnvironmentWithBreadcrumb = () => (
      <scenario.TestEnvironment>
        <BillingAddressScreenBreadcrumb />
      </scenario.TestEnvironment>
    );

    render(<TestEnvironmentWithBreadcrumb />);

    expect(scenario.gasV3Client.sendScreenEvent).toBeCalledTimes(1);
    expect(scenario.metalClient.metric.submit).toBeCalledTimes(1);
    expect(scenario.metalClient.metric.submit).toBeCalledWith(
      expect.objectContaining({
        name: catalog.performance.TIME_TO_INTERACTIVE,
        value: expect.any(Number),
      }),
    );

    expect(scenario.sentryClient.captureException).toBeCalledTimes(0);
    expect(scenario.gasV3Client.sendTrackEvent).toBeCalledTimes(0);
    expect(scenario.gasV3Client.sendOperationalEvent).toBeCalledTimes(0);
    expect(scenario.gasV3Client.sendUIEvent).toBeCalledTimes(0);
  });
  it('Payment method capture breadcrumb -> GasV3 screen event & metal initiation event', () => {
    const scenario = createTestScenario();

    const TestEnvironmentWithBreadcrumb = () => (
      <scenario.TestEnvironment>
        <PaymentCaptureFlowBreadcrumb />
      </scenario.TestEnvironment>
    );

    render(<TestEnvironmentWithBreadcrumb />);

    expect(scenario.gasV3Client.sendScreenEvent).toBeCalledTimes(1);
    expect(scenario.metalClient.metric.submit).toBeCalledTimes(1);
    expect(scenario.metalClient.metric.submit).toBeCalledWith(
      expect.objectContaining({
        name: catalog.performance.FIRST_PAINT,
        value: expect.any(Number),
      }),
    );

    expect(scenario.sentryClient.captureException).toBeCalledTimes(0);
    expect(scenario.gasV3Client.sendTrackEvent).toBeCalledTimes(0);
    expect(scenario.gasV3Client.sendOperationalEvent).toBeCalledTimes(0);
    expect(scenario.gasV3Client.sendUIEvent).toBeCalledTimes(0);
  });
});
