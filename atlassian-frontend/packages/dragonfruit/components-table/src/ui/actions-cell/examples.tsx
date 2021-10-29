import React, { ReactElement } from 'react';

import styled from 'styled-components';

import {
  ApolloAutoMockProvider,
  ApolloNetworkErrorProvider,
} from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ActionsCell } from './main';

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 200px;
`;

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <CompassTestProvider>{storyFn()}</CompassTestProvider>
    ),
  ],
};

export const ActionsCellExample = () => {
  return (
    <ApolloAutoMockProvider>
      <Container>
        <ActionsCell componentId="abc123" />
      </Container>
    </ApolloAutoMockProvider>
  );
};

export const ActionsCellErrorExample = () => {
  return (
    <ApolloNetworkErrorProvider>
      <Container>
        <ActionsCell componentId="abc123" />
      </Container>
    </ApolloNetworkErrorProvider>
  );
};
