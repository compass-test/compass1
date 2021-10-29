import {
  defineContractMocks,
  Scenario,
} from '@atlassian/commerce-environment/mocks';

import { scenarios as countryScenarios } from './common/utils/billing-country/mocks';
import {
  formErrorValidationResponse,
  inlineErrorsValidationResponse,
} from './common/utils/validation-errors/mocks';
import { scenarios as billingDetailsScenarios } from './services/billing-details/mocks';

export const billingDetailsSuccessScenarios: Scenario[] = [
  countryScenarios.success,
  billingDetailsScenarios.getAllBillingDetailsSuccess,
  billingDetailsScenarios.successUpdate,
];

export const billingDetailsGenericFailureScenarios: Scenario[] = [
  countryScenarios.success,
  billingDetailsScenarios.getAllBillingDetailsSuccess,
  billingDetailsScenarios.failureUpdate,
];

export const emptyBillingDetailsScenarios: Scenario[] = [
  countryScenarios.success,
  billingDetailsScenarios.successEmpty,
  billingDetailsScenarios.successUpdate,
];

export const invalidBillingDetailsScenarios: Scenario[] = [
  countryScenarios.success,
  billingDetailsScenarios.getAllBillingDetailsSuccess,
  billingDetailsScenarios.updateValidationFailure,
];

export const invalidBillingDetailsScenariosWithFormMessages: Scenario[] = [
  countryScenarios.success,
  billingDetailsScenarios.getAllBillingDetailsSuccess,
  billingDetailsScenarios.updateValidationFailureWithFormMessages,
];

export const bareBonesBillingDetailsScenarios: Scenario[] = [
  billingDetailsScenarios.successBareBonesBillingDetails,
];

export const minimalBillingDetailsScenarios: Scenario[] = [
  billingDetailsScenarios.successMinimalBillingDetails,
];

export {
  successScenariosForDefaultCountries,
  australiaStates,
  scenarios as billingCountryStatesScenarios,
} from './common/utils/billing-country-states/mocks';

export {
  defaultCountries as billingCountries,
  scenarios as billingCountriesScenarios,
} from './common/utils/billing-country/mocks';

export const mockValidationResponseWithInlineMesasges = inlineErrorsValidationResponse;
export const mockValidationResponseWithFormMessages = formErrorValidationResponse;

export {
  minimalBillingDetails,
  fullBillingDetails,
  bareBonesBillingDetails,
  scenarios as billingDetailsScenarios,
} from './services/billing-details/mocks';

export {
  minimalShipToDetailsId,
  minimalShipToDetailsWithId,
  minimalShipToDetails,
  fullShipToDetails,
  fullShipToDetailsWithId,
  fullShipToDetailsId,
  shipToDetailsNotFoundId,
  scenarios as shipToDetailsScenarios,
} from './services/ship-to-details/mocks';

export const contractMocks = defineContractMocks(
  'billing-details',
  'accounts-receivable',
  billingDetailsScenarios,
);
