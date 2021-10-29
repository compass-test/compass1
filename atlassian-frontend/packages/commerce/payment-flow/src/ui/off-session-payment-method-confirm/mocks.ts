import { openInvoiceSuccessScenario } from '@atlassian/commerce-billing-history/mocks';
import { scenarios as ccpCreditCardScenarios } from '@atlassian/commerce-credit-card-ccp/mocks';
import { Scenario } from '@atlassian/commerce-environment/mocks';
import { paymentMethodSuccessScenarios } from '@atlassian/commerce-payment-methods/mocks';

import { scenarios } from '../../service/invoice-payment/mocks';

export const offSession3DSChallengeHappyPathScenarios: Scenario[] = [
  ccpCreditCardScenarios.success,
  ...openInvoiceSuccessScenario,
  ...paymentMethodSuccessScenarios,
  scenarios.invoicePaymentDataSuccess,
];

export const offSession3DSChallengeInvoicePaidScenarios: Scenario[] = [
  ccpCreditCardScenarios.success,
  ...openInvoiceSuccessScenario,
  ...paymentMethodSuccessScenarios,
  scenarios.invoicePaymentDataInvoiceAlreadyPaid,
];

export const offSession3DSChallengeConfirmationNotRequired: Scenario[] = [
  ccpCreditCardScenarios.success,
  ...openInvoiceSuccessScenario,
  ...paymentMethodSuccessScenarios,
  scenarios.invoicePaymentDataConfirmationNotRequired,
];

export const offSession3DSChallengeInvoiceNotPayable: Scenario[] = [
  ccpCreditCardScenarios.success,
  ...openInvoiceSuccessScenario,
  ...paymentMethodSuccessScenarios,
  scenarios.invoicePaymentDataInvoiceNotPayable,
];

export const offSession3DSChallengePaymentMethodChanged: Scenario[] = [
  ccpCreditCardScenarios.success,
  ...openInvoiceSuccessScenario,
  ...paymentMethodSuccessScenarios,
  scenarios.invoicePaymentDataPaymentMethodChanged,
];

export const offSession3DSChallengeInvalidPaymentMethod: Scenario[] = [
  ccpCreditCardScenarios.success,
  ...openInvoiceSuccessScenario,
  ...paymentMethodSuccessScenarios,
  scenarios.invoicePaymentDataPaymentMethodChanged,
];
