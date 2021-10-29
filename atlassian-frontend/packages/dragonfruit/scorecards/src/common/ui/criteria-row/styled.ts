import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  // We want spacing between individual Row elements. We're specifically
  // excluding the last Row and instead establishing a top margin between all
  // Rows and Actions (the scorecard button(s)) externally.
  &:not(:last-of-type) {
    margin-bottom: ${gridSize() * 2}px;
  }

  // We want nominal spacing between the ProgressCheck and CriteriaText
  // children.
  & > :not(:last-child) {
    margin-right: ${gridSize()}px;
  }
`;

export const Weight = styled.div`
  margin-left: auto;
  margin-right: ${gridSize() * 2}px;
`;
