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

export const MockBUXResponse = {
  id: 'c7c92562-247a-4863-9fcb-d80d980a0b40',
  name: 'mpan-test-pu-jsw',
  domain: 'jira-dev.com',
  sen: 'SEN-8626792',
  entitlements: [
    {
      id: '8626793',
      sen: 'SEN-8626793',
      productKey: 'jira-software.ondemand',
      name: 'Jira Software (Cloud)',
      entitlementGroupId: 'c7c92562-247a-4863-9fcb-d80d980a0b40',
      accountId: 'c7c92562-247a-4863-9fcb-d80d980a0b40',
      startDate: '2020-10-07',
      endDate: '2020-11-11',
      creationDate: '2020-08-11',
      currentEdition: 'free',
      overriddenEdition: 'free',
      shortTrial: false,
      futureEdition: 'free',
      status: 'ACTIVE',
      editionTransitions: ['UPGRADE'],
      suspended: false,
      addon: false,
    },
  ],
  accountId: 'c7c92562-247a-4863-9fcb-d80d980a0b40',
  status: 'ACTIVE',
  currentBillingPeriod: {
    startDate: '2020-10-11',
    endDate: '2020-11-11',
    renewalFrequency: 'MONTHLY',
  },
  nextBillingPeriod: {
    startDate: '2020-11-11',
    endDate: '2020-12-11',
    renewalFrequency: 'MONTHLY',
  },
  renewalAction: 'AUTO_RENEW',
  license: 'COMMERCIAL',
  activeProductKeys: ['jira-software.ondemand'],
  productKeys: ['jira-software.ondemand'],
};

export const getMockEntitlement = (entitlement?: Partial<Entitlement>) => ({
  id: '8172456',
  productKey: 'jira-software.ondemand',
  name: 'Jira Software (Cloud)',
  startDate: '2019-07-03',
  endDate: '2019-07-10',
  trialEndDate: '2019-08-11',
  currentEdition: Editions.STANDARD,
  futureEdition: Editions.PREMIUM,
  ...entitlement,
});

export const getMockNextBillingPeriod = (
  nextBillingPeriod?: Partial<NextBillingPeriod>,
) => ({
  startDate: '2019-07-03',
  endDate: '2019-07-10',
  renewalFrequency: 'MONTHLY',
  ...nextBillingPeriod,
});
