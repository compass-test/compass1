import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const PaginationDetailsStyled = styled.div`
  flex: 1;
  text-align: right;
  margin: ${gridSize() * 1.25}px ${gridSize() * 1.875}px;
  font-size: ${gridSize() * 1.75}px;
  color: #979797;
`;
