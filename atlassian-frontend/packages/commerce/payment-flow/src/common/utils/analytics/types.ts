import { Result } from '@atlassian/commerce-credit-card-ccp';
import { UIAnalyticsPayload } from '@atlassian/commerce-events-telemetry-react/ui-events';

import { InvoicePaymentDataError } from '../invoice-payment-data-error';

export type ConfirmedTrackEventAttributes = {
  attributes: {
    isSuccesfull: boolean;
    nativeError?: Error;
  };
};

export type InvoicePaymentDataErrorTrackEventAttributes = {
  attributes: {
    nativeError: InvoicePaymentDataError | Error;
  };
};

export type ConfirmedTrackEvent = UIAnalyticsPayload &
  ConfirmedTrackEventAttributes;

export type InvoicePaymentDataErrorTrackEvent = UIAnalyticsPayload &
  InvoicePaymentDataErrorTrackEventAttributes;

export type OffsessionConfirmationNotAvailableSourceEvent = {
  nativeError: InvoicePaymentDataError | Error;
};

export type OffsessionConfirmationNotAvailableMetalEvent = {
  component: string;
  name: string;
  page: string;
  value: number;
};

export type OffsessionConfirmationMetalEvent = {
  task: string;
  name: string;
  page: string;
  value: number;
};

export type OffSessionConfirmationResultSourceEvent = Result<unknown, unknown>;
