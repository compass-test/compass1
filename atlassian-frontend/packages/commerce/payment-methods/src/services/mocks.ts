import {
  empty,
  IG_ID,
  IG_ID_2,
  networksScenarios,
  notFound,
  ok,
  serverFailure,
  url,
} from '@atlassian/commerce-environment/mocks';
import { InvoiceGroupId } from '@atlassian/commerce-types';

import {
  CreditCardPaymentMethod,
  DeferredPaymentMethod,
  PagedList,
  PaymentMethod,
  PaymentMethodId,
} from '../common/types';

import {
  INVOICE_GROUP_URL,
  InvoiceGroupPaymentMethod,
  PAYMENT_METHOD_URL,
} from './index';

export const visaPaymentMethodId = 'visa-payment-method-id' as PaymentMethodId;
export const masterPaymentMethodId = 'master-payment-method-id' as PaymentMethodId;
export const paymentMethodIdNotFound = 'payment-method-id-not-found' as PaymentMethodId;

export const visaPaymentMethod: CreditCardPaymentMethod = {
  id: visaPaymentMethodId,
  type: 'CARD',
  default: true,
  card: {
    brand: 'visa',
    expMonth: 5,
    expYear: 21,
    last4: '4242',
  },
};

export const visaPaymentMethodWithName: CreditCardPaymentMethod = {
  ...visaPaymentMethod,
  card: { ...visaPaymentMethod.card, name: 'Adam Bill' },
};

export const masterPaymentMethod: CreditCardPaymentMethod = {
  id: masterPaymentMethodId,
  type: 'CARD',
  default: false,
  card: {
    brand: 'mastercard',
    expMonth: 10,
    expYear: 22,
    last4: '4444',
  },
};

export const amexPaymentMethod: CreditCardPaymentMethod = {
  id: 'amex-payment-method-id' as PaymentMethodId,
  type: 'CARD',
  default: false,
  card: {
    brand: 'amex',
    expMonth: 1,
    expYear: 23,
    last4: '1111',
  },
};

export const amexPaymentMethodSameLastFourAndDifferentId = {
  ...amexPaymentMethod,
  id: 'amex-payment-method-added-again-with-different-id' as PaymentMethodId,
};

export const visaPaymentMethodSameLastFourAndDifferentId = {
  ...visaPaymentMethodWithName,
  id: 'visa-payment-method-added-again-with-different-id' as PaymentMethodId,
};

export const masterPaymentMethodSameLastFourAndDifferentId = {
  ...masterPaymentMethod,
  id: 'master-payment-method-added-again-with-different-id' as PaymentMethodId,
};

export const deferredPaymentMethod: DeferredPaymentMethod = {
  id: 'deferred-payment-method-id' as PaymentMethodId,
  default: false,
  type: 'DEFERRED',
};

export const unrecognizedPaymentMethod: PaymentMethod = {
  id: 'atlas-pay-payment-method-id' as PaymentMethodId,
  default: false,
  type: 'ATLAS_PAY',
};

export const longPaymentMethodsList = [
  visaPaymentMethod,
  masterPaymentMethod,
  amexPaymentMethod,
  visaPaymentMethodSameLastFourAndDifferentId,
  masterPaymentMethodSameLastFourAndDifferentId,
  amexPaymentMethodSameLastFourAndDifferentId,
];

const defaultPaymentMethodUpdateRequest = (
  igId: InvoiceGroupId,
  paymentMethod: PaymentMethodId,
) =>
  url(
    INVOICE_GROUP_URL + '/' + igId,
    'PUT',
    { 'Content-Type': 'application/json' },
    { defaultPaymentMethod: paymentMethod },
  );

export const updatePaymentMethodsForInvoiceGroupSuccessScenario = (
  igId: InvoiceGroupId,
  paymentMethod: PaymentMethodId,
) => ({
  name: 'Request to update payment method for a given IG',
  request: defaultPaymentMethodUpdateRequest(igId, paymentMethod),
  response: ok<InvoiceGroupPaymentMethod>({
    id: igId,
    defaultPaymentMethod: paymentMethod,
  }),
});

export const removePaymentMethodSuccessScenario = (
  paymentMethodId: PaymentMethodId,
) => ({
  name: 'Request to remove payment method',
  request: url(`${PAYMENT_METHOD_URL}/${paymentMethodId}`, 'DELETE'),
  response: empty(),
});

export const paymentMethodSuccessScenario = (paymentMethod: PaymentMethod) => ({
  name: 'Request to fetch payment method',
  request: url(`${PAYMENT_METHOD_URL}/${paymentMethod.id}`),
  response: ok<PaymentMethod>(paymentMethod),
});

