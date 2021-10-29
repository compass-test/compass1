import styled from '@emotion/styled';

import { gridSize } from '@atlaskit/theme/constants';

export const ErrorBoundaryBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  margin: ${6 * gridSize()}px 0;
`;

export const ErrorHeading = styled.h3`
  margin-top: ${4 * gridSize()}px;
  margin-bottom: ${gridSize()}px;
  max-width: 240px;
`;

export const ErrorDescription = styled.p`
  max-width: 320px;
`;
