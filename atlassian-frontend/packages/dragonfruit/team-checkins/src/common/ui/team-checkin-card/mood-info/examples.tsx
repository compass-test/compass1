import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import { gridSize } from '@atlaskit/theme/constants';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { MoodInfo } from './index';

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <CompassTestProvider>{storyFn()}</CompassTestProvider>
    ),
  ],
};
const Container = styled.div`
  width: ${gridSize() * 150}px;
  padding: ${gridSize() * 1}px;
`;

export const MoodInfoExample = () => (
  <div>
    {[...Array(5).keys()].reverse().map(i => (
      <Container>
        <MoodInfo mood={i + 1} />
      </Container>
    ))}
  </div>
);
