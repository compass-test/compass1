import { Editions } from '../../common/constants';

export interface EntitlementGroupResponse {
  entitlements: Entitlement[];
  nextBillingPeriod: NextBillingPeriod;
}

export interface SelectEditionBody {
  estimateId: string | null;
}

export interface CloudParamOptions {
  org?: string;
  cloudId?: string;
}

export interface NextBillingPeriod {
  startDate: string;
  endDate: string;
  renewalFrequency: string;
}

export interface Entitlement {
  id: string;
  name: string;
  productKey: string;
  currentEdition: Editions;
  futureEdition: Editions;
  startDate: string;
  endDate: string;
  trialEndDate?: string;
}

export interface EntitlementByProduct {
  jswEntitlementId?: string;
  confEntitlementId?: string;
}

export interface ResponseHook {
  statusCode: number;
}
