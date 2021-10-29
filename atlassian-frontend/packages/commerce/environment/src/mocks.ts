export {
  CommerceMockedEnvironment,
  createMockedEnvironmentWrapper,
} from './controllers/mocked-provider';
export {
  url,
  ok,
  error,
  serverFailure,
  notFound,
  clientFailure,
  empty,
  created,
  TXA_ID,
  TXA_ID_2,
  TXA_ID_NO,
  TXA_ID_NO_2,
  IG_ID,
  IG_ID_2,
  networksScenarios,
  networkScenario,
  scenarioToResponse,
  scenarioToRequestPredicate,
} from './common/scenarios';
export type { Scenario } from './common/scenarios';
export type {
  ScenarioBlueprint,
  ScenarioDefinedResponse,
  ScenarioError,
  ScenarioRequest,
  ScenarioResponse,
  ScenarioUndefinedResponse,
} from './common/scenarios/types';
export type {
  ServiceContractScenarios,
  ContractScenarios,
} from './common/contracts/types';
export { defineContractMocks, pickContractMocks } from './common/contracts';
export { fetchMock } from './common/fetch-mock';
export { asCommerceOverride } from './controllers/use-commerce-override';
export type { CommerceOverride } from './controllers/use-commerce-override/types';

export { StargateProxyStgCookieCheck } from './ui/stargate-proxy-check';
export { CommerceStartgateProxy } from './ui/commerce-stargate-proxy';

import { scenarios as invoiceGroupScenarios } from './services/invoice-groups/mocks';
import { scenarios as transactionAccountsScenarios } from './services/transaction-accounts/mocks';

export const defaultAccountScenario = [
  invoiceGroupScenarios.success,
  transactionAccountsScenarios.success,
];

export const multipleTransactionAccount = [
  transactionAccountsScenarios.success,
];

export const emptyTransactionAccount = [transactionAccountsScenarios.empty];

export const singleTransactionAccount = [transactionAccountsScenarios.single];
