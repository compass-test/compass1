import { defineContractMocks } from '@atlassian/commerce-environment/mocks';

export {
  paymentFlowUpdateSuccessScenarios,
  paymentFlowAddSuccessScenarios,
  paymentFlowAddPaymentUpdatePaymentErrorScenarios,
  paymentFlowStripeErrorOverrides,
  deferredPaymentFlowUpdateSuccessScenarios,
  paymentFlowOverrides,
} from './ui/payment-flow/mocks';

export { billingFlowSuccessScenarios } from './ui/billing-details/mocks';

export {
  offSession3DSChallengeHappyPathScenarios,
  offSession3DSChallengeConfirmationNotRequired,
  offSession3DSChallengeInvalidPaymentMethod,
  offSession3DSChallengeInvoiceNotPayable,
  offSession3DSChallengeInvoicePaidScenarios,
  offSession3DSChallengePaymentMethodChanged,
} from './ui/off-session-payment-method-confirm/mocks';
export { scenarios as invoiceScenarios } from './service/invoice-payment/mocks';

import { scenarios } from './service/invoice-payment/mocks';

export const contractMocks = defineContractMocks(
  'payment-flow',
  'accounts-receivable',
  scenarios,
);
