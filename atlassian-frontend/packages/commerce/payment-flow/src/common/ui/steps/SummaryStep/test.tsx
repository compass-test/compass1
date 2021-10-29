/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';

import { render } from '@testing-library/react';

import {
  byRole,
  byTestId,
  pageActions,
  waitTillPresent,
  waitTillRemoved,
  waitUntil,
} from '@atlassian/commerce-test-library';

import { SummaryPage } from '../../../../common/utils/page-objects';
import { GasV3TrackEventListener } from '../../../../common/utils/telemetry-listeners';
import { TelemetryRoot } from '../../../../ui/off-session-payment-method-confirm/telemetry-root';
import {
  confirmedPaymentUpdateError,
  confirmedSuccessful,
} from '../../../utils/analytics';
import { confirmedStripeError } from '../../../utils/analytics/mocks';
import {
  FlowStartTimeProvider,
  FlowStartTimeRecorder,
} from '../../../utils/flow-start-time';

import {
  Summary,
  SummaryWithPaymentUpdateError,
  SummaryWithStripeError,
} from './examples';

const TestProviders: React.FC = ({ children }) => (
  <FlowStartTimeProvider>
    <FlowStartTimeRecorder />
    <TelemetryRoot>{children}</TelemetryRoot>
  </FlowStartTimeProvider>
);

describe('Summary step', () => {
  test('Subscribe button should be disabled if terms of service are not confirmed', async () => {
    render(
      <TestProviders>
        <Summary />
      </TestProviders>,
    );
    expect(await SummaryPage.subscribeButtonEnabled()).toBeFalsy();
  });

  test('Proper confirmed event is triggered when step successful', async () => {
    const trackEventHandler = jest.fn();

    render(
      <GasV3TrackEventListener onEvent={trackEventHandler}>
        <TestProviders>
          <Summary />
        </TestProviders>
      </GasV3TrackEventListener>,
    );

    await SummaryPage
      //
      .waitTillSettled()
      .acceptPolicy()
      .subscribe();

    await waitUntil(() => {
      expect(trackEventHandler).toBeCalledWith(
        expect.objectContaining(confirmedSuccessful),
      );
    });
  });

  test('Proper confirmed event is triggered when payment method update fails', async () => {
    const trackEventHandler = jest.fn();

    render(
      <GasV3TrackEventListener onEvent={trackEventHandler}>
        <TestProviders>
          <SummaryWithPaymentUpdateError />
        </TestProviders>
      </GasV3TrackEventListener>,
    );

    await SummaryPage
      //
      .waitTillSettled()
      .acceptPolicy()
      .subscribe()
      .waitTillSettled();

    await waitUntil(() => {
      expect(trackEventHandler).toBeCalledWith(
        expect.objectContaining(confirmedPaymentUpdateError),
      );
    });

    const errorFragment = SummaryPage.errorFragment();

    expect(await errorFragment.displayed()).toBeTruthy();
    expect(await errorFragment.content()).toMatch(
      'Error processing payment method',
    );
  });

  test('Proper confirmed event is triggered when credit card confirmation fails', async () => {
    const trackEventHandler = jest.fn();
    render(
      <GasV3TrackEventListener onEvent={trackEventHandler}>
        <TestProviders>
          <SummaryWithStripeError />
        </TestProviders>
      </GasV3TrackEventListener>,
    );

    const fakePaymentStepHeader = byRole('heading', {
      level: 1,
      name: /Payment step/i,
    });

    // Go from Fake payment step to summary step
    await waitTillPresent(fakePaymentStepHeader);

    const nextButton = byTestId('commerce.fake-payment-step.submit-button');
    await pageActions.click(nextButton);

    await waitTillRemoved(nextButton);

    await SummaryPage
      //
      .waitTillSettled()
      .acceptPolicy()
      .subscribe();

    // stripe error should move back flow to the payment step
    await waitTillPresent(fakePaymentStepHeader);

    await waitUntil(() => {
      expect(trackEventHandler).toBeCalledWith(
        expect.objectContaining(confirmedStripeError),
      );
    });
  });
});
