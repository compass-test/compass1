import React from 'react';

import { MockedProvider } from '@apollo/client/testing';

import {
  fetchSalesforceAccountTeamQuery,
  // use the basic component to mock requests with a mock provider
  SalesforceAccountTeamWithoutProvider as SalesforceAccountTeam,
} from '../src/components/salesforce-account-team';

const mocks = [
  {
    request: {
      query: fetchSalesforceAccountTeamQuery,
      variables: {
        domain: 'atlassian.com',
      },
    },
    result: {
      data: {
        domain: {
          salesforceAccountTeam: [
            {
              id: 'catlas',
              avatarUrl:
                'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/initials/CA-0.png?ssl=1',
              firstName: 'Charlie',
              lastName: 'Atlas',
              role: 'Loyalty Advocate',
              slackInfo: {
                slackTeamId: '',
                slackUserId: '',
              },
            },
            {
              id: 'aatlas',
              avatarUrl:
                'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/initials/AA-6.png?ssl=1',
              firstName: 'Alana',
              lastName: 'Atlas',
              role: 'Enterprise Advocate',
              slackInfo: {
                slackTeamId: '',
                slackUserId: '',
              },
            },
          ],
        },
      },
    },
  },
];

const BasicStateExample = () => {
  return (
    <>
      <MockedProvider mocks={mocks}>
        <div style={{ width: '400px' }}>
          <SalesforceAccountTeam domain="atlassian.com" />
        </div>
      </MockedProvider>
    </>
  );
};

export default BasicStateExample;
