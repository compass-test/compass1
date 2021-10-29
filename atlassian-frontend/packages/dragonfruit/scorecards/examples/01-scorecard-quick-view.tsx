import React from 'react';

import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ScorecardQuickView } from '../src';
import { MOCK_SCORECARD } from '../src/services/get-component-scorecards-with-scores/mocks';

const Container = styled.div`
  width: ${gridSize() * 33}px;
`;

export default function ScorecardQuickViewExample() {
  return (
    <CompassTestProvider>
      <ApolloAutoMockProvider>
        <Container>
          <ScorecardQuickView
            componentId="fake-component-id"
            scorecard={MOCK_SCORECARD}
            onScorecardFullViewOpen={() => {}}
            testId={'scorecard-quick-view'}
          />
        </Container>
      </ApolloAutoMockProvider>
    </CompassTestProvider>
  );
}
