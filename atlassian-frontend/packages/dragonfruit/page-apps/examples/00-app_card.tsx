import React from 'react';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import AppCard from '../src/common/ui/app-card';

const bbIcon =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Bitbucket-blue-logomark-only.svg/1200px-Bitbucket-blue-logomark-only.svg.png';
const vendor = 'Atlassian Example Inc';
const description = 'Example app description';

export default function DefaultAppCard() {
  return (
    <CompassTestProvider>
      <ApolloAutoMockProvider>
        <AppCard
          name="Bitbucket Sync"
          appId=""
          imageUrl={bbIcon}
          vendor={vendor}
          description={description}
          intlKey={'test'}
        />
      </ApolloAutoMockProvider>
    </CompassTestProvider>
  );
}
