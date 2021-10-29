import React from 'react';

import { MockedProvider } from '@apollo/client/testing';

import { FetchDirectMatch } from '../src/common/utils/direct-match';
import { BillingDocument } from '../src/ui';

const mocks = [
  {
    request: {
      query: FetchDirectMatch,
      variables: {
        query: 'AT-1000011321',
      },
    },
    result: {
      data: {
        searchForDirectMatch: {
          entity: 'QUOTE',
        },
      },
    },
  },
];

export default function Basic() {
  return (
    <>
      <MockedProvider mocks={mocks}>
        <BillingDocument id={'AT-1000011321'} />
      </MockedProvider>
    </>
  );
}
