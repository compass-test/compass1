import React from 'react';

import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import NoScorecards from './main';

const Container = styled.div`
  width: ${gridSize() * 33}px;
`;

export const NoScorecardsExample = () => (
  <CompassTestProvider>
    <Container>
      <NoScorecards />
    </Container>
  </CompassTestProvider>
);
