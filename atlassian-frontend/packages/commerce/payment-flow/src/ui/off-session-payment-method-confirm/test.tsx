/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';

import { render } from '@testing-library/react';

import { InternalCommerceTelemetryIntegrations } from '@atlassian/commerce-telemetry';
import {
  GasV3Integration,
  MetalIntegration,
  SentryBrowserIntegration,
} from '@atlassian/commerce-telemetry/integrations';
import {
  byRole,
  byText,
  ErrorFragment,
  waitTillPresent,
  waitUntil,
} from '@atlassian/commerce-test-library';

import { paymentConfirmationEventMocks as eventMocks } from '../../common/utils/analytics/mocks';
import { OffSessionPaymentMethodPage } from '../../common/utils/page-objects/off-session-payment-method-page';

import {
  ConfirmationNotRequired,
  HappyPath,
  HappyPathWithStripeConfirmPaymentError,
  InvalidPaymentMethod,
  InvoiceNotPayable,
  InvoicePaid,
  PaymentMethodChanged,
} from './examples';

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

const ExampleWrapper: React.FC = ({ children }) => (
  <GasV3Integration client={gasV3Client}>
    <MetalIntegration client={metalClient}>
      <SentryBrowserIntegration client={sentryClient}>
        <InternalCommerceTelemetryIntegrations>
          {children}
        </InternalCommerceTelemetryIntegrations>
      </SentryBrowserIntegration>
    </MetalIntegration>
  </GasV3Integration>
);

