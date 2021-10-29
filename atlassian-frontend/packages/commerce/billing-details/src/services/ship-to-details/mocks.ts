import {
  error,
  networksScenarios,
  notFound,
  ok,
  serverFailure,
  url,
} from '@atlassian/commerce-environment/mocks';
import { InvoiceGroupId } from '@atlassian/commerce-types';

import { fullPostalAddress2 } from '../../common/mocks';
import {
  ShipToDetails,
  ShipToDetailsId,
  ShipToDetailsWithId,
} from '../../common/types';
import {
  formErrorValidationResponse,
  inlineErrorsValidationResponse,
} from '../../common/utils/validation-errors/mocks';
import { minimalBillingDetails } from '../billing-details/mocks';

import {
  INVOICE_GROUP_URL,
  SHIP_TO_PARTY_URL,
  ShipToDetailsList,
} from './index';

export const minimalShipToDetails: ShipToDetails = minimalBillingDetails;
export const minimalShipToDetailsId = 'minimal-ship-to-details-id' as ShipToDetailsId;
export const minimalShipToDetailsWithId: ShipToDetailsWithId = {
  id: minimalShipToDetailsId,
  ...minimalShipToDetails,
};

export const fullShipToDetails: ShipToDetails = {
  name: 'Shipito',
  postalAddress: fullPostalAddress2,
  taxId: 'ABN-12445',
};

export const invoiceGroupId = 'invoice-group-id' as InvoiceGroupId;
export const fullShipToDetailsId = 'full-ship-to-details-id' as ShipToDetailsId;
export const fullShipToDetailsWithId: ShipToDetailsWithId = {
  id: fullShipToDetailsId,
  ...fullShipToDetails,
};

export const shipToDetailsNotFoundId = 'ship-to-details-no-found' as ShipToDetailsId;

export const scenarios = networksScenarios({
  fetchListSuccess: {
    request: url(SHIP_TO_PARTY_URL),
    response: ok<ShipToDetailsList>({
      data: [minimalShipToDetailsWithId, fullShipToDetailsWithId],
      min: minimalShipToDetailsId,
      max: fullShipToDetailsId,
    }),
  },
  fetchListSuccessEmpty: {
    request: url(SHIP_TO_PARTY_URL),
    response: ok<ShipToDetailsList>({
      data: [],
    }),
  },
  fetchListFailure: {
    request: url(SHIP_TO_PARTY_URL),
    response: serverFailure(),
  },
  createSuccess: {
    request: url(SHIP_TO_PARTY_URL, 'POST'),
    response: ok<ShipToDetails>(minimalShipToDetailsWithId),
  },
  createFailure: {
    request: url(SHIP_TO_PARTY_URL, 'POST'),
    response: serverFailure(),
  },
  createValidationError: {
    request: url(SHIP_TO_PARTY_URL, 'POST'),
    response: error(inlineErrorsValidationResponse),
  },
  createValidationErrorWithFormMessages: {
    request: url(SHIP_TO_PARTY_URL, 'POST'),
    response: error(formErrorValidationResponse),
  },
  fetchSuccess: {
    request: url(`${SHIP_TO_PARTY_URL}/${minimalShipToDetailsId}`),
    response: ok<ShipToDetails>(minimalShipToDetailsWithId),
  },
  fetchSuccessFullShipToDetails: {
    request: url(`${SHIP_TO_PARTY_URL}/${fullShipToDetailsId}`),
    response: ok<ShipToDetails>(fullShipToDetailsWithId),
  },
  fetchNotFound: {
    request: url(`${SHIP_TO_PARTY_URL}/${shipToDetailsNotFoundId}`),
    response: notFound(),
  },
  fetchFailure: {
    request: url(`${SHIP_TO_PARTY_URL}/${minimalShipToDetailsId}`),
    response: serverFailure(),
  },
  updateSuccess: {
    request: url(`${SHIP_TO_PARTY_URL}/${minimalShipToDetailsId}`, 'PUT'),
    response: ok<ShipToDetails>(fullShipToDetailsWithId),
  },
  updateNotFound: {
    request: url(`${SHIP_TO_PARTY_URL}/${minimalShipToDetailsId}`, 'PUT'),
    response: notFound(),
  },
  updateFailure: {
    request: url(`${SHIP_TO_PARTY_URL}/${minimalShipToDetailsId}`, 'PUT'),
    response: serverFailure(),
  },
  updateValidationError: {
    request: url(`${SHIP_TO_PARTY_URL}/${minimalShipToDetailsId}`, 'PUT'),
    response: error(inlineErrorsValidationResponse),
  },
  updateValidationErrorWithFormMessages: {
    request: url(`${SHIP_TO_PARTY_URL}/${minimalShipToDetailsId}`, 'PUT'),
    response: error(formErrorValidationResponse),
  },
  updateDefaultSuccess: {
    request: url(`${INVOICE_GROUP_URL}/${invoiceGroupId}`, 'PUT'),
    response: ok<ShipToDetailsWithId>(fullShipToDetailsWithId),
  },
  updateDefaultNotFound: {
    request: url(`${INVOICE_GROUP_URL}/${invoiceGroupId}`, 'PUT'),
    response: notFound(),
  },
  updateDefaultFailure: {
    request: url(`${INVOICE_GROUP_URL}/${invoiceGroupId}`, 'PUT'),
    response: serverFailure(),
  },
});
