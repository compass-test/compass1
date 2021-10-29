import { Entitlement, NextBillingPeriod } from '../bux-api-provider/types';

export interface PollingAttributes {
  pollingDuration: number;
  error?: string;
}

export interface EditionPollingHook {
  entitlement: Entitlement | undefined;
  error: string | undefined;
}

export interface SelectEditionHook {
  jswResponse: number | undefined;
  confResponse: number | undefined;
  jswEntitlementId?: string;
  confEntitlementId?: string;
  error: string | undefined;
}

export interface EntitlementResponseType {
  error?: string;
  loading: boolean;
  entitlement?: Entitlement;
  nextBillingPeriod?: NextBillingPeriod;
}
