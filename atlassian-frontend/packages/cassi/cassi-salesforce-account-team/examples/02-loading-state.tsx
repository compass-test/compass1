import React from 'react';

import { MockedProvider } from '@apollo/client/testing';

import {
  // use the basic component to mock requests with a mock provider
  SalesforceAccountTeamWithoutProvider as SalesforceAccountTeam,
} from '../src/components/salesforce-account-team';

const LoadingStateExample = () => {
  return (
    <MockedProvider mocks={[]}>
      <div style={{ width: '400px' }}>
        <SalesforceAccountTeam domain="atlassian.com" hideAvatar={true} />
      </div>
    </MockedProvider>
  );
};

export default LoadingStateExample;
