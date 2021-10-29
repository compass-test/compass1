// eslint-disable-next-line import/no-extraneous-dependencies
import fetchMock from 'fetch-mock/cjs/client';

import { entitlement } from './mock-data/entitlement';
import { groups } from './mock-data/groups';

export const mockBuxApi = () => {
  // EntitlementGroup is needed for the per-product entitlement ID, because that's used for the edition upgrade
  fetchMock.get(
    'express:/gateway/api/billing-ux/cloud/:cloudId/billing/entitlement-group',
    entitlement,
    { delay: 200 },
  );

  // We =SHOULD= never be calling edition
  fetchMock.get(
    'express:/gateway/api/billing-ux/cloud/:cloudId/billing/entitlements/:entitlementId/edition',
    {
      availableEditions: [
        {
          edition: 'free',
          needsPaymentDetailsOnAccount: false,
          transition: 'DOWNGRADE',
        },
        {
          edition: 'premium',
          needsPaymentDetailsOnAccount: true,
          transition: 'UPGRADE',
        },
      ],
      currentEdition: 'standard',
    },
    { delay: 200 },
  );

  // Groups is used to see what groups exist on the site.
  fetchMock.get(
    'express:/gateway/api/adminhub/um/site/:cloudId/groups',
    groups,
    { delay: 50 },
  );

  fetchMock.put(
    'express:/gateway/api/billing-ux/cloud/:cloudId/billing/entitlements/:entitlementId/edition/:edition',
    {
      status: 204,
    },
    { delay: 500 },
  );

  fetchMock.get(
    'express:/gateway/api/billing-ux/cloud/:cloudId/billing/billing-details',
    {
      addressLine1: '343 George Street',
      addressLine2: '',
      city: 'Doncaster',
      contactPartnerForAccount: false,
      country: 'AU',
      creditCard: {
        suffix: '1111',
        expiryMonth: 2,
        expiryYear: 2020,
        type: 'VISA',
        name: 'Tester',
      },
      currency: 'USD',
      email: 'tester@atlassian.com',
      firstName: 'First',
      id: '5d02ed595b75cc0c04cca627',
      lastName: 'Last',
      managedByPartner: false,
      organisationName: 'tester@atlassian.com',
      paymentMethod: 'TOKENIZED_CREDIT_CARD',
      postcode: '3108',
      state: 'VIC',
    },
    { delay: 1000 },
  );

  fetchMock.post(
    'express:/gateway/api/adminhub/um/site/:cloudId/product/:productName/access-config/use',
    {
      status: 204,
    },
    { delay: 500 },
  );
};
