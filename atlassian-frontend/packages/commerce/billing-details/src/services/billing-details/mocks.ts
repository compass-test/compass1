import {
  empty,
  error,
  networksScenarios,
  ok,
  serverFailure,
  url,
} from '@atlassian/commerce-environment/mocks';

import {
  fullPostalAddress,
  minimalPostalAddress,
  partialPostalAddress,
} from '../../common/mocks';
import { BillingDetails, PartialBillingDetails } from '../../common/types';
import {
  formErrorValidationResponse,
  inlineErrorsValidationResponse,
} from '../../common/utils/validation-errors/mocks';

import { BILL_TO_PARTY_URL } from './constants';

export const minimalBillingDetails: BillingDetails = {
  name: 'Atlassian',
  postalAddress: minimalPostalAddress,
};

export const bareBonesBillingDetails: PartialBillingDetails = {
  postalAddress: partialPostalAddress,
};

export const fullBillingDetails: BillingDetails = {
  name: 'Atlassian',
  postalAddress: fullPostalAddress,
  taxId: 'ABN-12345',
};

export const scenarios = networksScenarios({
  successEmpty: {
    name: 'Request to fetch billing details that returns empty',
    request: url(BILL_TO_PARTY_URL),
    response: empty(),
  },
  successMinimalBillingDetails: {
    name: 'Request to fetch minimal billing details',
    request: url(BILL_TO_PARTY_URL),
    response: ok<BillingDetails>(minimalBillingDetails),
  },
  successBareBonesBillingDetails: {
    name: 'Request to fetch bare bone billing details',
    request: url(BILL_TO_PARTY_URL),
    response: ok<PartialBillingDetails>(bareBonesBillingDetails),
  },
  getAllBillingDetailsSuccess: {
    name: 'Request to fetch billing details',
    request: url(BILL_TO_PARTY_URL),
    response: ok<BillingDetails>(fullBillingDetails),
  },
  successUpdate: {
    name: 'Request to update billing details',
    request: url(
      BILL_TO_PARTY_URL,
      'PUT',
      { 'content-type': 'application/json' },
      {
        name: 'Atlassian',
        postalAddress: {
          country: 'AU',
          city: 'Sydney',
          line1: 'Level 6',
          line2: '341 George St',
          state: 'NSW',
          postcode: '2000',
        },
        taxId: 'ABN-12345',
      },
    ),
    response: ok<BillingDetails>(fullBillingDetails),
  },
  failureFetch: {
    name: 'Request server error',
    request: url(BILL_TO_PARTY_URL),
    response: serverFailure(),
  },
  failureUpdate: {
    name: 'Update server error',
    request: url(BILL_TO_PARTY_URL, 'PUT'),
    response: serverFailure(),
  },
  updateValidationFailure: {
    name: 'Request to update billing details failed',
    request: url(BILL_TO_PARTY_URL, 'PUT'),
    response: error(inlineErrorsValidationResponse),
  },
  updateValidationFailureWithFormMessages: {
    name: 'Request to update billing details failed with a message',
    request: url(BILL_TO_PARTY_URL, 'PUT'),
    response: error(formErrorValidationResponse),
  },
});
