import { Editions } from '../constants';

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
  currentEntitlement?: Entitlement;
  nextBillingPeriod?: NextBillingPeriod;
}

type MockEntitlement = Entitlement & {
  sen: string;
  entitlementGroupId: string;
  accountId: string;
  creationDate: string;
  status: string;
  editionTransitions: string[];
  suspended: boolean;
};
export type MockEntitlementResponse = {
  id: string;
  name: string;
  sen: string;
  entitlements: MockEntitlement[];
  accountId: string;
  status: string;
  autoRenewed: boolean;
  renewalAction: string;
  license: string;
  activeProductKeys: string[];
  productKeys: string[];
  currentBillingPeriod: NextBillingPeriod;
  nextBillingPeriod: NextBillingPeriod;
} & EntitlementByProduct;
