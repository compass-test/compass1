import { HttpResponseError } from '@atlassian/commerce-service-hook';
import { catalog } from '@atlassian/commerce-telemetry-clients';

import { InvoicePaymentDataError } from '../invoice-payment-data-error';

import {
  ConfirmedTrackEvent,
  OffsessionConfirmationMetalEvent,
  OffsessionConfirmationNotAvailableMetalEvent,
} from './types';

export const confirmedSuccessful: ConfirmedTrackEvent = {
  action: 'confirmed',
  actionSubject: 'billingConfirmation',
  actionSubjectId: 'subscribe',
  attributes: {
    isSuccesfull: true,
  },
};

export const confirmedPaymentUpdateError: ConfirmedTrackEvent = {
  action: 'confirmed',
  actionSubject: 'billingConfirmation',
  actionSubjectId: 'subscribe',
  attributes: {
    isSuccesfull: false,
    nativeError: new HttpResponseError('invoice-group-update', 500),
  },
};

export const confirmedStripeError: ConfirmedTrackEvent = {
  action: 'confirmed',
  actionSubject: 'billingConfirmation',
  actionSubjectId: 'subscribe',
  attributes: {
    isSuccesfull: false,
    nativeError: new Error(
      'Card confirmation setup failed. Details: {"exception":{"type":"api_error"}}',
    ),
  },
};

const offsessionConfirmationNotAvailableMetalEvent: OffsessionConfirmationNotAvailableMetalEvent = {
  component: 'offsession-payment-confirmation-edge-case',
  name: catalog.error.COMPONENT,
  page: 'offsessionConfirmationNotAvailable',
  value: 1,
};

const offsessionConfirmationSuccessMetalEvent: OffsessionConfirmationMetalEvent = {
  name: catalog.userInteraction.TASK_SUCCESS,
  page: 'offsessionConfirmationFlow',
  task: 'offsession-payment-confirmation',
  value: 1,
};

const offsessionConfirmationFailureMetalEvent: OffsessionConfirmationMetalEvent = {
  name: catalog.userInteraction.TASK_FAILURE,
  page: 'offsessionConfirmationFlow',
  task: 'offsession-payment-confirmation',
  value: 1,
};

const mockInvoicePaymentDataHappyPathScreenEvent = {
  attributes: {},
  name: 'offsessionConfirmationFlow',
};

const mockInvoicePaymentDataErrorScreenEvent = {
  attributes: {
    nativeError: new InvoicePaymentDataError({}),
  },
  name: 'offsessionConfirmationNotAvailable',
};

const paymentConfirmationUIEvent = {
  action: 'clicked',
  actionSubject: 'button',
  actionSubjectId: 'Pay now',
  source: 'offsessionConfirmationFlow',
};

const paymentConfirmationSuccessTrackEvent = {
  action: 'confirm',
  actionSubject: 'cardPayment',
  attributes: { success: true },
  source: 'none',
};

const paymentConfirmationFailureTrackEvent = {
  action: 'confirm',
  actionSubject: 'cardPayment',
  attributes: { success: false },
  source: 'none',
};

const cardSetupTrackEvent = {
  action: 'confirm',
  actionSubject: 'cardSetup',
  attributes: { success: true },
  source: 'none',
};

export const paymentConfirmationEventMocks = {
  metal: {
    offsessionConfirmationNotAvailableMetalEvent,
    offsessionConfirmationSuccessMetalEvent,
    offsessionConfirmationFailureMetalEvent,
  },
  screen: {
    mockInvoicePaymentDataErrorScreenEvent,
    mockInvoicePaymentDataHappyPathScreenEvent,
  },
  ui: {
    paymentConfirmationUIEvent,
  },
  track: {
    paymentConfirmationSuccessTrackEvent,
    paymentConfirmationFailureTrackEvent,
    cardSetupTrackEvent,
  },
};
