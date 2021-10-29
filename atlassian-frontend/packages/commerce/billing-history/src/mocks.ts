import {
  defineContractMocks,
  Scenario,
} from '@atlassian/commerce-environment/mocks';

import { scenarios } from './services/invoices/mocks';

export const invoicesSuccessScenarios: Scenario[] = [
  scenarios.invoicesSuccess,
  scenarios.invoicesNextPage,
];

export const invoiceFailureScenario: Scenario[] = [scenarios.invoicesFailure];

export const openInvoiceSuccessScenario: Scenario[] = [
  scenarios.invoiceSuccess,
];

export const noInvoicesScenarios: Scenario[] = [scenarios.invoicesEmpty];

export {
  invoice1,
  invoice2,
  invoice3,
  invoice4,
  openInvoice,
  scenarios,
} from './services/invoices/mocks';

export const contractMocks = defineContractMocks(
  'billing-history',
  'accounts-receivable',
  scenarios,
);
