import React from 'react';

import styled from 'styled-components';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import AppCard from './main';

const Wrapper = styled.div`
  padding: 20px 70px;
`;

export function BlankAppCard() {
  return (
    <Wrapper>
      <CompassTestProvider>
        <ApolloAutoMockProvider>
          <AppCard name="Bitbucket" appId="" intlKey="" />
        </ApolloAutoMockProvider>
      </CompassTestProvider>
    </Wrapper>
  );
}

export function UninstalledAppCard() {
  return (
    <Wrapper>
      <CompassTestProvider>
        <ApolloAutoMockProvider>
          <AppCard
            name="Bitbucket"
            appId=""
            isInstalled={false}
            extensionId="someid"
            intlKey=""
          />
        </ApolloAutoMockProvider>
      </CompassTestProvider>
    </Wrapper>
  );
}
