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
          salesforceAccountTeam: [],
        },
      },
    },
  },
];

const EmptyStateExample = () => {
  return (
    <MockedProvider mocks={mocks}>
      <div style={{ width: '400px' }}>
        <SalesforceAccountTeam domain="atlassian.com" />
      </div>
    </MockedProvider>
  );
};

export default EmptyStateExample;
