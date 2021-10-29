import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';
import { h400 } from '@atlaskit/theme/typography';

export const EmptyStateContainer = styled.div`
  text-align: center;
`;

export const EmptyStateTitle = styled.p`
  ${h400()}
`;

export const EmptyStateBody = styled.p`
  margin-top: ${gridSize() * 2}px;
  margin-bottom: ${gridSize() * 2}px;
`;

export const EmptyStateImage = styled.img`
  display: block;
  margin: ${gridSize() * 2}px auto ${gridSize() * 2}px;
  width: 55px;
  height: 73px;
  max-width: 55px;
  max-height: 73px;
`;
