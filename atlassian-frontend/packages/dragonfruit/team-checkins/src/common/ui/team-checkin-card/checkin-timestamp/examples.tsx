import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import { gridSize } from '@atlaskit/theme/constants';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { CheckinTimestamp } from './index';

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <CompassTestProvider>{storyFn()}</CompassTestProvider>
    ),
  ],
};

const Container = styled.div`
  padding: ${gridSize() * 1}px;
`;

export const MoodInfoExample = () => (
  <div>
    {[...Array(12).keys()].map(i => {
      const timestamp = new Date(2021, i, 15).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });

      return (
        <Container>
          <CheckinTimestamp timestamp={timestamp} />
        </Container>
      );
    })}
  </div>
);
