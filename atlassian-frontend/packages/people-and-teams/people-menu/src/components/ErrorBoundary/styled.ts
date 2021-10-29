import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const ErrorContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const ErrorHeading = styled.h3`
  margin-top: ${4 * gridSize()}px;
  max-width: 240px;
`;

export const ErrorMessage = styled.p`
  margin-top: ${3 * gridSize()}px;
  max-width: 240px;
`;

export const ErrorBoundaryBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  margin: ${6 * gridSize()}px 0;
`;

export const RobotsImg = styled.img`
  height: ${gridSize() * 25}px;
`;
