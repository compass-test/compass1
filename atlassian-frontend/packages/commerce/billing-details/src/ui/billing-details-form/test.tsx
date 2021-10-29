import React, { FC } from 'react';

import { render } from '@testing-library/react';

import {
  InternalCommerceTelemetryIntegrations,
  TrackEventPayload,
  UIEventPayload,
} from '@atlassian/commerce-telemetry';
import {
  GasV3TrackEventListener,
  GasV3UIEventListener,
} from '@atlassian/commerce-telemetry/listeners';
import { waitUntil } from '@atlassian/commerce-test-library';

import FilledForm from '../../../examples/02-billing-details-form-filled';
import FormWithInvalidFieldsFromServer from '../../../examples/08-validation-messages';
import FormWithUnknownValidationError from '../../../examples/12-unrececognized-address-error-messages';
import FormWithUnknownServerError from '../../../examples/13-form-error-message-server-error';
import { fullPostalAddress } from '../../common/mocks';
import {
  additionUiEventNoNewFieldsModified,
  additionUiEventSomeFieldsModified,
  verifiedTrackEventAllFieldsValid,
  verifiedTrackEventFieldsInvalid,
  verifiedTrackEventGeneralUpdateError,
  verifiedTrackEventUnsuccessfullNoInvalidFieldsDetected,
} from '../../common/utils/analytics';
import { AddressDetailsFragment } from '../../common/utils/page-objects/address-details-fragment';
import { BillingDetailsPage } from '../../common/utils/page-objects/billing-details-page';
import { fullBillingDetails } from '../../services/billing-details/mocks';

import { EmptyForm, FullyPreFilledForm } from './examples';

const noop = () => {};
const TestListeners: FC<{
  onUIEvent?: (event: UIEventPayload) => void;
  onTrackEvent?: (event: TrackEventPayload) => void;
}> = ({ children, onUIEvent = noop, onTrackEvent = noop }) => (
  <GasV3UIEventListener onEvent={onUIEvent}>
    <GasV3TrackEventListener onEvent={onTrackEvent}>
      <InternalCommerceTelemetryIntegrations>
        {children}
      </InternalCommerceTelemetryIntegrations>
    </GasV3TrackEventListener>
  </GasV3UIEventListener>
);

