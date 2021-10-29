import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import { gridSize } from '@atlaskit/theme/constants';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import TeamCheckinsSectionMessage from './index';

const Container = styled.div`
  width: ${gridSize() * 150}px;
  padding: ${gridSize() * 5}px;
`;

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <ApolloAutoMockProvider>
        <CompassTestProvider>{storyFn()}</CompassTestProvider>
      </ApolloAutoMockProvider>
    ),
  ],
};

export const TeamCheckinsSectionMessageExample = () => (
  <Container>
    <TeamCheckinsSectionMessage onDismiss={() => {}} onCheckin={() => {}} />
  </Container>
);
