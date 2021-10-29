import {
  networksScenarios,
  notFound,
  ok,
  serverFailure,
  url,
} from '@atlassian/commerce-environment/mocks';

import {
  FREE_SP_ENTITLEMENT,
  FREE_SP_ENTITLEMENT_INACTIVE,
  LIRA_ENTITLEMENT,
  LIRA_ENTITLEMENT_CANCELLED,
  LIRA_ENTITLEMENT_INACTIVE,
  LIRA_ENTITLEMENT_PENDING_CANCELLATION,
  LIRA_ENTITLEMENT_TRIAL,
  SP_ENTITLEMENT_1,
  SP_ENTITLEMENT_1_UPDATED,
  SP_ENTITLEMENT_2,
  SP_ENTITLEMENT_2_UPDATED,
  SP_ENTITLEMENT_3,
  SP_ENTITLEMENT_3_UPDATED,
  SP_ENTITLEMENT_CANCELLED,
  SP_ENTITLEMENT_INACTIVE,
  SP_ENTITLEMENT_PENDING_CANCELLATION,
} from '../../common/mocks';
import type { ExpandedEntitlement } from '../../common/types';

import {
  ENTITLEMENTS_URL,
  EntitlementsExpandedSearchResponse,
  EntitlementsSearchResponse,
  SEARCH_URL,
} from './index';

const requestHeaders = {
  'Content-Type': 'application/json',
};

const standardSearchRequestBody = {
  payload: {
    query: {
      term: {
        transactionAccountId: 'TXA',
      },
    },
  },
  class: 'entitlement',
  expand: [
    'subscriptionId',
    'offeringKey',
    'offeringKey.productKey',
    'subscriptionId.pricingPlanId',
  ],
};

const entitlementSearchRequestBody = {
  payload: {
    query: {
      match: {
        entitlementId: 'ENTITLEMENT',
      },
    },
  },
  class: 'entitlement',
};

const orderIdSearchRequestBody = {
  class: 'entitlement',
  payload: {
    query: {
      term: {
        'order.id': 'ORDER_ID',
      },
    },
  },
};

export const scenarios = networksScenarios({
  fetchEntitlementsSuccess: {
    request: url(SEARCH_URL, 'POST', requestHeaders, standardSearchRequestBody),
    response: ok<EntitlementsExpandedSearchResponse>({
      results: [
        SP_ENTITLEMENT_1,
        SP_ENTITLEMENT_2,
        SP_ENTITLEMENT_3,
        LIRA_ENTITLEMENT,
        FREE_SP_ENTITLEMENT,
        SP_ENTITLEMENT_INACTIVE,
        LIRA_ENTITLEMENT_INACTIVE,
        FREE_SP_ENTITLEMENT_INACTIVE,
        SP_ENTITLEMENT_PENDING_CANCELLATION,
        LIRA_ENTITLEMENT_PENDING_CANCELLATION,
        LIRA_ENTITLEMENT_CANCELLED,
        SP_ENTITLEMENT_CANCELLED,
        LIRA_ENTITLEMENT_TRIAL,
      ],
    }),
  },
  fetchInactiveEntitlementsSuccess: {
    request: url(SEARCH_URL, 'POST', requestHeaders, standardSearchRequestBody),
    response: ok<EntitlementsExpandedSearchResponse>({
      results: [
        SP_ENTITLEMENT_INACTIVE,
        LIRA_ENTITLEMENT_INACTIVE,
        FREE_SP_ENTITLEMENT_INACTIVE,
      ],
    }),
  },
  fetchCancelledEntitlementsSuccess: {
    request: url(SEARCH_URL, 'POST', requestHeaders, standardSearchRequestBody),
    response: ok<EntitlementsExpandedSearchResponse>({
      results: [
        SP_ENTITLEMENT_PENDING_CANCELLATION,
        LIRA_ENTITLEMENT_PENDING_CANCELLATION,
        LIRA_ENTITLEMENT_CANCELLED,
        SP_ENTITLEMENT_CANCELLED,
      ],
    }),
  },
  fetchEntitlementsForSingleInvoiceGroupSuccess: {
    request: url(SEARCH_URL, 'POST', requestHeaders, standardSearchRequestBody),
    response: ok<EntitlementsExpandedSearchResponse>({
      results: [
        SP_ENTITLEMENT_1,
        SP_ENTITLEMENT_2,
        LIRA_ENTITLEMENT,
        SP_ENTITLEMENT_INACTIVE,
        LIRA_ENTITLEMENT_INACTIVE,
      ],
    }),
  },
  fetchEntitlementsOnlyFreeSuccess: {
    request: url(SEARCH_URL, 'POST', requestHeaders, standardSearchRequestBody),
    response: ok<EntitlementsExpandedSearchResponse>({
      results: [FREE_SP_ENTITLEMENT, FREE_SP_ENTITLEMENT_INACTIVE],
    }),
  },
  fetchEntitlementsEmpty: {
    request: url(SEARCH_URL, 'POST', requestHeaders, standardSearchRequestBody),
    response: ok<EntitlementsExpandedSearchResponse>({
      results: [],
    }),
  },
  fetchEntitlementsServerFailure: {
    request: url(SEARCH_URL, 'POST', requestHeaders, standardSearchRequestBody),
    response: serverFailure(),
  },
  fetchEntitlementsNotFoundFailure: {
    request: url(SEARCH_URL, 'POST', requestHeaders, standardSearchRequestBody),
    response: notFound(),
  },
  fetchEntitlementSuccess: {
    request: url(SEARCH_URL, 'POST', requestHeaders, standardSearchRequestBody),
    response: ok<EntitlementsSearchResponse>({
      results: [SP_ENTITLEMENT_1],
    }),
  },
  fetchEntitlementV2Success: {
    request: url(
      SEARCH_URL,
      'POST',
      requestHeaders,
      entitlementSearchRequestBody,
    ),
    response: ok<EntitlementsSearchResponse>({
      results: [SP_ENTITLEMENT_1_UPDATED],
    }),
  },
  fetchEntitlementFailure: {
    request: url(SEARCH_URL, 'POST', requestHeaders, standardSearchRequestBody),
    response: serverFailure(),
  },
  fetchEntitlementDetail: {
    request: url(
      `${ENTITLEMENTS_URL}/ENT/detail`,
      'POST',
      requestHeaders,
      entitlementSearchRequestBody,
    ),
    response: ok<ExpandedEntitlement>({
      ...SP_ENTITLEMENT_1,
    }),
  },
  fetchEntitlementsForOrderIdSuccess: {
    request: url(SEARCH_URL, 'POST', requestHeaders, orderIdSearchRequestBody),
    response: ok<EntitlementsSearchResponse>({
      results: [SP_ENTITLEMENT_1, SP_ENTITLEMENT_2, SP_ENTITLEMENT_3],
    }),
  },
  fetchEntitlementsForOrderIdUpdatedSuccess: {
    request: url(SEARCH_URL, 'POST', requestHeaders, orderIdSearchRequestBody),
    response: ok<EntitlementsSearchResponse>({
      results: [
        SP_ENTITLEMENT_1_UPDATED,
        SP_ENTITLEMENT_2_UPDATED,
        SP_ENTITLEMENT_3_UPDATED,
      ],
    }),
  },
  fetchEntitlementsForOrderIdFailure: {
    request: url(SEARCH_URL, 'POST', requestHeaders, orderIdSearchRequestBody),
    response: serverFailure(),
  },
});
