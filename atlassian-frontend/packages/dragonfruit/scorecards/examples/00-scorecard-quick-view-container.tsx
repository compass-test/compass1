import React from 'react';

import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ScorecardQuickViewContainer } from '../src';

const Container = styled.div`
  width: ${gridSize() * 33}px;
`;

export default function ScorecardQuickViewContainerExample() {
  return (
    <Container>
      <CompassTestProvider>
        <ApolloAutoMockProvider>
          <ScorecardQuickViewContainer
            componentId="fake-component"
            testId="scorecards"
          />
        </ApolloAutoMockProvider>
      </CompassTestProvider>
    </Container>
  );
}