describe('Billing details form', () => {
  test('Blur event on a required field causes error message to be displayed', async () => {
    const { container } = render(<EmptyForm />);

    await BillingDetailsPage
      //
      .waitTillSettled()
      .submit();

    const addressForm = BillingDetailsPage.addressForm(container);

    [
      'Company name',
      'City',
      'Address 1',
      'Postal code',
      'Country',
      'State',
    ].forEach(async (field) => {
      expect(await addressForm.fieldError(field)).toEqual('Required field');
    });
  });

  test('Submit handler will not be invoked if validation does not pass', async () => {
    const submitHandler = jest.fn();
    render(<EmptyForm onSubmit={submitHandler} />);

    await BillingDetailsPage
      //
      .waitTillSettled()
      .submit();

    expect(submitHandler).toHaveBeenCalledTimes(0);
  });

  test('Submit handler will be invoked if form is full before submission', async () => {
    const submitHandler = jest.fn();
    render(<FullyPreFilledForm onSubmit={submitHandler} />);

    await BillingDetailsPage
      //
      .waitTillSettled()
      .submit();

    expect(submitHandler).toHaveBeenCalledWith(fullBillingDetails, {
      dirty: false,
    });
  });

  test('On submission of form ui and track events are triggered', async () => {
    const analyticsListenerHandler = jest.fn();
    const gasV3TrackEventHandler = jest.fn();

    render(
      <TestListeners
        onUIEvent={analyticsListenerHandler}
        onTrackEvent={gasV3TrackEventHandler}
      >
        <FilledForm />
      </TestListeners>,
    );

    await BillingDetailsPage
      //
      .waitTillSettled()
      .submit();

    await waitUntil(() => {
      expect(analyticsListenerHandler).toHaveBeenCalledTimes(1);
      expect(gasV3TrackEventHandler).toHaveBeenCalledTimes(2);
    });

    await waitUntil(() => {
      expect(analyticsListenerHandler).toBeCalledWith(
        expect.objectContaining(additionUiEventNoNewFieldsModified),
      );
    });

    await waitUntil(() => {
      expect(gasV3TrackEventHandler).toBeCalledWith(
        expect.objectContaining(verifiedTrackEventAllFieldsValid),
      );
    });
  });

  test('On submission of form ui event is properly formed when changing fields', async () => {
    const analyticsListenerHandler = jest.fn();

    const { container } = render(
      <TestListeners onUIEvent={analyticsListenerHandler}>
        <FilledForm />
      </TestListeners>,
    );

    await BillingDetailsPage
      //
      .waitTillSettled()
      .addressForm(container)
      .fillCompany('Atlassian 2')
      .fillCity('Byron bay')
      .fillLine1Address('99 Captain cook street')
      .fillLine2Address('unit 11')
      .fillPostalCode('22345')
      .fillTaxId('2348782634');

    await BillingDetailsPage.submit();

    expect(analyticsListenerHandler).toBeCalledWith(
      expect.objectContaining(additionUiEventSomeFieldsModified),
    );
  });

  test('Proper verified event is triggered with invalid fields from server', async () => {
    const gasV3TrackEventHandler = jest.fn();

    const { container } = render(
      <TestListeners onTrackEvent={gasV3TrackEventHandler}>
        <FormWithInvalidFieldsFromServer />
      </TestListeners>,
    );

    const expectedErrorMessage =
      'City name provided does not match the state and country selected';

    await BillingDetailsPage
      //
      .waitTillSettled()
      .submit();

    await waitUntil(() => {
      expect(gasV3TrackEventHandler).toBeCalledWith(
        expect.objectContaining(verifiedTrackEventFieldsInvalid),
      );
    });

    expect(await AddressDetailsFragment(container).fieldError('City')).toMatch(
      expectedErrorMessage,
    );
  });

  test('Proper verified event is triggered with unknown validation error from server', async () => {
    const gasV3TrackEventHandler = jest.fn();
    render(
      <TestListeners onTrackEvent={gasV3TrackEventHandler}>
        <FormWithUnknownValidationError />
      </TestListeners>,
    );

    await BillingDetailsPage
      //
      .waitTillSettled()
      .submit();

    await waitUntil(() => {
      expect(gasV3TrackEventHandler).toBeCalledWith(
        expect.objectContaining(
          verifiedTrackEventUnsuccessfullNoInvalidFieldsDetected,
        ),
      );
    });

    const errorFragment = BillingDetailsPage.errorFragment();

    expect(await errorFragment.displayed()).toBeTruthy();
    expect(await errorFragment.content()).toMatch(
      'Unable to validate your address',
    );
  });

  test('Proper verified event is triggered with unknown error from server', async () => {
    const gasV3TrackEventHandler = jest.fn();

    render(
      <TestListeners onTrackEvent={gasV3TrackEventHandler}>
        <FormWithUnknownServerError />
      </TestListeners>,
    );

    await BillingDetailsPage
      //
      .waitTillSettled()
      .submit();

    await waitUntil(() => {
      expect(gasV3TrackEventHandler).toBeCalledWith(
        expect.objectContaining(verifiedTrackEventGeneralUpdateError),
      );
    });

    const errorFragment = BillingDetailsPage.errorFragment();

    expect(await errorFragment.displayed()).toBeTruthy();
    expect(await errorFragment.content()).toMatch('Something went wrong');
  });

  test('It is possible to update state without updating country', async () => {
    const submitHandler = jest.fn();
    render(<FullyPreFilledForm onSubmit={submitHandler} />);

    await BillingDetailsPage
      //
      .waitTillSettled()
      .selectState('Queensland')
      .submit();

    expect(submitHandler).toBeCalledWith(
      {
        name: 'Atlassian',
        postalAddress: {
          ...fullPostalAddress,
          state: 'QLD',
        },
        taxId: 'ABN-12345',
      },
      { dirty: true },
    );
  });
});
