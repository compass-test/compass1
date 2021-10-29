import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';

import {
  fetchSalesforceAccountTeamQuery,
  SalesforceAccountTeamWithoutProvider,
} from '../../components/salesforce-account-team';

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

describe('<SalesforceAccountTeam />', () => {
  it('should render error state correctly', async () => {
    const mocksWithError = [
      {
        request: {
          query: fetchSalesforceAccountTeamQuery,
          variables: {
            domain: 'atlassian.com',
          },
        },
        error: new Error('something went wrong'),
      },
    ];

    const { findByTestId } = render(
      <MockedProvider mocks={mocksWithError} addTypename={false}>
        <SalesforceAccountTeamWithoutProvider domain="atlassian.com" />
      </MockedProvider>,
    );

    expect(await findByTestId('error-container')).toBeInTheDocument();
  });

  it('should render correctly when presented a valid payload', async () => {
    const { findByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SalesforceAccountTeamWithoutProvider domain="atlassian.com" />
      </MockedProvider>,
    );

    expect(await findByTestId('results-container')).toBeInTheDocument();
  });

  it('should render correctly when empty', async () => {
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

    const { findByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SalesforceAccountTeamWithoutProvider domain="atlassian.com" />
      </MockedProvider>,
    );

    expect(
      await findByText(/There is no associated account team in Salesforce/),
    ).toBeInTheDocument();
  });

  it('should render loading state initially', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <SalesforceAccountTeamWithoutProvider domain="atlassian.com" />
      </MockedProvider>,
    );

    expect(getByTestId('loading-container')).toBeInTheDocument();
  });
});
