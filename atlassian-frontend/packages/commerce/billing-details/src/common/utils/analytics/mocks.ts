import { HttpResponseError } from '@atlassian/commerce-service-hook';

import { ValidationError } from '../validation-errors';
import { inlineErrorsValidationResponse } from '../validation-errors/mocks';

export const additionUiEventNoNewFieldsModified = {
  action: 'clicked',
  actionSubject: 'button',
  actionSubjectId: 'next',
  source: 'billingAddressScreen',
  attributes: {
    companyName: null,
    address1: null,
    address2: null,
    city: null,
    state: null,
    postalCode: null,
    taxId: null,
    addedAllRequiredFields: true,
  },
};

export const additionUiEventSomeFieldsModified = {
  action: 'clicked',
  actionSubject: 'button',
  actionSubjectId: 'next',
  source: 'billingAddressScreen',
  attributes: {
    companyName: 'changed',
    address1: 'changed',
    address2: 'changed',
    city: 'changed',
    state: null,
    postalCode: 'changed',
    taxId: 'changed',
    addedAllRequiredFields: true,
  },
};

export const verifiedTrackEventAllFieldsValid = {
  action: 'verified',
  actionSubject: 'billingAddress',
  actionSubjectId: 'next',
  source: 'billingAddressScreen',
  attributes: {
    isSuccessful: true,
    country: 'AU',
    address1Valid: true,
    address2Valid: true,
    taxIdValid: true,
    cityValid: true,
    stateValid: true,
    postalCodeValid: true,
  },
};

//all fields that can be invalid from server response
export const verifiedTrackEventFieldsInvalid = {
  action: 'verified',
  actionSubject: 'billingAddress',
  actionSubjectId: 'next',
  source: 'billingAddressScreen',
  attributes: {
    isSuccessful: false,
    country: 'AU',
    address1Valid: false,
    address2Valid: true,
    taxIdValid: false,
    cityValid: false,
    stateValid: true,
    postalCodeValid: true,
    nativeError: new ValidationError(inlineErrorsValidationResponse),
  },
};

//unknown error returned from server
export const verifiedTrackEventUnsuccessfullNoInvalidFieldsDetected = {
  action: 'verified',
  actionSubject: 'billingAddress',
  actionSubjectId: 'next',
  source: 'billingAddressScreen',
  attributes: {
    isSuccessful: false,
    country: 'AU',
    address1Valid: true,
    address2Valid: true,
    taxIdValid: true,
    cityValid: true,
    stateValid: true,
    postalCodeValid: true,
    nativeError: new ValidationError({}),
  },
};

export const verifiedTrackEventGeneralUpdateError = {
  action: 'verified',
  actionSubject: 'billingAddress',
  actionSubjectId: 'next',
  source: 'billingAddressScreen',
  attributes: {
    isSuccessful: false,
    country: 'AU',
    address1Valid: true,
    address2Valid: true,
    taxIdValid: true,
    cityValid: true,
    stateValid: true,
    postalCodeValid: true,
    nativeError: new HttpResponseError('billing-details-update', 500),
  },
};
