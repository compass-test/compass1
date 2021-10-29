import React, { FC, useEffect } from 'react';

import { render } from '@testing-library/react';

import { nestListeners } from '@atlassian/commerce-events-telemetry-react/core';
import {
  createExceptionResult,
  createSuccessResult,
} from '@atlassian/commerce-resultful';
import { InternalCommerceTelemetryIntegrations } from '@atlassian/commerce-telemetry';
import { catalog } from '@atlassian/commerce-telemetry-clients';

import { createGenericCreditCardStripeError } from '../../utils/errors';
import { FormStartTimeProvider, FormStartTimeRecorder } from '../start-time';
import * as Listeners from '../telemetry-listeners';

import {
  useConfirmCardPaymentResultEventDispatch,
  useConfirmCardSetupResultEventDispatch,
  useCreatePaymentMethodEventDispatch,
  useErrorBoundaryEventDispatch,
  useFieldErrorEventDispatch,
} from './index';

type TestEnvironmentProps = {
  recordFormStartTime?: boolean;
};

type CreateScenarioOptions = {
  recordFormStartTime: boolean;
};

const createScenarioDefaultOptions: CreateScenarioOptions = {
  recordFormStartTime: true,
};

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

  const TestEnvironment: FC<TestEnvironmentProps> = ({
    children,
    recordFormStartTime = true,
  }) => (
    <FormStartTimeProvider>
      {recordFormStartTime && <FormStartTimeRecorder />}
      <AllListeners>
        <InternalCommerceTelemetryIntegrations>
          {children}
        </InternalCommerceTelemetryIntegrations>
      </AllListeners>
    </FormStartTimeProvider>
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

const createImmediateDispatchScenario = ({
  recordFormStartTime,
}: CreateScenarioOptions = createScenarioDefaultOptions) => {
  const env = createTestScenario();
  const { TestEnvironment, gasV3Client, metalClient, sentryClient } = env;

  const {
    mockUseEventDispatch,
    createEvent,
    ImmediatelyDispatchEvent,
  } = createImmediateDispatchMocks();

  const TestingComponent = () => (
    <TestEnvironment recordFormStartTime={recordFormStartTime}>
      <ImmediatelyDispatchEvent />
    </TestEnvironment>
  );

  const expectNthCaptureException = (nthCallToCaptureException: number) => {
    const { scopeContext } = sentryClient.captureException.mock.calls[
      nthCallToCaptureException
    ][0];
    const toHaveTags = (tagsList: Record<string, string>): void => {
      expect(scopeContext).toBeDefined();
      expect(scopeContext.tags).toEqual(expect.objectContaining(tagsList));
    };
    return {
      toHaveTags: toHaveTags,
    };
  };

  return {
    gasV3Client,
    metalClient,
    sentryClient,
    mockUseEventDispatch,
    createEvent,
    TestingComponent,
    expectNthCaptureException,
  };
};

describe('All clients called when their associated events are dispatched', () => {
  it('Breadcrumb rendered -> GasV3 screen event', () => {
    const scenario = createImmediateDispatchScenario();
    render(<scenario.TestingComponent />);
    expect(scenario.gasV3Client.sendScreenEvent).toBeCalledTimes(0);
    expect(scenario.gasV3Client.sendOperationalEvent).toBeCalledTimes(0);
    expect(scenario.gasV3Client.sendTrackEvent).toBeCalledTimes(0);
    expect(scenario.gasV3Client.sendUIEvent).toBeCalledTimes(0);
    expect(scenario.metalClient.metric.submit).toBeCalledTimes(0);
    expect(scenario.sentryClient.captureException).toBeCalledTimes(0);
  });

  it('Boundary error -> Metal & Sentry events', () => {
    const scenario = createImmediateDispatchScenario();

    scenario.mockUseEventDispatch.mockImplementation(
      useErrorBoundaryEventDispatch,
    );
    scenario.createEvent.mockReturnValue(new Error());
    render(<scenario.TestingComponent />);

    expect(scenario.metalClient.metric.submit).toBeCalledTimes(1);
    expect(scenario.sentryClient.captureException).toBeCalledTimes(1);
    expect(scenario.sentryClient.captureException).toBeCalledWith(
      expect.objectContaining({
        exception: expect.any(Error),
      }),
    );

    expect(scenario.gasV3Client.sendOperationalEvent).toBeCalledTimes(0);
    expect(scenario.gasV3Client.sendScreenEvent).toBeCalledTimes(0);
    expect(scenario.gasV3Client.sendUIEvent).toBeCalledTimes(0);
  });

  describe.each([
    [
      'useConfirmCardSetupResultEventDispatch',
      useConfirmCardSetupResultEventDispatch,
    ],
    [
      'useConfirmCardPaymentResultEventDispatch',
      useConfirmCardPaymentResultEventDispatch,
    ],
    [
      'useCreatePaymentMethodEventDispatch',
      useCreatePaymentMethodEventDispatch,
    ],
  ])('%s', (_, useSubmitEventDispatch) => {
    it('setup intent system error -> Metal interaction failure, Sentry (with setup intent tags) & GasV3 track event', () => {
      const testId = 'seti_mocked_setup_intent_id';
      const clientSecret = 'mocked_client_token';
      const cancellationReason = null;
      const nextActionUrl = '<url>';
      const nextActionType = 'redirect_to_url';
      const status = 'requires_payment_method';
      const usage = 'off_session';

      const errorResult = createGenericCreditCardStripeError({
        type: 'api_error',
        setup_intent: {
          id: testId,
          object: 'setup_intent',
          cancellation_reason: cancellationReason,
          client_secret: clientSecret,
          created: 0,
          description: null,
          last_setup_error: null,
          livemode: false,
          next_action: {
            redirect_to_url: {
              return_url: nextActionUrl,
              url: nextActionUrl,
            },
            type: nextActionType,
          },
          payment_method: null,
          payment_method_types: ['mockTypeOne', 'mockTypeTwo'],
          status: status,
          usage: usage,
        },
      });

      const scenario = createImmediateDispatchScenario();

      scenario.mockUseEventDispatch.mockImplementation(useSubmitEventDispatch);
      scenario.createEvent.mockReturnValue({
        timedPayload: errorResult,
        duration: 1,
      });
      render(<scenario.TestingComponent />);

      expect(scenario.metalClient.metric.submit).toBeCalledTimes(1);
      expect(scenario.metalClient.metric.submit).toBeCalledWith(
        expect.objectContaining({
          name: catalog.userInteraction.TASK_FAILURE,
          taskId: 'guaranteed-bug',
        }),
      );

      expect(scenario.sentryClient.captureException).toBeCalledTimes(1);
      scenario.expectNthCaptureException(0).toHaveTags({
        'setupIntent.id': testId,
        'setupIntent.cancellationReason': `${cancellationReason}`,
        'setupIntent.clientToken': clientSecret,
        'setupIntent.nextAction.type': nextActionType,
        'setupIntent.status': status,
        'setupIntent.usage': usage,
      });

      expect(scenario.gasV3Client.sendOperationalEvent).toBeCalledTimes(0);
      expect(scenario.gasV3Client.sendScreenEvent).toBeCalledTimes(0);
      expect(scenario.gasV3Client.sendUIEvent).toBeCalledTimes(0);
      expect(scenario.gasV3Client.sendTrackEvent).toBeCalledTimes(1);
    });

    it('payment intent system error -> Metal interaction failure, Sentry (with payment intent tags) & GasV3 track event', () => {
      const testId = 'seti_mocked_payment_intent_id';
      const amount = 1000;
      const cancellationReason = 'abandoned';
      const captureMethod = 'automatic';
      const clientSecret = 'mocked_client_token';
      const confirmationMethod = 'automatic';
      const currency = 'aud';
      const status = 'requires_payment_method';
      const paymentMethod = 'pm_mocked_payment_method';

      const errorResult = createGenericCreditCardStripeError({
        type: 'api_error',
        payment_intent: {
          id: testId,
          object: 'payment_intent',
          amount: amount,
          canceled_at: null,
          cancellation_reason: cancellationReason,
          capture_method: captureMethod,
          client_secret: clientSecret,
          confirmation_method: confirmationMethod,
          created: 0,
          currency: currency,
          description: null,
          last_payment_error: null,
          livemode: false,
          next_action: null,
          payment_method: paymentMethod,
          payment_method_types: ['mockTypeOne', 'mockTypeTwo'],
          receipt_email: null,
          setup_future_usage: null,
          shipping: null,
          status: status,
        },
      });

      const scenario = createImmediateDispatchScenario();

      scenario.mockUseEventDispatch.mockImplementation(useSubmitEventDispatch);
      scenario.createEvent.mockReturnValue({
        timedPayload: errorResult,
        duration: 1,
      });
      render(<scenario.TestingComponent />);

      expect(scenario.metalClient.metric.submit).toBeCalledTimes(1);
      expect(scenario.metalClient.metric.submit).toBeCalledWith(
        expect.objectContaining({
          name: catalog.userInteraction.TASK_FAILURE,
          taskId: 'guaranteed-bug',
        }),
      );

      expect(scenario.sentryClient.captureException).toBeCalledTimes(1);
      scenario.expectNthCaptureException(0).toHaveTags({
        'paymentIntent.id': testId,
        'paymentIntent.amount': `${amount}`,
        'paymentIntent.cancellationReason': `${cancellationReason}`,
        'paymentIntent.captureMethod': captureMethod,
        'paymentIntent.clientToken': clientSecret,
        'paymentIntent.confirmationMethod': confirmationMethod,
        'paymentIntent.currency': currency,
        'paymentIntent.status': status,
      });

      expect(scenario.gasV3Client.sendOperationalEvent).toBeCalledTimes(0);
      expect(scenario.gasV3Client.sendScreenEvent).toBeCalledTimes(0);
      expect(scenario.gasV3Client.sendUIEvent).toBeCalledTimes(0);
      expect(scenario.gasV3Client.sendTrackEvent).toBeCalledTimes(1);
    });

    it('payment method system error -> Metal interaction failure, Sentry (with payment method tags) & GasV3 track event', () => {
      const testPaymentMethodId = 'pi_mocked_payment_method_id';
      const cardBrand = 'visa';
      const cardCountry = 'US';
      const SecureUsageSupported = true;
      const funding = 'credit';

      const errorResult = createGenericCreditCardStripeError({
        type: 'api_error',
        payment_method: {
          id: testPaymentMethodId,
          object: 'payment_method',
          billing_details: {
            address: null,
            email: null,
            name: null,
            phone: null,
          },
          card: {
            brand: cardBrand,
            checks: null,
            country: cardCountry,
            exp_month: 2,
            exp_year: 22,
            funding: funding,
            last4: '0069',
            three_d_secure_usage: {
              supported: SecureUsageSupported,
            },
            wallet: null,
          },
          created: 0,
          customer: null,
          livemode: false,
          metadata: {
            name: 'billions',
          },
          type: '81LL10N3',
        },
      });

      const scenario = createImmediateDispatchScenario();

      scenario.mockUseEventDispatch.mockImplementation(useSubmitEventDispatch);
      scenario.createEvent.mockReturnValue({
        timedPayload: errorResult,
        duration: 1,
      });
      render(<scenario.TestingComponent />);

      expect(scenario.metalClient.metric.submit).toBeCalledTimes(1);
      expect(scenario.metalClient.metric.submit).toBeCalledWith(
        expect.objectContaining({
          name: catalog.userInteraction.TASK_FAILURE,
          taskId: 'guaranteed-bug',
        }),
      );

      expect(scenario.sentryClient.captureException).toBeCalledTimes(1);
      scenario.expectNthCaptureException(0).toHaveTags({
        'paymentMethod.card.brand': cardBrand,
        'paymentMethod.card.country': cardCountry,
        'paymentMethod.card.threeDSecureUsage.supported': `${SecureUsageSupported}`,
        'paymentMethod.card.funding': funding,
      });

      expect(scenario.gasV3Client.sendOperationalEvent).toBeCalledTimes(0);
      expect(scenario.gasV3Client.sendScreenEvent).toBeCalledTimes(0);
      expect(scenario.gasV3Client.sendUIEvent).toBeCalledTimes(0);
      expect(scenario.gasV3Client.sendTrackEvent).toBeCalledTimes(1);
    });

    it('exception result -> Metal interaction failure, Sentry & GasV3 track event', () => {
      const scenario = createImmediateDispatchScenario();

      scenario.mockUseEventDispatch.mockImplementation(useSubmitEventDispatch);
      scenario.createEvent.mockReturnValue({
        timedPayload: createExceptionResult(new Error('irrelevant')),
        duration: 1,
      });
      render(<scenario.TestingComponent />);

      expect(scenario.metalClient.metric.submit).toBeCalledTimes(1);
      expect(scenario.metalClient.metric.submit).toBeCalledWith(
        expect.objectContaining({
          name: catalog.userInteraction.TASK_FAILURE,
          taskId: 'guaranteed-bug',
        }),
      );

      expect(scenario.sentryClient.captureException).toBeCalledTimes(1);

      expect(scenario.gasV3Client.sendOperationalEvent).toBeCalledTimes(0);
      expect(scenario.gasV3Client.sendScreenEvent).toBeCalledTimes(0);
      expect(scenario.gasV3Client.sendUIEvent).toBeCalledTimes(0);
      expect(scenario.gasV3Client.sendTrackEvent).toBeCalledTimes(1);
    });

    it('Stripe card error -> Metal interaction failure, Sentry & GasV3 track event', () => {
      const scenario = createImmediateDispatchScenario();

      const testSetupIntentId = 'seti_mocked_setup_intent_id';
      const clientSetupIntentSecret = 'mocked_setup_client_token';
      const status = 'requires_payment_method';
      const usage = 'off_session';
      const code = 'expired_card';
      const testPaymentMethodId = 'pi_mocked_payment_method_id';
      const cardBrand = 'visa';
      const cardCountry = 'US';
      const cancellationReason = null;

      const errorResult = createGenericCreditCardStripeError({
        type: 'card_error',
        code: code,
        setup_intent: {
          id: testSetupIntentId,
          object: 'setup_intent',
          cancellation_reason: cancellationReason,
          client_secret: clientSetupIntentSecret,
          created: 0,
          description: null,
          last_setup_error: null,
          livemode: false,
          next_action: null,
          payment_method: null,
          payment_method_types: ['mockTypeOne', 'mockTypeTwo'],
          status: status,
          usage: usage,
        },
        payment_method: {
          id: testPaymentMethodId,
          object: 'payment_method',
          billing_details: {
            address: null,
            email: null,
            name: null,
            phone: null,
          },
          card: {
            brand: cardBrand,
            checks: null,
            country: cardCountry,
            exp_month: 2,
            exp_year: 22,
            funding: 'credit',
            last4: '0069',
            three_d_secure_usage: {
              supported: true,
            },
            wallet: null,
          },
          created: 0,
          customer: null,
          livemode: false,
          metadata: {
            name: 'billions',
          },
          type: '81LL10N3',
        },
      });
      scenario.mockUseEventDispatch.mockImplementation(useSubmitEventDispatch);
      scenario.createEvent.mockReturnValue({
        timedPayload: errorResult,
        duration: 1,
      });
      render(<scenario.TestingComponent />);

      expect(scenario.metalClient.metric.submit).toBeCalledTimes(1);
      expect(scenario.metalClient.metric.submit).toBeCalledWith(
        expect.objectContaining({
          name: catalog.userInteraction.TASK_FAILURE,
          taskId: 'other',
        }),
      );
      expect(scenario.sentryClient.captureException).toBeCalledTimes(1);
      expect(scenario.sentryClient.captureException).toBeCalledWith(
        expect.objectContaining({
          exception: errorResult.error,
        }),
      );

      expect(scenario.sentryClient.captureException).toBeCalledTimes(1);
      scenario.expectNthCaptureException(0).toHaveTags({
        'setupIntent.id': testSetupIntentId,
        'setupIntent.cancellationReason': `${cancellationReason}`,
        'setupIntent.clientToken': clientSetupIntentSecret,
        'setupIntent.nextAction.type': 'undefined',
        'setupIntent.status': status,
        'setupIntent.usage': usage,
        'stripeError.code': code,
        'paymentMethod.card.brand': cardBrand,
        'paymentMethod.card.country': cardCountry,
      });

      expect(scenario.gasV3Client.sendOperationalEvent).toBeCalledTimes(0);
      expect(scenario.gasV3Client.sendScreenEvent).toBeCalledTimes(0);
      expect(scenario.gasV3Client.sendUIEvent).toBeCalledTimes(0);
      expect(scenario.gasV3Client.sendTrackEvent).toBeCalledTimes(1);
    });

    it('success -> Metal interaction, GasV3 track event', () => {
      const scenario = createImmediateDispatchScenario();

      scenario.mockUseEventDispatch.mockImplementation(useSubmitEventDispatch);
      scenario.createEvent.mockReturnValue({
        timedPayload: createSuccessResult("doesn't matter at the moment"),
        duration: 1,
      });
      render(<scenario.TestingComponent />);

      expect(scenario.metalClient.metric.submit).toBeCalledWith(
        expect.objectContaining({
          name: catalog.userInteraction.TASK_TIME_TO_COMPLETE,
          value: expect.any(Number),
        }),
      );
      expect(scenario.metalClient.metric.submit).toBeCalledWith(
        expect.objectContaining({
          name: catalog.userInteraction.TASK_SUCCESS,
        }),
      );
      expect(scenario.metalClient.metric.submit).toBeCalledWith(
        expect.objectContaining({
          name: catalog.userInteraction.TASK_DURATION,
          value: expect.any(Number),
        }),
      );
      expect(scenario.metalClient.metric.submit).toBeCalledTimes(3);
      expect(scenario.sentryClient.captureException).toBeCalledTimes(0);

      expect(scenario.gasV3Client.sendOperationalEvent).toBeCalledTimes(0);
      expect(scenario.gasV3Client.sendScreenEvent).toBeCalledTimes(0);
      expect(scenario.gasV3Client.sendUIEvent).toBeCalledTimes(0);
      expect(scenario.gasV3Client.sendTrackEvent).toBeCalledTimes(1);
    });

    it("won't report time to complete metric to metal if no form start time was recorded", () => {
      const scenario = createImmediateDispatchScenario({
        recordFormStartTime: false,
      });

      scenario.mockUseEventDispatch.mockImplementation(useSubmitEventDispatch);
      scenario.createEvent.mockReturnValue({
        timedPayload: createSuccessResult("doesn't matter at the moment"),
        duration: 1,
      });
      render(<scenario.TestingComponent />);

      expect(scenario.metalClient.metric.submit).toBeCalledWith(
        expect.objectContaining({
          name: catalog.userInteraction.TASK_DURATION,
          value: expect.any(Number),
        }),
      );
      expect(scenario.metalClient.metric.submit).toBeCalledWith(
        expect.objectContaining({
          name: catalog.userInteraction.TASK_SUCCESS,
        }),
      );
      expect(scenario.metalClient.metric.submit).toBeCalledTimes(2);
      expect(scenario.sentryClient.captureException).toBeCalledTimes(0);
    });
  });

  it('Field error -> Metal event', () => {
    const scenario = createImmediateDispatchScenario();

    scenario.mockUseEventDispatch.mockImplementation(
      useFieldErrorEventDispatch,
    );
    scenario.createEvent.mockReturnValue('some-field');
    render(<scenario.TestingComponent />);

    expect(scenario.metalClient.metric.submit).toBeCalledTimes(1);
    expect(scenario.sentryClient.captureException).toBeCalledTimes(0);

    expect(scenario.gasV3Client.sendOperationalEvent).toBeCalledTimes(0);
    expect(scenario.gasV3Client.sendScreenEvent).toBeCalledTimes(0);
    expect(scenario.gasV3Client.sendUIEvent).toBeCalledTimes(0);
    expect(scenario.gasV3Client.sendTrackEvent).toBeCalledTimes(1);
  });
});
