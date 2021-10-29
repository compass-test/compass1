export {
  SP_CANCELLATION_ORDER_RESPONSE_SUCCESS,
  SP_REACTIVATION_ORDER_RESPONSE_SUCCESS,
} from './services/order/mocks';

import {
  asCommerceOverride,
  defineContractMocks,
  pickContractMocks,
  Scenario,
} from '@atlassian/commerce-environment/mocks';

export {
  CANCELLATION_ORDER_ID,
  FREE_SP_ENTITLEMENT,
  LIRA_ENTITLEMENT,
  REACTIVATION_ORDER_ID,
  SP_ENTITLEMENT_1,
  SP_ENTITLEMENT_1_UPDATED,
  SP_ENTITLEMENT_2,
  SP_ENTITLEMENT_2_UPDATED,
  SP_ENTITLEMENT_3,
  SP_ENTITLEMENT_3_UPDATED,
  SP_ENTITLEMENT_PENDING_CANCELLATION,
  SP_ENTITLEMENT_CANCELLED,
  SP_ENTITLEMENT_INACTIVE,
  LIRA_ENTITLEMENT_INACTIVE,
  LIRA_ENTITLEMENT_PENDING_CANCELLATION,
  LIRA_ENTITLEMENT_CANCELLED,
  LIRA_ENTITLEMENT_TRIAL,
  FREE_SP_ENTITLEMENT_INACTIVE,
} from './common/mocks';

import { scenarios as entitlementScenarios } from './services/fetch-entitlements/mocks';
import {
  generateCancelDeactivationOrderId,
  generateCancellationOrderId,
  generateReactivationOrderId,
} from './services/order';
import {
  createMockedCancelDeactivationOrderIdGenerator,
  createMockedCancellationOrderIdGenerator,
  createMockedReactivationOrderIdGenerator,
  scenarios as orderScenarios,
} from './services/order/mocks';

export const entitlementSuccessScenarios: Scenario[] = [
  orderScenarios.placeOrderSuccess,
  orderScenarios.fetchCancellationOrderSuccess,
  orderScenarios.fetchReactivationOrderSuccess,
];
export const entitlementFailureScenarios: Scenario[] = [
  orderScenarios.placeOrderSuccess,
  orderScenarios.fetchCancellationOrderServerFailure,
  orderScenarios.fetchReactivationOrderServerFailure,
];

export { scenarios as fetchEntitlementScenarios } from './services/fetch-entitlements/mocks';

const cancellationOrderIdGeneratorOverride = asCommerceOverride(
  generateCancellationOrderId,
  createMockedCancellationOrderIdGenerator,
);

const reactivationOrderIdGeneratorOverride = asCommerceOverride(
  generateReactivationOrderId,
  createMockedReactivationOrderIdGenerator,
);

const cancelDeactivationOrderIdGeneratorOverride = asCommerceOverride(
  generateCancelDeactivationOrderId,
  createMockedCancelDeactivationOrderIdGenerator,
);

export const orderIdGeneratorOverrides = [
  cancellationOrderIdGeneratorOverride,
  reactivationOrderIdGeneratorOverride,
  cancelDeactivationOrderIdGeneratorOverride,
];

export const contractMocks = [
  // fetchEntitlementDetail is managed by CCP Gateway, which is not providing working contract for now
  // pickContractMocks('entitlements', 'entitlement-service', entitlementScenarios),
  pickContractMocks('entitlements', 'ccp-search', entitlementScenarios),
  defineContractMocks('orders', 'order-management-service', orderScenarios),
];
