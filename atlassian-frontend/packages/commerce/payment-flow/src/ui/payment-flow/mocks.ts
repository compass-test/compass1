import {
  billingDetailsSuccessScenarios,
  successScenariosForDefaultCountries,
} from '@atlassian/commerce-billing-details/mocks';
import {
  scenarios as ccpCreditCardScenarios,
  stripeConfirmCardSetupErrorOverride,
  stripeOverride,
} from '@atlassian/commerce-credit-card-ccp/mocks';
import {
  deferredPaymentMethodSuccessScenarios,
  paymentMethodNotSetScenarios,
  paymentMethodsAtTxaNoDefaultAtInvoiceGroup,
  paymentMethodSuccessScenarios,
  paymentMethodUpdateErrorScenarios,
} from '@atlassian/commerce-payment-methods/mocks';

export const paymentFlowAddSuccessScenarios = [
  ccpCreditCardScenarios.success,
  ...billingDetailsSuccessScenarios,
  ...paymentMethodNotSetScenarios,
  ...successScenariosForDefaultCountries,
];

export const paymentFlowAddPaymentUpdatePaymentErrorScenarios = [
  ccpCreditCardScenarios.success,
  ...billingDetailsSuccessScenarios,
  ...paymentMethodUpdateErrorScenarios,
  ...successScenariosForDefaultCountries,
];

export const paymentFlowUpdateSuccessScenarios = [
  ccpCreditCardScenarios.success,
  ...billingDetailsSuccessScenarios,
  ...paymentMethodSuccessScenarios,
  ...successScenariosForDefaultCountries,
];

export const paymentFlowUpdateNoDefaultAtInvoiceGroupSuccessScenarios = [
  ccpCreditCardScenarios.success,
  ...billingDetailsSuccessScenarios,
  ...paymentMethodsAtTxaNoDefaultAtInvoiceGroup,
  ...successScenariosForDefaultCountries,
];

export const deferredPaymentFlowUpdateSuccessScenarios = [
  ...billingDetailsSuccessScenarios,
  ...deferredPaymentMethodSuccessScenarios,
  ...successScenariosForDefaultCountries,
];

export const paymentFlowOverrides = [stripeOverride];
export const paymentFlowStripeErrorOverrides = [
  stripeConfirmCardSetupErrorOverride,
];