describe('Offsession payment method confirm', () => {
  test.skip('Happy path UI is rendered correctly & events are dispatched', async () => {
    render(
      <ExampleWrapper>
        <HappyPath />
      </ExampleWrapper>,
    );

    await OffSessionPaymentMethodPage.waitTillSettled();

    await waitUntil(() => {
      expect(gasV3Client.sendScreenEvent).toHaveBeenCalledWith(
        expect.objectContaining(
          eventMocks.screen.mockInvoicePaymentDataHappyPathScreenEvent,
        ),
      );
    });
  });

  test.skip('Happy path UI dispatches correct events on successful result', async () => {
    render(
      <ExampleWrapper>
        <HappyPath />
      </ExampleWrapper>,
    );

    await OffSessionPaymentMethodPage
      //
      .waitTillSettled()
      .acceptPolicy()
      .payNow();

    await waitUntil(() => {
      expect(gasV3Client.sendUIEvent).toHaveBeenCalledWith(
        expect.objectContaining(eventMocks.ui.paymentConfirmationUIEvent),
      );
    });

    await waitUntil(() => {
      expect(gasV3Client.sendTrackEvent).toHaveBeenCalledWith(
        expect.objectContaining(
          eventMocks.track.paymentConfirmationSuccessTrackEvent,
        ),
      );
    });

    await waitUntil(() => {
      expect(metalClient.metric.submit).toHaveBeenCalledWith(
        expect.objectContaining(
          eventMocks.metal.offsessionConfirmationSuccessMetalEvent,
        ),
      );
    });

    await waitTillPresent(byRole('heading', { level: 1, name: /Success/i }));
  });

  test.skip('Happy path with confirm payment error UI dispatches correct events on successful result', async () => {
    render(
      <ExampleWrapper>
        <HappyPathWithStripeConfirmPaymentError />
      </ExampleWrapper>,
    );

    await OffSessionPaymentMethodPage
      //
      .waitTillSettled()
      .acceptPolicy()
      .payNow();

    await waitUntil(() => {
      expect(metalClient.metric.submit).toHaveBeenCalledWith(
        expect.objectContaining(
          eventMocks.metal.offsessionConfirmationFailureMetalEvent,
        ),
      );
    });

    await waitUntil(() => {
      expect(gasV3Client.sendTrackEvent).toHaveBeenCalledWith(
        expect.objectContaining(
          eventMocks.track.paymentConfirmationFailureTrackEvent,
        ),
      );
    });

    await OffSessionPaymentMethodPage
      //
      .stripeFragment()
      .waitTillSettled();
  });

  test('ConfirmationNotRequired case rendered correctly & events are dispatched', async () => {
    const { container } = render(
      <ExampleWrapper>
        <ConfirmationNotRequired />
      </ExampleWrapper>,
    );

    const errorFragment = ErrorFragment(container);
    expect(await errorFragment.displayed()).toBeTruthy();
    expect(await errorFragment.content()).toMatch(
      `We can't charge your current payment method`,
    );

    await waitUntil(() => {
      expect(gasV3Client.sendScreenEvent).toHaveBeenCalledWith(
        expect.objectContaining(
          eventMocks.screen.mockInvoicePaymentDataErrorScreenEvent,
        ),
      );
    });

    await waitUntil(() => {
      expect(metalClient.metric.submit).toHaveBeenCalledWith(
        expect.objectContaining(
          eventMocks.metal.offsessionConfirmationNotAvailableMetalEvent,
        ),
      );
    });

    await errorFragment.clickButton('Update payment method');
    await OffSessionPaymentMethodPage
      //
      .stripeFragment()
      .waitTillSettled();
  });

  test('InvoiceNotPayable case is rendered correctly & events are dispatched', async () => {
    const { container } = render(
      <ExampleWrapper>
        <InvoiceNotPayable />
      </ExampleWrapper>,
    );

    const errorFragment = ErrorFragment(container);
    expect(await errorFragment.displayed()).toBeTruthy();
    expect(await errorFragment.content()).toMatch(
      `We can't charge your current payment method`,
    );

    await waitUntil(() => {
      expect(gasV3Client.sendScreenEvent).toHaveBeenCalledWith(
        expect.objectContaining(
          eventMocks.screen.mockInvoicePaymentDataErrorScreenEvent,
        ),
      );
    });

    await waitUntil(() => {
      expect(metalClient.metric.submit).toHaveBeenCalledWith(
        expect.objectContaining(
          eventMocks.metal.offsessionConfirmationNotAvailableMetalEvent,
        ),
      );
    });
  });

  test('InvoicePaid case is rendered correctly & events are dispatched', async () => {
    render(
      <ExampleWrapper>
        <InvoicePaid />
      </ExampleWrapper>,
    );

    await waitTillPresent(byText(/You're all paid up!/i));

    await waitUntil(() => {
      expect(gasV3Client.sendScreenEvent).toHaveBeenCalledWith(
        expect.objectContaining(
          eventMocks.screen.mockInvoicePaymentDataErrorScreenEvent,
        ),
      );
    });

    await waitUntil(() => {
      expect(metalClient.metric.submit).toHaveBeenCalledWith(
        expect.objectContaining(
          eventMocks.metal.offsessionConfirmationNotAvailableMetalEvent,
        ),
      );
    });
  });

  test('InvalidPaymentMethod case is rendered correctly', async () => {
    render(
      <ExampleWrapper>
        <InvalidPaymentMethod />
      </ExampleWrapper>,
    );

    await waitTillPresent(
      byText(/You've already updated your payment method/i),
    );

    await waitUntil(() => {
      expect(gasV3Client.sendScreenEvent).toHaveBeenCalledWith(
        expect.objectContaining(
          eventMocks.screen.mockInvoicePaymentDataErrorScreenEvent,
        ),
      );
    });

    await waitUntil(() => {
      expect(metalClient.metric.submit).toHaveBeenCalledWith(
        expect.objectContaining(
          eventMocks.metal.offsessionConfirmationNotAvailableMetalEvent,
        ),
      );
    });
  });

  test('PaymentMethodChanged case is rendered correctly', async () => {
    render(
      <ExampleWrapper>
        <PaymentMethodChanged />
      </ExampleWrapper>,
    );

    await waitTillPresent(
      byText(/You've already updated your payment method/i),
    );

    await waitUntil(() => {
      expect(gasV3Client.sendScreenEvent).toHaveBeenCalledWith(
        expect.objectContaining(
          eventMocks.screen.mockInvoicePaymentDataErrorScreenEvent,
        ),
      );
    });

    await waitUntil(() => {
      expect(metalClient.metric.submit).toHaveBeenCalledWith(
        expect.objectContaining(
          eventMocks.metal.offsessionConfirmationNotAvailableMetalEvent,
        ),
      );
    });
  });
});
