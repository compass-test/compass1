import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme/constants';

// Wraps the spinner so it can be aligned to the center
export const HorizontalCenteredContainer = styled.div`
  margin: 0 auto;
`;

export const SpinnerContainer = styled.div`
  height: ${gridSize() * 12}px;
  width: 100%;
  display: flex;
  align-items: center;
`;
