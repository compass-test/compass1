import React from 'react';

import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import LoadFailure from './main';

const Container = styled.div`
  width: ${gridSize() * 33}px;
`;

export const LoadFailureExample = () => (
  <CompassTestProvider>
    <Container>
      <LoadFailure />
    </Container>
  </CompassTestProvider>
);