export const scenarios = networksScenarios({
  paymentMethodsSuccess: {
    name: 'Request to fetch payment methods',
    request: url(`${PAYMENT_METHOD_URL}?pageSize=1000`),
    response: ok<PagedList<PaymentMethod>>({
      data: [visaPaymentMethod, masterPaymentMethod],
      min: visaPaymentMethodId,
      max: masterPaymentMethodId,
    }),
  },
  paymentMethodsEmpty: {
    name: 'Request to fetch payment methods returns empty',
    request: url(`${PAYMENT_METHOD_URL}?pageSize=1000`),
    response: ok<PagedList<PaymentMethod>>({
      data: [],
    }),
  },
  paymentMethodsDeferred: {
    name: 'Request to fetch payment methods returns deferred',
    request: url(`${PAYMENT_METHOD_URL}?pageSize=1000`),
    response: ok<PagedList<PaymentMethod>>({
      data: [deferredPaymentMethod],
      min: visaPaymentMethodId,
      max: masterPaymentMethodId,
    }),
  },
  paymentMethodSuccess: paymentMethodSuccessScenario(visaPaymentMethod),
  deferredPaymentMethodSuccess: paymentMethodSuccessScenario(
    deferredPaymentMethod,
  ),
  paymentMethodNotFound: {
    name: 'Request to fetch payment method not found',
    request: url(`${PAYMENT_METHOD_URL}/${paymentMethodIdNotFound}`),
    response: notFound(),
  },
  visaPaymentMethodNotFound: {
    name: 'Request to fetch payment method not found',
    request: url(`${PAYMENT_METHOD_URL}/${paymentMethodIdNotFound}`),
    response: notFound(),
  },
  paymentMethodsForInvoiceGroupSuccess: {
    name: 'Request to fetch payment method for a given IG returns visa',
    request: url(`${INVOICE_GROUP_URL}/${IG_ID}`),
    response: ok({ defaultPaymentMethod: visaPaymentMethodId }),
  },
  deferredPaymentMethodForInvoiceGroupSuccess: {
    name: 'Request to fetch payment method for a given IG returns deferred',
    request: url(`${INVOICE_GROUP_URL}/${IG_ID}`),
    response: ok({ defaultPaymentMethod: deferredPaymentMethod.id }),
  },
  paymentMethodsForInvoiceGroupEmpty: {
    name:
      'Request to fetch payment method for a given IG returns empty response',
    request: url(`${INVOICE_GROUP_URL}/${IG_ID}`),
    response: ok({}),
  },
  paymentMethodsForInvoiceGroupNull: {
    name: 'Request to fetch payment method for a given IG returns nothing',
    request: url(`${INVOICE_GROUP_URL}/${IG_ID}`),
    response: ok<InvoiceGroupPaymentMethod>({
      id: IG_ID,
      defaultPaymentMethod: null,
    }),
  },
  paymentMethodsForInvoiceGroupNotFound: {
    name: 'Request to fetch payment method for a given IG returns not found',
    request: url(`${INVOICE_GROUP_URL}/${IG_ID}`),
    response: notFound(),
  },
  updatePaymentMethodsForInvoiceGroupSuccess: updatePaymentMethodsForInvoiceGroupSuccessScenario(
    IG_ID,
    visaPaymentMethodId,
  ),
  updatePaymentMethodsForInvoiceGroupNotFound: {
    name: 'Request to update payment method for a given IG not found',
    request: defaultPaymentMethodUpdateRequest(IG_ID, visaPaymentMethodId),
    response: notFound(),
  },
  updatePaymentMethodsForInvoiceGroupFailure: {
    name: 'Request to update payment method for a given IG server failure',
    request: defaultPaymentMethodUpdateRequest(IG_ID, visaPaymentMethodId),
    response: serverFailure(),
  },
  removePaymentMethodSuccess: removePaymentMethodSuccessScenario(
    visaPaymentMethodId,
  ),
  removePaymentMethodFailure: {
    name: 'Request to remove payment method server failure',
    request: url(`${PAYMENT_METHOD_URL}/${visaPaymentMethodId}`, 'DELETE'),
    response: serverFailure(),
  },
  fetchDefaultPaymentMethodsSuccess: {
    name: 'Request to payment methods',
    request: url(INVOICE_GROUP_URL, 'GET'),
    response: ok<PagedList<InvoiceGroupPaymentMethod>>({
      data: [
        {
          id: IG_ID,
          defaultPaymentMethod: visaPaymentMethodId,
        },
        {
          id: IG_ID_2,
          defaultPaymentMethod: masterPaymentMethodId,
        },
      ],
    }),
  },
  updateDefaultPaymentMethodForTxaSuccess: {
    name: 'Request to update default payment method',
    request: url(
      `${PAYMENT_METHOD_URL}/${masterPaymentMethodId}/set-default`,
      'PUT',
    ),
    response: empty(),
  },
  updateDefaultPaymentMethodForTxaFailure: {
    name: 'Request to update default payment method failed',
    request: url(
      `${PAYMENT_METHOD_URL}/${masterPaymentMethodId}/set-default`,
      'PUT',
    ),
    response: serverFailure(),
  },
});
