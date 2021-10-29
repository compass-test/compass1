import {
  defineContractMocks,
  Scenario,
} from '@atlassian/commerce-environment/mocks';

import { scenarios } from './services/mocks';

export {
  visaPaymentMethodId,
  visaPaymentMethod,
  amexPaymentMethod,
  masterPaymentMethod,
  deferredPaymentMethod,
  unrecognizedPaymentMethod,
  scenarios,
} from './services/mocks';

export const deferredPaymentMethodSuccessScenarios: Scenario[] = [
  scenarios.paymentMethodsDeferred,
  scenarios.deferredPaymentMethodSuccess,
  scenarios.deferredPaymentMethodForInvoiceGroupSuccess,
];

export const paymentMethodSuccessScenarios: Scenario[] = [
  scenarios.paymentMethodsSuccess,
  scenarios.paymentMethodSuccess,
  scenarios.paymentMethodsForInvoiceGroupSuccess,
  scenarios.updatePaymentMethodsForInvoiceGroupSuccess,
];

export const paymentMethodNotSetScenarios: Scenario[] = [
  scenarios.paymentMethodsEmpty,
  scenarios.paymentMethodsForInvoiceGroupNull,
  scenarios.updatePaymentMethodsForInvoiceGroupSuccess,
];

export const paymentMethodsAtTxaNoDefaultAtInvoiceGroup: Scenario[] = [
  scenarios.paymentMethodsSuccess,
  scenarios.paymentMethodsForInvoiceGroupNull,
  scenarios.updatePaymentMethodsForInvoiceGroupSuccess,
];

export const paymentMethodUpdateErrorScenarios: Scenario[] = [
  scenarios.paymentMethodsForInvoiceGroupEmpty,
  scenarios.updatePaymentMethodsForInvoiceGroupFailure,
];

export const contractMocks = defineContractMocks(
  'payment-methods',
  'accounts-receivable',
  scenarios,
);
